---
id: strat-asset-allocation
title: 系统化资产配置（风险平价 / 再平衡）
kind: industry
category: strategy
summary: 在股票、债券、商品、黄金等大类资产之间按规则配置并定期再平衡（等权、风险平价、目标波动率）；收益主要来自风险溢价与分散化，是个人资金的「底仓」型策略。
horizon: months
capacity: 5
barrier: 1
retailFit: 5
domains: [strategy, risk, macro]
tags: [资产配置, 风险平价, 再平衡, 全天候]
importance: 4
confidence: high
related: [portfolio-construction, macro-regimes, strat-etf-rotation, strat-trend-following, book-expected-returns, simplicity-first]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

- **资产**：股票（国内/海外宽基 ETF）、国债、黄金、商品等。
- **权重方法**：固定比例（如 60/40）、波动率倒数、风险平价、目标波动率（参见 [[portfolio-construction]]）。
- **再平衡**：按日历（季度）或按偏离阈值。

## 逻辑与 edge 来源

- **风险溢价**：长期持有股票、债券等获取风险补偿（参见 [[book-expected-returns]]）。
- **分散化**：低相关资产组合降低波动，提高长期几何收益（参见 [[survival-first]] 的波动拖累）。
- **再平衡**：系统地「高卖低买」。

## 对个人的意义

- ✅ 最适合个人的长期策略之一：低频、低成本、低维护、容量无限。
- ✅ 可作为其他主动策略的底仓与基准：如果主动策略长期跑不赢一个简单的配置组合，就没有存在的必要。
- ⚠️ 收益「平淡」——它的价值在于长期复利和回撤控制，而非短期收益。

## 主要风险

- 股债同跌（高通胀时期股债相关性可能转正，参见 [[macro-regimes]]）。
- 风险平价对债券的高权重在利率上行周期中受损。
- 再平衡规则与资产选择的事后优化（过拟合）。
