---
id: 2026-10-10-hub-initialized
title: 决策：先搭知识中心，暂不写策略代码
kind: journal
category: decision
date: 2026-10-10
summary: 第一阶段只建设认知地基（知识/技能/行业/信息源/思维/路线图），用「内容即数据 + AGENTS.md」让 AI 持续维护。
domains: [backtest, psychology]
tags: [架构, 起步]
importance: 4
confidence: high
related: [phase-0-foundation, research-as-science, edge-first]
created: 2026-10-10
updated: 2026-10-10
---

## 背景

想做个人量化。常见的失败路径是：一上来抄策略、跑回测、看到漂亮曲线就上实盘。缺的不是代码，而是判断力——知道什么是真优势、什么是过拟合、自己的约束在哪里。

## 决策

1. 阶段 0 不写任何量化/策略代码，只建设：知识、技能、行业认知、信息源、思维框架、路线图。
2. 采用「内容即数据」：每个知识点是一个 Markdown 文件（YAML frontmatter + 正文），放在 `content/` 下；前端只是渲染器。
3. 用 `AGENTS.md` 作为 AI 的操作手册，任何 AI 工具（Claude Code、Codex、Cursor 等）都按同一套规则读写内容。
4. 用 `npm run check` 作为客观的完成标准：schema 校验 + 链接完整性 + 索引同步 + 类型检查。

## 理由与备选

- **备选 A：Notion/Obsidian**。编辑体验好，但 AI 读写需要额外接口，可视化受限，且不受版本控制约束。
- **备选 B：数据库 + 后台**。过重，AI 难以直接 diff 和审阅。
- **选择 Markdown + Git**：AI 天然擅长读写文本；git diff 让每次 AI 修改都可审阅、可回滚；前端可做任意可视化。

## 后续行动

- [ ] 填写 `content/_meta/profile.yaml`（目标、市场、资金量级、时间、背景）
- [ ] 在技能页给自己逐项打分（等级标准见各技能正文）
- [ ] 按 [[phase-0-foundation]] 的清单推进
