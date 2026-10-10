// 内容模型的类型定义。前端与 scripts/ 共用；字段含义见 AGENTS.md「节点 Schema」。
// 新增字段时：同步修改 scripts/content/schema.ts、AGENTS.md 与对应模板。

export const KINDS = [
  'knowledge',
  'skill',
  'industry',
  'source',
  'mindset',
  'roadmap',
  'journal',
  'inbox',
] as const;
export type Kind = (typeof KINDS)[number];

export const STATUSES = ['todo', 'doing', 'done'] as const;
export type Status = (typeof STATUSES)[number];

export type Confidence = 'high' | 'medium' | 'low';

/** 一条 content/<dir>/<id>.md 解析后的节点 */
export interface QNode {
  // —— 通用字段（frontmatter）——
  id: string;
  title: string;
  kind: Kind;
  summary: string;
  domains: string[];
  tags: string[];
  related: string[];
  prereqs: string[];
  status?: Status;
  importance: number;
  confidence: Confidence;
  created?: string;
  updated?: string;
  review?: string;

  // —— 按 kind 的专用字段 ——
  /** skill：当前等级 0-5 */
  level?: number;
  /** skill：目标等级 0-5 */
  target?: number;
  /** source：链接 */
  url?: string;
  /** source：形态（data/book/paper/...） */
  format?: string;
  /** source：费用 */
  cost?: string;
  /** source：覆盖市场 */
  markets?: string[];
  /** source：质量评分 1-5 */
  rating?: number;
  /** source：语言 */
  lang?: string;
  /** industry/mindset/journal：子类 */
  category?: string;
  /** industry(strategy)：持有周期 */
  horizon?: string;
  /** industry(strategy)：策略容量 1-5 */
  capacity?: number;
  /** industry(strategy)：进入门槛 1-5 */
  barrier?: number;
  /** industry(strategy)：个人适配度 1-5 */
  retailFit?: number;
  /** roadmap：阶段序号 */
  phase?: number;
  /** journal：日期 */
  date?: string;

  // —— 加载器派生字段（不要写进 frontmatter）——
  path: string;
  body: string;
  /** 正文中的 [[wiki-link]] 目标 */
  mentions: string[];
  /** 谁引用了我（related/prereqs/mentions 反向） */
  backlinks: string[];
  /** review 日期已过 */
  stale: boolean;
  /** 正文字数（粗略） */
  chars: number;
}

export interface LabelDef {
  label: string;
  desc?: string;
}

export interface KindDef extends LabelDef {
  dir: string;
  /** 1-8，对应 CSS 变量 --color-k{slot}（文档化调色板，勿自定义 hex） */
  slot: number;
  /** 该 kind 是否参与学习进度统计 */
  progress?: boolean;
}

export interface Taxonomy {
  kinds: Record<Kind, KindDef>;
  domains: Record<string, LabelDef>;
  statuses: Record<Status, LabelDef>;
  categories: Record<string, Record<string, LabelDef>>;
  formats: Record<string, LabelDef>;
  costs: Record<string, LabelDef>;
  markets: Record<string, LabelDef>;
  langs: Record<string, LabelDef>;
  horizons: Record<string, LabelDef>;
  levels: Record<string, LabelDef>;
}

export type Profile = Record<string, unknown>;

export type IssueLevel = 'error' | 'warn' | 'info';

export interface Issue {
  level: IssueLevel;
  message: string;
  nodeId?: string;
  path?: string;
}

export interface ContentData {
  /** 加载时的本地日期 YYYY-MM-DD */
  today: string;
  taxonomy: Taxonomy;
  profile: Profile;
  nodes: QNode[];
  issues: Issue[];
}

/** 开发模式下允许从 UI 写回 frontmatter 的字段 */
export const EDITABLE_FIELDS = ['status', 'level', 'target', 'rating', 'importance'] as const;
export type EditableField = (typeof EDITABLE_FIELDS)[number];
export type NodePatch = Partial<Pick<QNode, EditableField>>;

export interface InboxInput {
  title: string;
  body?: string;
  url?: string;
}
