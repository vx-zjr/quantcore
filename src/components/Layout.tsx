import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useContent } from '../content/store';
import type { Kind } from '../content/types';
import { CommandPalette } from './CommandPalette';
import { KindDot } from './ui';

interface NavItem {
  to: string;
  label: string;
  kind?: Kind;
  count?: number;
}

type Theme = 'system' | 'light' | 'dark';

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const t = localStorage.getItem('qc-theme');
      return t === 'light' || t === 'dark' ? t : 'system';
    } catch {
      return 'system';
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = theme;
    try {
      if (theme === 'system') localStorage.removeItem('qc-theme');
      else localStorage.setItem('qc-theme', theme);
    } catch {
      /* 存储不可用时忽略 */
    }
  }, [theme]);
  const next = () => setTheme((t) => (t === 'system' ? 'light' : t === 'light' ? 'dark' : 'system'));
  return [theme, next];
}

export function Layout() {
  const { data, byKind, editable } = useContent();
  const t = data.taxonomy;
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [theme, nextTheme] = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const errors = data.issues.filter((i) => i.level === 'error').length;
  const warns = data.issues.filter((i) => i.level === 'warn').length;
  const inboxTodo = byKind('inbox').filter((n) => n.status !== 'done').length;

  const nav: NavItem[] = [
    { to: '/', label: '总览' },
    { to: '/graph', label: '知识图谱' },
    { to: '/knowledge', label: t.kinds.knowledge.label, kind: 'knowledge', count: byKind('knowledge').length },
    { to: '/skills', label: t.kinds.skill.label, kind: 'skill', count: byKind('skill').length },
    { to: '/industry', label: t.kinds.industry.label, kind: 'industry', count: byKind('industry').length },
    { to: '/sources', label: t.kinds.source.label, kind: 'source', count: byKind('source').length },
    { to: '/mindset', label: t.kinds.mindset.label, kind: 'mindset', count: byKind('mindset').length },
    { to: '/roadmap', label: t.kinds.roadmap.label, kind: 'roadmap', count: byKind('roadmap').length },
    { to: '/journal', label: '日志与收件箱', kind: 'journal', count: byKind('journal').length + inboxTodo },
    { to: '/health', label: '内容维护', count: errors + warns || undefined },
  ];

  const themeLabel = { system: '跟随系统', light: '浅色', dark: '深色' }[theme];

  return (
    <div className="min-h-screen md:flex">
      <aside className="sticky top-0 z-30 border-b border-line bg-surface md:h-screen md:w-56 md:shrink-0 md:border-r md:border-b-0">
        <div className="flex items-center justify-between gap-2 px-4 py-3 md:block">
          <NavLink to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <img src="./favicon.svg" alt="" className="h-6 w-6" />
            QuantCore
          </NavLink>
          <p className="hidden text-xs text-muted md:mt-1 md:block">个人量化中心 · 阶段 0</p>
          <button className="btn !px-2 !py-1 text-xs md:hidden" onClick={() => setPaletteOpen(true)}>
            搜索
          </button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-col md:overflow-visible md:pb-0" aria-label="主导航">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  isActive ? 'bg-raised font-medium text-ink' : 'text-ink-2 hover:bg-raised hover:text-ink'
                }`
              }
            >
              {item.kind ? <KindDot kind={item.kind} /> : <span className="inline-block w-2" />}
              <span className="flex-1">{item.label}</span>
              {item.count !== undefined && <span className="text-xs text-muted tabular">{item.count}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="hidden space-y-2 px-4 pt-6 text-xs text-muted md:block">
          <button className="btn w-full justify-between" onClick={() => setPaletteOpen(true)}>
            <span>搜索</span>
            <kbd className="text-muted">⌘K</kbd>
          </button>
          <button className="btn w-full justify-between" onClick={nextTheme} aria-label="切换主题">
            <span>主题</span>
            <span className="text-muted">{themeLabel}</span>
          </button>
          <p className="pt-2 leading-relaxed">
            {editable ? (
              <>
                <span style={{ color: 'var(--color-good)' }}>●</span> 开发模式：界面上的修改会直接写回 content/ 下的文件
              </>
            ) : (
              <>
                <span>○</span> 只读模式：运行 npm run dev 以启用编辑
              </>
            )}
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-6xl">
          <Suspense fallback={<p className="py-10 text-center text-sm text-muted">加载中…</p>}>
            <Outlet />
          </Suspense>
        </div>
      </main>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
