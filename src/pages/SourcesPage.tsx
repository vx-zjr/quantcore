import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Empty, PageHeader, Score, StatusControl } from '../components/ui';
import { useContent } from '../content/store';
import { label, nodeHref, searchNodes } from '../content/utils';

export function SourcesPage() {
  const { data, byKind, editable, updateNode } = useContent();
  const t = data.taxonomy;
  const sources = byKind('source');
  const [q, setQ] = useState('');
  const [format, setFormat] = useState('');
  const [market, setMarket] = useState('');
  const [cost, setCost] = useState('');
  const [sort, setSort] = useState<'rating' | 'importance' | 'title'>('rating');

  const formatCounts = useMemo(() => {
    const m = new Map<string, number>();
    sources.forEach((s) => s.format && m.set(s.format, (m.get(s.format) ?? 0) + 1));
    return m;
  }, [sources]);

  const list = useMemo(() => {
    let l = q ? searchNodes(sources, q, 999) : [...sources];
    if (format) l = l.filter((s) => s.format === format);
    if (market) l = l.filter((s) => s.markets?.includes(market));
    if (cost) l = l.filter((s) => s.cost === cost);
    if (!q) {
      l.sort((a, b) =>
        sort === 'title'
          ? a.title.localeCompare(b.title)
          : sort === 'importance'
            ? b.importance - a.importance || (b.rating ?? 0) - (a.rating ?? 0)
            : (b.rating ?? 0) - (a.rating ?? 0) || b.importance - a.importance,
      );
    }
    return l;
  }, [sources, q, format, market, cost, sort]);

  return (
    <div>
      <PageHeader
        title="信息源"
        desc="数据、书籍、论文、社区、工具与平台。评分是对「个人量化」场景的质量判断；状态用于追踪阅读/使用进度。"
      />

      <div className="mb-3 flex flex-wrap gap-1.5">
        <button className={`chip cursor-pointer ${!format ? 'bg-raised !text-ink' : ''}`} onClick={() => setFormat('')}>
          全部 <span className="text-muted tabular">{sources.length}</span>
        </button>
        {Object.keys(t.formats)
          .filter((f) => formatCounts.has(f))
          .map((f) => (
            <button
              key={f}
              className={`chip cursor-pointer ${format === f ? 'bg-raised !text-ink' : ''}`}
              onClick={() => setFormat(format === f ? '' : f)}
              aria-pressed={format === f}
            >
              {label(t.formats, f)} <span className="text-muted tabular">{formatCounts.get(f)}</span>
            </button>
          ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input className="input max-w-xs" placeholder="搜索…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="搜索" />
        <select className="input w-auto" value={market} onChange={(e) => setMarket(e.target.value)} aria-label="市场">
          <option value="">全部市场</option>
          {Object.keys(t.markets).map((k) => (
            <option key={k} value={k}>
              {label(t.markets, k)}
            </option>
          ))}
        </select>
        <select className="input w-auto" value={cost} onChange={(e) => setCost(e.target.value)} aria-label="费用">
          <option value="">全部费用</option>
          {Object.keys(t.costs).map((k) => (
            <option key={k} value={k}>
              {label(t.costs, k)}
            </option>
          ))}
        </select>
        <select
          className="input w-auto"
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          aria-label="排序"
        >
          <option value="rating">按评分</option>
          <option value="importance">按重要度</option>
          <option value="title">按名称</option>
        </select>
        <span className="text-xs text-muted tabular">
          {list.length} / {sources.length}
        </span>
      </div>

      {list.length === 0 && <Empty>没有匹配的信息源</Empty>}
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((s) => (
          <article key={s.id} className="card flex flex-col p-4">
            <div className="flex items-start justify-between gap-3">
              <Link to={nodeHref(s.id)} className="font-medium hover:underline">
                {s.title}
              </Link>
              <Score
                value={s.rating ?? 0}
                label="评分"
                onChange={editable ? (v) => void updateNode(s.id, { rating: v }) : undefined}
              />
            </div>
            <p className="mt-1 flex-1 text-sm text-ink-2">{s.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="chip">{label(t.formats, s.format)}</span>
              <span className="chip">{label(t.costs, s.cost)}</span>
              {s.lang && <span className="chip">{label(t.langs, s.lang)}</span>}
              {s.markets?.map((mk) => (
                <span key={mk} className="chip">
                  {label(t.markets, mk)}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              {s.url ? (
                <a href={s.url} target="_blank" rel="noreferrer noopener" className="truncate text-xs text-accent-ink hover:underline">
                  {s.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
                </a>
              ) : (
                <span className="text-xs text-muted">无统一链接</span>
              )}
              <StatusControl node={s} compact />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
