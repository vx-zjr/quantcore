---
id: phase-0-foundation
title: 阶段 0：认知与地基
kind: roadmap
summary: 建立判断力而不是写策略：明确自己的目标与约束，掌握核心概念与思维框架，选定主攻市场，搭好可持续迭代的知识中心。
phase: 0
status: doing
domains: [psychology, backtest]
tags: [起步, 认知]
importance: 5
confidence: high
related: [2026-10-10-hub-initialized, phase-1-data-infra]
prereqs: [edge-first, overfitting-is-default, survival-first, small-player-edge, research-as-science]
created: 2026-10-10
updated: 2026-10-10
---

## 目标

在写第一行策略代码之前，回答清楚三个问题：
1. **我是谁**：目标、资金、时间、能力、风险承受力（profile.yaml）。
2. **战场在哪**：哪个市场、哪类策略适合我（参见 [[small-player-edge]] 与行业页的策略地图）。
3. **怎么判断真假**：如何识别过拟合、如何评价一个策略（思维与方法论）。

## 交付物

- [x] 知识中心上线：内容即数据 + AGENTS.md 驱动 + 可视化界面
- [ ] 填写 `content/_meta/profile.yaml`（目标、市场、资金量级、时间、背景、风险承受力）
- [ ] 在「技能」页完成全部技能的自评（对照每项的等级标准）
- [ ] 读完所有「核心」（重要度 5）的思维与知识节点，并在 UI 中标记进度
- [ ] 读完至少 2 本书：[[book-systematic-trading]] + 任选一本（推荐 [[book-fooled-by-randomness]] 或 [[book-factor-investing-cn]]）
- [ ] 选定主攻市场与 1–2 类候选策略原型，写一条 journal 决策记录说明理由
- [ ] 完成一次 [[backtest-red-flags]] 实战：找一篇网上的「高收益策略」文章，逐条审查并写下结论

## 退出标准

满足以下条件才进入阶段 1：

- [ ] profile.yaml 中 `goal`、`markets`、`capital`、`hours_per_week`、`risk_tolerance` 已填写
- [ ] 能不看资料讲清楚：edge 的六类来源、过拟合的五个来源、前视偏差的四种形式
- [ ] 「Python」与「pandas/NumPy」两项技能自评 ≥ L2（不足则先补编程）
- [ ] 主攻市场选定决策已记录在 journal

## 不做什么

- 不写策略代码、不跑回测、不开实盘账户的程序化功能。
- 不购买付费课程、付费数据或「信号」。
- 不追求读完所有内容——核心节点读透比全部浏览更重要。
