---
id: phase-0-foundation
title: 阶段 0：认知与地基（零基础 12 周）
kind: roadmap
summary: 从零开始的 12 周（每周约 20 小时）：建立正确预期与思维框架，学会 Python 和 pandas 处理数据，掌握统计入门与市场规则，最后选定主攻市场——全程不写策略代码、不投真钱。
phase: 0
status: doing
domains: [psychology, programming]
tags: [起步, 认知, 零基础, 学习计划]
importance: 5
confidence: high
related: [2026-10-10-hub-initialized, 2026-10-10-profile-beginner, phase-1-data-infra, what-is-quant, glossary-basics]
prereqs: [edge-first, overfitting-is-default, survival-first, small-player-edge, research-as-science]
created: 2026-10-10
updated: 2026-10-10
---

## 目标

你目前是零基础（见 profile.yaml），所以阶段 0 要同时补三块：**思维**（怎么判断真假）、**工具**（Python 处理数据）、**常识**（市场规则与统计直觉）。结束时回答：

1. **我是谁**：目标、约束、能投入什么（已基本填写，见 profile.yaml）。
2. **战场在哪**：主攻哪个市场、哪类策略（参见 [[small-player-edge]] 与行业页的策略地图）。
3. **怎么判断真假**：如何识别过拟合、如何评价一个结果。

> 关于练习代码：学 Python 时写的练习（下载行情、画图、算收益率）是**学习**，不是策略。建议放在本仓库之外的单独练习目录，本仓库只记录学到的知识。

## 12 周计划（每周约 20 小时）

| 周 | 主题 | 读（本中心） | 练 | 外部资源 |
|---|---|---|---|---|
| 1–2 | 建立全景与正确预期 | [[what-is-quant]]、[[glossary-basics]]、[[edge-first]]、[[overfitting-is-default]]、[[survival-first]]、[[base-rates]]、[[small-player-edge]] | 每个节点读完写 3 句自己的话（记到收件箱） | [[book-fooled-by-randomness]] |
| 3–6 | Python 入门 | [[python]]、[[pandas-numpy]]、[[python-data-stack]] | 装好环境；完成基础语法练习；用 [[akshare]] 下载沪深 300 日线，画价格图、算日收益率和最大回撤 | Python 官方教程；《Python for Data Analysis》 |
| 5–8 | 统计入门（与 Python 并行） | [[probability-statistics]]、[[return-distributions]]、[[performance-metrics]] | 用真实数据算均值、波动率、相关性；画收益分布并和正态分布对比 | [[book-statistical-learning]] 第 1–3 章 |
| 7–10 | 市场与量化基础 | [[cn-a-share-rules]]、[[transaction-costs]]、[[market-microstructure]]、[[factor-models]]、[[backtesting-pitfalls]]、[[point-in-time-data]] | 列出「回测必须建模的 A 股规则」清单；计算一个往返的交易成本 | [[book-systematic-trading]] |
| 11–12 | 整合与决策 | [[cn-quant-landscape]]、[[retail-quant-ecosystem-cn]]、行业页策略地图、[[backtest-red-flags]] | 审查一篇网上的「高收益策略」文章；写主攻市场决策日志 | — |

每周结束花 15 分钟做一次小复盘（参见 playbooks/periodic-review.md，或在 Claude Code 里用 `/periodic-review`）。

## 交付物

- [x] 知识中心上线：内容即数据 + AGENTS.md 驱动 + 可视化界面
- [x] 填写 `content/_meta/profile.yaml` 基本信息（2026-10-10 完成；风险承受力等到模拟盘前再补）
- [ ] 第 1–2 周：读完「起点」与核心思维节点，并在 UI 中标记进度
- [ ] 第 3–6 周：Python 环境搭好，能独立下载一只指数的日线、画图、算收益率与最大回撤
- [ ] 第 5–8 周：能用自己的话解释均值、标准差、相关性、正态分布与厚尾
- [ ] 第 7–10 周：读完 [[book-systematic-trading]]，写一篇读书笔记（journal）
- [ ] 第 11–12 周：完成一次 [[backtest-red-flags]] 实战审查
- [ ] 第 11–12 周：选定主攻市场与 1–2 类候选策略原型，写一条 journal 决策记录
- [ ] 每两周在「技能」页对照等级标准重新自评一次

## 退出标准

满足以下条件才进入阶段 1：

- [ ] 「Python」与「pandas/NumPy」技能自评 ≥ L2，「概率与统计」≥ L1
- [ ] 能不看资料讲清楚：edge 的六类来源、过拟合的五个来源、前视偏差的四种形式
- [ ] 主攻市场选定决策已记录在 journal，profile.yaml 的 `markets` 已收窄

## 不做什么

- 不写策略代码、不跑回测、不开任何真钱账户。
- 不购买付费课程、付费数据或「信号」。
- 不追求读完所有内容——核心节点读透比全部浏览更重要。
- 进度慢于计划很正常：零基础学编程卡住是常态，把问题记到收件箱交给 AI，而不是跳过。
