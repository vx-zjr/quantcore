---
id: phase-3-paper-trading
title: 阶段 3：首批策略与模拟盘
kind: roadmap
summary: 选择 1-3 个简单、逻辑清楚、适合个人的策略原型，完成完整研究流程后进入至少 3 个月的模拟盘，验证信号、执行与心理。
phase: 3
status: todo
domains: [strategy, execution]
tags: [策略, 模拟盘]
importance: 4
confidence: high
related: [phase-2-research-framework, phase-4-small-live, strat-trend-following, strat-etf-rotation, strat-asset-allocation, strat-convertible-bonds]
prereqs: [phase-2-research-framework, edge-first, go-live-checklist]
created: 2026-10-10
updated: 2026-10-10
---

## 目标

让 1–3 个策略走完完整的研究流程（参见 [[alpha-research-pipeline]]），并在模拟盘中验证「回测里的世界」与「真实世界」一致。

## 候选策略原型（按个人适配度）

优先从行业页「策略地图」的个人甜区中选择，例如：
- [[strat-trend-following]]（期货或多资产 ETF）
- [[strat-etf-rotation]]
- [[strat-asset-allocation]]
- [[strat-convertible-bonds]]

## 交付物

- [ ] 每个候选策略一份研究记录：假设、edge 来源、预注册标准、结果、尝试次数
- [ ] 通过者进入模拟盘：每日自动生成信号与目标持仓
- [ ] 模拟成交与回测逐日对账，记录偏差
- [ ] 每周复盘日志（参见 playbooks/periodic-review.md）

## 退出标准

- [ ] 至少 1 个策略模拟盘运行 ≥ 3 个月，信号与回测一致，偏差可解释
- [ ] 模拟期间无手动干预（或每次干预均有记录与复盘）
- [ ] [[go-live-checklist]] 逐项满足

## 不做什么

- 不同时研究超过 3 个策略。
- 不因模拟盘短期亏损修改策略（参见 [[process-over-outcome]]）。
