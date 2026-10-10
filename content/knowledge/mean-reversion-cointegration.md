---
id: mean-reversion-cointegration
title: 均值回归与配对交易
kind: knowledge
summary: 价格偏离「合理关系」后会回归的假设：单资产均值回归、配对/篮子价差回归；核心难点在于区分暂时偏离与结构性断裂。
domains: [strategy, math-stats]
tags: [均值回归, 配对交易, 协整, OU过程]
status: todo
importance: 3
confidence: high
related: [time-series-stationarity, strat-stat-arb, momentum-and-reversal, risk-management, survival-first]
prereqs: [time-series-stationarity]
created: 2026-10-10
updated: 2026-10-10
---

## 是什么

**均值回归**：某个量（价格、价差、比率、估值）偏离其长期均衡后，会向均衡回归。

常用模型：**Ornstein-Uhlenbeck（OU）过程**
$$dX_t = \theta(\mu - X_t)\,dt + \sigma\,dW_t$$
- $\theta$：回归速度；**半衰期** $= \ln 2 / \theta$。
- 半衰期决定持有周期：半衰期太长，资金占用久；太短，成本吃掉利润。

## 配对交易流程

1. **候选筛选**：同行业、相同驱动因素的资产（逻辑先行，而不是在全市场暴力搜索——那会产生大量伪配对）。
2. **关系检验**：协整检验（参见 [[time-series-stationarity]]），估计对冲比率。
3. **信号**：价差的 z-score 超过阈值（如 ±2）开仓，回到 0 附近平仓。
4. **风控**：价差继续扩大到某阈值或持有超过 N 个半衰期则止损。

## 关键风险

- **结构性断裂**：公司并购、业务转型、监管变化，让「暂时偏离」变成「永久偏离」。均值回归策略的亏损往往来自少数断裂事件，单笔可能吞掉大量盈利。
- **拥挤**：2007 年 8 月 Quant Quake 中，同类统计套利头寸被集中平仓，价差先大幅扩大。
- **A 股约束**：融券困难，难以做空配对的一腿（参见 [[cn-a-share-rules]]）。可在期货品种间（如跨期、跨品种）或 ETF 之间寻找替代。

## 常见误区

- 在数千只股票中两两检验协整，挑出 p 值最小的配对——这是典型的多重检验陷阱（参见 [[multiple-testing]]）。
- 不设止损，「越跌越买」，直到断裂。
