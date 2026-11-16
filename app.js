'use strict';
const icons = {
castle:'M3 21V9h4v4h3V6h4v7h3V9h4v12H3Zm7 0v-5h4v5M10 3h4',
grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
swords:'m4 3 12 12m-1-7 6-5v6L9 21l-6-6 5-1M3 3h6L21 15l-6 6-1-5M4 20l2-2m12 0 2 2',
users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M16 3a4 4 0 0 1 0 8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
play:'M10 8v8l6-4-6-4ZM3 5h18v14H3z',
book:'M12 5C8 2 4 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-3-1-6-2-10 1Zm0 0v15',
target:'M21 12a9 9 0 1 1-9-9m5 0v4h4m-9 5 8-8m-4 8a4 4 0 1 1-4-4',
search:'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
bookmark:'M6 3h12v18l-6-4-6 4V3Z',
arrow:'M4 12h16m-6-6 6 6-6 6',
calendar:'M4 5h16v16H4zM8 3v4m8-4v4M4 10h16m-12 4h2m4 0h2m-8 3h2',
shield:'m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm-4 10 3 3 5-6',
clock:'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
chart:'M4 3v17h17M8 16v-5m5 5V8m5 8V4',
flag:'M5 22V3m0 0c5-4 9 4 15 0v10c-6 4-10-4-15 0',
bulb:'M9 18h6m-5 3h4m-5-6a6 6 0 1 1 6 0v3H9v-3Z',
external:'M14 3h7v7m0-7L10 14M10 3H3v18h18v-7',
check:'m5 12 4 4L20 5',
menu:'M3 6h18M3 12h18M3 18h18',
tree:'m12 2 7 8h-3l5 7H3l5-7H5l7-8Zm0 15v5',
map:'m9 3 6 4 7-4v17l-7 3-6-4-7 4V6l7-3Zm0 0v16m6-12v16',
coins:'M3 7c0 5 18 5 18 0S3 2 3 7Zm0 0v10c0 5 18 5 18 0V7M3 12c0 5 18 5 18 0',
download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
refresh:'M20 8a8 8 0 1 0 0 8M20 3v5h-5',
star:'m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z'
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name] || icons.book}"/></svg>`;
const $ = selector => document.querySelector(selector);
const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storageKey='aoe2-expert-profiles-v2';
const emptyState=()=>({saved:[],queue:[],complete:[],checks:[],reviews:[],reviewChecks:[]});
function normalizeState(value){const v=value&&typeof value==='object'?value:{};for(const key of ['saved','queue','complete','checks','reviews','reviewChecks'])if(!Array.isArray(v[key]))v[key]=[];return v;}
let accountStore;
try { accountStore=JSON.parse(localStorage.getItem(storageKey)); } catch {}
if(!accountStore||!Array.isArray(accountStore.users)||!accountStore.users.length){
 let legacy;try{legacy=JSON.parse(localStorage.getItem('aoe2-expert-v1'));}catch{}
 accountStore={activeUserId:'initial',users:[{id:'initial',name:'我的训练档案',focus:'mixed',createdAt:new Date().toISOString(),state:normalizeState(legacy||emptyState())}]};
}
accountStore.users=accountStore.users.filter(u=>u&&typeof u.id==='string'&&typeof u.name==='string').map(u=>({...u,focus:['solo','team','mixed'].includes(u.focus)?u.focus:'mixed',state:normalizeState(u.state)}));
if(!accountStore.users.length)accountStore.users=[{id:'initial',name:'我的训练档案',focus:'mixed',state:emptyState()}];
if(!accountStore.users.some(u=>u.id===accountStore.activeUserId))accountStore.activeUserId=accountStore.users[0].id;
let currentUser=accountStore.users.find(u=>u.id===accountStore.activeUserId);
let state=currentUser.state;
let localBaseline=JSON.parse(JSON.stringify(accountStore));
const focusLabels={solo:'单挑专项',team:'群局专项',mixed:'综合进阶'};
let currentPage='home', activeFilter='全部', mapFilter='全部地图', sourceFilter='全部', sourceQuery='', sourceYear='全部年份', sourceSort='newest', savedOnly=false, currentLesson=null, role='flank';
const labels={home:'训练总览',solo:'单挑实验室',team:'群局战术室',review:'录像复盘台',library:'专家资料库',plan:'我的训练计划'};
function decorate(root=document){root.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));}
function mergeLocalState(local,base,remote){
 const result={...remote,...local};
 for(const key of ['saved','queue','complete','checks','reviews','reviewChecks']){
  const l=Array.isArray(local[key])?local[key]:[],b=Array.isArray(base[key])?base[key]:[],r=Array.isArray(remote[key])?remote[key]:[];
  const identity=v=>key==='reviews'&&v&&v.id?String(v.id):JSON.stringify(v);
  const localKeys=new Set(l.map(identity)),baseKeys=new Set(b.map(identity));
  const removed=new Set([...baseKeys].filter(k=>!localKeys.has(k)));
  const merged=new Map(r.filter(v=>!removed.has(identity(v))).map(v=>[identity(v),v]));
  for(const v of l)if(!baseKeys.has(identity(v)))merged.set(identity(v),v);
  result[key]=Array.from(merged.values());
 }
 return result;
}
function mergeLocalStore(){
 let disk;try{disk=JSON.parse(localStorage.getItem(storageKey));}catch{}
 if(!disk||!Array.isArray(disk.users))return;
 const diskUsers=new Map(disk.users.filter(u=>u&&typeof u.id==='string').map(u=>[u.id,u]));
 for(const user of accountStore.users){
  const saved=diskUsers.get(user.id),base=localBaseline.users.find(u=>u.id===user.id);
  if(saved&&base)user.state=mergeLocalState(user.state,base.state||emptyState(),normalizeState(saved.state));
  diskUsers.set(user.id,user);
 }
 accountStore.users=Array.from(diskUsers.values());
 currentUser=accountStore.users.find(u=>u.id===accountStore.activeUserId)||currentUser;state=currentUser.state;
}
function persist(markDirty=true){currentUser.state=state;mergeLocalStore();try{localStorage.setItem(storageKey,JSON.stringify(accountStore));localBaseline=JSON.parse(JSON.stringify(accountStore));}catch{toast('浏览器无法保存，请导出笔记备份');}updateSavedCount();if(markDirty&&window.AoeCloud)window.AoeCloud.changed(currentUser.id);}
function updateSavedCount(){$('#saved-count').textContent=state.saved.length;$('#current-user-name').textContent=currentUser.name;$('#user-avatar').textContent=Array.from(currentUser.name)[0]||'研';}
let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2600);}
function section(title,english,link='',href=''){return `<div class="section-title"><h2>${title}<span>${english}</span></h2>${link?`<a href="${href}">${link} ↗</a>`:''}</div>`;}
function header(english,title,desc){return `<div class="page-heading"><div class="eyebrow">${english}</div><h1>${title}</h1><p>${desc}</p></div>`;}
function patchStrip(){return `<div class="patch-strip">${icon('shield')}<span>版本意识也是基本功：已核验正式版 Update 188329（2026.10.27）。旧教学的开局与数值请结合当前版本验证。</span><a href="${SOURCES.find(s=>s.id==='patch').url}" target="_blank" rel="noopener noreferrer">查看官方更新 ↗</a></div>`;}
function renderHome(){
 const checked=state.checks.length;
 return `<div class="page-intro"><div><div class="eyebrow">WELCOME TO YOUR NEXT LEVEL</div><h1>${esc(currentUser.name)}，向高手靠近一步。</h1><p>${focusLabels[currentUser.focus]} · 你的训练、收藏与复盘，独立积累。</p></div><div class="date-label">${icon('calendar')} 2026 年 11 月 · 训练季</div></div>
 <section class="hero"><div class="hero-copy"><span class="hero-tag">${icon('flag')} 高水平玩家的进阶营地</span><h2>从高分天梯，<br>走向<em>职业赛场。</em></h2><p>把职业选手的思考方式，变成你的下一步。<br>深挖单挑博弈与团队协同，让每一次训练都有方向。</p><div class="hero-buttons"><a class="btn primary" href="#plan">开始进阶训练 ${icon('arrow')}</a><a class="btn" href="#library">${icon('book')} 探索专家资料</a></div></div><div class="hero-art"><img src="assets/hero-island.svg" alt="卡通中世纪战术沙盘：城堡、骑士、弓兵和经济资源" fetchpriority="high"><span class="art-label one">${icon('target')} 读懂局势，先人一步</span><span class="art-label two">${icon('shield')} 每个决定，都有依据</span></div><span class="hero-decoration" aria-hidden="true">✧</span></section>
 <div class="stats"><div class="stat"><span class="stat-icon">${icon('book')}</span><div><strong>${SOURCES.length}</strong><small>精选来源</small><p>职业选手 · 官方 · 专业工具</p></div></div><div class="stat"><span class="stat-icon">${icon('swords')}</span><div><strong>${LESSONS.length}</strong><small>深度训练卡</small><p>从决策条件到复盘指标</p></div></div><div class="stat"><span class="stat-icon">${icon('target')}</span><div><strong>4</strong><small>周进阶路径</small><p>找到短板，再逐一突破</p></div></div><div class="stat"><span class="stat-icon">${icon('chart')}</span><div><strong>${checked}<small>/ 12</small></strong><small>训练进度</small><p>本地保存 · 为自己积累</p></div></div></div>
 ${renderRecentResources()}${section('选择你的进阶路线','CHOOSE YOUR PATH')}
 <div class="path-grid"><a class="path-card" href="#solo"><div class="path-art"><span class="path-number">PATH / 01</span><img src="assets/solo.svg" alt="弓兵和骑士交锋的卡通战术场景" loading="lazy"></div><div class="path-body"><div class="path-meta"><span class="mini-tag">1v1 单挑</span> 决策 · 节奏 · 执行</div><h3>一个人的战场，每步都算数。</h3><p>从侦察推理到兵力窗口，拆解高手如何赢下关键决策。</p><div class="path-footer"><span>${LESSONS.filter(l=>l.mode==='solo').length} 个专项训练 · 开放 / 封闭 / 混合图</span>${icon('arrow')}</div></div></a><a class="path-card" href="#team"><div class="path-art"><span class="path-number">PATH / 02</span><img src="assets/team.svg" alt="两支队伍在地图上协同的卡通场景" loading="lazy"></div><div class="path-body"><div class="path-meta"><span class="mini-tag">TG 群局</span> 配合 · 分工 · 联动</div><h3>把个人优势，变成团队胜势。</h3><p>边家与内家同频出击，练好资源、时间与空间的协作。</p><div class="path-footer"><span>${LESSONS.filter(l=>l.mode==='team'||l.alsoTeam).length} 个战术专题 · Flank / Pocket</span>${icon('arrow')}</div></div></a><a class="path-card" href="#review"><div class="path-art"><span class="path-number">PATH / 03</span><img src="assets/review.svg" alt="用战术板和放大镜分析录像的卡通场景" loading="lazy"></div><div class="path-body"><div class="path-meta"><span class="mini-tag">复盘成长</span> 观察 · 归因 · 验证</div><h3>看懂一场败局，胜过盲练十局。</h3><p>回到当时的信息，找到真正可修正的第一个转折点。</p><div class="path-footer"><span>结构化复盘 · 笔记保存与导出</span>${icon('arrow')}</div></div></a></div>
 <div class="home-bottom"><section>${section('高手的工具箱','EXPERT TOOLKIT','查看全部','#library')}<div class="resource-rows">${['capture','survivalist','hera'].map(id=>{const s=SOURCES.find(s=>s.id===id);return `<a class="resource-row" href="${s.url}" target="_blank" rel="noopener noreferrer"><span class="source-symbol">${s.symbol}</span><div class="row-copy"><h3>${s.name}</h3><p>${s.short}</p></div><span class="row-tag">${s.type}</span>${icon('external')}</a>`;}).join('')}</div></section><section>${section('今日训练灵感','DAILY QUEST')}<div class="daily-card"><div class="daily-top"><span class="eyebrow">LESS GUESSING. MORE LEARNING.</span><span aria-hidden="true">✷</span></div><h3>你失去主动权的那一刻</h3><p>选一场近期败局，停在第一次被迫防守之前。只看当时视野：你漏掉了哪条信息？下一次怎样验证？</p><button class="btn" data-open="scouting">开始这个专项 ${icon('arrow')}</button></div></section></div>${patchStrip()}`;
}
function lessonCard(l){return `<article class="lesson-card"><div class="card-top"><span class="lesson-glyph">${icon(l.icon)}</span><button class="bookmark-btn ${state.saved.includes(l.id)?'is-saved':''}" data-save="${l.id}" aria-label="${state.saved.includes(l.id)?'取消收藏':'收藏'}：${l.title}" aria-pressed="${state.saved.includes(l.id)}">${icon('bookmark')}</button></div><div><span class="mini-tag">${l.tag}</span> <span class="eyebrow" style="font-size:8px;letter-spacing:.5px">${l.map}</span></div><h2>${esc(l.title)}</h2><p class="desc">${l.desc}</p><div class="card-metric">观察指标 <strong>· ${l.metricShort}</strong></div><div class="card-bottom"><button class="read-button" data-open="${l.id}">进入训练卡 →</button><small>${state.complete.includes(l.id)?'✓ 已完成':'EXPERT / '+l.level}</small></div></article>`;}
function renderLessons(mode){
 const isSolo=mode==='solo';
 const lessons=LESSONS.filter(l=>(l.mode===mode||(mode==='team'&&l.alsoTeam))&&(activeFilter==='全部'||l.tag===activeFilter)&&(mapFilter==='全部地图'||l.map.includes(mapFilter)));
 const tags=[...new Set(LESSONS.filter(l=>l.mode===mode||(mode==='team'&&l.alsoTeam)).map(l=>l.tag))];
 return header(isSolo?'THE 1v1 LAB':'THE TEAM TACTICS ROOM',isSolo?'单挑实验室':'群局战术室',isSolo?'已经会执行开局，更要知道何时偏离开局。用信息、兵力与经济的关系，练习局势判断。':'高水平群局的优势，来自正确位置上的共同决策。先对齐兵种、集结点和出击条件，再讨论个人发挥。')+
 (!isSolo?renderTactics():'')+`<div class="toolbar"><div class="filter-chips">${['全部',...tags].map(tag=>`<button class="chip ${activeFilter===tag?'active':''}" data-filter="${tag}">${tag}</button>`).join('')}</div><span class="result-count">${lessons.length} 个训练专题</span></div><div class="filter-section"><label for="map-filter">按地图筛选</label><select id="map-filter">${['全部地图','开放图','封闭图','混合图','游牧','黑森林','Arena','全地图'].map(m=>`<option ${mapFilter===m?'selected':''}>${m}</option>`).join('')}</select><span>训练设计为本站编辑整理 · 原始资料在卡片内</span></div><div class="card-grid">${lessons.length?lessons.map(lessonCard).join(''):'<div class="empty-state"><h2>这个组合暂时没有训练卡</h2><p>切换地图或选择「全部」，继续探索。</p><button class="btn" data-reset-filters>重置筛选</button></div>'}</div><div class="notice"><strong>训练原则：</strong>保持地图、文明、对手强度和版本尽量一致，每次只改变一个决策。站内指标用于对比你自己的训练记录，不代表职业水平的统一门槛。</div>`;
}
const roles={flank:{title:'边家 Flank · 把输出留在场上',text:'在典型开放陆地图的骑弓组合里，边家的远程兵存量决定了正面火力。集结之前，先确保退路与接应。',items:['报告兵数、位置和下一次科技完成时间。','内家骑兵接触前，避免弓兵独自穿过无视野区域。','对面双人压来，优先保兵；支援到达时间决定守或撤。'],callout:'简短口令示例：「双压我，弓后撤，骑到林线接。」'},pocket:{title:'内家 Pocket · 决定交战的形状',text:'你的机动力是一份团队资源。是否能及时合围、拦截增援、保护远程兵，比单独追杀更重要。',items:['出兵前确认边家的弓兵集结点与能否接战。','围住对方远程火力，留出己方远程兵的输出空间。','转向另一侧前，明确原侧守备和对手骑兵位置。'],callout:'简短口令示例：「骑在中线，十秒会合，先抓对方弓。」'},trade:{title:'后期贸易 · 让补给有路可走',text:'安全贸易需要队伍共同保护空间。把贸易投入与军队补给一起规划，避免有市场、有车，却没有安全路线。',items:['按地图形状选择远端市场，检查拥堵与潜在突袭口。','明确谁补墙、谁守路口、谁留机动队。','用录像比较投入后实际黄金收入与前线停产情况。'],callout:'简短口令示例：「贸易线右侧漏口，我补墙，你留一队骑。」'}};
function renderTactics(){const r=roles[role];return `<section class="tactical-panel"><div class="tactical-board"><svg viewBox="0 0 480 270" role="img" aria-label="四对四地图示意图，己方绿色与敌方金色，虚线表示集结路线"><defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="m0 0 10 5L0 10" fill="#7e985d"/></marker></defs><path d="M70 220Q170 70 230 115M165 238Q245 190 230 115M308 239Q250 175 280 155M410 213Q335 80 280 155" stroke="#98ad76" stroke-width="3" stroke-dasharray="7 6" fill="none" marker-end="url(#arr)"/><path d="M80 55Q150 100 230 115M395 48Q350 100 280 155" stroke="#c6ac63" stroke-dasharray="7 6" stroke-width="3" fill="none"/><path d="m225 120 24 28m0-28-24 28" stroke="#b79c55" stroke-width="4"/><g font-family="system-ui" font-size="10" text-anchor="middle">${[[70,211,'F1'],[165,235,'P1'],[308,235,'P2'],[410,211,'F2']].map(([x,y,t],i)=>`<g><rect x="${x-20}" y="${y-20}" width="40" height="31" rx="9" fill="${role==='pocket'?(i===1||i===2?'#416c42':'#9eaf80'):role==='flank'?(i===0||i===3?'#416c42':'#9eaf80'):'#6d8c53'}" stroke="#4e713c"/><path d="M${x-11} ${y-20}v-8h7v5h8v-5h7v8" fill="#bed09d" stroke="#4e713c"/><text x="${x}" y="${y+1}" fill="#fff">${t}</text></g>`).join('')}${[[80,50,'F1'],[175,35,'P1'],[305,35,'P2'],[395,50,'F2']].map(([x,y,t])=>`<rect x="${x-19}" y="${y-14}" width="38" height="29" rx="8" fill="#d9c589" stroke="#b49c5f"/><text x="${x}" y="${y+4}" fill="#756132">${t}</text>`).join('')}<text x="240" y="182" fill="#8b9c74" font-size="9">集结后再交战</text></g><g fill="#b6c793" stroke="#93ab6b"><path d="m25 130 16-28 15 28zM400 135l16-28 15 28zM320 106l16-28 15 28zM134 132l16-28 15 28z"/></g>${role==='trade'?'<path d="M67 244H411" stroke="#e1b851" stroke-width="5" stroke-dasharray="5 5"/><text x="240" y="261" fill="#a78d4c" font-size="9" text-anchor="middle">市场 ↔ 安全贸易路线（示意）</text>':''}</svg><span class="board-caption">4v4 开放陆地图示意 · F 边家 / P 内家 · 非通用阵型</span></div><div class="role-copy"><div class="role-tabs">${[['flank','边家 Flank'],['pocket','内家 Pocket'],['trade','后期贸易']].map(([id,t])=>`<button class="chip ${role===id?'active':''}" data-role="${id}">${t}</button>`).join('')}</div><h2>${r.title}</h2><p>${r.text}</p><ul>${r.items.map(t=>`<li>${t}</li>`).join('')}</ul><div class="role-callout">${r.callout}</div></div></section>`;}
function filterSources(){
 const sources=SOURCES.filter(s=>(sourceFilter==='全部'||s.type===sourceFilter)&&(!savedOnly||state.saved.includes('s:'+s.id))&&`${s.name} ${s.desc} ${s.author} ${s.type}`.toLowerCase().includes(sourceQuery.toLowerCase())&&(sourceYear==='全部年份'||sourceYear==='未标日期'&&!s.publishedAt||sourceYear==='2024 及以前'&&s.publishedAt&&s.publishedAt<'2025'||s.publishedAt&&s.publishedAt.startsWith(sourceYear)));
 if(sourceSort==='newest')sources.sort((a,b)=>(b.publishedAt||'').localeCompare(a.publishedAt||''));
 return sources;
}
function renderLibrary(){
 const sources=filterSources();
 return header('THE EXPERT LIBRARY','真正值得反复看的资料。','近期职业教学与经典决策资料放在一起。按真实发布日期找新内容，按主题找值得长期练习的方法。')+`<div class="toolbar"><div class="filter-chips">${['全部',...new Set(SOURCES.map(s=>s.type))].map(t=>`<button class="chip ${sourceFilter===t?'active':''}" data-source-filter="${t}">${t}</button>`).join('')}</div></div><div class="toolbar"><input class="search-inline" id="source-search" type="search" aria-label="搜索资料" placeholder="搜索选手、工具或主题…" value="${esc(sourceQuery)}"><label class="saved-only"><input type="checkbox" id="saved-only" ${savedOnly?'checked':''}>仅看收藏的资料</label><span class="result-count">${sources.length} 个来源</span></div><div class="filter-section"><label for="source-year">发布日期</label><select id="source-year">${['全部年份','2026','2025','2024 及以前','未标日期'].map(y=>`<option ${sourceYear===y?'selected':''}>${y}</option>`).join('')}</select><label for="source-sort">排序</label><select id="source-sort"><option value="newest" ${sourceSort==='newest'?'selected':''}>最新发布优先</option><option value="curated" ${sourceSort==='curated'?'selected':''}>精选顺序</option></select><span>发布日期与核验日期分别标注</span></div>${savedOnly&&state.saved.some(id=>!id.startsWith('s:'))?`<div class="section-title"><h2>收藏的训练卡</h2></div><div class="card-grid">${LESSONS.filter(l=>state.saved.includes(l.id)).map(lessonCard).join('')}</div><div class="section-title"><h2>收藏的资料</h2></div>`:''}<div class="source-grid" id="source-grid">${sourceCards(sources)}</div><div class="notice"><strong>阅读提示：</strong>标注「会员」的教程以原作者公开介绍为索引，本站不转载付费正文。职业实战用于分析决策，不等同于结构化攻略。旧版数值请结合当前正式版验证。</div>${patchStrip()}`;
}
function sourceCards(sources){return sources.length?sources.map(s=>`<article class="source-card"><span class="source-symbol">${s.symbol}</span><div class="source-copy"><div class="source-tags"><span class="mini-tag">${s.type}</span>${s.publishedAt?.startsWith('2026')?'<span class="mini-tag recent-tag">2026 新资料</span>':''}${s.access==='会员'?'<span class="mini-tag paid-tag">会员</span>':''}</div><h2>${esc(s.name)}</h2><div class="publish-date">${s.publishedAt?'发布 '+esc(s.publishedAt):'未标发布日期 / 持续维护'}${s.maps?' · '+esc(s.maps):''}</div><p>${esc(s.desc)}</p><a class="source-link" href="${s.url}" target="_blank" rel="noopener noreferrer">打开原始资料 ↗</a><div class="source-meta">${esc(s.author)} · ${s.language} · 核验 2026.11.16${s.caution?' · '+esc(s.caution):''}</div></div><button class="bookmark-btn ${state.saved.includes('s:'+s.id)?'is-saved':''}" data-save="s:${s.id}" aria-label="收藏 ${esc(s.name)}" aria-pressed="${state.saved.includes('s:'+s.id)}">${icon('bookmark')}</button></article>`).join(''):'<div class="empty-state"><h2>还没有匹配的资料</h2><p>试试其他关键词、年份，或取消「仅看收藏」。</p></div>';}
function renderRecentResources(){
 const sources=SOURCES.filter(s=>s.publishedAt&&s.publishedAt.startsWith('2026')&&s.id!=='patch').sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)).slice(0,3);
 if(!sources.length)return '';
 return section('新鲜出炉的研习材料','FRESH FROM THE FRONT','更多近期资料','#library')+`<div class="recent-resource-grid">${sources.map(s=>`<a class="recent-resource" href="${s.url}" target="_blank" rel="noopener noreferrer"><div><span class="mini-tag recent-tag">${esc(s.publishedAt)}</span><span class="recent-author">${esc(s.author)}${s.access==='会员'?' · 会员':''}</span></div><h3>${esc(s.name)} ↗</h3><p>${esc(s.short||s.desc)}</p></a>`).join('')}</div>`;
}
const reviewChecks=[['信息','只保留当时可见的信息。先写预测，再开全图验证。'],['经济','检查村民存量、TC 空闲与闲置资源，区分主动投资和执行失误。'],['军力','把兵数、兵种、科技和实际到场时间放在同一张时间线上。'],['转折','找出最早可修正的决策，避免把最终团灭当成全部原因。'],['验证','写一个下一局能观察到的行为，下一场只改这一点。']];
function renderReview(){return header('THE REPLAY DESK','把一场录像，变成下一场优势。','先在 CaptureAge 或游戏内看录像，再把证据记在这里。笔记与检查项保存在当前浏览器，可导出为 Markdown。')+`<div class="review-layout"><section class="panel"><h2>一局，只解决一个问题。</h2><p>从「我打得不好」，走向「在这个信息下，我应该这样做」。</p><form id="review-form"><div class="form-grid"><label class="field">对局标记<input name="match" required maxlength="120" placeholder="例如：Arabia · 骑弓对局 · 11/16"></label><label class="field">模式<select name="mode"><option>1v1 单挑</option><option>TG 群局</option></select></label><label class="field">关键时间（游戏时间）<input name="time" placeholder="例如 18:40" maxlength="30"></label><label class="field">游戏版本<input name="patch" placeholder="188329 或录像中的版本" maxlength="40"></label><label class="field full">当时的信息 → 我的判断<textarea name="evidence" required maxlength="4000" placeholder="我看到了什么？还有哪些信息没确认？我当时为什么这样选？"></textarea></label><label class="field full">可验证的下一步<textarea name="action" required maxlength="4000" placeholder="下一次遇到相似局面，我会在什么条件下做什么？用什么指标检查？"></textarea></label></div><div class="form-actions"><button class="btn primary" type="submit">${icon('check')} 保存这次复盘</button><button class="btn" type="button" id="export-reviews">${icon('download')} 导出全部笔记</button><span class="save-label">仅保存在此浏览器</span></div></form></section><aside class="panel"><h2>复盘的五个镜头</h2><p>可重复使用的检查项；不计入训练进度。</p><div class="review-checks">${reviewChecks.map(([t,d],i)=>`<label class="check-row"><input type="checkbox" class="review-check" data-index="${i}" ${state.reviewChecks?.includes(i)?'checked':''}><span><strong>0${i+1} / ${t}</strong><small>${d}</small></span></label>`).join('')}</div><a class="btn" href="https://captureage.com/captureage" target="_blank" rel="noopener noreferrer">打开 CaptureAge ${icon('external')}</a><p class="editor-note">此页面是手动复盘笔记工具，不解析 .aoe2record 文件。不同统计功能是否可用，以 CaptureAge 当前方案为准。</p></aside></div><section class="review-log">${section('我的复盘档案','YOUR REPLAY NOTES')}<div>${state.reviews.length?state.reviews.slice().reverse().map(r=>`<article class="log-entry"><h3>${esc(r.match)} <span class="mini-tag">${esc(r.mode)}</span></h3><small>${esc(r.date)} · ${esc(r.time||'未标记时间')} · 版本 ${esc(r.patch||'未标记')}</small><p><strong>证据与判断：</strong>${esc(r.evidence)}</p><p><strong>下一次：</strong>${esc(r.action)}</p></article>`).join(''):'<div class="empty-state"><h2>你的第一份复盘，从这里开始。</h2><p>记录一个有证据的判断，下一局回来验证。</p></div>'}</div></section>`;}
const mixedWeeks=[{title:'建立基线，找到真正短板',desc:'固定地图与文明，先观察，再改变。',tasks:[['完成一次有视野限制的侦察复盘','scouting'],['记录三局的首个兵力窗口','timing'],['把一个反复出现的失误写入复盘档案','review']]},{title:'把经济转化为有效兵力',desc:'练科技、生产与到场时间的同步。',tasks:[['对比两种经济投入的回报条件','economy'],['用同一局势练三次接战与撤退','micro'],['复盘一次防守转反击的时机','defense']]},{title:'从个人判断到共同决策',desc:'固定队友、位置和简短的沟通协议。',tasks:[['与队友约定集结点和出击条件','tg-sync'],['交换一次边家与内家视角复盘','tg-review'],['演练一次转边或保贸易线','tg-trade']]},{title:'模拟比赛，验证迁移',desc:'用相近的练习条件，比较自己的变化。',tasks:[['用侦察证据修正赛前计划','adaptation'],['做一次地图池与文明 BP 准备','draft'],['对比第一周，写下一个已验证的改进','review']]}];
function getWeeks(){
 if(currentUser.focus==='mixed')return mixedWeeks;
 if(currentUser.focus==='solo')return [
  {title:'读局与基线',desc:'固定地图，建立可对照的判断记录。',tasks:[['完成战争迷雾下的侦察练习','scouting'],['比较三个封建投资分岔点','adaptation'],['保存一份有证据的复盘笔记','review']]},
  {title:'经济与科技窗口',desc:'让资源流和可用战力同步。',tasks:[['用生产需求倒推经济配比','economy'],['复盘升级前后六十秒的军队位置','timing'],['测试最低可行防守方案','defense']]},
  {title:'控图与多线',desc:'提高优势兑现能力，减少注意力浪费。',tasks:[['标记一局领先后的资源控制图','mapcontrol'],['比较微操收益与宏观断档','micro'],['设计可持续的帝王补兵结构','lategame']]},
  {title:'备赛与验证',desc:'把训练迁移到不同对手。',tasks:[['完成一张地图的双方案赛前简报','draft'],['跟踪一个规则在五局中的执行','reflection'],['对比第一周并保存改进证据','review']]}
 ];
 return [
  {title:'角色与会合',desc:'固定队友，形成共同语言。',tasks:[['约定双军会合点与撤退方向','tg-sync'],['分别从边家与内家视角看首波交战','tg-review'],['记录一段团队决策证据','review']]},
  {title:'弱侧防守',desc:'让守、撤和反压拥有共同依据。',tasks:[['演练第一次双压预警口令','tg-defense'],['比较救援抵达与弱侧可撑时间','tg-defense'],['复盘升级与到场战力的时差','tg-timing']]},
  {title:'转线与贸易',desc:'把空间优势转化为稳定补给。',tasks:[['比较转边路线与原侧暴露成本','tg-switch'],['测试两条贸易线的净收益','tg-trade'],['和队友约定市场与贸易保护分工','tg-trade']]},
  {title:'固定队训练赛',desc:'一次只修正一条共同规则。',tasks:[['赛前明确地图、文明与备选分工','tg-review'],['选一场胜局检验沟通协议','tg-review'],['对比第一周并保存团队改进证据','review']]}
 ];
}
function openProfiles(){
 $('#profile-content').innerHTML=`<div class="dialog-head"><button class="icon-button dialog-close" data-close-profiles aria-label="关闭用户切换">×</button><div class="eyebrow">YOUR OWN TRAINING JOURNEY</div><h2>今天，谁来研习？</h2><p>无需密码，选择用户就能继续自己的训练。</p></div><div class="profile-body"><div class="profile-list">${accountStore.users.map(u=>`<button class="profile-option ${u.id===currentUser.id?'selected':''}" data-switch-user="${esc(u.id)}"><span class="profile-avatar">${esc(Array.from(u.name)[0])}</span><span><strong>${esc(u.name)}</strong><small>${focusLabels[u.focus]} · ${u.state.checks.length}/12 项 · ${u.state.reviews.length} 份复盘</small></span><span class="profile-status">${u.id===currentUser.id?'使用中':'切换 →'}</span></button>`).join('')}</div><form id="create-user-form"><h3>建立一个新用户</h3><div class="profile-form-row"><label class="field">昵称<input name="name" required maxlength="20" placeholder="你的训练昵称" autocomplete="off"></label><label class="field">训练方向<select name="focus"><option value="solo">单挑专项 · 1v1</option><option value="team">群局专项 · TG</option><option value="mixed">综合进阶</option></select></label></div><button class="btn primary" type="submit">${icon('users')} 创建并进入训练</button><p id="profile-error" role="alert" class="profile-error"></p></form><button class="btn cloud-profile-entry" type="button" id="profile-cloud-entry">${icon('refresh')} Google Drive 跨设备同步</button><div class="profile-storage-note">${icon('shield')}<span>每个用户的计划、收藏和笔记分别保存。连接 Google Drive 后可跨设备同步；使用同一同步配置的内测成员可直接切换所有用户。</span></div></div>`;
 if(!$('#profile-dialog').open)$('#profile-dialog').showModal();
}
function createUser(form){
 const name=String(form.get('name')||'').trim();
 if(!name||name.length>20){$('#profile-error').textContent='请输入 1–20 个字符的昵称。';return;}
 if(accountStore.users.some(u=>u.name.toLocaleLowerCase()===name.toLocaleLowerCase())){$('#profile-error').textContent='这个昵称已经存在，可以直接切换到该用户。';return;}
 const focus=['solo','team','mixed'].includes(form.get('focus'))?form.get('focus'):'mixed';
 const id=typeof crypto.randomUUID==='function'?crypto.randomUUID():'user-'+Date.now()+'-'+Math.random().toString(36).slice(2,8);
 accountStore.users.push({id,name,focus,createdAt:new Date().toISOString(),state:emptyState()});
 if(window.AoeCloud)window.AoeCloud.changed(id);switchUser(id).then(()=>toast(`已为${name}建立独立训练档案`));
}
let switchAttempt=0;
async function switchUser(id){
 const attempt=++switchAttempt;if(window.AoeCloud&&!await window.AoeCloud.beforeSwitch(id))return;if(attempt!==switchAttempt)return;
 const next=accountStore.users.find(u=>u.id===id);if(!next)return;
 persist(false);if($('#lesson-dialog').open)$('#lesson-dialog').close();if($('#search-dialog').open)$('#search-dialog').close();
 currentUser=next;state=currentUser.state;accountStore.activeUserId=id;persist(false);
 savedOnly=false;sourceQuery='';sourceYear='全部年份';activeFilter='全部';mapFilter='全部地图';
 $('#profile-dialog').close();render();toast(`已切换到${currentUser.name} · ${focusLabels[currentUser.focus]}`);
}
function renderPlan(){const weeks=getWeeks();let n=state.checks.length;return header('YOUR DELIBERATE PRACTICE','变强，是一组可以重复的行动。','四周训练框架供高水平玩家自选安排。先完成一次有质量的验证，再增加对局量。时间和局数由你的比赛日程决定。')+`<section class="plan-overview"><div><h2>${esc(currentUser.name)}的${focusLabels[currentUser.focus]}计划</h2><p>12 项训练 · 可以按短板调整顺序 · 浏览器本地保存</p></div><div class="plan-progress"><strong>${Math.round(n/12*100)}%</strong><div class="progress-track"><span style="width:${n/12*100}%"></span></div>${n} / 12 项已完成</div></section><div class="week-grid">${weeks.map((w,i)=>`<section class="week-card"><div class="eyebrow">WEEK / 0${i+1}</div><h2>${w.title}</h2><p>${w.desc}</p>${w.tasks.map(([title,id],j)=>{const key=`${i}-${j}`;return `<label class="check-row"><input type="checkbox" data-plan-check="${key}" ${state.checks.includes(key)?'checked':''}><span><strong>${title}</strong><small>${id==='review'?'<a href="#review">打开复盘台 ↗</a>':`<button class="read-button text-link" style="border:0;background:transparent;padding:0" data-open="${id}" type="button">查看相关训练卡 ↗</button>`}</small></span></label>`;}).join('')}</section>`).join('')}</div><section class="practice-queue">${section('我加入的专项','MY PRACTICE QUEUE')}<div class="panel">${state.queue.length?state.queue.map(id=>{const l=LESSONS.find(l=>l.id===id);if(!l)return '';return `<div class="queue-row"><span>${esc(l.title)} ${state.complete.includes(id)?'<span class="mini-tag">已完成</span>':''}</span><button class="btn small" data-open="${id}">打开训练卡</button><button class="icon-button" data-remove-queue="${id}" aria-label="移除 ${esc(l.title)}">×</button></div>`;}).join(''):'<p>在训练卡中点击「加入我的训练」，建立你自己的专项清单。</p>'}</div></section><div class="notice"><strong>保持反馈循环：</strong>每个训练周期保留相同条件下的录像和判断记录。这里的完成度表示练习记录，不是对职业实力的评级。</div>`;}
function render(){currentPage=location.hash.slice(1).split('?')[0]||'home';if(!labels[currentPage])currentPage='home';$('#page-label').textContent=labels[currentPage];document.title=`${labels[currentPage]} · 帝国研习社`;document.querySelectorAll('[data-page]').forEach(a=>{a.classList.toggle('active',a.dataset.page===currentPage);if(a.dataset.page===currentPage)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});$('#main').innerHTML=currentPage==='home'?renderHome():currentPage==='solo'||currentPage==='team'?renderLessons(currentPage):currentPage==='library'?renderLibrary():currentPage==='review'?renderReview():renderPlan();decorate($('#main'));updateSavedCount();}
function openLesson(id){const l=LESSONS.find(l=>l.id===id);if(!l)return;currentLesson=id;const sourceList=l.sources.map(id=>SOURCES.find(s=>s.id===id)).filter(Boolean);$('#lesson-content').innerHTML=`<header class="dialog-head"><button class="icon-button dialog-close" data-close-dialog aria-label="关闭训练卡">×</button><div class="eyebrow">${l.mode==='solo'?'1v1 LAB':'TEAM TACTICS'} / ${l.tag}</div><h2>${esc(l.title)}</h2><p>${esc(l.desc)}</p></header><div class="dialog-body"><section class="dialog-section"><h3><span>01</span> 什么时候用</h3><p>${esc(l.condition)}</p></section><section class="dialog-section"><h3><span>02</span> 如何判断与执行</h3><ol>${l.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></section><section class="dialog-section"><h3><span>03</span> 刻意练习</h3><p>${esc(l.drill)}</p></section><section class="dialog-section"><h3><span>04</span> 录像里看什么</h3><div class="dialog-metric">${esc(l.metric)}</div></section><section class="dialog-section"><h3><span>05</span> 常见误区与适用边界</h3><p>${esc(l.pitfall)}</p></section><section class="dialog-section dialog-sources"><h3><span>↗</span> 继续深挖 · 原始资料</h3>${sourceList.map(s=>`<a href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.name)} · ${esc(s.author)} ↗</a>`).join('')}</section><div class="dialog-bottom"><button class="btn primary" data-queue="${l.id}">${icon('target')}${state.queue.includes(id)?'已加入我的训练':'加入我的训练'}</button><button class="btn" data-complete="${l.id}">${icon('check')}${state.complete.includes(id)?'已完成 · 点击撤销':'标记本次训练完成'}</button><button class="btn" data-save="${l.id}">${icon('bookmark')}${state.saved.includes(id)?'已收藏':'收藏卡片'}</button></div><p class="editor-note">本卡片为本站基于所列资料设计的训练框架，不是选手原话，也不代表选手对本站的认可。具体数值、文明例外、版本和地图请回到原资料核对。</p></div>`;if(!$('#lesson-dialog').open)$('#lesson-dialog').showModal();}
function toggleSave(id){state.saved=state.saved.includes(id)?state.saved.filter(x=>x!==id):[...state.saved,id];persist();toast(state.saved.includes(id)?'已收藏，稍后继续深挖':'已取消收藏');if($('#lesson-dialog').open)openLesson(currentLesson);else render();}
function openSearch(){if(!$('#search-dialog').open)$('#search-dialog').showModal();$('#global-search').value='';search('');$('#global-search').focus();}
function search(query){const q=query.trim().toLowerCase();const ls=LESSONS.filter(l=>!q||`${l.title} ${l.desc} ${l.tag} ${l.mode==='team'?'群局':'单挑'}`.toLowerCase().includes(q));const ss=SOURCES.filter(s=>q&&`${s.name} ${s.desc}`.toLowerCase().includes(q));$('#search-results').innerHTML=ls.slice(0,q?15:5).map(l=>`<button class="search-hit" data-search-open="${l.id}"><strong>${esc(l.title)}</strong><small>${l.mode==='team'?'群局战术室':'单挑实验室'} · ${l.tag}</small></button>`).join('')+ss.map(s=>`<a class="search-hit" href="${s.url}" target="_blank" rel="noopener noreferrer"><strong>${esc(s.name)} ↗</strong><small>${s.type} · ${esc(s.short)}</small></a>`).join('')+(!ls.length&&!ss.length?'<div class="empty-state"><p>暂无匹配。试试「经济」「协同」「Hera」。</p></div>':'');}
function download(filename,text,type='text/markdown;charset=utf-8'){const a=document.createElement('a');const url=URL.createObjectURL(new Blob([text],{type}));a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
document.addEventListener('click',e=>{
 const t=e.target.closest('button,a');if(!t)return;
 if(t.id==='profile-cloud-entry'){if(window.AoeCloud){$('#profile-dialog').close();window.AoeCloud.open();}return;}
 if(t.dataset.switchUser){switchUser(t.dataset.switchUser);return;}
 if(t.hasAttribute('data-close-profiles'))$('#profile-dialog').close();
 if(t.classList.contains('skip-link')){e.preventDefault();$('#main').focus();return;}
 if(t.dataset.open){e.preventDefault();openLesson(t.dataset.open);}
 if(t.dataset.save)toggleSave(t.dataset.save);
 if(t.dataset.filter){activeFilter=t.dataset.filter;render();}
 if(t.dataset.sourceFilter){sourceFilter=t.dataset.sourceFilter;render();}
 if(t.dataset.role){role=t.dataset.role;render();}
 if(t.hasAttribute('data-reset-filters')){activeFilter='全部';mapFilter='全部地图';render();}
 if(t.hasAttribute('data-close-dialog'))$('#lesson-dialog').close();
 if(t.dataset.searchOpen){$('#search-dialog').close();openLesson(t.dataset.searchOpen);}
 if(t.dataset.queue){const id=t.dataset.queue;if(!state.queue.includes(id)){state.queue.push(id);persist();toast('已加入「我的训练计划」');openLesson(id);}else toast('这张卡片已在训练清单中');}
 if(t.dataset.complete){const id=t.dataset.complete;state.complete=state.complete.includes(id)?state.complete.filter(x=>x!==id):[...state.complete,id];persist();openLesson(id);toast(state.complete.includes(id)?'已记录这次训练':'已撤销完成记录');}
 if(t.dataset.removeQueue){state.queue=state.queue.filter(id=>id!==t.dataset.removeQueue);persist();render();toast('已从专项清单移除');}
 if(t.id==='export-reviews'){if(!state.reviews.length)return toast('先保存一条复盘笔记，再导出');download('帝国研习社-复盘笔记.md','# 帝国研习社 · 复盘档案\n\n'+state.reviews.map(r=>`## ${r.match}\n\n- 日期：${r.date}\n- 模式：${r.mode}\n- 游戏时间：${r.time||'未填写'}\n- 版本：${r.patch||'未填写'}\n\n### 证据与判断\n\n${r.evidence}\n\n### 下一次行动\n\n${r.action}\n`).join('\n---\n\n'));toast('笔记已导出');}
 if(t.closest('#nav')){$('#sidebar').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}
});
document.addEventListener('change',e=>{const t=e.target;if(t.id==='source-year'){sourceYear=t.value;render();}if(t.id==='source-sort'){sourceSort=t.value;render();}if(t.id==='map-filter'){mapFilter=t.value;render();}if(t.id==='saved-only'){savedOnly=t.checked;render();}if(t.dataset.planCheck){const id=t.dataset.planCheck;state.checks=t.checked?[...new Set([...state.checks,id])]:state.checks.filter(x=>x!==id);persist();const scroll=window.scrollY;render();window.scrollTo(0,scroll);}if(t.classList.contains('review-check')){state.reviewChecks=Array.from(document.querySelectorAll('.review-check:checked')).map(el=>Number(el.dataset.index));persist();}});
document.addEventListener('input',e=>{if(e.target.id==='global-search')search(e.target.value);if(e.target.id==='source-search'){sourceQuery=e.target.value;const ss=filterSources();$('#source-grid').innerHTML=sourceCards(ss);$('.toolbar .result-count').textContent=`${ss.length} 个来源`;}});
document.addEventListener('submit',e=>{if(e.target.id==='create-user-form'){e.preventDefault();createUser(new FormData(e.target));return;}if(e.target.id!=='review-form')return;e.preventDefault();const f=new FormData(e.target);const match=String(f.get('match')).trim(),evidence=String(f.get('evidence')).trim(),action=String(f.get('action')).trim();if(!match||!evidence||!action)return toast('请填写对局标记、证据和下一步行动');state.reviews.push({id:typeof crypto.randomUUID==='function'?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2),date:new Date().toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'}),match,evidence,action,mode:f.get('mode'),time:f.get('time'),patch:f.get('patch')});persist();render();toast('这次复盘已保存到浏览器');});
$('#profile-trigger').addEventListener('click',openProfiles);
$('#search-trigger').addEventListener('click',openSearch);
$('#saved-trigger').addEventListener('click',()=>{savedOnly=true;sourceQuery='';sourceFilter='全部';sourceYear='全部年份';location.hash='library';if(currentPage==='library')render();toast('正在显示收藏的训练卡与资料');});
$('#menu-toggle').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('#lesson-dialog').open&&!$('#search-dialog').open&&!$('#profile-dialog').open){e.preventDefault();openSearch();}});
window.addEventListener('hashchange',()=>{activeFilter='全部';mapFilter='全部地图';render();window.scrollTo(0,0);});
$('#lesson-dialog').addEventListener('close',()=>render());
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
decorate();persist(false);render();
