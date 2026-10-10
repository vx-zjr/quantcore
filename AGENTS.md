# AGENTS.md — QuantCore 的 AI 操作手册

> 本文件是所有 AI 助手（Claude Code、Codex、Cursor、Copilot 等）在本仓库工作的**唯一规范**。
> 人类也可以读，但它首先是写给 AI 的。修改本文件 = 修改 AI 的行为，请谨慎并记入 CHANGELOG。

## 1. 项目是什么

**QuantCore = 个人量化中心。** 一个可视化、可交互的知识库，用来系统地建立做个人量化所需的
知识、技能、行业认知、信息源、思维框架与路线图。

- **当前阶段：Phase 0（认知与地基）。** 本阶段**不写任何策略/回测/交易代码**。
  只建设认知内容和这个中心本身。进入写代码阶段的条件见 `content/roadmap/phase-0-foundation.md`。
- **核心理念：内容即数据（content as data）。** 所有知识都是 `content/` 下的 Markdown 文件
  （YAML frontmatter + 正文）。前端（React + Vite + TS）只是渲染器，不包含任何知识内容。
- **用户画像：** 给出任何建议前，先读 `content/_meta/profile.yaml`。其中 `null` 字段代表未知——
  不要假设，必要时向用户提问，并把答案写回 profile.yaml（同时从 `open_questions` 移除）。

## 2. 首次进入仓库时按顺序读

1. 本文件（AGENTS.md）
2. `content/INDEX.md` —— 自动生成的全量目录，一行一个节点（id / 标题 / 摘要 / 状态）。**先读它，再决定读哪些文件**，不要全量遍历 content/。
3. `content/_meta/profile.yaml` —— 用户画像
4. `content/_meta/taxonomy.yaml` —— 受控词表（所有枚举值的来源）
5. 与任务相关的 `playbooks/*.md`

## 3. 目录地图

```
AGENTS.md                 ← 你正在读的规范（CLAUDE.md 引用它）
CHANGELOG.md              ← 每次迭代追加一条记录
content/                  ← ★ 唯一数据源
  INDEX.md                ← 自动生成，勿手改
  _meta/
    taxonomy.yaml         ← 受控词表：kinds/domains/markets/formats/...
    profile.yaml          ← 用户画像与待确认问题
    templates/<kind>.md   ← 新建节点的模板
  knowledge/  skills/  industry/  sources/  mindset/  roadmap/  journal/  inbox/
playbooks/                ← AI 标准作业流程（新增节点、处理收件箱、复核过期等）
scripts/                  ← 内容加载/校验/索引/脚手架 + Vite 插件（Node 端）
  content/loader.ts       ← 解析 + 校验 + 反向链接 + 健康检查
  content/schema.ts       ← frontmatter 校验规则（zod，枚举来自 taxonomy.yaml）
  content/writer.ts       ← dev 模式写回 frontmatter / 勾选任务项 / 新建收件箱
  vite-plugin-content.ts  ← virtual:content 模块 + /__api 写回接口 + 文件监听
src/                      ← 前端渲染器（不放内容）
  content/types.ts        ← 节点类型定义（前后端共用）
  content/store.tsx       ← 前端数据仓库（HMR 实时更新）
  pages/  components/
```

## 4. 节点 Schema（frontmatter）

一个节点 = 一个文件 `content/<dir>/<id>.md`。`dir` 由 taxonomy.yaml 的 `kinds.<kind>.dir` 决定。

### 4.1 通用字段

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | ✅ | kebab-case 英文，**必须与文件名一致**，全局唯一，创建后尽量不改（改名需全局替换引用） |
| `title` | ✅ | 中文标题 |
| `kind` | ✅ | `knowledge` `skill` `industry` `source` `mindset` `roadmap` `journal` `inbox`，必须与所在目录一致 |
| `summary` | ✅ | **一句话**（≤200 字），会出现在 INDEX.md、列表、搜索与悬停提示里 |
| `domains` | 视 kind | taxonomy.domains 中的键；**第一个是主领域**（用于分组与技能雷达） |
| `tags` | | 自由标签（中英文均可）。`起点` 标签表示零基础入门节点，总览页会优先推荐 |
| `related` | | 相关节点 id 列表 |
| `prereqs` | | 前置节点 id 列表（学这个之前应先掌握的） |
| `status` | 视 kind | `todo` / `doing` / `done` —— **用户的进度**，AI 不要擅自改为 done |
| `importance` | | 1-5，默认 3。5 = 核心必修 |
| `confidence` | | `high` / `medium` / `low` —— 对内容准确性的把握 |
| `created` / `updated` | | `YYYY-MM-DD`。修改内容时**必须更新 `updated`** |
| `review` | | `YYYY-MM-DD`，时效性内容的复核日期，过期会被标记 |

### 4.2 按 kind 的专用字段

| kind | 必填专用字段 | 可选 |
|---|---|---|
| `knowledge` | `domains`、`status` | |
| `skill` | `domains`、`level`(0-5 当前)、`target`(0-5 目标) | |
| `industry` | `category`（landscape/player/strategy/regulation/career） | 若 `category: strategy`：必填 `horizon`、`capacity`、`barrier`、`retailFit`（均 1-5，horizon 见 taxonomy） |
| `source` | `format`、`cost`、`markets`、`rating`(1-5) | `url`、`lang`、`status`（阅读/使用进度） |
| `mindset` | `category`（principle/model/bias/checklist） | `status` |
| `roadmap` | `phase`(整数)、`status` | |
| `journal` | `category`（decision/review/note）、`date` | |
| `inbox` | `status`（todo=待处理，done=已归档） | |

枚举值以 `content/_meta/taxonomy.yaml` 为准。需要新枚举值（新市场、新领域）时**先改 taxonomy.yaml**。

### 4.3 正文规范

- 中文写作，专业术语首次出现时附英文（如「夏普比率（Sharpe Ratio）」）。
- 用 `## 二级标题` 分节，结构参照 `content/_meta/templates/<kind>.md`。
- **节点互链用 wiki 语法：`[[node-id]]` 或 `[[node-id|显示文字]]`**。链接目标必须存在（校验器会检查）。
  代码块和行内代码里的 `[[...]]` 不会被解析。
- 公式用 KaTeX：行内 `$...$`，块级 `$$...$$`。
- 任务项用 `- [ ] ...`（UI 中可勾选）。不要把任务项放进引用块。
- 外部链接写完整 URL。**不确定的 URL 不要编造**——写名称并在 summary/正文注明「需核实链接」。
- 篇幅：knowledge/mindset 一般 300-1200 字；source 150-500 字；宁可精炼准确，不要堆砌。

## 5. 硬性规则（MUST / MUST NOT）

**必须：**
1. 内容只写进 `content/`。**绝不**把知识内容硬编码进 `src/`。
2. 一个概念一个文件；新建前先查 `content/INDEX.md` 避免重复，已有就扩写。
3. 改了内容就更新 `updated`；新增时效性内容（规则、费率、机构、监管、价格、排名）时设置 `review`（通常 6 个月后）并在正文写明「截至何时」。
4. 不确定的事实标注 `confidence: low` 或在正文中明说「需核实」；**宁可说不知道，也不要编造**数据、日期、链接、机构名称。
5. 每次任务结束前运行 `npm run check`（= 重建索引 + 内容校验 + 类型检查），必须通过。
6. 在 `CHANGELOG.md` 顶部追加一条本次变更（日期 + 做了什么 + 涉及哪些节点/文件）。
7. 新增节点时补全双向关联：至少 1 个 `related`，并检查是否应在已有节点中反向引用它。

**禁止：**
1. Phase 0 期间编写策略、回测、交易、下单相关代码（除非用户明确要求并已更新路线图阶段）。
2. 擅自把用户进度字段（`status`、`level`）改成更高值——这些是用户的自评。可以建议，由用户确认。
3. 把任何内容表述为确定性的投资建议或收益承诺。
4. 提交密钥、账号、真实持仓等敏感信息（`.env` 已被 git 忽略）。
5. 手改 `content/INDEX.md`（它由脚本生成）。
6. 为了让校验通过而删除有效内容或关联。

## 6. 常用命令

```bash
npm install                 # 首次安装
npm run dev                 # 启动可视化界面（开发模式可在 UI 中直接改进度/评分/勾选任务/记收件箱，写回文件）
npm run check               # ★ 完成标准：重建 INDEX.md + 内容校验 + TS 类型检查
npm run content:check       # 仅内容校验（error 时退出码非 0）
npm run content:index       # 仅重建 content/INDEX.md
npm run content:new -- <kind> <id> "标题"   # 从模板新建节点
npm run build               # 校验 + 类型检查 + 构建静态站点到 dist/（只读模式）
```

## 7. 标准作业流程（playbooks）

| 场景 | 文件 |
|---|---|
| 新增/扩写节点 | `playbooks/add-node.md` |
| 处理收件箱 | `playbooks/process-inbox.md` |
| 复核过期/时效性内容 | `playbooks/review-stale.md` |
| 周期复盘（周/月） | `playbooks/periodic-review.md` |
| 修改前端/数据模型 | `playbooks/evolve-app.md` |

UI 的「内容维护」页和每个节点详情页都提供「复制 AI 指令」按钮，生成的指令会引用这些 playbook。

## 8. 修改代码时

- 先读 `playbooks/evolve-app.md`。
- 数据模型变更（新字段/新 kind）必须同时改：`src/content/types.ts`、`scripts/content/schema.ts`
  （含 `KNOWN_FIELDS`）、对应模板、本文件第 4 节。
- 颜色只用 `src/index.css` 中的设计令牌；分类色只用 `--color-k1..k8`（对应 taxonomy 的 `slot`），
  状态色（good/warning/critical）只表示状态并总是配图标+文字。不要自造 hex。
- 不引入新依赖，除非确有必要并在 CHANGELOG 说明理由。
- UI 文案用中文。

## 9. 与用户协作的方式

- 用户的问题若能沉淀为知识，回答后**顺手写进对应节点**（或先放进 inbox），并告诉用户写在了哪里。
- 对用户的自评和目标给出坦率意见（例如「这个目标等级对个人量化来说过高/过低」），但决定权在用户。
- 遇到需要用户决策的问题（市场选择、资金规模、风险偏好），写进 `profile.yaml` 的 `open_questions`。
- 量化领域充满幸存者偏差与营销话术：**引用来源时说明其局限**，对「稳赚」「高夏普」类说法保持怀疑。
