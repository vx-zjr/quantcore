import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../content/store';
import type { QNode, Status } from '../content/types';
import { label, nodeHref, searchNodes } from '../content/utils';
import { Empty, KindDot, StatusControl } from './ui';

interface Props {
  nodes: QNode[];
  /** 分组键：domain（主领域）/ category / format / none */
  groupBy?: 'domain' | 'category' | 'format' | 'none';
  /** 每行右侧附加内容 */
  extra?: (n: QNode) => ReactNode;
  showStatus?: boolean;
  showKind?: boolean;
}

/** 通用节点列表：搜索 + 领域/状态筛选 + 分组 */
export function NodeList({ nodes, groupBy = 'domain', extra, showStatus = true, showKind = false }: Props) {
  const { data } = useContent();
  const t = data.taxonomy;
  const [q, setQ] = useState('');
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<Status | ''>('');

  const domains = useMemo(() => {
    const s = new Set<string>();
    nodes.forEach((n) => n.domains.forEach((d) => s.add(d)));
    return [...s].sort((a, b) => Object.keys(t.domains).indexOf(a) - Object.keys(t.domains).indexOf(b));
  }, [nodes, t.domains]);

  const filtered = useMemo(() => {
    let list = q ? searchNodes(nodes, q, 999) : nodes;
    if (domain) list = list.filter((n) => n.domains.includes(domain));
    if (status) list = list.filter((n) => n.status === status);
    return list;
  }, [nodes, q, domain, status]);

  const groups = useMemo(() => {
    const keyOf = (n: QNode) =>
      groupBy === 'domain'
        ? n.domains[0] ?? ''
        : groupBy === 'category'
          ? n.category ?? ''
          : groupBy === 'format'
            ? n.format ?? ''
            : '';
    const nameOf = (k: string) =>
      groupBy === 'domain'
        ? label(t.domains, k)
        : groupBy === 'category'
          ? label(nodes[0] ? t.categories[nodes[0].kind] : undefined, k)
          : groupBy === 'format'
            ? label(t.formats, k)
            : '';
    const m = new Map<string, QNode[]>();
    for (const n of filtered) {
      const k = keyOf(n);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(n);
    }
    for (const list of m.values()) list.sort((a, b) => b.importance - a.importance || a.title.localeCompare(b.title));
    return [...m.entries()].map(([k, list]) => ({ key: k, name: nameOf(k) || '未分类', list }));
  }, [filtered, groupBy, t, nodes]);

  const hasStatus = nodes.some((n) => n.status);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          className="input max-w-xs"
          placeholder="筛选标题、标签、正文…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="筛选"
        />
        {domains.length > 1 && (
          <select className="input w-auto" value={domain} onChange={(e) => setDomain(e.target.value)} aria-label="领域">
            <option value="">全部领域</option>
            {domains.map((d) => (
              <option key={d} value={d}>
                {label(t.domains, d)}
              </option>
            ))}
          </select>
        )}
        {hasStatus && (
          <select
            className="input w-auto"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status | '')}
            aria-label="状态"
          >
            <option value="">全部状态</option>
            {(Object.keys(t.statuses) as Status[]).map((s) => (
              <option key={s} value={s}>
                {t.statuses[s].label}
              </option>
            ))}
          </select>
        )}
        <span className="text-xs text-muted tabular">
          {filtered.length} / {nodes.length}
        </span>
      </div>

      {filtered.length === 0 && <Empty>没有匹配的节点</Empty>}

      <div className="space-y-5">
        {groups.map((g) => (
          <div key={g.key}>
            {groupBy !== 'none' && (
              <h3 className="mb-2 text-xs font-semibold text-ink-2">
                {g.name} <span className="font-normal text-muted">· {g.list.length}</span>
              </h3>
            )}
            <ul className="card divide-y divide-line overflow-hidden">
              {g.list.map((n) => (
                <li
                  key={n.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 hover:bg-raised sm:flex-nowrap"
                >
                  <Link to={nodeHref(n.id)} className="flex min-w-0 flex-1 items-center gap-3">
                    {showKind && <KindDot kind={n.kind} />}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{n.title}</span>
                        {n.importance >= 5 && (
                          <span className="chip !px-1.5 !py-0 text-[11px]" title="重要度 5">
                            核心
                          </span>
                        )}
                        {n.stale && (
                          <span className="chip !py-0 text-[11px]" title={`复核日期 ${n.review} 已过`}>
                            <span style={{ color: 'var(--color-warning)' }}>▲</span> 待复核
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-sm text-ink-2">{n.summary}</p>
                    </div>
                  </Link>
                  {extra && <div className="shrink-0">{extra(n)}</div>}
                  {showStatus && n.status && (
                    <div className="shrink-0">
                      <StatusControl node={n} compact />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
