# CHANGELOG

> 每次迭代在顶部追加一条：日期 · 做了什么 · 涉及哪些节点/文件。AI 修改后必须记录（见 AGENTS.md）。

## 2026-10-10 · v0.2.0 联网核实最新数据 + 零基础画像

**时效性内容联网核实**（按 playbooks/review-stale.md；各节点文末附来源链接，汇总见 `journal/2026-10-10-facts-refresh`）
- `cn-a-share-rules`：主板 ST 涨跌幅 2026-07-06 起 ±10%；上交所盘后固定价格交易扩至全部 A 股与 ETF、基金收盘集合竞价；融资保证金比例 2026-01-14 起 100%；转融券仍暂停；主板价格笼子确认；新增「近年制度变化时间线」。confidence → high。
- `cn-programmatic-trading-rules`：确认证券细则 2025-07-07 施行与高频标准；新增期货程序化交易规定（2025-10-09 施行）；2026 年监管表态；未采信无官方来源的「15 笔/秒」说法。confidence → high。
- `cn-futures-options`：2025 年新增 18 个品种、2026 年新期权、期货程序化交易报告。
- `cn-quant-landscape`、`cn-quant-firms`：2025 年末量化私募约 3.22 万亿元、百亿量化 55 家；2026 年 7 月行业性回撤；AI 研究院；灵均事件细节。
- `cross-border-crypto-compliance`、`crypto-market-structure`：2025-11 稳定币定性、2026-02 八部门通知；美股 PDT 规则 2026 年取消。
- `global-quant-firms`（Jane Street 案进展）、`industry-trends`（补证据）、`retail-quant-ecosystem-cn` / `qmt-ptrade`（QMT 门槛常见说法）、`tushare`（积分）、`yfinance`（Polygon→Massive）。
- 连带更新：`cn-factor-landscape`、`strat-multi-factor-equity`、`regime-change`、`backtest-red-flags`（加入 2026 年事件与「用今天规则回测过去」的红旗）。

**零基础画像**
- `profile.yaml`：零基础、兴趣驱动、市场未定、每周 20h+、暂不投真钱；更新待确认问题。
- 新增节点 `what-is-quant`（量化是什么）、`glossary-basics`（入门术语表），打 `起点` 标签。
- `phase-0-foundation` 改为 12 周零基础学习计划，调整交付物与退出标准。
- 新增日志 `2026-10-10-profile-beginner`（路线调整决策）、`2026-10-10-facts-refresh`（核实复盘）。

**界面**
- 总览「建议下一步」优先推荐 `起点` 标签节点；「我的画像」始终显示已填字段（中文标签）与待确认问题。
- AGENTS.md 说明 `起点` 标签。

## 2026-10-10 · v0.1.0 初始化

**架构**
- React 19 + Vite 8 + TypeScript + Tailwind v4 的可视化界面；HashRouter，可静态部署。
- 内容即数据：`content/<dir>/<id>.md`（YAML frontmatter + Markdown），`virtual:content` 注入前端。
- 内容管线：zod schema 校验（枚举来自 `content/_meta/taxonomy.yaml`）、链接完整性、反向链接、过期/孤立/过短检查；自动生成 `content/INDEX.md`。
- 开发模式写回接口：进度、技能等级、评分、重要度、任务项勾选、收件箱新建；文件变化通过 HMR 实时推送到界面。
- 页面：总览、知识图谱（d3-force，颜色+形状双编码）、知识、技能（雷达图 + 子弹图）、行业（策略地图）、信息源、思维、路线图、日志与收件箱、内容维护、节点详情（KaTeX 公式、wiki 链接、复制 AI 指令）。
- AI 协作：`AGENTS.md`（规范）、`CLAUDE.md`（引用）、`playbooks/`（新增节点、处理收件箱、复核过期、周期复盘、演进应用）、`.claude/skills/` 快捷命令。

**内容（130 个节点）**
- 思维 13：edge 来源、过拟合是默认、生存优先、小资金优势、基础概率、研究即科学、alpha 衰减、非平稳、简单优先、过程重于结果、认知偏差、回测红旗清单、上线检查清单。
- 知识 29：市场微观结构、A 股制度、期货期权、加密市场结构、交易成本、执行、数据全景、时点数据、数据清洗、绩效指标、仓位与凯利、组合构建、风险管理、因子模型、A 股因子、EMH/AMH、研究流程、IC 分析、回测陷阱、样本外验证、多重检验、收益分布、平稳性与协整、波动率、动量与反转、均值回归、期权、金融 ML、宏观环境。
- 技能 20：数学统计 5、编程 4、数据 2、市场与财报 2、研究与回测 2、风险 1、执行 1、ML 2、心理 1（均含 L1–L5 等级标准与验收方式，等级待用户自评）。
- 行业 22：全球/中国格局、个人生态、趋势、海内外机构、程序化交易监管、跨境与加密合规、职业路径、13 个策略原型。
- 信息源 39：数据 10、平台/工具 7、书籍 11、论文/研报 4、博客/社区/播客/课程/资讯 7。
- 路线图 6：阶段 0（进行中）至阶段 5。
- 日志 1：建立知识中心的决策记录。

**待办**
- 用户填写 `profile.yaml` 与技能自评。
- 时效性节点已设置 `review` 日期（2027-01 至 2027-10），到期需联网核实。
