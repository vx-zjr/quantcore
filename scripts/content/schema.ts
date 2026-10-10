// frontmatter 校验规则。受控词表（domains/markets/...）来自 content/_meta/taxonomy.yaml，
// 因此 AI 只需改 taxonomy.yaml 即可扩充枚举，无需改代码。
import { z } from 'zod';
import { KINDS, STATUSES, type Taxonomy } from '../../src/content/types.ts';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日期格式应为 YYYY-MM-DD');
const score = z.number().int().min(1).max(5);
const level = z.number().int().min(0).max(5);

function oneOf(dict: Record<string, unknown> | undefined, what: string) {
  const keys = Object.keys(dict ?? {});
  return z.string().refine((v) => keys.includes(v), {
    message: `${what} 必须是 taxonomy.yaml 中定义的值之一：${keys.join(', ')}`,
  });
}

/** 已知字段（含派生字段之外的全部 frontmatter 字段），用于检测拼写错误 */
export const KNOWN_FIELDS = [
  'id', 'title', 'kind', 'summary', 'domains', 'tags', 'related', 'prereqs', 'status',
  'importance', 'confidence', 'created', 'updated', 'review',
  'level', 'target', 'url', 'format', 'cost', 'markets', 'rating', 'lang',
  'category', 'horizon', 'capacity', 'barrier', 'retailFit', 'phase', 'date',
];

export function buildNodeSchema(t: Taxonomy) {
  const base = z.looseObject({
    id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'id 只能用小写字母、数字和连字符（kebab-case）'),
    title: z.string().min(1),
    kind: z.enum(KINDS),
    summary: z.string().min(1, 'summary 不能为空').max(200, 'summary 应为一句话（≤200 字）'),
    domains: z.array(oneOf(t.domains, 'domain')).default([]),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    prereqs: z.array(z.string()).default([]),
    status: z.enum(STATUSES).optional(),
    importance: score.default(3),
    confidence: z.enum(['high', 'medium', 'low']).default('medium'),
    created: isoDate.optional(),
    updated: isoDate.optional(),
    review: isoDate.optional(),
    level: level.optional(),
    target: level.optional(),
    url: z.url().optional(),
    format: oneOf(t.formats, 'format').optional(),
    cost: oneOf(t.costs, 'cost').optional(),
    markets: z.array(oneOf(t.markets, 'market')).optional(),
    rating: score.optional(),
    lang: oneOf(t.langs, 'lang').optional(),
    category: z.string().optional(),
    horizon: oneOf(t.horizons, 'horizon').optional(),
    capacity: score.optional(),
    barrier: score.optional(),
    retailFit: score.optional(),
    phase: z.number().int().min(0).optional(),
    date: isoDate.optional(),
  });

  return base.superRefine((n, ctx) => {
    const need = (field: keyof typeof n, why: string) => {
      const v = n[field];
      if (v === undefined || v === null || (Array.isArray(v) && v.length === 0)) {
        ctx.addIssue({ code: 'custom', path: [field as string], message: `${n.kind} 节点必须填写 ${String(field)}（${why}）` });
      }
    };
    const cats = t.categories[n.kind];
    if (cats) {
      need('category', '子类');
      if (n.category && !(n.category in cats)) {
        ctx.addIssue({
          code: 'custom',
          path: ['category'],
          message: `category 必须是 taxonomy.categories.${n.kind} 之一：${Object.keys(cats).join(', ')}`,
        });
      }
    }
    switch (n.kind) {
      case 'knowledge':
        need('domains', '至少一个领域');
        need('status', '学习进度');
        break;
      case 'skill':
        need('domains', '第一个 domain 为主领域，用于雷达图分组');
        need('level', '当前等级 0-5');
        need('target', '目标等级 0-5');
        break;
      case 'source':
        need('format', '形态');
        need('cost', '费用');
        need('markets', '覆盖市场');
        need('rating', '质量评分');
        break;
      case 'industry':
        if (n.category === 'strategy') {
          need('horizon', '持有周期');
          need('capacity', '容量');
          need('barrier', '门槛');
          need('retailFit', '个人适配度');
        }
        break;
      case 'roadmap':
        need('phase', '阶段序号');
        need('status', '阶段状态');
        break;
      case 'journal':
        need('date', '日期');
        break;
      case 'inbox':
        need('status', 'todo=待处理, done=已归档');
        break;
      case 'mindset':
        break;
    }
  });
}

export type ParsedFrontmatter = z.infer<ReturnType<typeof buildNodeSchema>>;
