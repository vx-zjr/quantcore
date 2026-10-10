import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../content/store';
import type { QNode } from '../content/types';
import { label, nodeHref } from '../content/utils';

/**
 * 策略地图：横轴 = 持有周期（短→长），纵轴 = 个人适配度，气泡大小 = 策略容量。
 * 数据来自 industry 中 category=strategy 的节点（horizon/capacity/barrier/retailFit）。
 */
export function StrategyMap({ strategies }: { strategies: QNode[] }) {
  const { data } = useContent();
  const t = data.taxonomy;
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(320, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const horizons = Object.keys(t.horizons);
  const H = 380;
  const m = { l: 44, r: 16, t: 14, b: 44 };
  const iw = width - m.l - m.r;
  const ih = H - m.t - m.b;
  const band = iw / horizons.length;
  // 同一格（周期 × 适配度）的多个策略在带内均匀铺开，避免重叠
  const cell = new Map<string, string[]>();
  for (const s of [...strategies].sort((a, b) => a.id.localeCompare(b.id))) {
    const key = `${s.horizon}|${s.retailFit}`;
    cell.set(key, [...(cell.get(key) ?? []), s.id]);
  }
  const xOf = (n: QNode) => {
    const i = Math.max(0, horizons.indexOf(n.horizon ?? ''));
    const peers = cell.get(`${n.horizon}|${n.retailFit}`) ?? [n.id];
    const k = peers.indexOf(n.id);
    const step = Math.min(band * 0.42, 90);
    return m.l + band * (i + 0.5) + (k - (peers.length - 1) / 2) * step - (peers.length > 1 ? 20 : 0);
  };
  const yOf = (v: number) => m.t + ih - ((v - 0.5) / 5) * ih;
  const rOf = (n: QNode) => 5 + (n.capacity ?? 1) * 2.6;

  const sweetX = m.l + band * 2;
  const hovered = strategies.find((s) => s.id === hover);

  return (
    <div ref={wrapRef} className="relative">
      <svg width={width} height={H} role="img" aria-label="策略地图：持有周期 × 个人适配度，气泡大小为容量">
        {/* 个人甜区：持有数日以上 & 适配度 ≥ 3.5 */}
        <rect
          x={sweetX}
          y={yOf(5.5)}
          width={m.l + iw - sweetX}
          height={yOf(3.5) - yOf(5.5)}
          fill="var(--color-k3)"
          opacity={0.07}
          rx={8}
        />
        <text x={sweetX + 10} y={yOf(3.5) - 9} fontSize={11} fill="var(--color-ink-2)">
          个人甜区：周期更长、门槛更低、机构不屑或装不下
        </text>

        {[1, 2, 3, 4, 5].map((v) => (
          <g key={v}>
            <line x1={m.l} x2={m.l + iw} y1={yOf(v)} y2={yOf(v)} stroke="var(--color-grid)" strokeWidth={1} />
            <text x={m.l - 8} y={yOf(v) + 4} textAnchor="end" fontSize={11} fill="var(--color-muted)" className="tabular">
              {v}
            </text>
          </g>
        ))}
        <line x1={m.l} x2={m.l + iw} y1={m.t + ih} y2={m.t + ih} stroke="var(--color-axis)" />
        {horizons.map((h, i) => (
          <text
            key={h}
            x={m.l + band * (i + 0.5)}
            y={m.t + ih + 18}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-ink-2)"
          >
            {label(t.horizons, h)}
          </text>
        ))}
        <text x={m.l + iw / 2} y={H - 6} textAnchor="middle" fontSize={11} fill="var(--color-muted)">
          持有周期 →
        </text>
        <text
          transform={`translate(12 ${m.t + ih / 2}) rotate(-90)`}
          textAnchor="middle"
          fontSize={11}
          fill="var(--color-muted)"
        >
          个人适配度 →
        </text>

        {strategies.map((s) => {
          const x = xOf(s);
          const y = yOf(s.retailFit ?? 1);
          const r = rOf(s);
          const dim = hover && hover !== s.id;
          const short = s.title.split(/[（(/]/)[0].trim();
          // 同格多个点：标签上下交错；单点：标签在右侧
          const peers = cell.get(`${s.horizon}|${s.retailFit}`) ?? [s.id];
          const k = peers.indexOf(s.id);
          const lab =
            peers.length > 1
              ? { x: 0, y: k % 2 === 0 ? -r - 7 : r + 15, anchor: 'middle' as const }
              : { x: r + 5, y: 4, anchor: 'start' as const };
          return (
            <g
              key={s.id}
              transform={`translate(${x},${y})`}
              style={{ cursor: 'pointer' }}
              opacity={dim ? 0.35 : 1}
              onMouseEnter={() => setHover(s.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => navigate(nodeHref(s.id))}
            >
              <circle r={r + 8} fill="transparent" />
              <circle r={r} fill="var(--color-k3)" fillOpacity={0.85} stroke="var(--color-surface)" strokeWidth={2} />
              <text
                x={lab.x}
                y={lab.y}
                textAnchor={lab.anchor}
                fontSize={11.5}
                fill="var(--color-ink)"
                stroke="var(--color-surface)"
                strokeWidth={3}
                paintOrder="stroke"
              >
                {short.length > 9 ? short.slice(0, 8) + '…' : short}
              </text>
            </g>
          );
        })}
      </svg>

      {hovered && (
        <div
          className="card pointer-events-none absolute z-10 w-60 p-2.5 text-xs shadow-lg"
          style={{
            left: Math.min(xOf(hovered) + 16, width - 250),
            top: Math.max(0, Math.min(yOf(hovered.retailFit ?? 1) - 40, H - 170)),
          }}
        >
          <div className="font-medium text-ink">{hovered.title}</div>
          <dl className="mt-1 grid grid-cols-2 gap-x-2 text-ink-2 tabular">
            <dt>持有周期</dt>
            <dd>{label(t.horizons, hovered.horizon)}</dd>
            <dt>个人适配度</dt>
            <dd>{hovered.retailFit}/5</dd>
            <dt>容量</dt>
            <dd>{hovered.capacity}/5</dd>
            <dt>进入门槛</dt>
            <dd>{hovered.barrier}/5</dd>
          </dl>
          <p className="mt-1 text-ink-2">{hovered.summary}</p>
        </div>
      )}
    </div>
  );
}
