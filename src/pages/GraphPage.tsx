import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForceGraph, symbolPath } from '../components/ForceGraph';
import { NodeLink, PageHeader, StatusControl } from '../components/ui';
import { useContent } from '../content/store';
import { KINDS, type Kind } from '../content/types';
import { buildEdges, kindColor, label, nodeHref } from '../content/utils';

export function GraphPage() {
  const { data, nodes, byId } = useContent();
  const t = data.taxonomy;
  const [hidden, setHidden] = useState<Set<Kind>>(() => new Set<Kind>(['inbox', 'journal']));
  const [domain, setDomain] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const visible = useMemo(
    () => nodes.filter((n) => !hidden.has(n.kind) && (!domain || n.domains.includes(domain))),
    [nodes, hidden, domain],
  );
  const edges = useMemo(() => buildEdges(visible), [visible]);
  const sel = selected ? byId.get(selected) : undefined;

  const toggle = (k: Kind) =>
    setHidden((h) => {
      const next = new Set(h);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  return (
    <div>
      <PageHeader
        title="知识图谱"
        desc="所有节点及其关联（related / prereqs / 正文 [[链接]]）。节点大小 = 重要度 + 关联数。悬停查看邻居，点击查看详情。"
      />

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {KINDS.map((k) => {
          const on = !hidden.has(k);
          const count = nodes.filter((n) => n.kind === k).length;
          return (
            <button
              key={k}
              onClick={() => toggle(k)}
              aria-pressed={on}
              className={`chip cursor-pointer ${on ? '' : 'opacity-45'}`}
              title={on ? '点击隐藏' : '点击显示'}
            >
              <svg width="12" height="12" viewBox="-6 -6 12 12" aria-hidden>
                <path d={symbolPath(k, 50)} fill={kindColor(t, k)} />
              </svg>
              {t.kinds[k].label}
              <span className="text-muted tabular">{count}</span>
            </button>
          );
        })}
        <select className="input ml-auto w-auto" value={domain} onChange={(e) => setDomain(e.target.value)} aria-label="领域">
          <option value="">全部领域</option>
          {Object.keys(t.domains).map((d) => (
            <option key={d} value={d}>
              {label(t.domains, d)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="card min-w-0">
          <ForceGraph nodes={visible} edges={edges} selectedId={selected} onSelect={setSelected} />
        </div>
        <aside className="card min-w-0 p-4 text-sm lg:max-h-[620px] lg:overflow-y-auto">
          {sel ? (
            <div className="space-y-3">
              <div>
                <div className="text-xs text-muted">{t.kinds[sel.kind].label}</div>
                <h2 className="text-base font-semibold">{sel.title}</h2>
                <p className="mt-1 text-ink-2">{sel.summary}</p>
              </div>
              {sel.status && <StatusControl node={sel} />}
              <Link to={nodeHref(sel.id)} className="btn btn-primary">
                打开详情 →
              </Link>
              {sel.prereqs.length > 0 && (
                <div>
                  <div className="section-title mb-1">前置</div>
                  <ul className="space-y-1">
                    {sel.prereqs.map((id) => (
                      <li key={id}>
                        <NodeLink id={id} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {[...new Set([...sel.related, ...sel.mentions, ...sel.backlinks])].length > 0 && (
                <div>
                  <div className="section-title mb-1">关联</div>
                  <ul className="space-y-1">
                    {[...new Set([...sel.related, ...sel.mentions, ...sel.backlinks])]
                      .filter((id) => !sel.prereqs.includes(id))
                      .map((id) => (
                        <li key={id}>
                          <NodeLink id={id} />
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2 text-ink-2">
              <p>
                当前显示 <b className="text-ink tabular">{visible.length}</b> 个节点、
                <b className="text-ink tabular">{edges.length}</b> 条关联。
              </p>
              <p>点击节点在此查看摘要与关联；颜色与形状共同区分类型。</p>
              <p className="text-xs text-muted">
                孤立的小点通常意味着缺少关联——可以在「内容维护」页一键生成让 AI 补链的指令。
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
