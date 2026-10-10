import { useEffect, useMemo, useRef, useState } from 'react';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from 'd3-force';
import { select } from 'd3-selection';
import {
  symbol,
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye,
  type SymbolType,
} from 'd3-shape';
import { zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from 'd3-zoom';
import { useContent } from '../content/store';
import type { Kind, QNode } from '../content/types';
import { kindColor } from '../content/utils';

const symbolHexagon: SymbolType = {
  draw(ctx, size) {
    const r = Math.sqrt((2 * size) / (3 * Math.sqrt(3)));
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      const x = r * Math.cos(a);
      const y = r * Math.sin(a);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  },
};

/** 每种 kind 一个形状：颜色之外的第二编码，保证色觉差异读者也能区分 */
export const KIND_SYMBOL: Record<Kind, SymbolType> = {
  knowledge: symbolCircle,
  skill: symbolSquare,
  industry: symbolDiamond,
  source: symbolTriangle,
  mindset: symbolStar,
  roadmap: symbolHexagon,
  journal: symbolCross,
  inbox: symbolWye,
};

export function symbolPath(kind: Kind, area: number) {
  return symbol(KIND_SYMBOL[kind], area)() ?? '';
}

interface GNode extends SimulationNodeDatum {
  id: string;
  node: QNode;
  area: number;
  r: number;
}
type GLink = SimulationLinkDatum<GNode> & { type: 'prereq' | 'related' };

interface Props {
  nodes: QNode[];
  edges: { source: string; target: string; type: 'prereq' | 'related' }[];
  height?: number;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
}

export function ForceGraph({ nodes, edges, height = 620, selectedId, onSelect }: Props) {
  const { data } = useContent();
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const simRef = useRef<Simulation<GNode, GLink> | null>(null);
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [width, setWidth] = useState(800);
  const [, setFrame] = useState(0);
  const [transform, setTransform] = useState<ZoomTransform>(zoomIdentity);
  const [hover, setHover] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number; n: QNode } | null>(null);

  // 尺寸
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(320, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const degree = useMemo(() => {
    const d = new Map<string, number>();
    for (const e of edges) {
      d.set(e.source, (d.get(e.source) ?? 0) + 1);
      d.set(e.target, (d.get(e.target) ?? 0) + 1);
    }
    return d;
  }, [edges]);

  const neighbors = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const e of edges) {
      if (!m.has(e.source)) m.set(e.source, new Set());
      if (!m.has(e.target)) m.set(e.target, new Set());
      m.get(e.source)!.add(e.target);
      m.get(e.target)!.add(e.source);
    }
    return m;
  }, [edges]);

  // 构建/更新仿真（保留已有节点的位置）
  const graph = useMemo(() => {
    const prev = new Map((simRef.current?.nodes() ?? []).map((n) => [n.id, n]));
    const gnodes: GNode[] = nodes.map((n) => {
      const area = 60 + n.importance * 28 + Math.min(degree.get(n.id) ?? 0, 12) * 10;
      const p = prev.get(n.id);
      return { id: n.id, node: n, area, r: Math.sqrt(area / Math.PI), x: p?.x, y: p?.y, vx: p?.vx, vy: p?.vy };
    });
    const ids = new Set(gnodes.map((n) => n.id));
    const glinks: GLink[] = edges
      .filter((e) => ids.has(e.source) && ids.has(e.target))
      .map((e) => ({ source: e.source, target: e.target, type: e.type }));
    return { gnodes, glinks };
  }, [nodes, edges, degree]);

  useEffect(() => {
    const { gnodes, glinks } = graph;
    simRef.current?.stop();
    const sim = forceSimulation<GNode, GLink>(gnodes)
      .force(
        'link',
        forceLink<GNode, GLink>(glinks)
          .id((d) => d.id)
          .distance((l) => (l.type === 'prereq' ? 60 : 90))
          .strength(0.25),
      )
      .force('charge', forceManyBody<GNode>().strength(-200).distanceMax(480))
      .force('collide', forceCollide<GNode>((d) => d.r + 9))
      .force('center', forceCenter(width / 2, height / 2))
      .force('x', forceX<GNode>(width / 2).strength(0.03))
      .force('y', forceY<GNode>(height / 2).strength(0.05));
    let raf = 0;
    sim.on('tick', () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          setFrame((f) => f + 1);
        });
      }
    });
    // 同步预计算布局后静态显示并适配视图；只有拖拽节点时才重新运行仿真
    const fresh = gnodes.some((n) => n.x == null);
    sim.stop();
    sim.alpha(fresh ? 1 : 0.4).tick(fresh ? 320 : 160);
    simRef.current = sim;
    setFrame((f) => f + 1);
    const fitRaf = requestAnimationFrame(() => fitView());
    return () => {
      sim.stop();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fitRaf);
    };
  }, [graph, width, height]);

  // 缩放平移
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const z = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .filter((event: Event & { button?: number; ctrlKey?: boolean; type: string; target: EventTarget | null }) => {
        const onNode = (event.target as Element | null)?.closest?.('[data-node]');
        if (onNode && event.type !== 'wheel') return false;
        return (!event.ctrlKey || event.type === 'wheel') && !event.button;
      })
      .on('zoom', (e) => setTransform(e.transform));
    select(svg).call(z);
    zoomRef.current = z;
    return () => {
      select(svg).on('.zoom', null);
    };
  }, []);

  /** 缩放平移到恰好容纳所有节点 */
  function fitView() {
    const svg = svgRef.current;
    const z = zoomRef.current;
    const ns = simRef.current?.nodes() ?? [];
    if (!svg || !z || !ns.length) return;
    const xs = ns.map((n) => n.x ?? 0);
    const ys = ns.map((n) => n.y ?? 0);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const pad = 40;
    const k = Math.min(1.4, (width - pad * 2) / Math.max(1, x1 - x0), (height - pad * 2) / Math.max(1, y1 - y0));
    const t = zoomIdentity
      .translate(width / 2, height / 2)
      .scale(k)
      .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
    select(svg).call(z.transform, t);
  }

  const resetView = () => fitView();

  // 拖拽节点
  const dragRef = useRef<{ id: string; moved: boolean } | null>(null);
  const toGraph = (clientX: number, clientY: number) => {
    const rect = svgRef.current!.getBoundingClientRect();
    return transform.invert([clientX - rect.left, clientY - rect.top]);
  };

  const focus = hover ?? selectedId ?? null;
  const focusSet = focus ? new Set([focus, ...(neighbors.get(focus) ?? [])]) : null;
  const showAllLabels = transform.k >= 1.6;
  const simNodes = simRef.current?.nodes() ?? graph.gnodes;
  const simLinks = (simRef.current?.force('link') as ReturnType<typeof forceLink<GNode, GLink>> | undefined)?.links() ?? [];

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden rounded-xl" style={{ height }}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="block touch-none select-none"
        role="img"
        aria-label={`知识图谱：${nodes.length} 个节点，${edges.length} 条关联`}
        onClick={(e) => {
          if (e.target === svgRef.current) onSelect?.(null);
        }}
      >
        <g transform={transform.toString()}>
          <g>
            {simLinks.map((l, i) => {
              const s = l.source as GNode;
              const t = l.target as GNode;
              if (s.x == null || t.x == null) return null;
              const on = focusSet ? focusSet.has(s.id) && focusSet.has(t.id) : true;
              return (
                <line
                  key={i}
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke="var(--color-axis)"
                  strokeWidth={l.type === 'prereq' ? 1.5 : 1}
                  strokeDasharray={l.type === 'prereq' ? undefined : '3 3'}
                  opacity={focusSet ? (on ? 0.95 : 0.08) : 0.55}
                />
              );
            })}
          </g>
          <g>
            {simNodes.map((g) => {
              if (g.x == null || g.y == null) return null;
              const n = g.node;
              const dim = focusSet && !focusSet.has(n.id);
              const isSel = selectedId === n.id;
              const showLabel = showAllLabels || n.importance >= 5 || (focusSet?.has(n.id) ?? false);
              return (
                <g
                  key={n.id}
                  data-node
                  transform={`translate(${g.x},${g.y})`}
                  opacity={dim ? 0.15 : 1}
                  style={{ cursor: 'pointer' }}
                  onPointerEnter={(e) => {
                    setHover(n.id);
                    const rect = wrapRef.current!.getBoundingClientRect();
                    setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top, n });
                  }}
                  onPointerMove={(e) => {
                    const rect = wrapRef.current!.getBoundingClientRect();
                    setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top, n });
                    const d = dragRef.current;
                    if (d && d.id === n.id) {
                      const [x, y] = toGraph(e.clientX, e.clientY);
                      g.fx = x;
                      g.fy = y;
                      d.moved = true;
                      simRef.current?.alphaTarget(0.25).restart();
                    }
                  }}
                  onPointerLeave={() => {
                    if (!dragRef.current) {
                      setHover(null);
                      setTip(null);
                    }
                  }}
                  onPointerDown={(e) => {
                    (e.currentTarget as Element).setPointerCapture(e.pointerId);
                    dragRef.current = { id: n.id, moved: false };
                  }}
                  onPointerUp={(e) => {
                    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
                    const d = dragRef.current;
                    dragRef.current = null;
                    simRef.current?.alphaTarget(0);
                    g.fx = null;
                    g.fy = null;
                    if (d && !d.moved) onSelect?.(n.id);
                  }}
                >
                  {/* 透明的大命中区 */}
                  <circle r={Math.max(g.r + 6, 12)} fill="transparent" />
                  <path
                    d={symbolPath(n.kind, g.area)}
                    fill={kindColor(data.taxonomy, n.kind)}
                    stroke={isSel ? 'var(--color-ink)' : 'var(--color-surface)'}
                    strokeWidth={2}
                  />
                  {showLabel && (
                    <text
                      y={g.r + 13}
                      textAnchor="middle"
                      fontSize={11}
                      fill="var(--color-ink)"
                      stroke="var(--color-surface)"
                      strokeWidth={3}
                      paintOrder="stroke"
                      style={{ pointerEvents: 'none' }}
                    >
                      {n.title.length > 16 ? n.title.slice(0, 15) + '…' : n.title}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {tip && (
        <div
          className="card pointer-events-none absolute z-10 max-w-64 p-2.5 text-xs shadow-lg"
          style={{
            left: Math.min(tip.x + 14, width - 270),
            top: Math.min(tip.y + 14, height - 110),
          }}
        >
          <div className="font-medium text-ink">{tip.n.title}</div>
          <div className="mt-0.5 text-muted">
            {data.taxonomy.kinds[tip.n.kind].label} · 关联 {degree.get(tip.n.id) ?? 0}
          </div>
          <div className="mt-1 line-clamp-3 text-ink-2">{tip.n.summary}</div>
        </div>
      )}

      <div className="absolute top-2 right-2 flex gap-1">
        <button className="btn !px-2 !py-1 text-xs" onClick={resetView}>
          适配视图
        </button>
      </div>
      <div className="pointer-events-none absolute bottom-2 left-3 text-[11px] text-muted">
        滚轮缩放 · 拖动画布平移 · 拖动节点 · 实线=前置 虚线=相关
      </div>
    </div>
  );
}
