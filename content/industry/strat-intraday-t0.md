---
id: strat-intraday-t0
title: 日内 T0 / 底仓增强
kind: industry
category: strategy
summary: 持有股票底仓的前提下，日内先卖后买（或先买后卖）实现「T+0」效果，以日内价格波动增厚收益；国内量化机构指增的重要收益来源之一，依赖 Level-2 数据与快速执行。
horizon: intraday
capacity: 2
barrier: 3
retailFit: 2
domains: [strategy, execution]
tags: [T0, 日内, 底仓, A股]
importance: 2
confidence: medium
related: [cn-a-share-rules, cn-quant-landscape, market-microstructure, transaction-costs, cn-programmatic-trading-rules]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

A 股 T+1 规则下，当天买入的股票不能当天卖出。但如果**已持有底仓**，就可以：
- 早盘卖出部分底仓，价格回落后买回（正 T）；
- 或先买入，价格上涨后卖出等量底仓（反 T）。
日终持仓不变，日内差价即为增强收益。

## 逻辑与 edge 来源

日内短期价格的均值回归与微观结构信号（参见 [[market-microstructure]]）。

## 对个人的意义

- ⚠️ 需要较高质量的日内数据（Level-2）、快速执行和精细的成本控制；每次往返都要付印花税和佣金（参见 [[transaction-costs]]）。
- ⚠️ 与机构的 T0 算法直接竞争。
- ⚠️ 频繁申报撤单需注意程序化交易监管（参见 [[cn-programmatic-trading-rules]]）。
- 对于手动做 T 的个人投资者，系统化回测其真实效果（扣成本后）往往会得到「不值得」的结论——这本身是一个很好的研究练习。
