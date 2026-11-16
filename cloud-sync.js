/* Optional Drive sync. Configure a deployed Apps Script endpoint in this browser. */
(() => {
  'use strict';
  const CONFIG_KEY = 'aoe2-drive-sync-config-v1';
  const META_KEY = 'aoe2-drive-sync-meta-v1';
  const validId = id => typeof id === 'string' && /^[A-Za-z0-9_-]{1,100}$/.test(id) && !['__proto__', 'constructor', 'prototype'].includes(id);
  const readJSON = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
  const clone = value => JSON.parse(JSON.stringify(value));
  const uuid = () => typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : 'profile-' + Date.now() + '-' + Math.random().toString(36).slice(2, 12);
  const validURL = value => {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.hostname !== 'script.google.com' || url.port || url.username || url.password || url.search || url.hash) return false;
      return /^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url.pathname) || /^\/a\/(?:[A-Za-z0-9._~-]+\/)+exec$/.test(url.pathname);
    } catch { return false; }
  };
  let config = readJSON(CONFIG_KEY);
  if (!config || !validURL(config.url) || typeof config.roomKey !== 'string' || !config.roomKey || !config.connectionId) config = null;
  let meta = readJSON(META_KEY);
  if (!meta || typeof meta !== 'object' || !meta.profiles || meta.connectionId !== (config?.connectionId || null)) meta = { connectionId: config?.connectionId || null, profiles: {} };
  meta.profiles = Object.assign(Object.create(null), meta.profiles);
  for (const user of accountStore.users) if (!user.remoteOnly && !Object.prototype.hasOwnProperty.call(meta.profiles, user.id)) meta.profiles[user.id] = { revision: 0, dirty: true, editCounter: 1 };
  let generation = 0, busy = 0, timer = null, lastError = '', lastSynced = '';
  let catalogReady = false, catalogPromise = null, draft = null, inviteLink = '', invitation = false;
  const inFlight = new Map();
  const controllers = new Set();
  const dirtyIds = new Set(Object.entries(meta.profiles).filter(([, value]) => value?.dirty).map(([id]) => id));
  let dialog = document.getElementById('sync-dialog');
  if (!dialog) { dialog = document.createElement('dialog'); dialog.id = 'sync-dialog'; dialog.className = 'profile-dialog'; document.body.append(dialog); }
  const findUser = id => accountStore.users.find(user => user.id === id);
  const getMeta = id => {
    if (!validId(id)) return { revision: 0, dirty: false, editCounter: 0 };
    const entry = Object.prototype.hasOwnProperty.call(meta.profiles, id) ? meta.profiles[id] : null;
    if (!entry || typeof entry !== 'object') meta.profiles[id] = { revision: 0, dirty: false, editCounter: 0 };
    const value = meta.profiles[id];
    if (!Number.isSafeInteger(value.revision) || value.revision < 0) value.revision = 0;
    if (!Number.isSafeInteger(value.editCounter) || value.editCounter < 0) value.editCounter = 0;
    return value;
  };
  function saveMeta() {
    try { localStorage.setItem(META_KEY, JSON.stringify(meta)); }
    catch { lastError = '同步标记无法写入浏览器；训练内容仍按本地保存流程处理。'; }
  }
  function setDirty(id, dirty) {
    const entry = getMeta(id); entry.dirty = dirty;
    if (dirty) dirtyIds.add(id); else dirtyIds.delete(id);
    saveMeta();
  }
  function label() {
    if (!config) return '未连接';
    if (busy) return '同步中';
    if (getMeta(currentUser.id).conflict) return '冲突';
    if (lastError || getMeta(currentUser.id).dirty || currentUser.remoteOnly) return '待同步';
    return getMeta(currentUser.id).revision > 0 ? '已同步' : '待同步';
  }
  function updateStatus() {
    const status = label();
    const target = document.getElementById('cloud-status-text');
    if (target) target.textContent = status;
    const button = document.getElementById('cloud-status-button');
    if (button) { button.dataset.status = status; button.setAttribute('aria-label', '跨设备同步：' + status); }
    const inner = dialog.querySelector('[data-sync-status]');
    if (inner) inner.textContent = status;
  }
  function refreshUI() {
    // A background refresh must not erase an unfinished replay note.
    const form = document.getElementById('review-form');
    const values = form ? Array.from(new FormData(form).entries()) : [];
    const focused = document.activeElement?.closest('#review-form') ? document.activeElement.name : '';
    const scrollY = window.scrollY;
    render();
    const nextForm = document.getElementById('review-form');
    if (nextForm) for (const [name, value] of values) { const field = nextForm.elements.namedItem(name); if (field && typeof value === 'string') field.value = value; }
    if (focused) nextForm?.elements.namedItem(focused)?.focus({ preventScroll: true });
    window.scrollTo(0, scrollY); updateStatus();
  }
  function rememberDraft() {
    const form = dialog.querySelector('#cloud-config-form');
    if (form) draft = { url: form.elements.url.value, roomKey: form.elements.roomKey.value };
  }
  function renderDialog() {
    rememberDraft();
    const formValue = draft || config || { url: '', roomKey: '' };
    const entry = getMeta(currentUser.id);
    const conflicts = accountStore.users.filter(user => getMeta(user.id).conflict);
    const unsynced = accountStore.users.filter(user => getMeta(user.id).dirty && !user.remoteOnly);
    dialog.innerHTML = `<div class="dialog-head"><button type="button" class="icon-button dialog-close" data-cloud-close aria-label="关闭跨设备同步">×</button><div class="eyebrow">YOUR TRAINING, ACROSS DEVICES</div><h2>跨设备继续研习</h2><p>状态：<strong data-sync-status>${esc(label())}</strong>${lastSynced ? ' · 上次同步 ' + esc(lastSynced) : ''}</p></div><div class="profile-body cloud-sync-body"><p class="profile-storage-note">${icon('shield')}<span>训练档案保存在你部署的 Google Apps Script / Drive 中。持有同步端点和共享密钥（或内测链接）的人可以读写全部档案。</span></p>${invitation ? '<div class="notice">已从内测链接填入配置。点击「连接并同步」后才会访问云端。</div>' : ''}${!config ? '<p><a class="source-link" target="_blank" rel="noopener noreferrer" href="https://github.com/Yinita/aoe2de-expert/blob/main/cloud/README.md">首次使用：部署 Google Drive 同步服务 ↗</a></p>' : ''}<form id="cloud-config-form"><label class="field">Apps Script 部署地址<input name="url" type="url" required autocomplete="off" spellcheck="false" placeholder="https://script.google.com/macros/s/…/exec" value="${esc(formValue.url)}"></label><label class="field">共享密钥<input name="roomKey" type="password" required autocomplete="off" maxlength="256" placeholder="使用部署时设置的共享密钥" value="${esc(formValue.roomKey)}"></label><div class="form-actions"><button class="btn primary" type="submit" ${busy ? 'disabled' : ''}>${icon('refresh')} ${config ? '保存配置并同步' : '连接并同步'}</button>${config && !invitation ? '<button class="btn" type="button" data-cloud-sync>立即同步</button><button class="btn" type="button" data-cloud-invite>复制内测同步链接</button><button class="btn" type="button" data-cloud-disconnect>断开连接</button>' : ''}</div></form><p class="editor-note">配置仅保存在此浏览器。切换用户只改变本机选择；断开连接后，已下载的训练内容仍保留在本机。</p>${lastError ? `<p class="profile-error" role="alert">${esc(lastError)}</p>` : ''}${inviteLink ? `<label class="field">内测同步链接（可手动复制）<input id="cloud-invite-link" type="text" readonly value="${esc(inviteLink)}"></label>` : ''}${conflicts.length ? `<section class="cloud-conflicts"><h3>有 ${conflicts.length} 个档案需要处理冲突</h3><p>云端已有其他版本。本机内容仍保留，系统不会覆盖云端。</p>${conflicts.map(user => `<div class="cloud-conflict panel"><strong>${esc(user.name)}</strong><p>本机基于版本 ${getMeta(user.id).revision}，云端版本 ${esc(getMeta(user.id).conflict.currentRevision ?? '待确认')}。</p><div class="form-actions"><button class="btn small" type="button" data-cloud-keep-load="${esc(user.id)}" ${busy ? 'disabled' : ''}>保留本地副本并载入云端</button><button class="btn small" type="button" data-cloud-fork="${esc(user.id)}" ${busy ? 'disabled' : ''}>另存新用户</button></div></div>`).join('')}</section>` : ''}<section><h3>待同步的本地档案 · ${unsynced.length}</h3><p>${unsynced.length ? unsynced.map(user => esc(user.name) + (getMeta(user.id).manualOnly ? '（本地副本，等待手动同步）' : '')).join('、') : config ? '当前没有待上传的本地修改。' : '连接后可将本机训练档案同步至你的 Drive。'}</p><p class="editor-note">「立即同步」会刷新云端目录并同步当前档案。本地冲突副本需先切换到该用户，再点击「立即同步」。</p></section>${config ? `<p class="editor-note">当前档案：${esc(currentUser.name)} · ${entry.revision ? '本机基于云端版本 ' + entry.revision : '尚未完成首次同步'}</p>` : ''}</div>`;
    updateStatus();
  }
  function show() { renderDialog(); if (!dialog.open) dialog.showModal(); }
  function messageFor(error) {
    if (error?.code === 'stale_connection') return '';
    if (error?.name === 'AbortError') return '连接超时或已取消。本地内容已保留，可稍后重试。';
    const codes = { unauthorized: '共享密钥不正确，或部署尚未允许访问。', invalid_key: '共享密钥不正确。', not_found: '云端未找到该档案。本地内容仍保留。', profile_not_found: '云端未找到该档案。本地内容仍保留。' };
    return codes[error?.code] || error?.message || '同步失败。本地内容已保留，请检查部署地址、网络和 Apps Script 访问权限。';
  }
  async function request(action, extra = {}) {
    if (!config) throw new Error('请先连接自己的 Apps Script 部署。');
    const epoch = generation, selected = config;
    const controller = new AbortController(); controllers.add(controller); busy++; updateStatus();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(selected.url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action, roomKey: selected.roomKey, ...extra }), signal: controller.signal, redirect: 'follow', mode: 'cors', credentials: 'omit' });
      if (!response.ok) throw new Error('同步服务返回 HTTP ' + response.status + '。本地内容已保留。');
      const raw = await response.text();
      if (raw.length > 5000000) throw new Error('云端响应过大，未载入。请先导出本机笔记并检查云端部署。');
      let result; try { result = JSON.parse(raw); } catch { throw new Error('部署未返回有效 JSON。请确认使用 /exec 地址且允许访问，并重新部署最新代码。'); }
      if (epoch !== generation) throw Object.assign(new Error('连接已更改。'), { code: 'stale_connection' });
      if (!result || result.ok !== true) throw Object.assign(new Error('云端拒绝请求：' + String(result?.error || '未知错误')), { code: result?.error || 'invalid_response', currentRevision: result?.currentRevision });
      return result;
    } finally { clearTimeout(timeout); controllers.delete(controller); busy--; updateStatus(); }
  }
  const isRevision = value => Number.isSafeInteger(value) && value >= 0;
  function checkProfile(profile, id) {
    if (!profile || profile.id !== id || typeof profile.name !== 'string' || !profile.state || typeof profile.state !== 'object' || Array.isArray(profile.state)) throw new Error('云端档案格式不正确，未替换本地内容。');
    const copy = clone(profile);
    copy.name = copy.name.trim().slice(0, 80) || '未命名训练档案';
    copy.focus = ['solo', 'team', 'mixed'].includes(copy.focus) ? copy.focus : 'mixed';
    copy.state = normalizeState(copy.state);
    return copy;
  }
  function flagConflict(id, revision) {
    const entry = getMeta(id); entry.conflict = { currentRevision: isRevision(revision) ? revision : null }; setDirty(id, true);
    lastError = '发现版本冲突；已停止上传该档案，本地和云端均保留。';
    updateStatus(); if (dialog.open) renderDialog();
  }
  async function catalog() {
    if (catalogPromise) return catalogPromise;
    const job = (async () => {
      const result = await request('catalog');
      if (!Array.isArray(result.profiles)) throw new Error('云端目录格式不正确。');
      let changedDirectory = false;
      for (const item of result.profiles) {
        if (!item || !validId(item.id) || typeof item.name !== 'string' || !isRevision(item.revision)) continue;
        let user = findUser(item.id);
        const entry = getMeta(item.id); entry.remoteRevision = item.revision;
        if (!user) {
          user = { id: item.id, name: item.name.slice(0, 80), focus: ['solo', 'team', 'mixed'].includes(item.focus) ? item.focus : 'mixed', state: emptyState(), remoteOnly: true, revision: item.revision };
          accountStore.users.push(user); changedDirectory = true;
        } else if (user.remoteOnly) {
          user.name = item.name.slice(0, 80); user.focus = ['solo', 'team', 'mixed'].includes(item.focus) ? item.focus : 'mixed'; user.revision = item.revision; changedDirectory = true;
        }
      }
      catalogReady = true; saveMeta(); persist(false);
      if (changedDirectory && document.getElementById('profile-dialog')?.open) openProfiles();
      return result;
    })();
    catalogPromise = job;
    try { return await job; } finally { if (catalogPromise === job) catalogPromise = null; }
  }
  async function loadRemote(id, force = false) {
    const user = findUser(id); if (!user) return false;
    const entry = getMeta(id), counter = entry.editCounter;
    if (entry.dirty && !force) return false;
    const result = await request('get', { profileId: id });
    const remote = checkProfile(result.profile, id);
    const revision = result.revision ?? result.profile?.revision;
    if (!isRevision(revision) || revision < 1) throw new Error('云端未返回有效版本号，未替换本地内容。');
    if (entry.editCounter !== counter) { flagConflict(id, revision); return false; }
    if (revision < entry.revision) return false;
    user.name = remote.name; user.focus = remote.focus; user.state = remote.state; user.remoteOnly = false; user.revision = revision;
    entry.revision = revision; entry.remoteRevision = revision; delete entry.conflict; delete entry.manualOnly; setDirty(id, false);
    if (currentUser.id === id) { state = user.state; currentUser = user; }
    persist(false);
    const merged = findUser(id);
    if (merged && JSON.stringify(merged.state) !== JSON.stringify(remote.state)) { entry.editCounter++; setDirty(id, true); schedule(); }
    lastError = ''; lastSynced = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    if (currentUser.id === id) refreshUI(); updateStatus(); return true;
  }
  async function syncProfile(id, manual = false) {
    if (inFlight.has(id)) return inFlight.get(id);
    const job = (async () => {
      if (!config) return false;
      const user = findUser(id); if (!user) return false;
      const entry = getMeta(id);
      if (entry.conflict || (entry.manualOnly && !manual)) return false;
      if (user.remoteOnly) return loadRemote(id);
      if (!entry.dirty) return manual ? loadRemote(id) : true;
      if (isRevision(entry.remoteRevision) && entry.remoteRevision !== entry.revision) { flagConflict(id, entry.remoteRevision); return false; }
      const counter = entry.editCounter;
      const snapshot = { id: user.id, name: user.name, focus: user.focus, state: clone(user.id === currentUser.id ? state : user.state) };
      try {
        const result = await request('put', { profileId: id, profile: snapshot, baseRevision: entry.revision });
        if (!isRevision(result.revision) || result.revision < 1) throw new Error('云端未确认有效版本号。本地修改仍待同步。');
        user.revision = result.revision; entry.revision = result.revision; entry.remoteRevision = result.revision;
        delete entry.conflict; delete entry.manualOnly;
        setDirty(id, counter !== entry.editCounter);
        persist(false);
        const merged = findUser(id);
        if (merged && JSON.stringify({ id: merged.id, name: merged.name, focus: merged.focus, state: merged.state }) !== JSON.stringify(snapshot)) {
          entry.editCounter++; setDirty(id, true);
        }
        lastError = ''; lastSynced = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        if (entry.dirty) schedule();
        updateStatus(); return true;
      } catch (error) {
        if (error.code === 'revision_conflict') { flagConflict(id, error.currentRevision); return false; }
        throw error;
      }
    })();
    inFlight.set(id, job);
    try { return await job; } finally { if (inFlight.get(id) === job) inFlight.delete(id); }
  }
  async function autoSync() {
    if (!config || invitation) return;
    try {
      if (!catalogReady) await catalog();
      for (const id of Array.from(dirtyIds)) await syncProfile(id);
    } catch (error) { lastError = messageFor(error); updateStatus(); if (dialog.open) renderDialog(); }
  }
  function schedule() { clearTimeout(timer); if (config && !invitation && navigator.onLine !== false) timer = setTimeout(() => { void autoSync(); }, 1500); }
  function changed(id) {
    if (!validId(id) || !findUser(id)) return;
    const entry = getMeta(id); entry.editCounter++; setDirty(id, true); updateStatus(); schedule();
  }
  async function manualSync() {
    if (!config) return;
    try {
      lastError = ''; await catalog();
      const ok = await syncProfile(currentUser.id, true);
      if (ok) toast(getMeta(currentUser.id).dirty ? '云端目录已刷新，新产生的本地修改仍待同步' : '当前档案已同步，云端用户目录已刷新');
      else if (getMeta(currentUser.id).conflict) toast('发现冲突，请选择保留本地副本或另存用户');
    } catch (error) { lastError = messageFor(error); if (lastError) toast(lastError); }
    updateStatus(); if (dialog.open) renderDialog();
  }
  function stopRequests() {
    generation++; for (const controller of controllers) controller.abort(); clearTimeout(timer); catalogReady = false; catalogPromise = null; inFlight.clear();
  }
  function migrateInitial() {
    persist(false);
    const user = findUser('initial');
    if (!user || user.remoteOnly || getMeta('initial').revision > 0) return;
    const id = uuid(); user.id = id;
    if (accountStore.activeUserId === 'initial') accountStore.activeUserId = id;
    // Rename the same disk record before persist() performs its cross-tab merge.
    // Otherwise that merge would restore the obsolete "initial" record.
    const disk = readJSON(storageKey);
    if (disk && Array.isArray(disk.users)) {
      disk.users = disk.users.map(item => item.id === 'initial' ? { ...item, id } : item);
      if (disk.activeUserId === 'initial') disk.activeUserId = id;
      try { localStorage.setItem(storageKey, JSON.stringify(disk)); }
      catch { user.id = 'initial'; if (accountStore.activeUserId === id) accountStore.activeUserId = 'initial'; throw new Error('本机档案标识无法保存，暂未开始云端同步。'); }
    }
    meta.profiles[id] = { revision: 0, dirty: true, editCounter: 1 }; delete meta.profiles.initial; dirtyIds.delete('initial'); dirtyIds.add(id);
    persist(false); saveMeta();
  }
  async function connect(form) {
    const url = String(form.get('url') || '').trim(), roomKey = String(form.get('roomKey') || '').trim();
    if (!validURL(url)) { lastError = '请输入 script.google.com 的 HTTPS Apps Script /exec 部署地址。'; renderDialog(); return; }
    if (!roomKey || roomKey.length > 256) { lastError = '请输入 1–256 个字符的共享密钥。'; renderDialog(); return; }
    const same = config && config.url === url && config.roomKey === roomKey;
    if (!same) {
      stopRequests();
      config = { url, roomKey, connectionId: uuid() };
      meta = { connectionId: config.connectionId, profiles: Object.create(null) }; dirtyIds.clear();
      for (const user of accountStore.users) if (!user.remoteOnly) { const entry = getMeta(user.id); entry.dirty = true; entry.editCounter = 1; dirtyIds.add(user.id); }
    }
    try { localStorage.setItem(CONFIG_KEY, JSON.stringify(config)); }
    catch { lastError = '此浏览器无法保存同步配置，尚未连接。'; config = null; renderDialog(); return; }
    migrateInitial(); saveMeta(); lastError = ''; invitation = false; draft = null; inviteLink = '';
    await manualSync();
    if (!lastError && catalogReady && location.hash.startsWith('#connect=')) history.replaceState(null, '', location.pathname + location.search + '#home');
    if (!lastError) schedule();
  }
  function localCopy(id) {
    const user = findUser(id); if (!user) return null;
    const copy = { id: uuid(), name: user.name.slice(0, 14) + ' · 本地副本', focus: user.focus, createdAt: new Date().toISOString(), state: clone(id === currentUser.id ? state : user.state) };
    let suffix = 2, base = copy.name;
    while (accountStore.users.some(item => item.name === copy.name)) copy.name = base + ' ' + suffix++;
    accountStore.users.push(copy);
    meta.profiles[copy.id] = { revision: 0, dirty: true, editCounter: 1, manualOnly: true };
    dirtyIds.add(copy.id); saveMeta(); persist(false); return copy;
  }
  async function resolveByCopy(id, loadCloud) {
    if (!config && loadCloud) return;
    const copy = localCopy(id); if (!copy) return;
    try {
      if (loadCloud) {
        const loaded = await loadRemote(id, true);
        if (loaded) toast('已保留本地副本并载入云端；副本等待手动同步');
        else toast('副本已保留，原档案有新的本地修改，未替换');
      } else {
        await switchUser(copy.id);
        toast('已另存本地新用户；切换后点击「立即同步」上传');
      }
    } catch (error) { lastError = messageFor(error); toast('本地副本已保留；云端暂未载入'); }
    updateStatus(); renderDialog();
  }
  async function beforeSwitch(id) {
    try {
      const user = findUser(id); if (!user) return false;
      if (!config) { if (user.remoteOnly) { toast('该用户尚未下载，请先连接云端'); show(); return false; } return true; }
      const entry = getMeta(id);
      if (user.remoteOnly) {
        if (!await loadRemote(id)) { show(); return false; }
      } else if (!entry.dirty && entry.revision > 0) {
        try { await loadRemote(id); }
        catch (error) { lastError = messageFor(error); toast('暂时无法刷新云端，继续使用此用户的本地内容'); }
      }
      if (entry.dirty && !entry.conflict && !entry.manualOnly) schedule();
      return true;
    } catch (error) { lastError = messageFor(error); toast(lastError || '暂时无法载入云端用户'); show(); return false; }
    finally { setTimeout(updateStatus, 0); }
  }
  async function copyInvite() {
    if (!config) return;
    inviteLink = location.origin + location.pathname + '#connect=' + encodeURIComponent(JSON.stringify({ url: config.url, key: config.roomKey }));
    try { await navigator.clipboard.writeText(inviteLink); toast('内测同步链接已复制；持有者可以读写全部档案'); }
    catch { toast('无法自动复制，请复制下方的内测同步链接'); }
    renderDialog();
    const input = document.getElementById('cloud-invite-link'); if (input) { input.focus(); input.select(); }
  }
  dialog.addEventListener('submit', event => {
    if (event.target.id !== 'cloud-config-form') return;
    event.preventDefault(); void connect(new FormData(event.target)).catch(error => { lastError = messageFor(error); renderDialog(); });
  });
  dialog.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.hasAttribute('data-cloud-close')) dialog.close();
    if (button.hasAttribute('data-cloud-sync')) void manualSync();
    if (button.hasAttribute('data-cloud-invite')) void copyInvite();
    if (button.hasAttribute('data-cloud-disconnect')) {
      stopRequests(); config = null; draft = null; inviteLink = ''; lastError = ''; lastSynced = '';
      try { localStorage.removeItem(CONFIG_KEY); } catch {}
      updateStatus(); renderDialog(); toast('已断开连接，本地训练内容仍保留');
    }
    if (button.dataset.cloudKeepLoad) void resolveByCopy(button.dataset.cloudKeepLoad, true);
    if (button.dataset.cloudFork) void resolveByCopy(button.dataset.cloudFork, false);
  });
  document.getElementById('cloud-status-button')?.addEventListener('click', show);
  window.addEventListener('online', schedule);
  async function refreshFromCloud() {
    if (!config || invitation || document.visibilityState === 'hidden' || busy) return;
    try {
      await catalog();
      const entry = getMeta(currentUser.id);
      if (!entry.dirty && !entry.conflict && (entry.revision > 0 || currentUser.remoteOnly)) await loadRemote(currentUser.id);
      schedule(); updateStatus();
    } catch (error) { lastError = messageFor(error); updateStatus(); }
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') void refreshFromCloud(); });
  window.AoeCloud = { open: show, changed, beforeSwitch };
  try {
    if (location.hash.startsWith('#connect=') && location.hash.length < 16000) {
      const invite = JSON.parse(decodeURIComponent(location.hash.slice(9)));
      if (invite && validURL(invite.url) && typeof invite.key === 'string' && invite.key.trim() && invite.key.length <= 256) { draft = { url: invite.url, roomKey: invite.key }; invitation = true; show(); }
    }
  } catch { lastError = '内测同步链接格式无效，请手动填写配置。'; show(); }
  updateStatus();
  if (config && !invitation) {
    try { migrateInitial(); void refreshFromCloud(); }
    catch (error) { lastError = messageFor(error); updateStatus(); }
  }
})();
