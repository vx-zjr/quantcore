import type { ContentData, Kind, QNode, Status, Taxonomy } from './types';

export const kindColor = (t: Taxonomy, k: Kind) => `var(--color-k${t.kinds[k]?.slot ?? 1})`;

export const label = (dict: Record<string, { label: string }> | undefined, key: string | undefined) =>
  (key && dict?.[key]?.label) || key || '';

export function nodeHref(id: string) {
  return `/n/${id}`;
}

/** 简单相关度搜索：标题 > id/标签 > 摘要 > 正文 */
export function searchNodes(nodes: QNode[], query: string, limit = 30): QNode[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const scored: [QNode, number][] = [];
  for (const n of nodes) {
    let score = 0;
    for (const t of terms) {
      let s = 0;
      if (n.title.toLowerCase().includes(t)) s = Math.max(s, n.title.toLowerCase().startsWith(t) ? 12 : 10);
      if (n.id.includes(t)) s = Math.max(s, 7);
      if (n.tags.some((g) => g.toLowerCase().includes(t))) s = Math.max(s, 6);
      if (n.summary.toLowerCase().includes(t)) s = Math.max(s, 4);
      if (s === 0 && n.body.toLowerCase().includes(t)) s = 1;
      if (s === 0) {
        score = 0;
        break;
      }
      score += s;
    }
    if (score > 0) scored.push([n, score + n.importance * 0.1]);
  }
  return scored
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([n]) => n);
}

export function statusCounts(nodes: QNode[]) {
  const c: Record<Status, number> = { todo: 0, doing: 0, done: 0 };
  for (const n of nodes) if (n.status) c[n.status]++;
  return c;
}

/** 所有节点间的边（去重，无向） */
export function buildEdges(nodes: QNode[]) {
  const ids = new Set(nodes.map((n) => n.id));
  const seen = new Set<string>();
  const edges: { source: string; target: string; type: 'prereq' | 'related' }[] = [];
  for (const n of nodes) {
    const add = (t: string, type: 'prereq' | 'related') => {
      if (!ids.has(t) || t === n.id) return;
      const key = [n.id, t].sort().join('|');
      if (seen.has(key)) return;
      seen.add(key);
      edges.push({ source: n.id, target: t, type });
    };
    n.prereqs.forEach((t) => add(t, 'prereq'));
    n.related.forEach((t) => add(t, 'related'));
    n.mentions.forEach((t) => add(t, 'related'));
  }
  return edges;
}

/** 推荐下一步：重要且前置已完成的未开始项 */
export function nextSteps(data: ContentData, byId: Map<string, QNode>, limit = 6): QNode[] {
  const ready = (n: QNode) =>
    n.prereqs.every((p) => {
      const pn = byId.get(p);
      return !pn || pn.status === 'done' || (pn.kind === 'skill' && (pn.level ?? 0) >= 2);
    });
  return data.nodes
    .filter((n) => (n.kind === 'knowledge' || n.kind === 'mindset') && n.status !== 'done' && ready(n))
    .sort((a, b) => (b.status === 'doing' ? 1 : 0) - (a.status === 'doing' ? 1 : 0) || b.importance - a.importance)
    .slice(0, limit);
}

export function skillGap(n: QNode) {
  return Math.max(0, (n.target ?? 0) - (n.level ?? 0));
}

export function profileCompleteness(profile: Record<string, unknown>) {
  const keys = Object.keys(profile).filter((k) => !['updated', 'open_questions'].includes(k));
  const filled = keys.filter((k) => {
    const v = profile[k];
    return v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0);
  });
  return { filled: filled.length, total: keys.length };
}

/** 组装给 AI 的指令文本（复制后粘贴给任意 AI 编码助手） */
export function aiPrompt(kind: 'expand' | 'verify' | 'link' | 'process-inbox' | 'review-stale' | 'fix-issues', targets: QNode[] | string[]) {
  const list = targets.map((t) => (typeof t === 'string' ? `- ${t}` : `- ${t.path}（${t.title}）`)).join('\n');
  const head = '请先阅读仓库根目录的 AGENTS.md，按其中的规范操作。';
  const tail = '完成后运行 `npm run check` 确保通过，并在 CHANGELOG.md 记录本次变更。';
  const body = {
    expand: `扩写以下节点：补充「关键要点 / 常见误区 / 延伸」，补全 related 关联，必要时新建缺失的前置节点。\n${list}`,
    verify: `核实以下节点中的时效性信息（规则、数据、机构、链接），按 playbooks/review-stale.md 更新内容、confidence 与 review 日期：\n${list}`,
    link: `为以下节点补充关联：检查全库，找出应当互相引用的节点，补全 related/prereqs 与正文 [[链接]]：\n${list}`,
    'process-inbox': `按 playbooks/process-inbox.md 处理收件箱中的条目：\n${list}`,
    'review-stale': `按 playbooks/review-stale.md 复核以下已过期节点：\n${list}`,
    'fix-issues': `修复 npm run content:check 报告的以下问题：\n${list}`,
  }[kind];
  return `${head}\n\n${body}\n\n${tail}`;
}
