import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { LevelControl } from '../components/LevelControl';
import { PageHeader, Section } from '../components/ui';
import { useContent } from '../content/store';
import { label, nodeHref, skillGap } from '../content/utils';
import { SkillBar } from './Dashboard';

export function SkillsPage() {
  const { data, byKind, editable } = useContent();
  const t = data.taxonomy;
  const skills = byKind('skill');

  const groups = useMemo(() => {
    const m = new Map<string, typeof skills>();
    for (const s of skills) {
      const d = s.domains[0] ?? 'other';
      if (!m.has(d)) m.set(d, []);
      m.get(d)!.push(s);
    }
    const order = Object.keys(t.domains);
    return [...m.entries()]
      .sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
      .map(([d, list]) => ({
        domain: d,
        name: label(t.domains, d),
        list: list.sort((a, b) => b.importance - a.importance),
        level: list.reduce((s, n) => s + (n.level ?? 0), 0) / list.length,
        target: list.reduce((s, n) => s + (n.target ?? 0), 0) / list.length,
      }));
  }, [skills, t.domains]);

  const radar = groups.map((g) => ({ name: g.name, 当前: +g.level.toFixed(2), 目标: +g.target.toFixed(2) }));
  const unscored = skills.every((s) => (s.level ?? 0) === 0);

  return (
    <div className="space-y-5">
      <PageHeader
        title="技能"
        desc="需要刻意练习的能力。按主领域（domains[0]）分组，每项都有 L1–L5 的等级标准写在正文里。先如实自评，再决定补哪块。"
      />

      <div className="grid gap-5 lg:grid-cols-5">
        <Section title="能力雷达（各领域平均等级）" className="lg:col-span-3">
          <div className="h-[340px]" role="img" aria-label="技能雷达图：各领域当前与目标平均等级">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar} outerRadius="72%">
                <PolarGrid stroke="var(--color-grid)" />
                <PolarAngleAxis dataKey="name" tick={{ fill: 'var(--color-ink-2)', fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 5]} tickCount={6} tick={{ fill: 'var(--color-muted)', fontSize: 10 }} axisLine={false} />
                <Radar dataKey="目标" stroke="var(--color-k2)" strokeWidth={2} fill="var(--color-k2)" fillOpacity={0.08} />
                <Radar dataKey="当前" stroke="var(--color-k1)" strokeWidth={2} fill="var(--color-k1)" fillOpacity={0.25} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-line)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: 'var(--color-ink)' }}
                  itemStyle={{ color: 'var(--color-ink-2)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-xs text-ink-2">
            <span className="flex items-center gap-1.5">
              <i className="inline-block h-0.5 w-4" style={{ background: 'var(--color-k1)' }} /> 当前
            </span>
            <span className="flex items-center gap-1.5">
              <i className="inline-block h-0.5 w-4" style={{ background: 'var(--color-k2)' }} /> 目标
            </span>
          </div>
        </Section>

        <Section title="怎么用" className="lg:col-span-2">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-ink-2">
            <li>打开每项技能，对照正文的「等级标准」如实打分（宁低勿高）。</li>
            <li>
              目标等级已按「个人量化够用」预设，可按 <code className="rounded bg-raised px-1">profile.yaml</code> 的目标调整。
            </li>
            <li>差距 × 重要度最大的 2–3 项，就是这一阶段的练习重点。</li>
            <li>每项技能的「验收方式」是可交付的作品，达成后再升级。</li>
          </ol>
          {unscored && (
            <p className="mt-3 rounded-lg p-3 text-sm" style={{ background: 'var(--color-raised)' }}>
              <span style={{ color: 'var(--color-warning)' }}>▲</span> 还没有自评。
              {editable ? '直接点击下方数字即可写回文件。' : '运行 npm run dev 后可在此点击打分，或让 AI 问你问题后代为填写。'}
            </p>
          )}
        </Section>
      </div>

      {groups.map((g) => (
        <Section
          key={g.domain}
          title={
            <>
              {g.name}
              <span className="ml-2 font-normal text-muted tabular">
                均值 L{g.level.toFixed(1)} → L{g.target.toFixed(1)}
              </span>
            </>
          }
        >
          <ul className="divide-y divide-line">
            {g.list.map((n) => (
              <li key={n.id} className="grid gap-2 py-3 md:grid-cols-[1fr_auto] md:items-center md:gap-6">
                <div className="min-w-0">
                  <Link to={nodeHref(n.id)} className="font-medium hover:underline">
                    {n.title}
                  </Link>
                  {skillGap(n) >= 3 && (
                    <span className="chip ml-2 !py-0 text-[11px]">差距 {skillGap(n)}</span>
                  )}
                  <p className="mt-0.5 text-sm text-ink-2">{n.summary}</p>
                  <div className="mt-2 max-w-md">
                    <SkillBar level={n.level ?? 0} target={n.target ?? 0} />
                  </div>
                </div>
                <div className="space-y-1">
                  <LevelControl node={n} field="level" />
                  <LevelControl node={n} field="target" />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </div>
  );
}
