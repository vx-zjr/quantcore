---
id: strat-trend-following
title: 趋势跟踪（CTA / 时间序列动量）
kind: industry
category: strategy
summary: 在多个资产（期货、ETF）上做多上涨趋势、做空或回避下跌趋势，配合波动率缩放；有百年级证据、规则简单、容量大，是个人系统化交易的首选原型之一。
horizon: months
capacity: 5
barrier: 2
retailFit: 4
domains: [strategy, risk]
tags: [趋势跟踪, CTA, 时序动量, 期货, 危机阿尔法]
importance: 5
confidence: high
related: [momentum-and-reversal, position-sizing-kelly, volatility-basics, cn-futures-options, book-systematic-trading, strat-asset-allocation, phase-3-paper-trading]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

- **信号**：资产过去一段时间（如 1–12 个月）的收益或均线关系为正则做多，为负则做空/空仓；常用多个周期信号平均以降低参数依赖。
- **仓位**：按波动率倒数缩放，使每个资产贡献相近的风险（参见 [[position-sizing-kelly]]）。
- **资产**：越分散越好——股指、债券、商品、外汇（国内可用商品与金融期货，或跨资产 ETF）。

## 逻辑与 edge 来源

- **行为**：反应不足与羊群效应使价格趋势化（参见 [[momentum-and-reversal]]）。
- **风险补偿/结构**：对冲者的需求、央行与机构的慢速调整。
- **危机阿尔法**：长期趋势在持续性危机（如 2008、2022）中往往表现好，与股票组合低相关甚至负相关。

## 对个人的意义

- ✅ 规则简单透明，参数少，不依赖昂贵数据（日线即可）。
- ✅ 容量大，机构也在做——但个人没有劣势，因为速度不重要。
- ⚠️ 期货一手名义价值大，小资金难以充分分散；可以用 ETF 版本或减少品种数作为起步。
- ⚠️ 胜率通常低于 50%，靠少数大趋势赚钱，长期震荡市会持续小亏——**心理挑战大**（参见 [[trading-psychology]]）。

## 主要风险

- 长时间无趋势的震荡期（可能持续 1–2 年）。
- 趋势急速反转（V 型反转）。
- 换月与成本处理不当导致回测高估（参见 [[data-cleaning]]）。

## 延伸

- 最佳入门读物：[[book-systematic-trading]]（Rob Carver）
- 经典证据：Hurst, Ooi & Pedersen (2017)「A Century of Evidence on Trend-Following Investing」
