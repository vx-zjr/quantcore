import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { contentPlugin } from './scripts/vite-plugin-content.ts';

// 内容（content/**/*.md）通过 virtual:content 注入前端；开发模式下额外提供 /__api 写回接口。
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), contentPlugin()],
  // 主包内联了全部内容数据（content/ 的 JSON），重依赖页面已按路由懒加载
  build: { chunkSizeWarningLimit: 900 },
});
