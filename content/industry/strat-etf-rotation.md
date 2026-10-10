---
id: strat-etf-rotation
title: ETF 轮动
kind: industry
category: strategy
summary: 在宽基、行业、风格、跨境与商品 ETF 之间，按动量、趋势或估值等规则定期切换持仓；门槛低、执行简单、容量足够个人使用，是入门系统化的理想练习场。
horizon: weeks
capacity: 4
barrier: 1
retailFit: 5
domains: [strategy]
tags: [ETF, 轮动, 动量, 入门]
importance: 4
confidence: high
related: [momentum-and-reversal, strat-asset-allocation, strat-trend-following, cn-a-share-rules, small-player-edge, phase-3-paper-trading]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

- **候选池**：一组流动性好、低相关的 ETF（如沪深 300、中证 1000、创业板、红利、国债、黄金、纳指/标普跨境 ETF）。
- **信号**：过去 N 周/月的相对强弱（截面动量）+ 绝对趋势过滤（跌势中切换到债券/货币）。
- **调仓**：周度或月度，持有排名前 1–3 的 ETF。

## 逻辑与 edge 来源

- 资产/行业层面的动量与趋势效应比个股更稳健（参见 [[momentum-and-reversal]]）。
- 绝对趋势过滤可以在大熊市中回避部分回撤。

## 对个人的意义

- ✅ 数据简单（ETF 日线）、交易简单、成本低（ETF 免印花税；部分 ETF 可 T+0）。
- ✅ 很适合作为第一个走完「研究 → 模拟盘 → 小资金实盘」全流程的策略。
- ⚠️ 因为简单，网上的版本非常多，**极易过拟合**：候选池选择、回看周期、持有数量都是自由度。

## 主要风险

- 轮动频繁时在震荡市中反复打脸。
- 候选池中的 ETF 是「事后挑选」的（幸存者偏差）——回测要使用当时已上市的 ETF。
- 跨境 ETF 的溢价风险（额度紧张时可能大幅溢价）。
