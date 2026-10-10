---
id: strat-stat-arb
title: 统计套利 / 配对交易
kind: industry
category: strategy
summary: 利用相关资产之间的相对定价偏离（配对、篮子、残差）做均值回归交易；需要做空能力与大量分散的小额下注，在 A 股受融券限制，个人适配度有限。
horizon: days
capacity: 3
barrier: 3
retailFit: 2
domains: [strategy, math-stats]
tags: [统计套利, 配对交易, 均值回归, 市场中性]
importance: 3
confidence: high
related: [mean-reversion-cointegration, time-series-stationarity, ic-analysis, cn-a-share-rules, multiple-testing]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

- **配对交易**：两只协整的资产，价差偏离时买弱卖强，回归后平仓（参见 [[mean-reversion-cointegration]]）。
- **残差均值回归**：对因子模型回归后的个股残差做截面反转。
- **依赖广度**：单笔预测力很弱，靠大量独立下注获得稳定收益（参见 [[ic-analysis]] 的基本定律）。

## 逻辑与 edge 来源

为短期过度反应与流动性冲击提供「反向流动性」，获得补偿。

## 对个人的意义

- ⚠️ A 股个股融券困难（参见 [[cn-a-share-rules]]），配对难以实施；可考虑期货跨期/跨品种、ETF 之间的价差。
- ⚠️ 需要较高的交易频率和精细的成本控制。
- ✅ 作为学习时间序列与均值回归的练习很有价值。

## 主要风险

- 结构性断裂、拥挤平仓（2007 Quant Quake）。
- 多重检验产生的伪配对（参见 [[multiple-testing]]）。
