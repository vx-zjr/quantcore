import { Link } from 'react-router-dom';
import { NodeList } from '../components/NodeList';
import { StrategyMap } from '../components/StrategyMap';
import { PageHeader, Score, Section } from '../components/ui';
import { useContent } from '../content/store';
import { label, nodeHref } from '../content/utils';

export function IndustryPage() {
  const { data, byKind } = useContent();
  const t = data.taxonomy;
  const all = byKind('industry');
  const strategies = all.filter((n) => n.category === 'strategy');
  const others = all.filter((n) => n.category !== 'strategy');
  const sorted = [...strategies].sort((a, b) => (b.retailFit ?? 0) - (a.retailFit ?? 0) || (a.barrier ?? 0) - (b.barrier ?? 0));

  return (
    <div className="space-y-5">
      <PageHeader
        title="行业"
        desc="行业格局、主要玩家、策略原型、监管与职业路径。时效性强的节点带有复核日期，过期会在「内容维护」页提醒。"
      />

      <Section title="策略地图" right={<span className="text-xs text-muted">气泡越大 = 容量越大 · 点击查看详情</span>}>
        <StrategyMap strategies={strategies} />
        <details className="mt-3">
          <summary className="cursor-pointer text-xs text-ink-2">表格视图</summary>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-ink-2">
                <tr className="border-b border-line">
                  <th className="py-2 pr-3 font-medium">策略原型</th>
                  <th className="py-2 pr-3 font-medium">持有周期</th>
                  <th className="py-2 pr-3 font-medium">个人适配</th>
                  <th className="py-2 pr-3 font-medium">门槛</th>
                  <th className="py-2 font-medium">容量</th>
                </tr>
              </thead>
              <tbody className="tabular">
                {sorted.map((s) => (
                  <tr key={s.id} className="border-b border-line last:border-0">
                    <td className="py-2 pr-3">
                      <Link to={nodeHref(s.id)} className="hover:underline">
                        {s.title}
                      </Link>
                    </td>
                    <td className="py-2 pr-3 text-ink-2">{label(t.horizons, s.horizon)}</td>
                    <td className="py-2 pr-3">
                      <Score value={s.retailFit ?? 0} label="个人适配度" />
                    </td>
                    <td className="py-2 pr-3">
                      <Score value={s.barrier ?? 0} label="门槛" />
                    </td>
                    <td className="py-2">
                      <Score value={s.capacity ?? 0} label="容量" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </Section>

      <NodeList nodes={others} groupBy="category" showStatus={false} />
    </div>
  );
}
