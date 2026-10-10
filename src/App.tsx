import { lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ContentProvider } from './content/store';
import { Dashboard } from './pages/Dashboard';
import { KindPage } from './pages/KindPage';

// 重依赖页面（d3、recharts、markdown/katex）按需加载
const GraphPage = lazy(() => import('./pages/GraphPage').then((m) => ({ default: m.GraphPage })));
const SkillsPage = lazy(() => import('./pages/SkillsPage').then((m) => ({ default: m.SkillsPage })));
const IndustryPage = lazy(() => import('./pages/IndustryPage').then((m) => ({ default: m.IndustryPage })));
const SourcesPage = lazy(() => import('./pages/SourcesPage').then((m) => ({ default: m.SourcesPage })));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage').then((m) => ({ default: m.RoadmapPage })));
const JournalPage = lazy(() => import('./pages/JournalPage').then((m) => ({ default: m.JournalPage })));
const HealthPage = lazy(() => import('./pages/HealthPage').then((m) => ({ default: m.HealthPage })));
const NodePage = lazy(() => import('./pages/NodePage').then((m) => ({ default: m.NodePage })));

// 路由表。新增页面：在 src/pages/ 下建组件，在此注册，并在 components/Layout.tsx 的 nav 中加入口。
export function App() {
  return (
    <ContentProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="graph" element={<GraphPage />} />
            <Route
              path="knowledge"
              element={
                <KindPage
                  kind="knowledge"
                  groupBy="domain"
                  desc="需要理解的概念、原理与市场规则。按主领域分组；标记「核心」的是重要度 5 的必修项。"
                />
              }
            />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="industry" element={<IndustryPage />} />
            <Route path="sources" element={<SourcesPage />} />
            <Route
              path="mindset"
              element={
                <KindPage
                  kind="mindset"
                  groupBy="category"
                  desc="原则、心智模型、认知偏差与检查清单。量化的护城河首先是思维方式——这些比任何单个策略都更持久。"
                />
              }
            />
            <Route path="roadmap" element={<RoadmapPage />} />
            <Route path="journal" element={<JournalPage />} />
            <Route path="health" element={<HealthPage />} />
            <Route path="n/:id" element={<NodePage />} />
            <Route path="*" element={<NodePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ContentProvider>
  );
}
