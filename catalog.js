/* Editorial navigation. Dates describe source verification, not a live game feed. */
const SITE_META = { updatedAt: '2026-11-17', versionReference: '188329' };
const TOPICS = ['读局决策','开局执行','经济转型','交战控图','团队协同','地图专项','机制实验','录像复盘','备赛 BP','版本更新'];
const CURRICULA = [
  { id:'read-the-game', title:'让每次侦察，都改变下一步', mode:'solo', icon:'search', topic:'读局决策', desc:'练习把视野中的证据转成两个候选判断，再用下一次侦察区分它们。', question:'哪些新信息，足以让你停止原计划？', sources:['hera','f1re-attack-checklist','f1re-scout-pressure'], lessons:['scouting','attack-army-information','adaptation'], output:'留下一份「已知 → 未知 → 侦察目标 → 行动」的决策记录。' },
  { id:'economy-transition', title:'把资源，变成及时到场的军队', mode:'solo', icon:'coins', topic:'经济转型', desc:'从持续生产预算入手，处理加 TC、科技投入和转兵过渡期之间的冲突。', question:'新军成型前，靠什么守住经济和空间？', sources:['f1re-tc-decision','survivalist','tree'], lessons:['tc-investment-gate','economy','new-solo-transition'], output:'完成一张下一阶段的资源预算表，并用一次录像核对断兵点。' },
  { id:'team-synchrony', title:'从各自出兵，到共同接战', mode:'team', icon:'users', topic:'团队协同', desc:'把边家和内家的兵量、升级、位置、到达时间整理成同一条进攻条件。', question:'两军还没会合时，谁应该退，谁应该接？', sources:['hera-2v2','viper-nations','tg-sotl-trade-tests-20210916'], lessons:['tg-sync','tg-defense','tg-trade-controlled-test-20261117'], output:'和固定队友约定一条包含触发条件、口令、行动和退出条件的规则。' },
  { id:'closed-maps', title:'封闭图：给安全和空间定价', mode:'mixed', icon:'castle', topic:'地图专项', desc:'分别研究 Arena 的出门权、圣物预算，以及黑森林／RF 的突破和前置止损。', question:'争地图的投入，是否挤掉了更有价值的成型窗口？', sources:['tg-hera-bf-guide-20230716','tg-rf6-sensar-20260812','map-sotl-conversions-20260508'], lessons:['map-arena-space','tg-rf-coverage-20261117','map-arena-conversion-risk-20261117'], output:'为一个相同出生点比较两套资源分配，记录可用经济、军队和通道。' },
  { id:'nomad-hybrid', title:'游牧与混合图：计划随信息更新', mode:'mixed', icon:'map', topic:'地图专项', desc:'从 TC 选址、捕鱼安全和水陆预算，练习开局之后的转案与止损。', question:'下一轮水军投资，还能保护多少实际采集？', sources:['f1re-nomad-20261020','tg-tatoh-nomad-20260804','map-sotl-naval-20260303','official-naval-169123'], lessons:['map-nomad-location','map-hybrid-budget'], output:'为五个出生点写选址理由、已知缺陷和触发改变计划的信息。' },
  { id:'prepare-review', title:'把训练，带进下一场比赛', mode:'mixed', icon:'play', topic:'备赛 BP', desc:'用可比的录像准备地图和文明备选，每轮复盘只验证一个可重复的决策。', question:'你改进的是决策过程，还是只记住了上一局的结果？', sources:['prep-league-handbook-2026','prep-aoe2cm-author-docs','survivalist-reset-drills','prep-hera-garrison-ama-2025'], lessons:['prep-draft-backups-20261117','saved-scenario-repetitions','reflection'], output:'整理一页赛前简报，再用一场胜局和一场败局验证同一条规则。' }
];

function creatorName(author) {
  const names = [['hera','Hera'],['theviper','TheViper'],['survivalist','Survivalist'],['f1re','F1Re'],['daut','DauT'],['liereyy','Liereyy'],['tatoh','TaToH'],['spirit','Spirit Of The Law'],['captureage','CaptureAge'],['siege engineers','Siege Engineers'],['aoe2 insights','AoE2 Insights']];
  const text = author.toLowerCase();
  for (const [needle,name] of names) if (text.includes(needle)) return name;
  if (/world|age de team|age of empires/.test(text)) return '官方';
  return author;
}

for (const source of SOURCES) {
  source.creator ||= creatorName(source.author || '原作者');
  source.verifiedAt ||= '2026-11-16';
  source.evidence ||= source.url.includes('youtube.com') ? '标题与公开说明' : source.access === '会员' ? '公开介绍，会员正文未读' : '原始页面信息';
  const text = `${source.name} ${source.desc} ${source.short} ${source.maps || ''} ${(source.keywords || []).join(' ')}`;
  if (!Array.isArray(source.modes)) {
    source.modes = source.mode === 'mixed' ? ['solo','team'] : source.mode ? [source.mode] : /2v2|4v4|群局|团队|贸易|Black Forest|Rage Forest|黑森林|Nations Cup/.test(text) ? ['team'] : ['solo','team'];
  }
  if (!Array.isArray(source.mapTags)) {
    const maps = [];
    if (/Arabia|开放|斥候|剑士快攻/.test(text)) maps.push('开放图');
    if (/Arena|封闭|Black Forest|Rage Forest|黑森林|Amazon Tunnel/.test(text)) maps.push('封闭图');
    if (/Nomad|African Clearing|游牧/.test(text)) maps.push('游牧');
    if (/Hybrid|Water|混合|海战|海图|Baltic|Bog Islands/.test(text)) maps.push('混合图');
    source.mapTags = maps.length ? maps : ['全地图'];
  }
  if (!Array.isArray(source.topicTags)) {
    const topics = [];
    for (const [re,topic] of [[/侦察|读局|计划|2200|2900|决策|敌军位置/,'读局决策'],[/开局|速城|斥候|剑士|小墙/,'开局执行'],[/经济|贸易|转型|持续出兵|TC|机会成本/,'经济转型'],[/进攻|控图|交战|攻城|微操|升级|反压/,'交战控图'],[/团队|群局|协同|4v4|2v2|3v3|Nations Cup|RF6/,'团队协同'],[/Nomad|Arena|地图|混合|黑森林|游牧|Rage Forest/,'地图专项'],[/机制|数据|实验|计算器|测试|练习|科技|铁匠铺/,'机制实验'],[/录像|复盘|CaptureAge|时间轴|闲置|学员/,'录像复盘'],[/赛事|对手|档案|备赛|BP|draft|Draft/,'备赛 BP'],[/补丁|Update|重做|版本更新|预览/,'版本更新']]) if (re.test(text)) topics.push(topic);
    source.topicTags = topics.length ? [...new Set(topics)] : ['读局决策'];
  }
}
