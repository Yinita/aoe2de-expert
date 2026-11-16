'use strict';
const SOURCE_PAGE_SIZE = 12;
let sourceMode='全部', sourceMap='全部地图', sourceTopic='全部主题', sourceAuthor='全部作者', sourceAccess='全部权限', sourcePage=1;

function matchesQuery(text, query) {
  const haystack = text.toLocaleLowerCase();
  return query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean).every(word=>haystack.includes(word));
}
function sourceText(s) {
  return [s.name,s.originalTitle,s.desc,s.author,s.creator,s.type,s.short,s.maps,...(s.topicTags||[]),...(s.mapTags||[]),...(s.keywords||[])].join(' ');
}
function lessonText(l) {
  return [l.title,l.desc,l.tag,l.map,l.mode==='team'?'TG 群局':'1v1 单挑',l.alsoTeam?'TG 群局':'',...l.sources.map(id=>SOURCES.find(s=>s.id===id)?.creator||'')].join(' ');
}
function filterSources() {
  const sources=SOURCES.filter(s=>
    (sourceFilter==='全部'||s.type===sourceFilter) &&
    (!savedOnly||state.saved.includes('s:'+s.id)) &&
    matchesQuery(sourceText(s),sourceQuery) &&
    (sourceYear==='全部年份'||sourceYear==='未标日期'&&!s.publishedAt||sourceYear==='2024 及以前'&&s.publishedAt&&s.publishedAt<'2025'||s.publishedAt?.startsWith(sourceYear)) &&
    (sourceMode==='全部'||s.modes.includes(sourceMode)) &&
    (sourceMap==='全部地图'||s.mapTags.includes(sourceMap)||s.mapTags.includes('全地图')) &&
    (sourceTopic==='全部主题'||s.topicTags.includes(sourceTopic)) &&
    (sourceAuthor==='全部作者'||s.creator===sourceAuthor) &&
    (sourceAccess==='全部权限'||(sourceAccess==='免费公开'?s.access!=='会员':s.access==='会员'))
  );
  if(sourceSort==='newest')sources.sort((a,b)=>(b.publishedAt||'').localeCompare(a.publishedAt||''));
  if(sourceSort==='verified')sources.sort((a,b)=>(b.verifiedAt||'').localeCompare(a.verifiedAt||''));
  return sources;
}
function resetSourceFilters() {
  sourceFilter='全部';sourceQuery='';sourceYear='全部年份';sourceSort='newest';savedOnly=false;
  sourceMode='全部';sourceMap='全部地图';sourceTopic='全部主题';sourceAuthor='全部作者';sourceAccess='全部权限';sourcePage=1;
}
function sourceSelect(id,label,values,selected) {
  return `<div class="library-filter-group"><label for="${id}">${label}</label><select id="${id}">${values.map(v=>{const [value,text]=Array.isArray(v)?v:[v,v];return `<option value="${esc(value)}" ${selected===value?'selected':''}>${esc(text)}</option>`;}).join('')}</select></div>`;
}
function activeSourceFilters() {
  const pairs=[['query',sourceQuery],['type',sourceFilter==='全部'?'':sourceFilter],['mode',sourceMode==='全部'?'':sourceMode==='solo'?'1v1 单挑':'TG 群局'],['map',sourceMap==='全部地图'?'':sourceMap],['topic',sourceTopic==='全部主题'?'':sourceTopic],['author',sourceAuthor==='全部作者'?'':sourceAuthor],['access',sourceAccess==='全部权限'?'':sourceAccess],['year',sourceYear==='全部年份'?'':sourceYear],['saved',savedOnly?'已收藏':'']].filter(([,value])=>value);
  return pairs.length?pairs.map(([key,value])=>`<button class="chip" data-clear-source-filter="${key}" aria-label="清除筛选 ${esc(value)}">${esc(value)} <span aria-hidden="true">×</span></button>`).join(''):'<span>全部资料 · 可按多个条件组合筛选</span>';
}
function clearSourceFilter(key) {
  if(key==='query')sourceQuery='';if(key==='type')sourceFilter='全部';if(key==='mode')sourceMode='全部';if(key==='map')sourceMap='全部地图';if(key==='topic')sourceTopic='全部主题';if(key==='author')sourceAuthor='全部作者';if(key==='access')sourceAccess='全部权限';if(key==='year')sourceYear='全部年份';if(key==='saved')savedOnly=false;
  sourcePage=1;
}
function sourcePagination(total) {
  const pages=Math.max(1,Math.ceil(total/SOURCE_PAGE_SIZE));
  sourcePage=Math.min(Math.max(sourcePage,1),pages);
  if(pages===1)return '';
  return `<button class="btn small" data-source-page="${sourcePage-1}" ${sourcePage===1?'disabled':''}>← 上一页</button><span>第 ${sourcePage} / ${pages} 页</span><button class="btn small" data-source-page="${sourcePage+1}" ${sourcePage===pages?'disabled':''}>下一页 →</button>`;
}
function libraryResults() {
  const sources=filterSources();
  const pagination=sourcePagination(sources.length);
  return `<div class="library-results-header"><strong id="source-result-count" role="status" aria-live="polite">找到 ${sources.length} 个资料来源</strong><span>每页 ${SOURCE_PAGE_SIZE} 个 · 原作者链接</span></div><div class="active-filters">${activeSourceFilters()}</div><div class="source-grid" id="source-grid">${sourceCards(sources.slice((sourcePage-1)*SOURCE_PAGE_SIZE,sourcePage*SOURCE_PAGE_SIZE))}</div><div class="library-pagination" aria-label="资料翻页">${pagination}</div>`;
}
function refreshLibraryResults() {
  const target=document.getElementById('library-results');
  if(target)target.innerHTML=libraryResults();
}
function renderLibrary() {
  const creators=[...new Set(SOURCES.map(s=>s.creator))].sort((a,b)=>a.localeCompare(b,'zh-CN'));
  const savedLessons=savedOnly?LESSONS.filter(l=>state.saved.includes(l.id)):[];
  return header('THE EXPERT LIBRARY','带着一个问题，找到值得深挖的资料。','按模式、地图、主题和作者组合检索。发布日期与核验日期分别记录；先看公开教学，再把一个决策带进自己的录像。')+
    `<div class="toolbar"><input class="search-inline" id="source-search" type="search" aria-label="搜索资料" placeholder="搜索作者、地图、兵种或训练问题…" value="${esc(sourceQuery)}"><label class="saved-only"><input type="checkbox" id="saved-only" ${savedOnly?'checked':''}>仅看收藏</label><a class="btn small" href="#collections">${icon('map')} 不知从哪开始？看专题路线</a></div><div class="library-layout"><details class="library-rail" open><summary>筛选资料</summary>${sourceSelect('source-mode','对局模式',[['全部','全部模式'],['solo','1v1 单挑'],['team','TG 群局']],sourceMode)}${sourceSelect('source-map','地图场景',['全部地图','开放图','封闭图','游牧','混合图'],sourceMap)}${sourceSelect('source-topic','训练主题',['全部主题',...TOPICS],sourceTopic)}${sourceSelect('source-author','原作者',['全部作者',...creators],sourceAuthor)}${sourceSelect('source-access','阅读权限',['全部权限','免费公开','会员内容'],sourceAccess)}${sourceSelect('source-type','资料类型',['全部',...new Set(SOURCES.map(s=>s.type))],sourceFilter)}${sourceSelect('source-year','发布日期',['全部年份','2026','2025','2024 及以前','未标日期'],sourceYear)}${sourceSelect('source-sort','排列方式',[['newest','最新发布优先'],['verified','最近核验优先'],['curated','精选顺序']],sourceSort)}<button class="btn small" data-reset-library>清除全部筛选</button><p class="editor-note">「全地图」通用资料会保留在地图筛选结果中。</p></details><div class="library-main">${savedLessons.length?`<div class="section-title"><h2>收藏的训练卡<span>${savedLessons.length} CARDS</span></h2></div><div class="card-grid">${savedLessons.map(lessonCard).join('')}</div><div class="section-title"><h2>收藏的原始资料</h2></div>`:''}<div id="library-results">${libraryResults()}</div></div></div><div class="notice"><strong>核验范围：</strong>视频的标题、日期、公开简介和章节不等于已阅读完整字幕。每个来源都标注核验方式；会员资料仅作为原作者入口。精确数值与旧录像请结合正式服版本检查。</div>${patchStrip()}`;
}
function sourceChapters(source) {
  const chapters=source.chapters||[];
  if(!chapters.length)return '';
  const time=seconds=>Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');
  return `<details class="source-chapters"><summary>${source.durationSeconds?'视频 '+Math.ceil(source.durationSeconds/60)+' 分钟 · ':''}${chapters.length} 个章节入口</summary><ol>${chapters.map(c=>`<li><a href="${c.url}" target="_blank" rel="noopener noreferrer"><time>${time(c.seconds)}</time> ${esc(c.label)}</a></li>`).join('')}</ol></details>`;
}
function sourceCards(sources) {
  if(!sources.length)return `<div class="empty-state">${icon('search')}<h2>这个组合还没有匹配资料</h2><p>减少一个筛选条件，或换一个作者、地图关键词。</p><button class="btn" data-reset-library>清除筛选，浏览全部</button></div>`;
  return sources.map(s=>`<article class="source-card"><span class="source-symbol" aria-hidden="true">${esc(s.symbol)}</span><div class="source-copy"><div class="source-tags"><span class="mini-tag">${esc(s.type)}</span>${s.stage?`<span class="mini-tag stage-tag">${esc(s.stage)}</span>`:''}<span class="mini-tag ${s.access==='会员'?'paid-tag':'recent-tag'}">${s.access==='会员'?'会员内容':'公开可读'}</span>${s.verifiedAt===SITE_META.updatedAt?'<span class="mini-tag recent-tag">本次核验</span>':''}</div><h2><a href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a></h2><div class="publish-date">${s.publishedAt?'发布 '+esc(s.publishedAt):'未标发布日期'}${s.updatedAt?' · 更新 '+esc(s.updatedAt):''}${s.maps?' · '+esc(s.maps):''}</div><p>${esc(s.desc)}</p><div class="source-topics">${s.topicTags.slice(0,3).map(t=>`<button class="topic-pill" data-library-topic="${esc(t)}">${esc(t)}</button>`).join('')}</div><a class="source-link" href="${s.url}" target="_blank" rel="noopener noreferrer">打开原始资料 ↗</a><div class="source-evidence">${esc(s.creator)} · ${esc(s.language)}<br>核验 ${esc(s.verifiedAt)} · ${esc(s.evidence)}</div>${sourceChapters(s)}${s.caution?`<details class="source-caution"><summary>版本与使用说明</summary><p>${esc(s.caution)}</p></details>`:''}</div><button class="bookmark-btn ${state.saved.includes('s:'+s.id)?'is-saved':''}" data-save="s:${s.id}" aria-label="${state.saved.includes('s:'+s.id)?'取消收藏':'收藏'} ${esc(s.name)}" aria-pressed="${state.saved.includes('s:'+s.id)}">${icon('bookmark')}</button></article>`).join('');
}
function renderRecentResources() {
  const sources=SOURCES.filter(s=>s.publishedAt?.startsWith('2026')&&s.access!=='会员'&&s.type!=='官方资料').sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)).slice(0,3);
  return section('近期公开研习材料','FRESH & OPEN','探索全部资料','#library')+`<div class="recent-resource-grid">${sources.map(s=>`<a class="recent-resource" href="${s.url}" target="_blank" rel="noopener noreferrer"><div><span class="mini-tag recent-tag">${esc(s.publishedAt)}</span><span class="recent-author">${esc(s.creator)}</span></div><h3>${esc(s.name)} ↗</h3><p>${esc(s.desc)}</p></a>`).join('')}</div>`;
}
function collectionCard(c) {
  const done=c.lessons.filter(id=>state.complete.includes(id)).length;
  return `<article class="collection-card"><div class="lesson-glyph">${icon(c.icon)}</div><div class="eyebrow">${c.mode==='solo'?'1v1':c.mode==='team'?'TEAM':'1v1 + TEAM'} / ${esc(c.topic)}</div><h2>${esc(c.title)}</h2><p>${esc(c.desc)}</p><div class="reading-progress"><span style="width:${done/c.lessons.length*100}%"></span></div><footer><span>${c.sources.length} 个阅读入口 · ${c.lessons.length} 项练习 · 已完成 ${done}</span><button class="btn small" data-collection="${c.id}">开始研习 →</button></footer></article>`;
}
function renderCollections() {
  return header('STUDY WITH A PURPOSE','一次研习，解决一个反复出现的问题。','每条路线按「先看什么 → 如何练习 → 留下什么证据」安排。进度来自你的专项训练完成记录，阅读本身不自动计为完成。')+`<div class="learning-collections">${CURRICULA.map(collectionCard).join('')}</div>`;
}
function openCollection(id) {
  const c=CURRICULA.find(c=>c.id===id);if(!c)return;
  const sources=c.sources.map(id=>SOURCES.find(s=>s.id===id)).filter(Boolean);
  const lessons=c.lessons.map(id=>LESSONS.find(l=>l.id===id)).filter(Boolean);
  document.getElementById('collection-content').innerHTML=`<header class="dialog-head"><button class="icon-button dialog-close" data-close-collection aria-label="关闭专题路线">×</button><div class="eyebrow">STUDY ROUTE / ${esc(c.topic)}</div><h2>${esc(c.title)}</h2><p>${esc(c.question)}</p></header><div class="dialog-body"><section class="dialog-section"><h3><span>01</span> 先读这几个来源</h3><p>按顺序带着同一个问题阅读，记录适用条件和与你对局不同的地方。</p><ol class="collection-reading-list">${sources.map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.name)} ↗</a><small>${s.access==='会员'?'会员内容':'公开可读'} · ${esc(s.publishedAt||'未标日期')} · ${esc(s.evidence)}</small></li>`).join('')}</ol></section><section class="dialog-section"><h3><span>02</span> 把问题带进训练</h3>${lessons.map((l,i)=>`<button class="search-hit" data-open="${l.id}"><strong>${i+1}. ${esc(l.title)}</strong><small>${state.complete.includes(l.id)?'✓ 已完成训练':'查看条件、执行步骤和录像指标'} →</small></button>`).join('')}</section><section class="dialog-section"><h3><span>03</span> 留下一份可检查的成果</h3><div class="dialog-metric">${esc(c.output)}</div></section><div class="dialog-bottom"><button class="btn primary" data-queue-collection="${c.id}">${icon('target')} 加入这些专项训练</button><button class="btn" data-library-topic="${esc(c.topic)}">浏览同主题全部资料 ↗</button><a class="btn" href="#review" data-finish-collection>打开复盘台</a></div></div>`;
  const dialog=document.getElementById('collection-dialog');if(!dialog.open)dialog.showModal();
}
