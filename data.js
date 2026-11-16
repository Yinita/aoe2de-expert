/* Sources verified through 2026-11-17. Publication dates differ from verification dates. Training designs are editorial synthesis. */
const SOURCES = [
  {
    "id": "patch",
    "name": "官方正式版 · Update 188329",
    "author": "World’s Edge / Age DE Team",
    "url": "https://www.ageofempires.com/news/age-of-empires-ii-definitive-edition-update-188329/",
    "type": "官方资料",
    "desc": "核查单位、文明和系统改动的第一入口。先确认正式服版本，再决定旧录像与旧攻略是否仍适用。",
    "short": "版本核验",
    "language": "英文 / 游戏术语",
    "symbol": "DE",
    "caution": "",
    "publishedAt": "2026-10-27",
    "access": "公开"
  },
  {
    "id": "tree",
    "name": "AoE2 Tech Tree · 文明与单位数据",
    "author": "Siege Engineers",
    "url": "https://aoe2techtree.net/",
    "type": "专业工具",
    "desc": "网页显示适配 DE 188329，并提供单位成本、HP 与高级数据。适合赛前核查科技缺口、兵种转型成本。",
    "short": "对局准备 / 科技与护甲核查",
    "language": "英文 / 游戏术语",
    "symbol": "TT",
    "caution": "",
    "publishedAt": null,
    "access": "公开"
  },
  {
    "id": "hera",
    "name": "Hera · 2200 分段读局教练课",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.youtube.com/watch?v=NBskNRz_zlU",
    "type": "职业教学",
    "desc": "Hera 本人频道的高分段读局与计划教学。用于研究决策结构；视频版本较旧，文明和单位数值需按当前科技树复核。",
    "short": "信息 → 判断 → 下一步计划",
    "language": "英文 / 游戏术语",
    "symbol": "H",
    "caution": "历史教学 · 数值需复核",
    "publishedAt": "2024-02-23",
    "access": "公开"
  },
  {
    "id": "viper",
    "name": "TheViper · 30 条进阶细节",
    "author": "TheViper",
    "url": "https://www.youtube.com/watch?v=7IHedKtcSW4",
    "type": "职业教学",
    "desc": "本人频道教学，含控制编队、经济升级、热键、僧侣转换等章节。仅保留仍通用的操作原则；海战与特定单位旧数值不直接套用。",
    "short": "细节核查 / 操作习惯",
    "language": "英文 / 游戏术语",
    "symbol": "V",
    "caution": "历史教学 · 数值需复核",
    "publishedAt": "2021-07-22",
    "access": "公开"
  },
  {
    "id": "survivalist",
    "name": "Survivalist · 持续出兵经济计算器",
    "author": "Survivalist",
    "url": "https://aoe2-de-tools.herokuapp.com/villagers-required/",
    "type": "机制与训练",
    "desc": "由 Survivalist 制作的持续出兵经济计算器。用来估算兵营需求，再用实际录像修正走路、拥挤、被骚扰和文明加成带来的误差。",
    "short": "生产建筑 → 资源流 → 经济配比",
    "language": "英文 / 游戏术语",
    "symbol": "S",
    "caution": "",
    "publishedAt": null,
    "access": "公开"
  },
  {
    "id": "capture",
    "name": "CaptureAge · 录像分析工作台",
    "author": "CaptureAge",
    "url": "https://captureage.com/cade",
    "type": "专业工具",
    "desc": "针对 DE 的观战与录像分析工具，支持时间轴回跳。用它逐段还原资源、兵力和决策发生的顺序。",
    "short": "逐帧复盘 / 比较关键时点",
    "language": "英文 / 游戏术语",
    "symbol": "CA",
    "caution": "含付费功能",
    "publishedAt": null,
    "access": "公开"
  },
  {
    "id": "insights",
    "name": "AoE2 Insights · 选手与对局档案",
    "author": "AoE2 Insights",
    "url": "https://www.aoe2insights.com/",
    "type": "专业工具",
    "desc": "玩家档案、比赛记录、排行榜和录像分析入口。先按地图、文明、对手筛出可比样本，再挑具体录像研究。",
    "short": "选手样本 / 对手准备",
    "language": "英文 / 游戏术语",
    "symbol": "AI",
    "caution": "",
    "publishedAt": null,
    "access": "公开"
  },
  {
    "id": "insights-pro",
    "name": "AoE2 Insights Pro · 深度指标",
    "author": "AoE2 Insights",
    "url": "https://www.aoe2insights.com/pro/",
    "type": "专业工具",
    "desc": "官方产品页列出 TC 空闲、闲置村民、库存、采集效率、卡人口、战斗资源损失与时间轴等指标。部分功能需要 Pro；数据应结合原始录像解释。",
    "short": "定位损失时段 / 验证训练结果",
    "language": "英文 / 游戏术语",
    "symbol": "AI+",
    "caution": "含付费功能",
    "publishedAt": null,
    "access": "公开"
  },
  {
    "id": "fundamentals",
    "name": "Survivalist · 基本功审计",
    "author": "Survivalist",
    "url": "https://www.youtube.com/watch?v=gG255lCtNdM",
    "type": "机制与训练",
    "desc": "本人频道基础体系视频，含侦察、墙、热键与编队章节，标注提供简体与繁体字幕。高水平玩家可用作基础动作自检；不是当前版本开局表。",
    "short": "基础动作审计",
    "language": "英文 / 游戏术语",
    "symbol": "S",
    "caution": "历史教学 · 数值需复核",
    "publishedAt": "2020-08-18",
    "access": "公开"
  },
  {
    "id": "hera-2v2",
    "name": "Hera · 2v2 团队协同完整教学",
    "author": "Hera",
    "url": "https://www.youtube.com/watch?v=aOV2cAWxPKE",
    "type": "职业教学",
    "desc": "团队基本协同的原始教学入口。以开放陆地图弓兵与骑兵协作为学习案例；不能自动外推到 Arena、黑森林、游牧或混合图。",
    "short": "职业选手原始教学",
    "language": "英文 / 游戏术语",
    "symbol": "H",
    "caution": "历史教学 · 数值需复核",
    "publishedAt": "2022-06",
    "access": "公开"
  },
  {
    "id": "viper-nations",
    "name": "TheViper · Nations Cup 4v4 第一视角",
    "author": "TheViper",
    "url": "https://www.youtube.com/watch?v=NigRRQK8Ayg",
    "type": "职业实战",
    "desc": "挪威对法国的 4v4 表演赛第一视角。适合逐段标记队伍集结、分兵和资源调度；本页未声称视频包含完整语音。",
    "short": "职业选手第一视角实战",
    "language": "英文 / 游戏术语",
    "symbol": "V",
    "caution": "历史教学 · 数值需复核",
    "publishedAt": "2023-02-03",
    "access": "公开"
  },
  {
    "id": "sotl-trade",
    "name": "Spirit Of The Law · 贸易投资分析",
    "author": "Spirit Of The Law",
    "url": "https://www.youtube.com/watch?v=z9d0WF9y4Us",
    "type": "机制与训练",
    "desc": "视频章节包括贸易金收入对比、封建贸易回本与 Caravan。用于理解投资机会成本；2025 年机制讨论不能当作当前版本精确数值。",
    "short": "作者原始机制分析",
    "language": "英文 / 游戏术语",
    "symbol": "SotL",
    "caution": "历史教学 · 数值需复核",
    "publishedAt": "2025-09-21",
    "access": "公开"
  },
  {
    "id": "captureage-pro",
    "name": "CaptureAge · 免费与 Pro 功能",
    "author": "CaptureAge",
    "url": "https://captureage.com/cade/docs/cade-latest/pro",
    "type": "专业工具",
    "desc": "免费版提供基本统计与录像浏览；Pro 包括经济效率、有效 APM、倒放和书签等。页面明确标注权限，避免把付费能力写成免费能力。",
    "short": "工具官方文档",
    "language": "英文 / 游戏术语",
    "symbol": "CA+",
    "caution": "含付费功能",
    "publishedAt": null,
    "access": "公开"
  },
  {
    "id": "captureage-timeline",
    "name": "CaptureAge · 时间轴操作文档",
    "author": "CaptureAge",
    "url": "https://captureage.com/cade/docs/cade-latest/time-controls",
    "type": "专业工具",
    "desc": "回放时间轴与控制说明。支持对团战前后的决策反复核查，部分跳转、倒放和标记能力需 Pro。",
    "short": "工具官方文档",
    "language": "英文 / 游戏术语",
    "symbol": "CA",
    "caution": "含付费功能",
    "publishedAt": null,
    "access": "公开"
  },
  {
    "id": "captureage-idle",
    "name": "CaptureAge · 闲置数据的统计口径",
    "author": "CaptureAge",
    "url": "https://captureage.com/cade/docs/cade-latest/faq",
    "type": "专业工具",
    "desc": "闲置村民和 TC 计时是聚合值；多个单位同时闲置时，计数增速可超过游戏时间。使用总空闲数据必须保持单位数量和观察区间可比。",
    "short": "工具官方文档",
    "language": "英文 / 游戏术语",
    "symbol": "CA",
    "caution": "",
    "publishedAt": null,
    "access": "公开"
  },
  {
    "id": "worldcup-official",
    "name": "官方赛事档案 · 2v2 世界杯 2020",
    "author": "Age of Empires / World's Edge",
    "url": "https://www.ageofempires.com/news/age-of-esports-112020/",
    "type": "官方资料",
    "desc": "官方确认 2v2 世界杯、赛事设置和 T90/Nacho 转播入口，可作为历史高水平 2v2 对照素材的索引。",
    "short": "游戏官方赛事入口",
    "language": "英文 / 游戏术语",
    "symbol": "WC",
    "caution": "历史赛事",
    "publishedAt": "2020-11",
    "access": "公开"
  },
  {
    "id": "new-hera-opening",
    "name": "Hera：如何选择开局策略（2026年10月）",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.patreon.com/heraaoe2/posts/how-to-always-173324444",
    "type": "职业教学",
    "desc": "2026 年 10 月开局选择专题。适合已有熟练开局的玩家，带着文明对位、地图暴露度和第一波目标三个问题阅读。",
    "short": "Arabia · 开放陆图",
    "language": "英文",
    "symbol": "H",
    "caution": "仅核验公开介绍；会员正文未读取。发布早于正式补丁188329两天；战术数值与新文明开局需再核对后续正式补丁。",
    "publishedAt": "2026-10-25",
    "access": "会员",
    "maps": "Arabia / 开放陆图"
  },
  {
    "id": "new-hera-varangians",
    "name": "Hera：瓦良格血统斥候快攻教程",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.patreon.com/heraaoe2/posts/varangians-scout-173110429",
    "type": "职业教学",
    "desc": "新文明血统斥候专题入口。学习时检验血统投资与第一波兵量、持续施压能力的关系；完整人口流程在原作者会员内容中。",
    "short": "开放陆图 · Arabia",
    "language": "英文",
    "symbol": "H",
    "caution": "仅核验公开介绍；会员正文未读取。2026-10-22版本；是否仍适配188329须核查，不能直接套用到其他文明。",
    "publishedAt": "2026-10-22",
    "access": "会员",
    "maps": "开放陆图 / Arabia"
  },
  {
    "id": "new-hera-saxons",
    "name": "Hera：撒克逊直城 Hearth Troop 教程",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.patreon.com/heraaoe2/posts/saxons-fast-173110279",
    "type": "职业教学",
    "desc": "撒克逊直城 Hearth Troop 专题入口。用防守成本、主力成型速度与敌方前置压力评估这条路线。",
    "short": "安全陆图 · 开放陆图需额外防守评估",
    "language": "英文",
    "symbol": "H",
    "caution": "仅核验公开介绍；会员正文未读取。新文明专属；对局地图未由公开页面明确，本站场景属于练习建议。发布日期早于188329。",
    "publishedAt": "2026-10-22",
    "access": "会员",
    "maps": "安全陆图 / 开放陆图需额外防守评估"
  },
  {
    "id": "new-hera-danes",
    "name": "Hera：丹麦剑士快攻教程",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.patreon.com/heraaoe2/posts/danes-man-at-173110128",
    "type": "职业教学",
    "desc": "丹麦剑士快攻专题入口。对照自己的第一波到达、可攻击资源与后续转兵准备，形成版本适配的开局笔记。",
    "short": "开放陆图 · Arabia",
    "language": "英文",
    "symbol": "H",
    "caution": "仅核验公开介绍；会员正文未读取。丹麦专属主题，具体地图公开页未明确；发表于188329前。",
    "publishedAt": "2026-10-22",
    "access": "会员",
    "maps": "开放陆图 / Arabia"
  },
  {
    "id": "new-hera-transition",
    "name": "Hera：像职业选手一样完成兵种转型",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.patreon.com/heraaoe2/posts/how-to-make-unit-159690467",
    "type": "职业教学",
    "desc": "职业级兵种转型专题。带着旧军何时停产、新体系总成本、过渡期怎样守住地图三个问题阅读。",
    "short": "陆图通用",
    "language": "英文",
    "symbol": "H",
    "caution": "仅核验公开介绍；会员正文未读取。2026年5月发布，早于9月DLC；新区域兵种和旧兵种替换必须按当前科技树重新核算。",
    "publishedAt": "2026-05-31",
    "access": "会员",
    "maps": "陆图通用"
  },
  {
    "id": "new-hera-attack",
    "name": "Hera：职业级进攻专题",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.patreon.com/heraaoe2/posts/how-to-attack-150203571",
    "type": "职业教学",
    "desc": "职业级进攻专题。可用于研究进攻目标、时机与后续计划。本站另提供独立设计的进攻循环练习。",
    "short": "陆图通用",
    "language": "英文",
    "symbol": "H",
    "caution": "仅核验公开介绍；会员正文未读取。发布早于2026年后续DLC与平衡改动；具体单位组合与攻城交互需重验。",
    "publishedAt": "2026-02-08",
    "access": "会员",
    "maps": "陆图通用"
  },
  {
    "id": "new-hera-gap",
    "name": "Hera：2200与2900分玩家的差距",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.youtube.com/watch?v=iSFDKve-xD0",
    "type": "职业教学",
    "desc": "Hera本人频道的高分段教学案例。题目直接围绕高水平玩家与顶尖玩家的差距，适合替代入门教程作为观察样本。观看时逐点记录双方信息、可选行动和实际选择，再用自己的同类型录像核验；不把视频标题中的分数当作站点承诺。",
    "short": "以原视频实际地图为准",
    "language": "英文",
    "symbol": "H",
    "caution": "2025年版本；用于研究决策与执行，不能直接套用2026年的文明数值或兵种树。",
    "publishedAt": "2025-03-13",
    "access": "公开",
    "maps": "以原视频实际地图为准"
  },
  {
    "id": "new-patch-185872",
    "name": "2026年9月正式大补丁：区域兵种与旧文明重做",
    "author": "World’s Edge / Age DE Team",
    "url": "https://www.ageofempires.com/news/age-of-empires-ii-definitive-edition-update-185872/",
    "type": "官方资料",
    "desc": "加入Mounted Crossbowmen与Varangian Guards等区域兵种，并为部分欧洲文明调整旧骑射路线；法兰克掷斧兵基础射程提高、Bearded Axe被替换，葡萄牙失去Redemption；还调整攻城与海军，并加入更开放的Arabian Desert地图。它能直接解释为什么2025攻略的兵种树与2026正式服可能不同。",
    "short": "Arabia · Arabian Desert",
    "language": "英文",
    "symbol": "DE",
    "caution": "这是9月基线，不是当前最新补丁；须与10月188329及之后正式补丁叠加阅读。",
    "publishedAt": "2026-09-22",
    "access": "公开",
    "maps": "Arabia / Arabian Desert / 陆图"
  },
  {
    "id": "f1re-nomad-20261020",
    "name": "F1Re：游牧落 TC 选址与捕鱼速城",
    "author": "F1ReAoE",
    "url": "https://www.youtube.com/watch?v=3ebgOpe4loA",
    "type": "职业教学",
    "desc": "作者说明包含用小地图和闲置村民热键找 TC 位置、船坞村去向、确认可捕鱼空间，以及 Saracens 捕鱼速城和 Persians 起步演示。00:00 选址，09:00 捕鱼速城，16:10 文明，18:18 Persians。",
    "short": "Nomad",
    "language": "英文",
    "symbol": "F1",
    "caution": "上传日期已核实；录像录制日期、补丁号未标明。具体村民分配、船坞与渔船数值需按当前版本重测，不能把 generic Fast Castle 当作所有游牧局的默认最优解。",
    "publishedAt": "2026-10-20",
    "access": "公开",
    "maps": "Nomad"
  },
  {
    "id": "f1re-mapplans-20261020",
    "name": "F1Re：Bog Islands、Baltic、Amazon Tunnel 与 Arena 地图计划",
    "author": "F1ReAoE",
    "url": "https://www.youtube.com/watch?v=Z9jA1mWZqso",
    "type": "职业教学",
    "desc": "作者说明展示 Mongols 火船开局、Baltic 对应计划、Amazon Tunnel 中央圣物控制，以及 Arena 速城轻骑与早市场。15:41 转 Amazon Tunnel，19:44 转 Arena。",
    "short": "Bog Islands · Baltic",
    "language": "英文",
    "symbol": "F1",
    "caution": "2026 上传不代表 2026 录制。发现目录曾注明 2023 录制，原页未标明确录制年；因此作为地图计划档案使用。尤其海军开局先对照 2026 海战重做，不能照抄旧船型克制与数量。",
    "publishedAt": "2026-10-20",
    "access": "公开",
    "maps": "Bog Islands / Baltic / Amazon Tunnel"
  },
  {
    "id": "f1re-african-20261020",
    "name": "F1Re：African Clearing 落 TC、资源分配与避免自困",
    "author": "F1ReAoE",
    "url": "https://www.youtube.com/watch?v=ZrwpMBzpHr4",
    "type": "职业教学",
    "desc": "作者说明包含小地图 TC 定位、初始村民分两座磨坊、伐木场时机、远猪与水池处理，以及速城与围墙造成的出兵限制。后半有 Britons vs Saracens、Magyars vs Incas 两个排位复盘。",
    "short": "African Clearing",
    "language": "葡萄牙文",
    "symbol": "F1",
    "caution": "上传日期已核实；录像补丁号未标明。作者将速城称为该图标准计划，这是其教学观点，仍需按敌人距离、进攻信号和当前资源机制判断，不改写成绝对规则。",
    "publishedAt": "2026-10-20",
    "access": "公开",
    "maps": "African Clearing"
  },
  {
    "id": "daut-rf-20261020",
    "name": "DauT：4v4 Rage Forest 偷渡失败后的兵营转化",
    "author": "Daut Age of Empires 2",
    "url": "https://www.youtube.com/watch?v=yRlKda_RGso",
    "type": "职业实战",
    "desc": "标题明确给出偷渡未成功、但兵营仍带来后续影响的 4v4 RF 案例。适合练习从早期计划失败中寻找留下的生产资产与二次施压机会。",
    "short": "Rage Forest · Black Forest",
    "language": "英文",
    "symbol": "D",
    "caution": "学习任务是本站建议；原说明仅写 Twitch 实况，未给精确补丁、文明或详细战术章程，不能声称某个固定兵量/后续必胜。",
    "publishedAt": "2026-10-20",
    "access": "公开",
    "maps": "Rage Forest / Black Forest"
  },
  {
    "id": "hera-bf-20261110",
    "name": "Hera：黑森林纯攻城配合实战",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.youtube.com/watch?v=C6dVwsRFKcA",
    "type": "职业实战",
    "desc": "作者原说明确认黑森林队友纯攻城打法，并链接 Liereyy 的另一侧故事。适合对照主力保护、攻城投产与狭口突破条件，属于实战素材而非结构化课程。",
    "short": "Black Forest",
    "language": "英文",
    "symbol": "H",
    "caution": "这是带娱乐叙事的实况剪辑，标题中的 1600 Elo 不能当作训练样本的真实技术级别或职业阈值；视频未标补丁号。",
    "publishedAt": "2026-11-10",
    "access": "公开",
    "maps": "Black Forest"
  },
  {
    "id": "hera-arena-20260325",
    "name": "Hera：Arena 文明劣势对局的应对案例",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.youtube.com/watch?v=KH7zjxq353Y",
    "type": "职业实战",
    "desc": "Arena 文明对局案例。建议带着资源投入、圣物争夺、升帝窗口与兵种转换四个问题观看；这些问题为本站整理。",
    "short": "Arena",
    "language": "英文",
    "symbol": "H",
    "caution": "BEST/WORST 是视频标题判断，不是跨补丁文明排名或统计结论；未独立核实视频内使用文明与完整战术，本站不据标题外推。",
    "publishedAt": "2026-03-25",
    "access": "公开",
    "maps": "Arena"
  },
  {
    "id": "hera-wu-hybrid-20250515",
    "name": "Hera：Wu 混合图实战（海战重做前案例）",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.youtube.com/watch?v=o5JSVw0HIz0",
    "type": "职业实战",
    "desc": "2025 年 Wu 混合图案例，可用于研究水陆投资如何互相影响、何时把水面优势换成陆地节奏。",
    "short": "Hybrid",
    "language": "英文",
    "symbol": "H",
    "caution": "明确早于 2026-02-17 海战重做；船型克制、渔船收益和海军升级不能当作当前规则，需与官方 169123 及后续补丁对照。",
    "publishedAt": "2025-05-15",
    "access": "公开",
    "maps": "Hybrid"
  },
  {
    "id": "official-naval-169123",
    "name": "官方 169123：2026 海战、捕鱼经济与船型重做",
    "author": "Age DE Team",
    "url": "https://www.ageofempires.com/news/age-of-empires-ii-definitive-edition-update-169123/",
    "type": "官方资料",
    "desc": "官方确认 Naval Overhaul：新增 Hulk 系对抗火船，改动渔船经济、船型属性与海军科技；是检查旧水图教程是否仍适用的必要版本锚点。",
    "short": "Hybrid · Water",
    "language": "英文",
    "symbol": "DE",
    "caution": "169123 是机制变更基准，不是截至 2026-11 的最新补丁。当前训练仍须检查后续正式更新；不要将 PUP 预览改动视为已上线。",
    "publishedAt": "2026-02-17",
    "access": "公开",
    "maps": "Hybrid / Water / Nomad"
  },
  {
    "id": "f1re-tc-decision",
    "name": "F1Re · 加 TC 前的六个问题",
    "originalTitle": "Even Pros Get This Wrong: When to Add TCs | AoE2",
    "author": "F1ReAoE",
    "url": "https://www.youtube.com/watch?v=mIxFjru2yrQ",
    "type": "职业教学",
    "desc": "作者以自己加 TC 前的问题链展开，再分析 Lam vs Goku 的不列颠对蒙古案例：能否通过军队投入造成伤害、能否拿到对方黄金、地图是否有弱点、自家能否抵御更大军队、资源是否暴露，以及谁的后期更强。简介还明确指出案例中单 TC 的大学/弹道投入没有兑现伤害，另一方受损后加第三 TC 又无法维持双线生产。",
    "short": "TC 投资 / 经济与兵力分岔",
    "language": "英文 / 术语与章节",
    "symbol": "F",
    "caution": "2026 年重新发布的公开教练课；职业赛示例的具体录制年份未在本次读取的本人简介中注明。约六田供一 TC 是示例估算，受文明、采集和其他食物支出影响，不是统一配方。",
    "publishedAt": "2026-10-23",
    "publishedAtISO": "2026-10-23T22:15:20-07:00",
    "publishedAtCN": "2026-10-24",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "verification": "已读取作者完整简介、章节（如有）与 YouTube 原生标题/作者/publishDate；未观看完整视频，未获取字幕。",
    "verificationSource": "本人 YouTube 页面的 ytInitialPlayerResponse.videoDetails 与 microformat.playerMicroformatRenderer",
    "maps": "开放图 / Arabia",
    "durationSeconds": 1244,
    "chapters": [
      {
        "seconds": 0,
        "label": "先检查对手地图：黄金与可攻击弱点",
        "url": "https://www.youtube.com/watch?v=mIxFjru2yrQ&t=0"
      },
      {
        "seconds": 116,
        "label": "再检查自己地图：防守与暴露资源",
        "url": "https://www.youtube.com/watch?v=mIxFjru2yrQ&t=116"
      },
      {
        "seconds": 201,
        "label": "比较文明后期",
        "url": "https://www.youtube.com/watch?v=mIxFjru2yrQ&t=201"
      },
      {
        "seconds": 455,
        "label": "单 TC 科技投资未兑现伤害的案例",
        "url": "https://www.youtube.com/watch?v=mIxFjru2yrQ&t=455"
      },
      {
        "seconds": 793,
        "label": "受损后加第三 TC 的负担",
        "url": "https://www.youtube.com/watch?v=mIxFjru2yrQ&t=793"
      },
      {
        "seconds": 1140,
        "label": "加 TC 前的问题回顾",
        "url": "https://www.youtube.com/watch?v=mIxFjru2yrQ&t=1140"
      }
    ],
    "keywords": [
      "TC 决策",
      "经济规划",
      "读局"
    ],
    "evidence": "作者简介、章节与原生元数据",
    "modes": [
      "solo"
    ]
  },
  {
    "id": "f1re-attack-checklist",
    "name": "F1Re · 出门进攻前，先确认敌军位置",
    "originalTitle": "Stop Attacking at the Wrong Time | AoE2",
    "author": "F1ReAoE",
    "url": "https://www.youtube.com/watch?v=Ggwe4cjiALc",
    "type": "职业教学",
    "desc": "作者用自己蒙古对印度斯坦的旧 Arabia 对局，讨论离家后能造成多少伤害、会承受多少伤害、是否掌握敌军位置、双方经济与军力谁领先，以及各阶段文明强弱。简介明确区分地图控制与军队控制，并给出小规模骚扰、领先时的守势、落后时选择最后一次机会等讨论入口。",
    "short": "地图控制 ≠ 敌军位置已知",
    "language": "英文 / 术语与章节",
    "symbol": "F",
    "caution": "发布于 2026 年，但作者明确说录像中的印度斯坦当时仍称 Indians，案例显著早于新文明改名。保留决策问题，旧科技树与文明阶段强弱须重验。",
    "publishedAt": "2026-10-23",
    "publishedAtISO": "2026-10-23T22:15:34-07:00",
    "publishedAtCN": "2026-10-24",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "verification": "已读取作者完整简介、章节（如有）与 YouTube 原生标题/作者/publishDate；未观看完整视频，未获取字幕。",
    "verificationSource": "本人 YouTube 页面的 ytInitialPlayerResponse.videoDetails 与 microformat.playerMicroformatRenderer",
    "maps": "开放图 / Arabia",
    "durationSeconds": 698,
    "chapters": [
      {
        "seconds": 45,
        "label": "进攻收益与离家风险",
        "url": "https://www.youtube.com/watch?v=Ggwe4cjiALc&t=45"
      },
      {
        "seconds": 113,
        "label": "地图控制与军队控制的区别",
        "url": "https://www.youtube.com/watch?v=Ggwe4cjiALc&t=113"
      },
      {
        "seconds": 149,
        "label": "分别判断经济领先与军力领先",
        "url": "https://www.youtube.com/watch?v=Ggwe4cjiALc&t=149"
      },
      {
        "seconds": 213,
        "label": "文明窗口与落后时的机会",
        "url": "https://www.youtube.com/watch?v=Ggwe4cjiALc&t=213"
      },
      {
        "seconds": 599,
        "label": "骚扰与败局复盘",
        "url": "https://www.youtube.com/watch?v=Ggwe4cjiALc&t=599"
      }
    ],
    "keywords": [
      "进攻决策",
      "敌军位置",
      "风险控制"
    ],
    "evidence": "作者简介、章节与原生元数据",
    "modes": [
      "solo"
    ]
  },
  {
    "id": "f1re-blacksmith-choice",
    "name": "F1Re · 铁匠铺先升什么：目标、己方兵、敌方兵",
    "originalTitle": "Which Blacksmith Upgrade First? 3 Questions Decide It | AoE2",
    "author": "F1ReAoE",
    "url": "https://www.youtube.com/watch?v=bhOnwY9G_ws",
    "type": "职业教学",
    "desc": "作者把铁匠铺优先级拆成三个问题：本轮想做什么、己方是什么单位、要面对什么单位。简介与章节分别讨论骑士骚扰、骑士与弩兵、长枪与骑士、掷矛兵、僧侣生命值，以及骑射面对投石的存活问题；适合逐对位建立自己的升级备忘录。",
    "short": "升级收益 / 对位与目的",
    "language": "英文 / 术语与章节",
    "symbol": "F",
    "caution": "简介主动要求按当前补丁核查 HP 与伤害。章节中的某一对位建议依赖兵量、升级与战术目标，不能据此写成无条件反制表。未获取视频字幕。",
    "publishedAt": "2026-10-23",
    "publishedAtISO": "2026-10-23T22:15:51-07:00",
    "publishedAtCN": "2026-10-24",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "verification": "已读取作者完整简介、章节（如有）与 YouTube 原生标题/作者/publishDate；未观看完整视频，未获取字幕。",
    "verificationSource": "本人 YouTube 页面的 ytInitialPlayerResponse.videoDetails 与 microformat.playerMicroformatRenderer",
    "maps": "全地图",
    "durationSeconds": 876,
    "chapters": [
      {
        "seconds": 0,
        "label": "目标、己方单位、敌方单位三个问题",
        "url": "https://www.youtube.com/watch?v=bhOnwY9G_ws&t=0"
      },
      {
        "seconds": 37,
        "label": "骑士骚扰村民的升级目的",
        "url": "https://www.youtube.com/watch?v=bhOnwY9G_ws&t=37"
      },
      {
        "seconds": 397,
        "label": "骑士面对弩兵",
        "url": "https://www.youtube.com/watch?v=bhOnwY9G_ws&t=397"
      },
      {
        "seconds": 561,
        "label": "长枪面对骑士",
        "url": "https://www.youtube.com/watch?v=bhOnwY9G_ws&t=561"
      },
      {
        "seconds": 735,
        "label": "僧侣生命值升级",
        "url": "https://www.youtube.com/watch?v=bhOnwY9G_ws&t=735"
      },
      {
        "seconds": 758,
        "label": "骑射与投石的存活交互",
        "url": "https://www.youtube.com/watch?v=bhOnwY9G_ws&t=758"
      }
    ],
    "keywords": [
      "铁匠铺",
      "伤害阈值",
      "升级优先级"
    ],
    "evidence": "作者简介、章节与原生元数据",
    "modes": [
      "solo"
    ]
  },
  {
    "id": "f1re-scout-pressure",
    "name": "F1Re · 防住斥候后，怎样逼出对手的反制投资",
    "originalTitle": "Losing to Scouts? Force His Range | AoE2",
    "author": "F1ReAoE",
    "url": "https://www.youtube.com/watch?v=3MKY2K8HWUc",
    "type": "职业教学",
    "desc": "作者复盘一位 1600+ 学员的马里对马扎尔 Arabia 对局：第一轮剑士打赢后留在家中，让对手自由围墙、铺田和选择补靶场时机。简介讨论前置长矛配合弓兵施压，迫使斥候方为防守追加靶场、掷矛兵与升级的思路，重点是胜利后如何继续施加经济约束。",
    "short": "主动权 / 迫使对手改变经济",
    "language": "英文 / 术语与章节",
    "symbol": "F",
    "caution": "这是具体学员对局分析，不是所有对位都必须强行前压。转进攻前应重新判断敌军位置、自家暴露资源和补兵；文明加成与具体开局时点按当前正式服核查。",
    "publishedAt": "2026-10-23",
    "publishedAtISO": "2026-10-23T21:44:11-07:00",
    "publishedAtCN": "2026-10-24",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "verification": "已读取作者完整简介、章节（如有）与 YouTube 原生标题/作者/publishDate；未观看完整视频，未获取字幕。",
    "verificationSource": "本人 YouTube 页面的 ytInitialPlayerResponse.videoDetails 与 microformat.playerMicroformatRenderer",
    "maps": "开放图 / Arabia",
    "durationSeconds": 1573,
    "chapters": [
      {
        "seconds": 233,
        "label": "长矛先于剑士前进的案例",
        "url": "https://www.youtube.com/watch?v=3MKY2K8HWUc&t=233"
      },
      {
        "seconds": 411,
        "label": "长矛停家中的机会成本",
        "url": "https://www.youtube.com/watch?v=3MKY2K8HWUc&t=411"
      },
      {
        "seconds": 673,
        "label": "主动权何时被交还",
        "url": "https://www.youtube.com/watch?v=3MKY2K8HWUc&t=673"
      },
      {
        "seconds": 1093,
        "label": "迫使对手补靶场的原则",
        "url": "https://www.youtube.com/watch?v=3MKY2K8HWUc&t=1093"
      },
      {
        "seconds": 1398,
        "label": "斥候经济对农田的依赖",
        "url": "https://www.youtube.com/watch?v=3MKY2K8HWUc&t=1398"
      }
    ],
    "keywords": [
      "封建主动权",
      "反压",
      "斥候应对"
    ],
    "evidence": "作者简介、章节与原生元数据",
    "modes": [
      "solo"
    ]
  },
  {
    "id": "f1re-small-wall-review",
    "name": "F1Re · 小墙防剑士：从两场 Arabia 学员录像找成本",
    "originalTitle": "Student Review: How to Hold Man at Arms With Small Walls | AoE2",
    "author": "F1ReAoE",
    "url": "https://www.youtube.com/watch?v=Yg19PbDlSlg",
    "type": "职业教学",
    "desc": "当前本人标题为 Student Review: How to Hold Man at Arms With Small Walls。作者复盘拜占庭对阿兹特克、中国对保加利亚两局，讨论过大的黑暗时代围墙、前置建筑暴露、小范围保护浆果与 TC 周边建筑布局，并给出一个可重复的小墙练习。",
    "short": "局部防守 / 低成本保经济",
    "language": "英文 / 术语与章节",
    "symbol": "F",
    "caution": "主要案例为 1100+ 学员；高分玩家可用来审计防守成本，不能把示例的三村围墙或磨坊位置当成所有地图的标准答案。发现聚合站标题较旧，本站采用本人当前标题与元数据。",
    "publishedAt": "2026-10-23",
    "publishedAtISO": "2026-10-23T21:36:47-07:00",
    "publishedAtCN": "2026-10-24",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "verification": "已读取作者完整简介、章节（如有）与 YouTube 原生标题/作者/publishDate；未观看完整视频，未获取字幕。",
    "verificationSource": "本人 YouTube 页面的 ytInitialPlayerResponse.videoDetails 与 microformat.playerMicroformatRenderer",
    "maps": "开放图 / Arabia",
    "durationSeconds": 1293,
    "chapters": [
      {
        "seconds": 342,
        "label": "过大围墙带来的问题",
        "url": "https://www.youtube.com/watch?v=Yg19PbDlSlg&t=342"
      },
      {
        "seconds": 485,
        "label": "面对剑士文明时的建筑位置",
        "url": "https://www.youtube.com/watch?v=Yg19PbDlSlg&t=485"
      },
      {
        "seconds": 587,
        "label": "浆果区域的小墙示例",
        "url": "https://www.youtube.com/watch?v=Yg19PbDlSlg&t=587"
      },
      {
        "seconds": 772,
        "label": "TC 附近的小墙练习",
        "url": "https://www.youtube.com/watch?v=Yg19PbDlSlg&t=772"
      },
      {
        "seconds": 1079,
        "label": "后续弓兵到来时的防守",
        "url": "https://www.youtube.com/watch?v=Yg19PbDlSlg&t=1079"
      }
    ],
    "keywords": [
      "小墙",
      "防守",
      "资源暴露"
    ],
    "evidence": "作者简介、章节与原生元数据",
    "modes": [
      "solo"
    ]
  },
  {
    "id": "sotl-camel-archer-2025",
    "name": "Spirit Of The Law · 骆驼弓的加成、对位与成型成本",
    "originalTitle": "How good are Camel Archers? (AoE2)",
    "author": "Spirit Of The Law",
    "url": "https://www.youtube.com/watch?v=mFcNfmUqg0A",
    "type": "机制与训练",
    "desc": "本人单位分析视频，章节覆盖城堡期属性和加成伤害、对城堡期单位的测试、帝王升级以及军队组合。适合把“克制骑射”拆成具体护甲类别、升级、兵量与生产条件进行核查；本次只读取作者简介与章节，未取得测试的完整结果。",
    "short": "单位机制 / 控制变量测试",
    "language": "英文 / 术语与章节",
    "symbol": "SOTL",
    "caution": "2025 年单位分析，具体数值需按当前科技树重查；2026 年新增 Mounted Crossbowmen 后，不能把对旧 Cavalry Archer 的结论直接移植。",
    "publishedAt": "2025-01-23",
    "publishedAtISO": "2025-01-23T07:48:06-08:00",
    "publishedAtCN": "2025-01-23",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "verification": "已读取作者完整简介、章节（如有）与 YouTube 原生标题/作者/publishDate；未观看完整视频，未获取字幕。",
    "verificationSource": "本人 YouTube 页面的 ytInitialPlayerResponse.videoDetails 与 microformat.playerMicroformatRenderer",
    "maps": "全地图",
    "durationSeconds": 911,
    "chapters": [
      {
        "seconds": 44,
        "label": "城堡期属性与加成",
        "url": "https://www.youtube.com/watch?v=mFcNfmUqg0A&t=44"
      },
      {
        "seconds": 180,
        "label": "额外伤害",
        "url": "https://www.youtube.com/watch?v=mFcNfmUqg0A&t=180"
      },
      {
        "seconds": 285,
        "label": "城堡期单位对位",
        "url": "https://www.youtube.com/watch?v=mFcNfmUqg0A&t=285"
      },
      {
        "seconds": 573,
        "label": "帝王期升级",
        "url": "https://www.youtube.com/watch?v=mFcNfmUqg0A&t=573"
      },
      {
        "seconds": 785,
        "label": "军队组合",
        "url": "https://www.youtube.com/watch?v=mFcNfmUqg0A&t=785"
      }
    ],
    "keywords": [
      "骆驼弓",
      "伤害加成",
      "兵种组合"
    ],
    "evidence": "作者简介、章节与原生元数据"
  },
  {
    "id": "sotl-fire-archer-2025",
    "name": "Spirit Of The Law · 吴国 Fire Archer：打兵、攻城与拆家",
    "originalTitle": "The new Fire Archer (Obsidian Arrows is back??)",
    "author": "Spirit Of The Law",
    "url": "https://www.youtube.com/watch?v=aEYiMjv2hLI",
    "type": "机制与训练",
    "desc": "作者对吴国城堡特殊单位 Fire Archer 做专题分析，分别与普通弩兵比较，并安排对建筑、攻城器、城堡期单位和帝王期单位的章节。它提供按作战目标分开检验同一单位的研究结构，适合准备具体对位；本次没有读取完整字幕，因此不转述测试胜负或数值结论。",
    "short": "单位实验 / 作战目标改变收益",
    "language": "英文 / 术语与章节",
    "symbol": "SOTL",
    "caution": "发布于 2025-05；后续单位平衡、文明科技和建筑护甲可能改变测试结果。以当前正式服重跑对照，不能把旧版拆家效率当作当前承诺。",
    "publishedAt": "2025-05-15",
    "publishedAtISO": "2025-05-15T07:40:27-07:00",
    "publishedAtCN": "2025-05-15",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "verification": "已读取作者完整简介、章节（如有）与 YouTube 原生标题/作者/publishDate；未观看完整视频，未获取字幕。",
    "verificationSource": "本人 YouTube 页面的 ytInitialPlayerResponse.videoDetails 与 microformat.playerMicroformatRenderer",
    "maps": "全地图",
    "durationSeconds": 768,
    "chapters": [
      {
        "seconds": 40,
        "label": "与普通弩兵比较",
        "url": "https://www.youtube.com/watch?v=aEYiMjv2hLI&t=40"
      },
      {
        "seconds": 142,
        "label": "对建筑的表现",
        "url": "https://www.youtube.com/watch?v=aEYiMjv2hLI&t=142"
      },
      {
        "seconds": 322,
        "label": "对攻城器的表现",
        "url": "https://www.youtube.com/watch?v=aEYiMjv2hLI&t=322"
      },
      {
        "seconds": 415,
        "label": "城堡期对位",
        "url": "https://www.youtube.com/watch?v=aEYiMjv2hLI&t=415"
      },
      {
        "seconds": 525,
        "label": "帝王升级",
        "url": "https://www.youtube.com/watch?v=aEYiMjv2hLI&t=525"
      },
      {
        "seconds": 664,
        "label": "帝王期对建筑",
        "url": "https://www.youtube.com/watch?v=aEYiMjv2hLI&t=664"
      }
    ],
    "keywords": [
      "Fire Archer",
      "建筑伤害",
      "攻城交互"
    ],
    "evidence": "作者简介、章节与原生元数据"
  },
  {
    "id": "sotl-september-2026",
    "name": "Spirit Of The Law · 2026 九月补丁的单位交互导读",
    "originalTitle": "Summary of the HUGE September patch! (AoE2)",
    "author": "Spirit Of The Law",
    "url": "https://www.youtube.com/watch?v=dwb67mhbNQM",
    "type": "机制与训练",
    "desc": "本人对 185872 的公开导读，简介直接链接官方补丁；章节按步兵、攻城、海军、建筑起重机、Mounted Crossbows、加强和削弱的独特单位，以及匈奴/维京/越南的杂项变化组织。可用它筛出自己的文明池需要重新测试的交互，再回到官方数据和实战。",
    "short": "补丁理解 / 找到需要重测的对位",
    "language": "英文 / 术语与章节",
    "symbol": "SOTL",
    "caution": "这是 2026-09 的补丁解释，早于现有正式版基线 188329。不能单凭导读确定当前数值，也不能从章节标题推断尚未读取的战略结论。",
    "publishedAt": "2026-09-22",
    "publishedAtISO": "2026-09-22T14:52:42-07:00",
    "publishedAtCN": "2026-09-23",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "verification": "已读取作者完整简介、章节（如有）与 YouTube 原生标题/作者/publishDate；未观看完整视频，未获取字幕。",
    "verificationSource": "本人 YouTube 页面的 ytInitialPlayerResponse.videoDetails 与 microformat.playerMicroformatRenderer",
    "maps": "全地图",
    "durationSeconds": 544,
    "chapters": [
      {
        "seconds": 24,
        "label": "步兵变化",
        "url": "https://www.youtube.com/watch?v=dwb67mhbNQM&t=24"
      },
      {
        "seconds": 52,
        "label": "攻城变化",
        "url": "https://www.youtube.com/watch?v=dwb67mhbNQM&t=52"
      },
      {
        "seconds": 85,
        "label": "海战变化",
        "url": "https://www.youtube.com/watch?v=dwb67mhbNQM&t=85"
      },
      {
        "seconds": 182,
        "label": "Mounted Crossbows",
        "url": "https://www.youtube.com/watch?v=dwb67mhbNQM&t=182"
      },
      {
        "seconds": 244,
        "label": "部分独特单位加强",
        "url": "https://www.youtube.com/watch?v=dwb67mhbNQM&t=244"
      },
      {
        "seconds": 333,
        "label": "部分独特单位削弱",
        "url": "https://www.youtube.com/watch?v=dwb67mhbNQM&t=333"
      }
    ],
    "keywords": [
      "版本更新",
      "区域兵种",
      "机制实验"
    ],
    "evidence": "作者简介、章节与原生元数据"
  },
  {
    "id": "survivalist-reset-drills",
    "name": "Survivalist · 用保存与加载做重复局面训练",
    "originalTitle": "The Most Efficient Way to Improve at Age of Empires 2",
    "author": "Survivalist",
    "url": "https://www.youtube.com/watch?v=Lt4N-5-OeAk",
    "type": "机制与训练",
    "desc": "作者说明如何通过保存、加载游戏重复练习，把多任务和微操/宏观协调拆开训练，并指出可在单人游戏以及有练习伙伴的多人游戏中使用。对高分玩家的价值是减少等待同类局面自然出现的成本，再把动作放回完整对局验证。",
    "short": "刻意练习 / 缩短反馈周期",
    "language": "英文 / 术语与章节",
    "symbol": "S",
    "caution": "2023 年常青练习方法，非当下 meta。存档兼容和多人设置受游戏版本限制；固定存档练得更好不等于真实对手下已经迁移成功。",
    "publishedAt": "2023-06-27",
    "publishedAtISO": "2023-06-27T09:49:11-07:00",
    "publishedAtCN": "2023-06-28",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "verification": "已读取作者完整简介、章节（如有）与 YouTube 原生标题/作者/publishDate；未观看完整视频，未获取字幕。",
    "verificationSource": "本人 YouTube 页面的 ytInitialPlayerResponse.videoDetails 与 microformat.playerMicroformatRenderer",
    "maps": "全地图",
    "durationSeconds": 480,
    "chapters": [
      {
        "seconds": 132,
        "label": "多任务",
        "url": "https://www.youtube.com/watch?v=Lt4N-5-OeAk&t=132"
      },
      {
        "seconds": 166,
        "label": "协调微操与宏观",
        "url": "https://www.youtube.com/watch?v=Lt4N-5-OeAk&t=166"
      },
      {
        "seconds": 267,
        "label": "单项任务练习",
        "url": "https://www.youtube.com/watch?v=Lt4N-5-OeAk&t=267"
      },
      {
        "seconds": 302,
        "label": "通过保存与加载重复局面",
        "url": "https://www.youtube.com/watch?v=Lt4N-5-OeAk&t=302"
      }
    ],
    "keywords": [
      "练习设计",
      "保存加载",
      "微操宏观"
    ],
    "evidence": "作者简介、章节与原生元数据"
  },
  {
    "id": "survivalist-micro-1900",
    "name": "Survivalist · 1900 分段完整科技树微操训练课",
    "originalTitle": "Full Tech Tree Micro Practice | Coaching 1900 (1 Dec/2023)",
    "author": "Survivalist Gameplay",
    "url": "https://www.youtube.com/watch?v=w51jbz0LSYg",
    "type": "机制与训练",
    "desc": "Survivalist Gameplay 本人频道的 Full Tech Tree Micro Practice | Coaching 1900，标题注明实录为 2023-12-01。可以把它作为高分微操练习的完整案例入口，观察如何用专门场景研究操作；本次已核验标题、作者、长度与简介，没有取得课程字幕，因此不代替观看原课。",
    "short": "高分训练案例 / 隔离操作变量",
    "language": "英文 / 术语",
    "symbol": "S",
    "caution": "2024-06-05 上传，实录为 2023-12-01，两个日期不同。完整科技树场景不代表具体文明实战可用兵种；2026 寻路、堆叠与单位数值应重新验证。",
    "publishedAt": "2024-06-05",
    "publishedAtISO": "2024-06-05T13:00:16-07:00",
    "publishedAtCN": "2024-06-06",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "verification": "已读取作者完整简介、章节（如有）与 YouTube 原生标题/作者/publishDate；未观看完整视频，未获取字幕。",
    "verificationSource": "本人 YouTube 页面的 ytInitialPlayerResponse.videoDetails 与 microformat.playerMicroformatRenderer",
    "maps": "全地图",
    "durationSeconds": 2027,
    "chapters": [],
    "keywords": [
      "微操",
      "高分教练课",
      "训练场景"
    ],
    "evidence": "标题、长度与作者简介"
  },
  {
    "id": "tg-rf6-sensar-20260812",
    "name": "Ornlu × Sensar：Rage Forest 6 的 4v4 文明讨论",
    "author": "Ornlu the Wolf / Sensar",
    "url": "https://www.youtube.com/watch?v=cjj5SmViE8o",
    "type": "机制与训练",
    "desc": "RF6 主办者 Sensar 与 Ornlu 的公开长篇讨论，作者明确以 4v4 黑森林赛事为语境。适合研究文明如何服务团队阵容；本次只核验作者说明，未把各文明具体档位写成已验证结论。",
    "short": "RF 专项阵容 / 文明角色",
    "language": "英文",
    "symbol": "RF",
    "caution": "2026年8月的 RF6 观点；晚于该赛事的平衡变化需另核对，不能当作当前通用排名。",
    "publishedAt": "2026-08-12",
    "access": "公开",
    "mode": "team",
    "verification": "2026-11-17：直接读取 YouTube watch 原页 publishDate、作者 shortDescription 和 oEmbed 标题/作者；未取得字幕正文，介绍仅限作者明确描述。",
    "verifiedAt": "2026-11-17",
    "keywords": [
      "Rage Forest",
      "群局分工",
      "文明组合",
      "备赛"
    ],
    "maps": "Black Forest / Rage Forest",
    "evidence": "作者说明与原生元数据"
  },
  {
    "id": "tg-hera-bf-guide-20230716",
    "name": "Hera：黑森林完整地图教学",
    "author": "Hera - Age of Empires 2",
    "url": "https://www.youtube.com/watch?v=1V_jsU9PF8Y",
    "type": "职业教学",
    "desc": "公开结构课，章节覆盖地图特征、争夺目标、常见策略、适合的文明风格与职业细节。02:56 讨论争夺目标，06:05 常见策略，09:54 文明风格。可作为 RF 实战之前的框架课。",
    "short": "地图目标 → 常见策略 → 文明风格",
    "language": "英文",
    "symbol": "H",
    "caution": "经典教学，2023-07-16发布。只据作者章节核验内容范围；旧文明与捕鱼细节不可直接套到2026版。",
    "publishedAt": "2023-07-16",
    "access": "公开",
    "mode": "team",
    "verification": "2026-11-17：原站发布日期、作者及完整章节说明已核验；未取得字幕正文，不声称已经逐句看完视频。",
    "verifiedAt": "2026-11-17",
    "keywords": [
      "Rage Forest",
      "地图目标",
      "团队角色",
      "结构化教学"
    ],
    "maps": "Black Forest / Rage Forest",
    "evidence": "作者简介、章节与原生元数据",
    "chapters": [
      {
        "seconds": 176,
        "label": "争夺目标",
        "url": "https://www.youtube.com/watch?v=1V_jsU9PF8Y&t=176"
      },
      {
        "seconds": 365,
        "label": "常见策略",
        "url": "https://www.youtube.com/watch?v=1V_jsU9PF8Y&t=365"
      },
      {
        "seconds": 594,
        "label": "文明风格",
        "url": "https://www.youtube.com/watch?v=1V_jsU9PF8Y&t=594"
      }
    ]
  },
  {
    "id": "tg-sotl-trade-tests-20210916",
    "name": "Spirit Of The Law：贸易加成的对照测试方法",
    "author": "Spirit Of The Law",
    "url": "https://www.youtube.com/watch?v=C3XyErzCvB8",
    "type": "机制与训练",
    "desc": "原作者机制测试，00:40 介绍测试，随后分别比较贸易单位成本、黄金成本、贸易收入和市场生产速度等不同加成。适合学习如何让不同经济加成进入同一实验框架，具体优劣与旧加成数字不沿用。",
    "short": "等投入对照 / 贸易回本实验",
    "language": "英文",
    "symbol": "SOTL",
    "caution": "2021年的历史实验。文明、贸易速度和加成均可能已改；当作实验设计参考，所有当前结果需重测。",
    "publishedAt": "2021-09-16",
    "access": "公开",
    "mode": "team",
    "verification": "2026-11-17：YouTube 原页日期、标题、作者与测试章节已核验；未读取字幕，不将旧排名或数值转述成当前事实。",
    "verifiedAt": "2026-11-17",
    "keywords": [
      "贸易",
      "机制实测",
      "机会成本",
      "文明加成"
    ],
    "maps": "有贸易空间的群局地图",
    "evidence": "作者简介、章节与原生元数据"
  },
  {
    "id": "map-sotl-naval-20260303",
    "name": "Spirit Of The Law：2026 海战重做的分章讲解",
    "author": "Spirit Of The Law",
    "url": "https://www.youtube.com/watch?v=4uXxCFMCjxw",
    "type": "机制与训练",
    "desc": "正式海战重做后的机制导览。章节含渔船、贸易船、船坞升级、大学科技、新海战克制关系、Catapult Galleon、自爆船与海军特色单位。不是仅讨论尚未发布内容的 PUP 预览。",
    "short": "捕鱼经济 / 海军升级 / 水面克制",
    "language": "英文",
    "symbol": "SEA",
    "caution": "2026-03-03的重做后讲解，之后仍有正式平衡更新。适合作为机制底图，精确数值以当前正式版本为准。",
    "publishedAt": "2026-03-03",
    "access": "公开",
    "mode": "mixed",
    "verification": "2026-11-17：原站 publishDate 与说明全文、章节已核验；本次未取得字幕正文，不复述章节以外的实测结论。",
    "verifiedAt": "2026-11-17",
    "keywords": [
      "混合图",
      "海战",
      "捕鱼",
      "贸易船"
    ],
    "maps": "混合图 / 海图 / Nomad",
    "evidence": "作者简介、章节与原生元数据"
  },
  {
    "id": "map-sotl-conversions-20260508",
    "name": "Spirit Of The Law：2026 僧侣转换机制",
    "author": "Spirit Of The Law",
    "url": "https://www.youtube.com/watch?v=ak1ZAHxwjXo",
    "type": "机制与训练",
    "desc": "作者明确对照2023机制重做前后的转换规则。章节覆盖转换抵抗、最短/最长窗口、2026斥候、建筑转换及其它细节；适合为 Arena 的僧侣控制与交战实验建立问题清单。",
    "short": "转换抵抗 / 时间窗口 / 反僧侣实验",
    "language": "英文",
    "symbol": "MONK",
    "caution": "机制讲解不等于胜率或某场转换的保证；本次只核验作者描述与章节，训练中的具体概率需自行实测。",
    "publishedAt": "2026-05-08",
    "access": "公开",
    "mode": "mixed",
    "verification": "2026-11-17：YouTube 原页日期、作者和说明章节已核验；未取得字幕，不从旧教程或视频标题推算当前转换概率。",
    "verifiedAt": "2026-11-17",
    "keywords": [
      "Arena",
      "僧侣",
      "机制",
      "微操实验"
    ],
    "maps": "Arena / 封闭图 / 僧侣对局",
    "evidence": "作者简介、章节与原生元数据"
  },
  {
    "id": "tg-tatoh-nomad-20260804",
    "name": "TaToH：立陶宛游牧捕鱼开局案例",
    "author": "TaToH",
    "url": "https://www.youtube.com/watch?v=AF_l3VLB5rY",
    "type": "职业实战",
    "desc": "TaToH 本人发布的 Nomad 3v3 实战。作者说明聚焦立陶宛起步带来的渔船经济优势，以及如何把早期优势用于后续对局。作为团队经济比较素材，不包装成通用开局表。",
    "short": "Nomad 3v3 / 捕鱼经济联动",
    "language": "西班牙文",
    "symbol": "T",
    "caution": "实战案例，非结构化逐村教学。作者未在说明标出精确录像补丁；选择同版本、同出生条件的样本对照。",
    "publishedAt": "2026-08-04",
    "access": "公开",
    "mode": "team",
    "verification": "2026-11-17：oEmbed确认当前原题“La apertura de Lituanos que domina Nómada”、作者；watch原页确认日期、Nomad/TG3v3及捕鱼主题。未取得字幕正文。",
    "verifiedAt": "2026-11-17",
    "keywords": [
      "Nomad",
      "3v3",
      "捕鱼",
      "职业第一视角"
    ],
    "maps": "Nomad",
    "evidence": "作者简介与原生元数据"
  },
  {
    "id": "prep-hera-garrison-ama-2025",
    "name": "Hera：Garrison 备赛与比赛日习惯问答",
    "author": "Hera / u/Hera_Aoc",
    "url": "https://www.reddit.com/r/aoe2/comments/1j8aaoe/hera_x_the_garrison_ama/",
    "type": "职业访谈",
    "desc": "本人公开 AMA，已读其备赛、压力和比赛日回答：通过充分准备把注意力放回当前任务；赛前会短暂活动、复习计划，并安排让自己放松的活动。这是选手个人经验，可用于设计自己的赛前流程。",
    "short": "备赛复核 / 比赛日状态",
    "language": "英文",
    "symbol": "PREP",
    "caution": "2025年历史问答，个人习惯不是统一职业标准，也不是医学或运动处方。原页目前只显示相对日期，未据其重构精确发帖日。",
    "publishedAt": null,
    "access": "公开",
    "mode": "mixed",
    "verification": "2026-11-17：直接读取 Reddit 原帖与 u/Hera_Aoc 对应回答；搜索原始回复显示2025年3月，原页绝对发帖日期未独立取得，因此publishedAt留空。",
    "verifiedAt": "2026-11-17",
    "keywords": [
      "职业备赛",
      "心态",
      "比赛日",
      "训练习惯"
    ],
    "maps": "通用 / 赛事地图池",
    "evidence": "原作者正文"
  },
  {
    "id": "prep-league-handbook-2026",
    "name": "The League：3v3 地图池、文明 BP 与比赛规则手册",
    "author": "The League / Daniela, Rbase96, sieste；地图包 Zetnus",
    "url": "https://docs.google.com/document/d/e/2PACX-1vQlc9RQ8NZfSMXB0xJ6yQIt77s0qn-IKdMeOCovnWrJUHsx91GQJDRmb7TdTrz_K99Hgc9NGInTvUxs/pub",
    "type": "官方资料",
    "desc": "赛事主办方原始公开手册。包含不同阶段的地图/文明draft、整轮文明不得重复、3v3阵容、帝王时代sling限制与Nomad开局交互规则；多数地图采用9村起步，BF和Regicide Fortress为例外。适合反向编排训练地图池。",
    "short": "地图包版本 → BP → 阵容覆盖",
    "language": "英文",
    "symbol": "RULES",
    "caution": "赛事专用规则，不能当作排位默认设置。核验版本为V1.9；公开文档可继续更新，比赛前重读。官网HTTPS本次证书异常，已使用其公开原始文档链接。",
    "publishedAt": "2026-04-29",
    "updatedAt": "2026-09-05",
    "access": "公开",
    "mode": "team",
    "verification": "2026-11-17：从主办方官网公开页面取得真实手册链接，成功读取Google Docs发布HTML全文18,598字符；变更记录V1=2026-04-29，V1.9=9月5日。未把本次核验日当发布日期。",
    "verifiedAt": "2026-11-17",
    "keywords": [
      "3v3",
      "文明BP",
      "地图池",
      "赛事规则",
      "备赛"
    ],
    "maps": "The League 15图地图池",
    "evidence": "原作者正文",
    "mapTags": [
      "开放图",
      "封闭图",
      "游牧",
      "混合图"
    ]
  },
  {
    "id": "prep-aoe2cm-author-docs",
    "name": "AoE2 Captains Mode：原作者 BP 规则与预设文档",
    "author": "Siege Engineers / aoe2cm2 maintainers",
    "url": "https://github.com/SiegeEngineers/aoe2cm2#presets",
    "type": "专业工具",
    "desc": "开源项目原始README解释pick/ban/snipe、隐藏与同时选择、排他性，以及地图和文明选项池。可用来核对赛事draft预设，而不是把个人文明排名误当赛事规则。",
    "short": "BP预设 / 隐藏选择 / 地图文明池",
    "language": "英文；工具有中文",
    "symbol": "BP",
    "caution": "工具说明，不自动提供最佳选文明结论；公开README会更新，练习时以赛事指定预设为准。未将代码提交日期当文档发布日期。",
    "publishedAt": null,
    "access": "公开",
    "mode": "mixed",
    "verification": "2026-11-17：已读原仓库README的Presets、pick/ban/snipe、Hidden、Parallel与Option pools正文；原站链接指向aoe2cm.net。",
    "verifiedAt": "2026-11-17",
    "keywords": [
      "文明BP",
      "地图池",
      "训练工具",
      "规则核验"
    ],
    "maps": "按赛事预设",
    "evidence": "原作者正文"
  },
  {
    "id": "prep-draft-acro17",
    "name": "Acro17：团队 BP 准备工具 DRAFT 原作者说明",
    "author": "Acro17 / u/Acro17_AoE",
    "url": "https://www.reddit.com/r/aoe2/comments/1w7dbiz/draft_your_aoe2cm_companion/",
    "type": "专业工具",
    "desc": "原作者公开说明用于群局BP的准备与记录工具：按地图整理个人文明层级，添加角色池，导入aoe2cm链接、将文明分配到地图，并保存结果用于回顾。工具地址为aoe2draft.pro。",
    "short": "地图 × 文明 × 角色的BP备选",
    "language": "英文",
    "symbol": "DRAFT",
    "caution": "公开介绍可读；工具部分功能需登录。本次核验作者说明全文，未实际操作工具或验证每项在线功能；主观层级不代表客观胜率。比赛中使用前应核对赛事规则。",
    "publishedAt": null,
    "access": "公开",
    "mode": "team",
    "verification": "2026-11-17：直接读取原作者发布帖及完整功能/使用说明；工具网站可打开但依赖JS，未据目录或评论日期推断精确发帖日。",
    "toolUrl": "https://aoe2draft.pro/",
    "verifiedAt": "2026-11-17",
    "keywords": [
      "文明BP",
      "群局阵容",
      "地图池",
      "备选方案"
    ],
    "maps": "多地图系列赛",
    "evidence": "原作者正文"
  },
  {
    "id": "pup-winter-2026",
    "name": "官方 PUP · 2026 冬季测试说明",
    "author": "Age of Empires Team",
    "url": "https://forums.ageofempires.com/t/winter-2026-pup-notes/291374",
    "type": "官方资料",
    "desc": "官方冬季公开预览说明，包含平衡、稳定性与社交功能测试。用于提前列出需要复测的单位交互；测试内容不代表正式服已生效。",
    "short": "预览分支 / 待验证变化",
    "language": "英文",
    "symbol": "PUP",
    "caution": "仅适用于 pup_winter 测试分支。官方明确说明 Friends & Groups 不会随下一次更新上线，具体上线时间另行公布。以正式发布说明判断当前版本。",
    "publishedAt": "2026-11-09",
    "access": "公开",
    "verifiedAt": "2026-11-17",
    "evidence": "官方原帖正文",
    "stage": "PUP 预览",
    "keywords": [
      "版本更新",
      "测试分支"
    ],
    "modes": [
      "solo",
      "team"
    ],
    "mapTags": [
      "全地图"
    ]
  }
];

const LESSONS = [
  {
    "id": "scouting",
    "title": "把侦察变成可检验的判断",
    "mode": "solo",
    "tag": "信息与决策",
    "map": "全地图",
    "icon": "search",
    "level": "01",
    "desc": "每次看到新信息，都要改变一个可执行决定。",
    "condition": "敌方开局未完全确认，或你准备加兵营、转兵、升时代之前。",
    "steps": [
      "先记地图约束：前置资源、可封口、侧翼通道与第二金。",
      "用兵营类型、采集分配、已见兵量和缺席的兵力形成两个候选计划；把未知明确保留。",
      "选择最能区分候选计划的下一处侦察；看到信息后决定继续投资、补反制、退守或升时代。",
      "敌军消失时，优先确认其路线与自家薄弱口；不要把未看见等同于没有。"
    ],
    "drill": "从本人 5 场录像中各截 3 个决策点，遮住对手视野。写下已知、未知、两种解释和下一次侦察位置，再揭示全图核验。",
    "metric": "记录判断正确率、信息出现到行动的延迟、因旧信息做出的不可逆投资次数；只与自己同地图样本比较。",
    "metricShort": "判断与行动之间的延迟",
    "pitfall": "用看完录像后的全知视角批评当时决策；只记录看到什么，却没有记录改变了什么。",
    "sources": [
      "hera",
      "capture"
    ]
  },
  {
    "id": "adaptation",
    "title": "封建投资：再压一波，还是转城堡？",
    "mode": "solo",
    "tag": "经济与转型",
    "map": "开放图 / 封闭图",
    "icon": "coins",
    "level": "02",
    "desc": "把下一轮投入与它能兑现的地图收益放在一起比较。",
    "condition": "封建双方已有稳定兵力，你有选择继续加兵、补反制或攒资源上城的空间。",
    "steps": [
      "分别列出新增部队能攻击的资源点、能否穿墙、抵达时敌方是否可能已升级。",
      "核算下一轮兵、关键科技与时代升级的资源冲突，保留必要防守投入。",
      "如果攻击无法兑现，保存已有兵量、保持侦察，把经济转到既定城堡计划；如果能锁住关键资源，明确追加投资的截止条件。",
      "到城堡前提前准备第一轮升级和出兵资源，避免升时代完成后只有空兵营。"
    ],
    "drill": "挑 3 场封建拉长的败局，在第一次可转城堡的时点各写两种方案，比较两分钟后的兵力、经济安全和升级窗口。",
    "metric": "封建追加投资的总成本、关键资源封锁时长、上城后第一轮兵/升级的断档时长。",
    "metricShort": "追加投资与上城后的断档",
    "pitfall": "把更早上城自动当作更优；忽略转型期间失去地图控制的代价。",
    "sources": [
      "hera",
      "tree",
      "survivalist"
    ]
  },
  {
    "id": "economy",
    "title": "城堡期用生产计划倒推经济",
    "mode": "solo",
    "tag": "经济与转型",
    "map": "全地图",
    "icon": "chart",
    "level": "03",
    "desc": "先说清未来两分钟要生产什么，再分配村民。",
    "condition": "准备加 TC、增加军营或切换主力兵种时。",
    "steps": [
      "确定主力兵种、持续运转的生产建筑数量、村民生产和下一项关键科技。",
      "用单位成本及训练速度估算每分钟资源需求，再将需求换成采集配置。",
      "把农田补种、建筑、科技和增援步行时间加入预算；分别检查短期库存与长期收入。",
      "资源堆积时判断是生产建筑不足、配比错误还是主动攒时代，不用盲目加建筑掩盖配比问题。"
    ],
    "drill": "同一文明与地图做两次 10 分钟城堡期练习：首次记录断兵与库存，第二次只调整经济配比，比较输出。",
    "metric": "军营有效运转率、每类资源库存峰值、关键科技延迟、加 TC 后主力兵量缺口。",
    "metricShort": "有效出兵率与资源库存",
    "pitfall": "把工具输出当作实战精确答案；走路、拥挤、骚扰、经济升级与文明加成都可能改变需求。",
    "sources": [
      "survivalist",
      "tree",
      "insights-pro"
    ]
  },
  {
    "id": "timing",
    "title": "科技窗口：升级完成时，军队在哪里？",
    "mode": "solo",
    "tag": "交战与控图",
    "map": "全地图",
    "icon": "clock",
    "level": "04",
    "desc": "科技优势需要足够兵量、正确位置和及时交战。",
    "condition": "即将进入新时期、完成主力兵升级或铁匠铺关键科技。",
    "steps": [
      "确认该升级改变了哪些实际交互：射程、伤害、护甲或移动；用当前科技树核查。",
      "提前保存可受益的兵量，避免升级完成前用主力硬换。",
      "让增援与主力在安全点集合，计算行军时间，使科技窗口发生在可争夺区域。",
      "若对手已准备克制单位或地形不利，转为压资源、抢位置或迫使其防守，重新评估交战。"
    ],
    "drill": "在 5 段关键升级完成前后各回看 60 秒，标出军队位置、双方科技、增援和可攻击目标。",
    "metric": "升级完成至首次有效施压的间隔、窗口前损失的主力资源、窗口带来的资源点或位置收益。",
    "metricShort": "升级后的有效施压间隔",
    "pitfall": "只比较兵数，不核对升级、兵种构成、地形和增援距离。",
    "sources": [
      "tree",
      "hera",
      "capture"
    ]
  },
  {
    "id": "mapcontrol",
    "title": "把军力优势变成地图控制",
    "mode": "solo",
    "tag": "交战与控图",
    "map": "开放图 / 封闭图",
    "icon": "map",
    "level": "05",
    "desc": "压住资源与增援路线，让领先持续产生收益。",
    "condition": "主力更强，但对手缩在 TC、城堡或狭窄防区内。",
    "steps": [
      "圈出对手下一处必须使用的金、石、木线与扩张方向。",
      "选择能够覆盖这些资源又有撤退路径的前线位置，保护攻城器和增援线。",
      "区分牵制、攻城和侧翼骚扰的任务；不要让所有兵都挤在一个防御点。",
      "每次推进后检查后方经济、侧面通路和对手转兵；资源封锁无法维持时及时收缩。"
    ],
    "drill": "复盘一场领先后输掉的录像：从首次兵力领先开始，每两分钟标一张资源控制图，指出领先为什么没有转成持久收益。",
    "metric": "安全控制的中立资源点数量、攻城器暴露损失、增援被截次数、领先后新增经济损失。",
    "metricShort": "资源控制与增援路线",
    "pitfall": "把击杀数当成地图控制；军队追击时把自家金矿与攻城器交给对手。",
    "sources": [
      "hera",
      "capture",
      "insights"
    ]
  },
  {
    "id": "micro",
    "title": "微操收益要扣掉宏观损失",
    "mode": "solo",
    "tag": "交战与控图",
    "map": "全地图",
    "icon": "swords",
    "level": "06",
    "desc": "好看的操作，必须经得起全局资源核算。",
    "condition": "投石、僧侣或远程拉扯占用大量注意力，同时家中还要维持经济与出兵。",
    "steps": [
      "把军队按任务编组，设置可安全停放的集结点和撤退路径。",
      "只对高价值或能改变战斗结果的交互投入持续微操；交战前处理生产队列、住房与经济警报。",
      "在军队后撤或重新集结的空隙检查 TC、主力生产和经济；用固定热键建立短循环。",
      "复盘同时计算战斗赚取的资源和期间宏观断档，不凭局部胜负评价操作。"
    ],
    "drill": "练习一场双线攻击，结束后只查每次长时间操作军队期间出现的 TC 空闲、卡人口与闲置村民。",
    "metric": "局部战斗资源交换、同期 TC 空闲秒数、主力生产断档、卡人口时长；比较训练前后净改善。",
    "metricShort": "微操所得与宏观所失",
    "pitfall": "追求 APM 数值；动作更多不等于信息处理、资源转化或决策更好。",
    "sources": [
      "viper",
      "insights-pro",
      "fundamentals"
    ]
  },
  {
    "id": "lategame",
    "title": "帝王期提前设计主战场和补兵结构",
    "mode": "solo",
    "tag": "经济与转型",
    "map": "全地图",
    "icon": "castle",
    "level": "07",
    "desc": "从现有主力延伸出可持续的军队，而不是临时重建一套体系。",
    "condition": "准备升帝、争夺最后金矿，或主力兵种即将被完整反制。",
    "steps": [
      "确认本文明可用的帝王升级与反制缺口，计算主力升级、攻城和辅助兵的竞争预算。",
      "按地图资源判断未来黄金流，提前安排廉价辅助兵、僧侣或攻城器的比例。",
      "生产建筑沿安全补兵路线布置，给侧翼骚扰和主战场分别设置集结点。",
      "在黄金或空间消耗完之前转型；用少量新兵验证效果，再扩大投入。"
    ],
    "drill": "挑一场 40 分钟以上的对局，在每次丢金矿或切换主力前暂停，写出剩余黄金来源、未来三项支出和补兵路线。",
    "metric": "关键升级完成时间、主力补兵到达间隔、无保护攻城损失、转型时被迫停产的时长。",
    "metricShort": "转兵成本与补兵间隔",
    "pitfall": "只看纸面最终兵种组合，忽略到达组合所需的黄金、建筑与时间。",
    "sources": [
      "tree",
      "survivalist",
      "capture"
    ]
  },
  {
    "id": "reflection",
    "title": "复盘只改一个可重复的决策",
    "mode": "solo",
    "tag": "复盘与备赛",
    "map": "全地图",
    "icon": "play",
    "level": "08",
    "desc": "把一场失败转成下一轮训练能验证的假设。",
    "condition": "对局结束后，尤其是相同地图或相同转型连续失利时。",
    "steps": [
      "从时间轴找最早的不可逆损失，区分经济执行、信息缺失、战略选择与操作失误。",
      "回到玩家当时视野，列出可得信息和两个可行替代，不把结果当成决策质量。",
      "只选一个高频、可控制的问题，写成如果出现 A，就执行 B 的训练规则。",
      "接下来 5 场只跟踪该规则是否执行、是否改善局面；必要时再修正规则。"
    ],
    "drill": "每场记录三行：关键时刻与证据、下次触发条件与行动、一个可量化指标。每 5 场做一次小结。",
    "metric": "规则执行率、同类错误复发次数、关键时段资源损失；长期才看同条件胜率，避免用单场 Elo 波动判断训练。",
    "metricShort": "规则执行与错误复发率",
    "pitfall": "一场列出二十个问题却没有下一场的具体动作；只研究输局而忽略赢局中的坏决策。",
    "sources": [
      "capture",
      "insights-pro",
      "hera"
    ]
  },
  {
    "id": "defense",
    "mode": "solo",
    "tag": "交战与控图",
    "map": "开放图 / 封闭图",
    "icon": "shield",
    "level": "09",
    "title": "防守投资：多守一分，还是错过反击？",
    "desc": "防御需要买到可利用的时间，让安全窗口转化为自己的下一波战力。",
    "condition": "侦察到敌军集结，而自己准备加 TC、升级时代或转兵。先判断进攻组成和抵达时间。",
    "steps": [
      "标出敌军可到达的资源点与当前安全采集区，确定最小防守范围。",
      "比较小墙、静态防御、反制兵与撤离的总成本，核对其是否能在接敌前完成。",
      "给防守设定目的：等升级、等反制兵量，或掩护经济转移；同时继续观察敌方投入。",
      "敌人撤退或进攻升级时重新评估。反击前核对主力存量、科技和对手增援，避免为夺回主动硬打。"
    ],
    "drill": "从三场被压录像截取第一次预警时点，分别写最低可行防守和过度防守方案；比较两分钟后可用经济、兵力与科技。",
    "metric": "防守总投资、资源区停工时间、村民与主力损失、稳定后首次反击间隔。把成功守住和经济被锁分开记录。",
    "metricShort": "最低防守成本与反击间隔",
    "pitfall": "只要没死村就认为防守成功；忽略大量闲置采集和过度补反制造成的升级延迟。",
    "sources": [
      "hera",
      "capture",
      "survivalist"
    ]
  },
  {
    "id": "draft",
    "mode": "solo",
    "tag": "复盘与备赛",
    "map": "全地图",
    "icon": "flag",
    "level": "10",
    "title": "备赛与 BP：为地图准备两套可切换计划",
    "desc": "从规则和地图约束出发，用可验证的对手样本准备主方案与侦察触发的备选。",
    "condition": "准备训练赛或正式比赛，已知地图池、文明选择规则、地图脚本和游戏版本。",
    "steps": [
      "先读赛事规则，确认模式、禁选顺序、文明是否可重复以及地图版本；历史比赛只作学习样本。",
      "按地图资源安全、接敌距离、海陆比重和关键中立资源，列出自己熟练的文明与科技缺口。",
      "在 AoE2 Insights 选相同地图、相近版本的对手录像，记录其重复决策；小样本只提出假设。",
      "为首选方案写明侦察触发条件、资源预算与退出条件；训练赛测试备选，避免只练理想开局。"
    ],
    "drill": "选择一张将打的地图，完成一页赛前简报：规则、主计划、备选、两个侦察分岔、一个对手假设；赛后逐项核对。",
    "metric": "关键规则漏项、计划切换是否及时、对手假设被证实或推翻的证据、陌生局面下的执行断档。",
    "metricShort": "备选触发条件与样本证据",
    "pitfall": "把文明天梯胜率当作自己对局必胜依据；忽略操作熟练度、版本、对手和地图脚本的差异。",
    "sources": [
      "tree",
      "insights",
      "hera",
      "worldcup-official"
    ]
  },
  {
    "id": "tg-sync",
    "title": "双压不是两个单挑：先会合，再开战",
    "mode": "team",
    "tag": "协同与节奏",
    "map": "开放图",
    "icon": "users",
    "level": "01",
    "desc": "把弓兵火力与骑兵机动整合成一次有保护的交战，而不是各自抵达、各自损失。",
    "condition": "开放陆地图；双方弓骑组合；一方首批兵刚到，另一方尚在路上。若地图是 Arena、黑森林、纯水或游牧，先重定角色与集合路径。",
    "steps": [
      "赛前确定主攻侧、会合点、撤退方向和谁负责侦察对面 pocket。",
      "进攻前依次报兵量、升级、位置与到达时间；弓兵不要为了早开火走出骑兵保护。",
      "骑兵限制敌弓移动，弓兵优先输出可安全打到的目标；遇 TC、山地或敌方增援及时重估。",
      "目标不是必须杀村：逼出对手不利资源迁移、保住己方主力并延续下一波，同样可算取得主动。"
    ],
    "drill": "固定搭档重复同一前 18 分钟场景 3 次；每次只更换会合路线或首波交战点，保留对方视角用于复盘。次数为本站练习建议。",
    "metric": "两军首批实际会合时差（游戏秒）；己方任意一军单独暴露于敌方双军的累计时间；首次交战后主力存活数、增援距离与双方闲置经济",
    "metricShort": "会合时差与主力存活",
    "pitfall": "把追杀残血当作赢团；骑兵追远后，弓兵被对面骑兵包住。",
    "sources": [
      "hera-2v2",
      "viper-nations"
    ]
  },
  {
    "id": "tg-defense",
    "title": "被双压时：守、撤、反压要有同一个答案",
    "mode": "team",
    "tag": "防守与转线",
    "map": "开放图",
    "icon": "shield",
    "level": "02",
    "desc": "先判断基地能撑多久，再决定援军、转移经济或对侧换伤害。",
    "condition": "己方 flank 确认敌方两军合流；资源区或生产建筑将受压；队友尚未到达。",
    "steps": [
      "用敌军组成、已知数量、到达位置报告危险；同时报可采的备用金木与撤离通道。",
      "估算现有墙体、TC 火力和军队能否撑到援军；可撑则收缩阵地，让两军在守军附近会合。",
      "撑不到则提前迁移村民与生产，不用主力交换一个注定守不住的外置建筑。",
      "队友只有在明确知道弱侧能存活、且反压能产生足够收益时才继续进攻；否则先救主力和关键经济。"
    ],
    "drill": "找 3 段被双压录像，在敌军接触前暂停；每位队员独立写守/撤/反压及依据，再对照实际结果。",
    "metric": "发现双压至首次有效报点间隔；援军到达前的村民损失与关键生产保有情况；迁移后恢复稳定采集所需时间；队友反压是否真的造成可验证损失",
    "metricShort": "报点延迟与经济恢复",
    "pitfall": "不断说“救我”却不报位置和可撑时间；或全队无条件回防，让另一侧完全失去压力。",
    "sources": [
      "hera-2v2",
      "viper-nations",
      "captureage-timeline"
    ]
  },
  {
    "id": "tg-timing",
    "title": "城堡时代同步窗口：比较的是到场战力",
    "mode": "team",
    "tag": "协同与节奏",
    "map": "开放图",
    "icon": "clock",
    "level": "03",
    "desc": "升级完成时间只是输入；升级后的兵是否能同时到场，决定窗口是否可用。",
    "condition": "一方准备升城，另一方仍要大量投资封建；或骑士与弩手升级将先于对手形成战力。",
    "steps": [
      "在点击升城前交换预计升城完成时间、兵量、升级顺序与补兵计划。",
      "若弓兵先到城但骑士晚到，先保住弓兵量，避免独立接敌浪费升级优势。",
      "决定本次窗口目标：敌军主力、外置金矿、生产链或关键前置；给窗口设退出条件。",
      "结束后核查损失、浮动资源和生产停顿，再决定追加军力还是补经济。"
    ],
    "drill": "同搭档打 3 局相同文明组合，分别测试同步进攻、单方提前升级和短暂守势；不以一局胜负判定最优路线。",
    "metric": "关键升级完成到两军可交战的时间差；窗口开始与结束时的可用军队资源价值；军队投资带来的资源区控制或经济损失；窗口期间 TC 与生产建筑停顿",
    "metricShort": "升级与到场战力同步",
    "pitfall": "把个人最快升城当团队最佳节奏；升城时让搭档独自损失封建主力。",
    "sources": [
      "hera-2v2",
      "tree",
      "captureage-idle"
    ]
  },
  {
    "id": "tg-switch",
    "title": "转边之前，先算路程与暴露成本",
    "mode": "team",
    "tag": "防守与转线",
    "map": "开放图",
    "icon": "map",
    "level": "04",
    "desc": "一波转边必须换到比丢掉原侧更大的收益；先用视野证明机会，再移动主力。",
    "condition": "原侧僵持、敌方另一侧暴露或某队友即将崩溃；己方骑兵可快速转线。",
    "steps": [
      "确认敌方主力最后位置及情报时效；未知不等于没有兵。",
      "报转边目标、预计到达时间、留守兵量和原侧撤退路线。",
      "移动前让原侧弓兵退至可守地形，安排侦察防止敌人跟进穿家。",
      "若另一侧增援到齐或目标已撤走，及时取消；不要为完成既定路线而强打。"
    ],
    "drill": "从一段 4v4 第一视角选 5 个疑似转边节点；画出两条候选路线，比较行军耗时、目标收益和原侧风险。",
    "metric": "转边命令至实际接敌时间；行军期间原侧兵村与资源区损失；到达后是否形成局部兵力优势；有效情报到决策间隔",
    "metricShort": "行军耗时与原侧损失",
    "pitfall": "用全图视角复盘时批评当时合理的选择；必须还原玩家已知信息。",
    "sources": [
      "viper-nations",
      "captureage-timeline"
    ]
  },
  {
    "id": "tg-trade",
    "title": "贸易先问能否活到回本，再问路线够不够长",
    "mode": "team",
    "tag": "贸易与复盘",
    "map": "全地图",
    "icon": "coins",
    "level": "05",
    "desc": "把贸易当作有生存概率和回本时间的投资；安全、产能、升级与军力要一起安排。",
    "condition": "天然金矿消耗、队伍预计进入持久战；或考虑提早建立贸易经济。不可套用固定“某分钟必须开贸易”。",
    "steps": [
      "队伍确认当前金矿、黄金消耗、前线压力与可守的市场走廊。",
      "比较商队投入与当下军队、升级和补村需求；先测一小批实际往返，再决定扩张速度。",
      "规划市场位置、通道宽度与墙/城堡/巡逻；路线长但过于暴露时，应优先可靠收入。",
      "按当前版本核对 Caravan、文明与队伍加成；受到袭扰时记录停运、损失和重建时间，必要时改线。"
    ],
    "drill": "自建地图对比两条贸易路线：一条较长但受压，一条较短且受保护；记录相同游戏时段的净黄金与新增军队支出。",
    "metric": "商队、市场与升级的累计投入；单位时间实际贸易金收入；损失及被迫停运时间；回本时点与同期前线战力变化",
    "metricShort": "实际收入、损失与回本",
    "pitfall": "引用旧视频的精确贸易数值，或只比较单车满载黄金，忽略车速、往返、拥堵和存活率。",
    "sources": [
      "sotl-trade",
      "tree",
      "captureage-pro"
    ]
  },
  {
    "id": "tg-review",
    "title": "从队伍录像建立可重复的配合协议",
    "mode": "team",
    "tag": "贸易与复盘",
    "map": "全地图",
    "icon": "play",
    "level": "06",
    "desc": "每次复盘只改一条团队规则，并用下一场训练验证它。",
    "condition": "固定队准备地图池、文明分配或训练赛；团队认为“配合有问题”但说不出触发点。",
    "steps": [
      "赛前按地图定义角色：开放图的弓骑协作不能直接当作 Arena、黑森林、游牧或混合图的固定答案。",
      "核对比赛规则、文明池、地图版本和可能的队伍加成；把分工写成主方案与侦察触发的备选方案。",
      "复盘挑一个转折点，从接触前倒看：当时看见什么、谁发出什么信息、可执行选项有哪些。",
      "把结论写成条件→口令→行动→退出条件，下一场只验证这一条；同步保留反例。"
    ],
    "drill": "每个训练日选 1 局胜局与 1 局败局，各只复盘一个团队决策；以接近的地图、文明和版本比赛作对照。",
    "metric": "错误发生前是否已获得足够信息；口令后各队员动作是否一致；同类错误在后续可比场景中是否减少；个人 TC 闲置与团队转折是否存在时间关联",
    "metricShort": "口令一致性与错误复发",
    "pitfall": "把比分或团队平均 APM当作原因；把多 TC 的聚合闲置时间误读为单个 TC 真实停产秒数。",
    "sources": [
      "captureage-pro",
      "captureage-timeline",
      "captureage-idle",
      "viper-nations",
      "worldcup-official"
    ]
  },
  {
    "id": "new-solo-openings",
    "title": "新文明开局：为每条路线写退出条件",
    "mode": "solo",
    "tag": "2026 专题",
    "map": "开放图",
    "icon": "flag",
    "level": "11",
    "desc": "同一文明准备两种可切换方案，比背熟一条人口流程更可检验。",
    "condition": "新文明对位准备，或对手的封建兵种使你原开局失去攻击目标时。",
    "steps": [
      "以当前正式服科技树建立一页对位表：第一波兵、必需科技、防守成本与城堡后计划。",
      "对血统斥候、剑士压制、直城等路线分别写继续与退出的信号；把敌方兵量、墙和金木位置纳入条件。",
      "不要未经正文验证就复制付费教程的流程；用可读数据自行搭建测试，再与本人能访问的原教学核对。",
      "同地图固定对手做两种路线测试，分别观察第一次施压与第二轮兵到达，而不是只比较上时代时间。"
    ],
    "drill": "选瓦良格、撒克逊或丹麦其中一个文明，做6局约练：每条路线3局。赛前写退出条件，赛后标记触发后是否及时切换。",
    "metric": "开局退出条件执行率、第一波到达至收益兑现的时间、转型期间的村民与资源损失；不设统一职业及格线。",
    "metricShort": "开局退出条件执行率",
    "pitfall": "把新DLC攻略一律视为当前最优；把单局成功或教练标题当作胜率证明。",
    "sources": [
      "new-hera-opening",
      "new-hera-varangians",
      "new-hera-saxons",
      "new-hera-danes"
    ],
    "addedAt": "2026-11-16"
  },
  {
    "id": "new-solo-transition",
    "title": "转兵预算：给过渡期安排一支能守住的军队",
    "mode": "solo",
    "tag": "2026 专题",
    "map": "全地图",
    "icon": "coins",
    "level": "12",
    "desc": "转型前就计算新军成型之前的风险窗口。",
    "condition": "对手反制已成形，或旧主力的地图收益不足以继续投资时。",
    "steps": [
      "列出旧军维持成本、新建筑、新科技、新军第一批兵量和必需防守的总支出。",
      "明确哪一类旧兵停止补充、哪一类保留拖时间；避免两套体系同时全速生产却没有一套能打。",
      "把新军成型前的时间分成至少两个检查点：资源是否足够、对手主力在哪、是否仍有安全退路。",
      "成型后先争一个资源点或赢一场可控交战，再决定继续扩大新军比例。"
    ],
    "drill": "复盘3次失败转型。在决定转兵时暂停，做一张成本与时间表，比较实际断兵点和理想衔接点。",
    "metric": "旧军停产至新军可用的间隔、期间掉村资源、库存结构、第一场交战资源交换；指标用于本人前后比较。",
    "metricShort": "过渡期断兵与资源损失",
    "pitfall": "只问最终兵种能否克制，却忽略新军到场前已失去黄金、空间或主力。",
    "sources": [
      "new-hera-transition",
      "new-patch-185872"
    ],
    "addedAt": "2026-11-16"
  },
  {
    "id": "new-solo-attacking",
    "title": "进攻循环：压资源、逼反应、再换目标",
    "mode": "solo",
    "tag": "2026 专题",
    "map": "全地图",
    "icon": "target",
    "level": "13",
    "desc": "每轮推进前写清想迫使对手付出的成本。",
    "condition": "已有兵力主动权，但正面防御使推进收益下降时。",
    "steps": [
      "选择一个实际能触及的收益：压住黄金、迫使停工、拆关键建筑或切断增援。",
      "写下对手最可能的两个应对，并给每个应对安排后续；侦察确认之前不把假设当事实。",
      "保留前线视野与撤退点，让攻城器、增援线和家中经济同时得到保护。",
      "本轮目标完成或失去实现条件后，重新核对双方兵力、科技与资源，决定换目标、撤退或升级。"
    ],
    "drill": "从一次领先未兑现的对局中剪出3轮进攻，逐轮写目标、对手应对、下一步和实际经济收益。",
    "metric": "每轮进攻消耗的己方军队资源、造成的停工/资源封锁、增援被截次数，以及同期家中损失。",
    "metricShort": "每轮收益与同期损失",
    "pitfall": "攻击目标已被保护仍持续送兵；把迫使对手造反制当成零收益，或把高击杀当成必然赢局。",
    "sources": [
      "new-hera-attack",
      "new-hera-gap"
    ],
    "addedAt": "2026-11-16"
  },
  {
    "id": "new-solo-patchlab",
    "title": "版本实验室：把补丁变成对位测试",
    "mode": "solo",
    "tag": "2026 专题",
    "map": "全地图",
    "icon": "refresh",
    "level": "14",
    "desc": "每次重大更新只优先验证自己常用对位中最可能改变决策的交互。",
    "condition": "旧攻略的兵种路线、独特科技或反制方案与当前正式服不一致时。",
    "steps": [
      "先在官方补丁和当前科技树中确认变化，记录补丁号；测试服与正式服分别保存。",
      "从自己的文明池挑3个受影响交互，例如旧骑射路线改为Mounted Crossbowmen、法兰克掷斧兵射程、葡萄牙僧侣对攻城器的能力。",
      "在相同资源预算、升级、地形与兵量条件下做对照；分别测试正面交战、追击和撤退。",
      "将结果写成可用于实战的决策规则，并列明不适用条件；完成后用约练复核经济成本与成型时间。"
    ],
    "drill": "每个新补丁做3张实验记录：变量、对照条件、观察结果、下次实战动作。先覆盖常玩文明，再扩展。",
    "metric": "受影响对位覆盖率、旧笔记更正数、实验规则在约练中是否可执行；不从少量实验推导总体胜率。",
    "metricShort": "版本差异与实验对照",
    "pitfall": "只看纸面DPS就宣布新meta；复用不同补丁、不同升级或不同资源规模的结果。",
    "sources": [
      "new-patch-185872",
      "new-hera-gap",
      "patch",
      "tree"
    ],
    "addedAt": "2026-11-16"
  },
  {
    "id": "map-arena-space",
    "title": "Arena：圣物、出门权与升帝窗口一起定价",
    "mode": "solo",
    "alsoTeam": true,
    "tag": "地图专项",
    "map": "封闭图 · Arena / Amazon Tunnel",
    "icon": "castle",
    "level": "MAP / 1",
    "desc": "圣物数量只是结果；为了得到它付出的轻骑、僧侣、TC 延迟和位置风险，决定这笔投资是否成立。",
    "condition": "石墙或狭口使早期经济较安全；进入城堡时代前，团队必须决定争地图还是集中经济。Amazon Tunnel 的中央通道与圣物分布不能直接等同 Arena。",
    "steps": [
      "升城期间先标出己方、争议与敌方可达圣物，记录敌侦察兵和可疑前置村。",
      "明确争夺预算与可接受的 TC 延迟；不因对面出轻骑就无上限跟投。",
      "把僧侣路线、护送兵、退路和门控一起安排，避免一次失误既丢僧侣又丢出门权。",
      "遇围城、塔或城堡施压，优先确认是否还能安全采金石和建立反制；必要时让出远端圣物换安全升帝。"
    ],
    "drill": "同种文明对局重复争圣物与少争圣物两条路线；在相同游戏时间比较经济、可用军队与外出空间，不只看最终圣物数。",
    "metric": "首次可安全出门的时间与持续长度；每座新增圣物附带的兵力损失和 TC 延迟；升帝点击时资源、生产能力与已知敌方威胁；争夺预算是否因为临场情绪失控",
    "metricShort": "圣物预算与出门权",
    "pitfall": "照搬开放图“必须不断出兵”；或只评价圣物几比几，忽略更早升帝和关键资源封锁的机会成本。",
    "sources": [
      "f1re-mapplans-20261020",
      "hera-arena-20260325"
    ],
    "addedAt": "2026-11-16"
  },
  {
    "id": "map-rf-contingency",
    "title": "黑森林 / RF：偷渡失败后的二次计划",
    "mode": "team",
    "alsoTeam": false,
    "tag": "地图专项",
    "map": "封闭图 · 黑森林 / RF",
    "icon": "tree",
    "level": "MAP / 2",
    "desc": "早期计划被发现后，重新评估前置资产、狭口宽度与团队投产方向，而不是继续投入沉没成本。",
    "condition": "前置村或偷渡被发现；关键通道被墙；或者队友已有围城潜力但缺保护与视野。",
    "steps": [
      "开局先共享所有已知通道、墙线、池塘和敌方前置；按真实地形分配防守和经济角色。",
      "偷渡失败立即盘点剩余村民、兵营与逃生路径；判断还能牵制、转产，还是应停损。",
      "突破前同时核对攻城、保护兵、维修村、视野与后方续兵；狭口限制下，更多近战单位未必更有价值。",
      "用小股威胁测试敌方调动，再决定正面推进、切口或改攻另一侧；每次切换明确谁负责防止反穿。"
    ],
    "drill": "从 DauT 的 RF 案例挑“计划失败”的暂停点，先写三条后续方案；再对照 Hera 黑森林纯攻城素材，记录什么保护条件让昂贵攻城单位能持续工作。",
    "metric": "发现偷渡失败到停止无效增援的间隔；前置资产造成的实际牵制时间；攻城单位有效输出时间与被孤立损失；突破后支援到达时间和己方通道安全性",
    "metricShort": "前置止损与攻城保护",
    "pitfall": "把 RF 的角色固定为开放图 flank 弓、pocket 骑；或因为已投前置村就继续追加资源，忽略原侧即将失守。",
    "sources": [
      "daut-rf-20261020",
      "hera-bf-20261110"
    ],
    "addedAt": "2026-11-16"
  },
  {
    "id": "map-nomad-location",
    "title": "Nomad / African Clearing：落 TC 后仍要更新地图判断",
    "mode": "solo",
    "alsoTeam": true,
    "tag": "地图专项",
    "map": "游牧 · Nomad / African Clearing",
    "icon": "map",
    "level": "MAP / 3",
    "desc": "选址需要同时考虑可持续资源、队友距离与对手威胁；落地快只是其中一项。",
    "condition": "无初始 TC 的地图；Nomad 有潜在船坞捕鱼，而 African Clearing 的岸鱼/池塘与行军空间形成不同约束。两图不能共用同一个固定开局。",
    "steps": [
      "在有限探索内比较可持续食物、木线、金石和队友位置；记录为选址多走路的代价。",
      "Nomad 另核对船坞村安全、可捕鱼水面及未来转移路线；African Clearing 核对村民到食物与木材的距离。",
      "落 TC 后立即更新敌我位置关系：贴脸局、被夹局与远端安全局应调整速城与防御投资。",
      "墙线要保留军队出入口与资源扩张路径；遭遇压制时预先指定可迁移的第二资源区。"
    ],
    "drill": "保存 5 个不同出生点，给每个点写下“选址理由、已知缺陷、触发改计划的信息”；用同一个种子测试两处 TC，而不是只比较升级时间。",
    "metric": "TC 开建时间与为选址增加的行走时间；10/15/20 分钟可安全使用的食物与金矿；渔业或岸鱼受压后的经济恢复时间；升城前是否已识别最近敌人和可行增援路线",
    "metricShort": "选址代价与安全资源",
    "pitfall": "把某文明演示当所有文明通用流程；为了漂亮墙线把自己封在缺金、缺木或无法出兵的区域。",
    "sources": [
      "f1re-nomad-20261020",
      "f1re-african-20261020",
      "official-naval-169123"
    ],
    "addedAt": "2026-11-16"
  },
  {
    "id": "map-hybrid-budget",
    "title": "混合图：为下一单位水军写出停止投资条件",
    "mode": "solo",
    "alsoTeam": true,
    "tag": "地图专项",
    "map": "混合图 / 海图",
    "icon": "flag",
    "level": "MAP / 4",
    "desc": "水面优势只有转成持续食物、黄金或陆地机会才有意义；输水也不必自动等于输局。",
    "condition": "水陆均能投入经济或军队；队伍准备争水、保鱼或通过陆地惩罚敌方水军投入。",
    "steps": [
      "先核实当前正式版本船型克制、渔船机制和升级路径；把重做前教程的时序与兵数列为待重测。",
      "赛前声明主争水、最低保鱼或让水打陆的计划，附侦察触发条件；群局另报队友水陆投资。",
      "每轮续船前检查：还能保护多少有效采集、对手续船与船坞位置如何、陆地是否存在可兑现窗口。",
      "达到停止条件就转木材与黄金用途；保留回水所需视野和船坞条件，但不为夺回水面而无限续投。"
    ],
    "drill": "同一混合图比较保鱼、争水、让水打陆三条路线；固定观察时段，记录净资源与陆地压力。训练方案由本站设计，不是 Hera 视频的逐条结论。",
    "metric": "水面累计投入对比安全采集的实际资源；战船空转时间、渔船停工与损失；水面升级导致的陆军/升城延迟；停止条件出现后转产所需时间",
    "metricShort": "水陆净收益与止损转产",
    "pitfall": "沿用 2025 火船克制和渔船回本估算；把占领空水面当作成功，却错过陆地破口或升城窗口。",
    "sources": [
      "official-naval-169123",
      "hera-wu-hybrid-20250515",
      "f1re-mapplans-20261020"
    ],
    "addedAt": "2026-11-16"
  },
  {
    "id": "tc-investment-gate",
    "mode": "solo",
    "tag": "经济决策",
    "icon": "coins",
    "level": "ADVANCED",
    "title": "加第二、第三 TC 前，先通过投资检验",
    "desc": "把扩张经济与现有军力能否兑现收益放在同一张决策表中。",
    "map": "开放图 / Arabia",
    "metricShort": "扩张后的防守与持续生产",
    "condition": "城堡期准备加 TC，尤其是已有军力主动权、刚遭受损失，或考虑一 TC 科技进攻时。",
    "steps": [
      "先从对手地图判断现有军队还能否拿到黄金、打到弱点或迫使停工；若要继续投资军队，明确收益目标与停止条件。",
      "再从自己地图判断：资源是否暴露、敌军位置是否已确认、更多农民出现前能否守住更大的军队。",
      "分别写出加 TC 与继续一 TC 两种方案，列出接下来两分钟要支付的村民、兵、科技与建筑；不要只算 TC 的建造成本。",
      "按文明阶段强弱与当前战损修正方案，给新 TC 设置能否持续造村和保住资源的检查点。"
    ],
    "drill": "选三场城堡期录像，在实际加 TC 前暂停。保留当时视野，为两条方案各写目标和风险。约练时从相近存档分别执行一轮，比较两分钟后的可用军力、村民产出与安全资源。",
    "metric": "新增 TC 后的累计空闲秒数、第一轮增援到场时间、遭受骚扰的资源损失、计划攻击目标是否兑现。按相同文明和地图比较个人记录，不设职业资格线。",
    "pitfall": "把“经济永远越早扩越好”或“一 TC 应该打死对手”当成无条件规则；刚受损就加 TC，却没有恢复持续产村与防守所需的资源流。",
    "sources": [
      "f1re-tc-decision",
      "survivalist-reset-drills"
    ],
    "attribution": "本站编辑基于作者公开简介的问题链设计；训练流程与指标为本站综合。",
    "addedAt": "2026-11-17",
    "editorial": true
  },
  {
    "id": "attack-army-information",
    "mode": "solo",
    "tag": "风险判断",
    "icon": "map",
    "level": "ADVANCED",
    "title": "地图控制之后，还要重新找敌军",
    "desc": "决定出门时，把敌军最后位置和自己离家风险分别写清楚。",
    "map": "开放图 / Arabia",
    "metricShort": "失联敌军与出击收益",
    "condition": "刚赢下一波交战、取得中场控制，或准备把防守兵带去反压时。",
    "steps": [
      "给敌军标记最后一次出现的位置、时间和可能路线；把“没看见”保留为未知，而不是自动判断安全。",
      "分别判断经济领先和军力领先，检查本轮进攻能攻击哪处资源，以及家中失去这支兵会暴露什么。",
      "比较主力出门、少量骚扰、暂守等待升级三条行动；为每条写清触发条件和重新侦察的点位。",
      "防住斥候或剑士后重新做这一步：可以用小规模前压迫使对手花资源防守，但只有自家风险可控才增加投入。"
    ],
    "drill": "从五段自己夺回主动权的录像中隐藏全图，各写一次出门方案及必须确认的信息，再揭示敌军真实路线。下一轮约练只跟踪一个最常漏掉的信息点。",
    "metric": "军队离家到首次有效收益的时间、因失联敌军造成的掉村/停工、逼出的防御投资，以及反压期间自身持续生产是否断档。记录几项原始量，不把它们硬合成虚构评分。",
    "pitfall": "赢一场局部战斗就假定已掌握所有敌军；也不要因为自家不安全就无限留兵，放任对手自由围墙铺田。",
    "sources": [
      "f1re-attack-checklist",
      "f1re-scout-pressure",
      "f1re-small-wall-review"
    ],
    "attribution": "本站编辑训练设计；决策问题参考作者本人简介，具体行动需结合当前地图与版本。",
    "addedAt": "2026-11-17",
    "editorial": true
  },
  {
    "id": "upgrade-purpose-lab",
    "mode": "solo",
    "tag": "机制实验",
    "icon": "shield",
    "level": "ADVANCED",
    "title": "一次升级，究竟改变了几次攻击？",
    "desc": "用明确目标和相同条件，检验攻击、护甲与生命值的实际收益。",
    "map": "全地图",
    "metricShort": "攻击次数与存活阈值",
    "condition": "准备为主力投资铁匠铺、生命值或特殊科技，但不确定升级是否会改变下一场交战时。",
    "steps": [
      "先选本轮目标：骚扰村民、正面对兵、保护攻城器或拆建筑，再确定要比较的己方单位与目标单位。",
      "在当前正式服只改变一项科技，固定双方数量、其他升级、地形和初始距离，记录击杀所需攻击次数、己方存活和交战耗时。",
      "把静止测试和移动/拉扯测试分开；再做一组相同资源预算的实战选择，观察花钱升级是否挤掉关键兵量。",
      "研究骆驼弓或 Fire Archer 等特殊单位时，分别核查当前护甲类别、额外伤害、生产成本与对建筑表现，不能从一个目标推导所有目标。"
    ],
    "drill": "用自己最常见的三个对位做一页升级卡，每个对位比较未升、攻击、护甲/生命值三种情况。保留版本号与场景存档，再用练习伙伴做一轮移动和多线干扰验证。",
    "metric": "每个目标的实测攻击次数、关键伤害后的剩余 HP、交战资源损失、升级完成至有效收益的间隔；这些结果仅适用于记录的测试条件。",
    "pitfall": "只按面板 DPS 或单位标签判断；把2025旧视频的胜负直接套用到2026区域兵种、护甲类或寻路表现。",
    "sources": [
      "f1re-blacksmith-choice",
      "sotl-camel-archer-2025",
      "sotl-fire-archer-2025",
      "sotl-september-2026"
    ],
    "attribution": "本站编辑设计的控制变量练习；本次未取得原视频测试全文，未宣称复现作者原始数值。",
    "addedAt": "2026-11-17",
    "editorial": true
  },
  {
    "id": "saved-scenario-repetitions",
    "mode": "solo",
    "tag": "刻意练习",
    "icon": "refresh",
    "level": "ADVANCED",
    "title": "把一个难局面，压缩成十二次有效练习",
    "desc": "用保存与加载缩短反馈周期，再检验能否迁移到完整对局。",
    "map": "全地图",
    "metricShort": "重复稳定性与迁移",
    "condition": "同类微操、补墙或多任务失误反复发生，但普通天梯里很少有相同局面可比较时。",
    "steps": [
      "在当前版本与练习伙伴约定一个可重复的起点，保存局面；写清兵力、升级、资源、位置与本轮唯一目标。",
      "先保留一次自然操作作为基线，再分别练单项动作、加入宏观任务、加入第二条威胁，每种做四次；只比较同一难度内的变化。",
      "每次结束只记录一个最早的可修正错误，然后重新加载；使用完整科技树场景时，把操作练习与文明可用性测试分开。",
      "最后换一张存档或调换双方位置，并回到完整约练检查。若改进只在背熟的局面里出现，就降低提示、增加变化后再试。"
    ],
    "drill": "十二次短练：四次单项、四次加生产任务、四次加第二条威胁。可选剑士靠近资源区的小墙、僧侣保护或远程撤退。与伙伴只在约练中使用，不要求天梯对手陪练。",
    "metric": "同一条件下任务成功次数、首个错误发生时间、同期 TC/军营空闲与掉村资源；另记两场不同局面的迁移结果。小样本用于发现问题，不推算总体胜率。",
    "pitfall": "加载练熟的是固定 AI 顺序或敌军路线；存档升级后不可用还混用结果；把完整科技树微操成绩当作真实文明对局水平。",
    "sources": [
      "survivalist-reset-drills",
      "survivalist-micro-1900",
      "f1re-small-wall-review"
    ],
    "attribution": "本站编辑基于作者公开说明设计的练习安排；十二次与四次分组是本站建议，非选手给出的职业标准。",
    "addedAt": "2026-11-17",
    "editorial": true
  },
  {
    "id": "tg-rf-coverage-20261117",
    "title": "RF 阵容审计：别让三个人都在解决同一个问题",
    "mode": "team",
    "tag": "群局精研",
    "map": "封闭图 / 黑森林 / Rage Forest",
    "icon": "shield",
    "level": "精研 / 1",
    "desc": "把阵容分成需要完成的工作，再决定谁承担；文明强度只在任务与地形中有意义。",
    "condition": "固定队选文明或复盘帝王期僵局；队里军队很多，却没有人能安全完成推进、反攻城、保护或资源延续。",
    "steps": [
      "先画两侧主通道、可能切口、池塘、后排贸易线；按真实通道宽度估计哪些单位能有效接战。",
      "为每侧写出推进、反攻城、保护攻城、快速补防四项责任；再单独确定贸易/关键资源防护由谁兼任。",
      "比较角色缺口与重复投资：出现三家同类输出时，明确留下哪家的规模优势，哪家优先补关键辅助。",
      "为主力被克制、前线被切开和贸易被袭各写一条接替规则；规则必须包含触发信息和接应位置。"
    ],
    "drill": "本站独立训练：固定地图种子和总资源，各打两组相同人数的对抗场景；仅改一位队员的职能。记录瓶颈是否消失，再回到真实训练赛验证。",
    "metric": "未被任何队员覆盖的战场任务数；关键攻城有效工作时间；同一通道中的拥堵/闲置军队；从请求补位到实际接应的游戏时间",
    "metricShort": "职能缺口与有效输出",
    "pitfall": "把RF文明榜当阵容答案；按个人杀敌数奖励三家同质输出，忽略保护者和资源路线。",
    "sources": [
      "tg-rf6-sensar-20260812",
      "tg-hera-bf-guide-20230716"
    ],
    "editorial": true,
    "addedAt": "2026-11-17"
  },
  {
    "id": "tg-trade-controlled-test-20261117",
    "title": "贸易实测：控制投入，再比较真实回本",
    "mode": "team",
    "tag": "机制实验",
    "map": "全地图",
    "icon": "chart",
    "level": "精研 / 2",
    "desc": "不用旧视频的排名替代当前版本测试；让成本、产能、路程和风险在同一实验中可比较。",
    "condition": "队伍要比较两种贸易文明/路线，或决定额外黄金应继续造兵还是扩商队；当前补丁与参考视频不同。",
    "steps": [
      "在当前正式版建测试场，固定地图尺寸、市场位置、开始资源、观察区间和是否允许额外市场；一次只改一个变量。",
      "把市场、商队、升级投入全部列入成本；不同生产速度的文明同时记录“单位完成数量”和“累计实际投入”。",
      "从同一游戏时点记录累计送达资源，不只看单车载货；另外做一次受压版本，记录停运、损失和恢复成本。",
      "将净收益曲线与同资源军队投资的机会比较；只对本测试情境下结论负责，不宣布通用最早贸易分钟。"
    ],
    "drill": "本站独立训练：同一路线比较等总投入与等车数两种口径，各重复3次；随后只增加一个固定时点的袭扰，比较回本是否仍成立。",
    "metric": "累计送达黄金减新增市场/商队/升级成本；首批回本时点；实际行驶与停工时长；相同时间的军队资源缺口",
    "metricShort": "净收益曲线与口径一致性",
    "pitfall": "把2021旧加成/2025旧速度混进2026实验；按相同车数就声称是相同经济投入，或忽略市场生产速度。",
    "sources": [
      "tg-sotl-trade-tests-20210916",
      "map-sotl-naval-20260303"
    ],
    "editorial": true,
    "addedAt": "2026-11-17"
  },
  {
    "id": "prep-draft-backups-20261117",
    "title": "BP 压力测试：每张地图都要有被抢后的第二套组合",
    "mode": "team",
    "tag": "职业备赛",
    "map": "全地图",
    "icon": "map",
    "level": "精研 / 3",
    "desc": "评估整个系列赛的可执行覆盖，而不是每次选当前看起来最强的文明。",
    "condition": "赛事使用多图、文明不可重复或snipes；固定队有强项文明，但被针对后经常留下一张无法分配的地图。",
    "steps": [
      "先抄清赛事当前地图包、起始村数、draft阶段、禁选方式、重复限制、sling与游牧特殊规则；不把排位开局带进9村赛事。",
      "按“地图—队员—角色”写主组合与备选组合，并标出真正练过的路线；主观强弱与熟练度分两栏记录。",
      "让陪练在每轮优先抢掉队伍最依赖的文明；每次选择后重新检查剩余地图是否仍有完整三人组合。",
      "完成draft后，先解释最脆弱地图的前三分钟分工和第一个转案信号，再开始比赛；赛后对照实际是否出现预判缺口。"
    ],
    "drill": "本站独立训练：按同一赛事预设做3次限时模拟BP，分别接受正常、针对禁选和意外snipes；每轮必须提交一张完整地图分配表。",
    "metric": "draft结束后没有已练组合的剩余地图数；被抢后重新分配耗时；备选路线实际执行错误；同一文明在不同地图之间的机会成本",
    "metricShort": "剩余地图覆盖与备选熟练度",
    "pitfall": "把网上tier list直接拖入draft；练了第一选项却没练被ban后的计划；用工具排序代替队伍沟通。",
    "sources": [
      "prep-league-handbook-2026",
      "prep-aoe2cm-author-docs",
      "prep-draft-acro17",
      "prep-hera-garrison-ama-2025"
    ],
    "editorial": true,
    "addedAt": "2026-11-17"
  },
  {
    "id": "map-arena-conversion-risk-20261117",
    "title": "Arena 僧侣训练：用损失分布评价操作，不盯一次神转",
    "mode": "solo",
    "alsoTeam": true,
    "tag": "地图精研",
    "map": "Arena / 封闭图",
    "icon": "target",
    "level": "精研 / 4",
    "desc": "把目标选择、走位、保护与随机结果分开记录，避免从一场幸运团战总结错误习惯。",
    "condition": "城堡时代僧侣与轻骑/重骑对抗；玩家经常以某次秒转或长时间不转换来判断整套计划好坏。",
    "steps": [
      "先按当前版本核查转换抵抗、相关科技和目标类型；将参考资料的旧规则列为不可直接采用项。",
      "在固定单位数、升级与距离下，分别练“集中转换关键目标”和“分配多个目标”，保持保护兵和退路一致。",
      "逐次记录首次下令时刻、目标切换、僧侣被迫移动和死亡；把随机转换时长与玩家可控的操作损失分开。",
      "回到真实录像时还原玩家视野：比较继续施法、后撤和交给保护兵三个选择；以队伍主力存活与资源交换评价决定。"
    ],
    "drill": "本站独立训练：同一场景做20次小样本练习，仅比较两种操作方式的分布；结果差异不足时继续积累，不能以一次好运宣布最优。",
    "metric": "关键目标转换成功数的分布；每次交战僧侣损失与存活数；无效切换目标/被迫移动次数；转换后的军队是否被安全接回",
    "metricShort": "可控损失与结果分布",
    "pitfall": "把一段视频内的极端转换当概率保证；只看转到多少资源，忽略僧侣全损和后续阵地。",
    "sources": [
      "map-sotl-conversions-20260508"
    ],
    "editorial": true,
    "addedAt": "2026-11-17"
  }
];
