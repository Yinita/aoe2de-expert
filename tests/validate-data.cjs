#!/usr/bin/env node
'use strict';

// Run from any directory: node /path/to/aoe2de-expert/tests/validate-data.cjs
// No npm packages or network access are needed. catalog.js uses modern JS syntax.
if (Number(process.versions.node.split('.')[0]) < 16) {
  console.error('数据校验需要 Node.js 16 或更新版本；当前为 ' + process.version + '。');
  process.exit(1);
}

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const projectRoot = path.resolve(__dirname, '..');
const errors = [];
let chapterCount = 0;

function check(condition, message) {
  try { assert.ok(condition, message); }
  catch { errors.push(message); }
  return Boolean(condition);
}

function nonempty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function record(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function text(value, label) {
  return check(nonempty(value), label + ' 必须是非空字符串');
}

function array(value, label, requireItems = false) {
  if (!check(Array.isArray(value), label + ' 必须是数组')) return false;
  if (requireItems) check(value.length > 0, label + ' 至少需要一项');
  return true;
}

function stringArray(value, label, requireItems = false) {
  if (!array(value, label, requireItems)) return false;
  const seen = new Set();
  value.forEach((item, index) => {
    if (!text(item, label + '[' + index + ']')) return;
    check(!seen.has(item), label + ' 包含重复项：' + item);
    seen.add(item);
  });
  return true;
}

function validCalendarDate(value, allowMonth) {
  if (typeof value !== 'string') return false;
  const match = value.match(allowMonth ? /^(\d{4})-(\d{2})(?:-(\d{2}))?$/ : /^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const year = Number(match[1]), month = Number(match[2]);
  if (year < 1 || month < 1 || month > 12) return false;
  if (match[3] === undefined) return true;
  const day = Number(match[3]);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= days[month - 1];
}

function dates(value, label) {
  const fields = ['publishedAt', 'publishedDate', 'publicationDate', 'publishedAtCN', 'recordedAt', 'recordedDate', 'verifiedAt', 'checkedAt', 'addedAt', 'updatedAt'];
  for (const key of fields) {
    if (!Object.prototype.hasOwnProperty.call(value, key) || value[key] === null) continue;
    check(validCalendarDate(value[key], true), label + '.' + key + ' 应为有效的 YYYY-MM 或 YYYY-MM-DD，日期未知请用 null');
  }
  if (value.publishedAtISO !== undefined && value.publishedAtISO !== null) {
    const stamp = value.publishedAtISO;
    const match = typeof stamp === 'string' && stamp.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-](\d{2}):(\d{2}))$/);
    const valid = match && validCalendarDate(match[1], false) && Number(match[2]) < 24 && Number(match[3]) < 60 && Number(match[4]) < 60 && (!match[6] || (Number(match[6]) <= 23 && Number(match[7]) < 60)) && Number.isFinite(Date.parse(stamp));
    check(valid, label + '.publishedAtISO 应为含有效时区的完整 ISO 时间');
  }
}

function webURL(value, label) {
  if (!text(value, label)) return null;
  try {
    const parsed = new URL(value);
    if (!check(['https:', 'http:'].includes(parsed.protocol) && Boolean(parsed.hostname) && !parsed.username && !parsed.password, label + ' 必须是无内嵌凭据的 HTTP(S) URL')) return null;
    return parsed;
  } catch {
    check(false, label + ' 不是有效的绝对 URL：' + value);
    return null;
  }
}

function canonicalURL(url) {
  const copy = new URL(url.href);
  const host = copy.hostname.toLowerCase().replace(/^www\./, '');
  // A timestamp, embed URL or share URL still refers to the same source video.
  if (host === 'youtu.be') {
    const id = copy.pathname.split('/').filter(Boolean)[0];
    if (id) return 'youtube-video:' + id;
  }
  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    const parts = copy.pathname.split('/').filter(Boolean);
    const id = copy.searchParams.get('v') || (['shorts', 'embed', 'live'].includes(parts[0]) && parts[1]);
    if (id) return 'youtube-video:' + id;
  }
  copy.hash = '';
  for (const key of Array.from(copy.searchParams.keys())) {
    if (/^utm_/i.test(key) || /^(fbclid|gclid)$/i.test(key)) copy.searchParams.delete(key);
  }
  copy.searchParams.sort();
  copy.pathname = copy.pathname.replace(/\/+$/, '') || '/';
  return copy.href;
}

function indexRecords(items, label) {
  const result = new Map();
  if (!array(items, label, true)) return result;
  items.forEach((item, index) => {
    if (!check(record(item), label + '[' + index + '] 必须是对象')) return;
    if (!text(item.id, label + '[' + index + '].id')) return;
    check(!result.has(item.id), label + ' ID 重复：' + item.id);
    result.set(item.id, item);
  });
  return result;
}

function references(value, index, label, requireItems = true) {
  if (!stringArray(value, label, requireItems)) return;
  value.forEach(id => {
    if (nonempty(id)) check(index.has(id), label + ' 引用了不存在的 ID：' + id);
  });
}

let data;
try {
  const context = vm.createContext(Object.create(null), { codeGeneration: { strings: false, wasm: false } });
  for (const file of ['data.js', 'catalog.js']) {
    const filename = path.join(projectRoot, file);
    new vm.Script(fs.readFileSync(filename, 'utf8'), { filename }).runInContext(context, { timeout: 2000 });
  }
  data = new vm.Script('({ SOURCES, LESSONS, TOPICS, CURRICULA, SITE_META })').runInContext(context, { timeout: 1000 });
} catch (error) {
  console.error('无法载入 data.js / catalog.js：\n' + error.stack);
  process.exit(1);
}

const { SOURCES, LESSONS, TOPICS, CURRICULA, SITE_META } = data;
const sources = indexRecords(SOURCES, 'SOURCES');
const lessons = indexRecords(LESSONS, 'LESSONS');
const curricula = indexRecords(CURRICULA, 'CURRICULA');
stringArray(TOPICS, 'TOPICS', true);
const topics = new Set(Array.isArray(TOPICS) ? TOPICS : []);

function topicTags(value, label, required) {
  if (!required && value.topicTags === undefined) return;
  if (!stringArray(value.topicTags, label + '.topicTags', true)) return;
  value.topicTags.forEach(topic => check(topics.has(topic), label + '.topicTags 使用了 TOPICS 之外的专题：' + topic));
}

if (check(record(SITE_META), 'SITE_META 必须是对象')) {
  check(validCalendarDate(SITE_META.updatedAt, false), 'SITE_META.updatedAt 必须是有效的 YYYY-MM-DD');
  text(SITE_META.versionReference, 'SITE_META.versionReference');
}

const urls = new Map();
for (const [id, source] of sources) {
  const label = 'SOURCES[' + id + ']';
  for (const field of ['name', 'author', 'desc']) text(source[field], label + '.' + field);
  const url = webURL(source.url, label + '.url');
  if (url) {
    const canonical = canonicalURL(url);
    check(!urls.has(canonical), label + '.url 与来源 ' + urls.get(canonical) + ' 重复：' + source.url);
    urls.set(canonical, id);
  }
  check(Object.prototype.hasOwnProperty.call(source, 'publishedAt'), label + ' 必须明确提供 publishedAt，日期未知请用 null');
  dates(source, label);
  topicTags(source, label, true);
  if (source.modes !== undefined && stringArray(source.modes, label + '.modes', true)) {
    source.modes.forEach(mode => check(['solo', 'team'].includes(mode), label + '.modes 包含不支持的模式：' + mode));
  }
  if (source.mapTags !== undefined) stringArray(source.mapTags, label + '.mapTags', true);
  // Historical sources use a prose maps field; mapTags is the normalized filter.
  if (source.maps !== undefined) {
    if (Array.isArray(source.maps)) stringArray(source.maps, label + '.maps', true);
    else text(source.maps, label + '.maps');
  }
  if (source.durationSeconds !== undefined && source.durationSeconds !== null) check(Number.isSafeInteger(source.durationSeconds) && source.durationSeconds > 0, label + '.durationSeconds 必须是正整数');
  if (source.chapters === undefined) continue;
  if (!array(source.chapters, label + '.chapters')) continue;
  let previous = -1;
  source.chapters.forEach((chapter, index) => {
    const chapterLabel = label + '.chapters[' + index + ']';
    chapterCount++;
    if (!check(record(chapter), chapterLabel + ' 必须是对象')) return;
    const secondsValid = Number.isSafeInteger(chapter.seconds) && chapter.seconds >= 0;
    check(secondsValid, chapterLabel + '.seconds 必须是非负整数');
    text(chapter.label === undefined ? chapter.title : chapter.label, chapterLabel + '.label/title');
    if (secondsValid) {
      check(chapter.seconds >= previous, chapterLabel + '.seconds 必须按时间升序排列');
      if (Number.isSafeInteger(source.durationSeconds) && source.durationSeconds > 0) check(chapter.seconds < source.durationSeconds, chapterLabel + ' 超出了视频时长');
      previous = chapter.seconds;
    }
    if (chapter.url !== undefined) {
      const chapterURL = webURL(chapter.url, chapterLabel + '.url');
      if (chapterURL && url) check(canonicalURL(chapterURL) === canonicalURL(url), chapterLabel + '.url 应指向同一来源的章节');
    }
  });
}

for (const [id, lesson] of lessons) {
  const label = 'LESSONS[' + id + ']';
  for (const field of ['title', 'condition', 'drill', 'metric', 'pitfall']) text(lesson[field], label + '.' + field);
  stringArray(lesson.steps, label + '.steps', true);
  check(['solo', 'team'].includes(lesson.mode), label + '.mode 必须是 solo 或 team');
  references(lesson.sources, sources, label + '.sources');
  dates(lesson, label);
  topicTags(lesson, label, false);
}

for (const [id, curriculum] of curricula) {
  const label = 'CURRICULA[' + id + ']';
  text(curriculum.title, label + '.title');
  check(['solo', 'team', 'mixed'].includes(curriculum.mode), label + '.mode 必须是 solo、team 或 mixed');
  check(topics.has(curriculum.topic), label + '.topic 必须属于 TOPICS：' + curriculum.topic);
  references(curriculum.sources, sources, label + '.sources');
  references(curriculum.lessons, lessons, label + '.lessons');
  dates(curriculum, label);
  topicTags(curriculum, label, false);
}

if (errors.length) {
  console.error('数据校验失败，共 ' + errors.length + ' 个问题：');
  errors.forEach((message, index) => console.error(String(index + 1) + '. ' + message));
  process.exitCode = 1;
} else {
  console.log('数据校验通过：' + sources.size + ' 个来源、' + lessons.size + ' 张训练卡、' + curricula.size + ' 门课程、' + topics.size + ' 个专题、' + chapterCount + ' 个章节。');
  console.log('已检查 ID、引用、来源 URL 去重、有效日期、专题归属、课程资料/卡片及章节时间；未进行网络可用性或内容事实核验。');
}
