---
id: strat-multi-factor-equity
title: 多因子选股 / 指数增强
kind: industry
category: strategy
summary: 用多个因子对股票打分排序，构建相对基准有稳定超额的组合；是国内量化私募的主战场，个人可以做低频、低换手的版本，但难以与机构正面竞争。
horizon: weeks
capacity: 4
barrier: 4
retailFit: 3
domains: [strategy, asset-pricing]
tags: [多因子, 指数增强, 选股, 因子合成]
importance: 4
confidence: high
related: [factor-models, cn-factor-landscape, ic-analysis, portfolio-construction, cn-quant-landscape, ml-in-finance, small-player-edge]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

1. 构建因子：价值、质量、成长、动量/反转、波动、流动性、分析师预期等（参见 [[factor-models]]）。
2. 因子处理：去极值、标准化、行业/市值中性化。
3. 因子合成：等权、IC 加权或机器学习（参见 [[ml-in-finance]]）。
4. 组合构建：控制行业、风格暴露与跟踪误差（参见 [[portfolio-construction]]）。
5. 定期调仓（机构多为日频，个人适合周/月频）。

## 逻辑与 edge 来源

风险溢价（价值、规模）+ 行为偏差（反转、低换手、低波动）的混合（参见 [[cn-factor-landscape]]）。

## 对个人的意义

- 学习价值极高：因子研究涵盖了量化的几乎全部核心方法（数据、检验、组合、成本）。
- 但在 A 股中高频指增领域，头部私募在数据、算力、交易执行（含 T0 增强）上全面领先（参见 [[cn-quant-landscape]]）。
- 个人更现实的做法：**低换手、月度调仓、少量清晰的因子**，接受较低但更稳健的超额；或把因子思想用于 ETF/行业层面。

## 主要风险

- 风格回撤（如小市值因子踩踏）。
- 拥挤：与机构持仓重叠带来的同步回撤（参见 [[alpha-decay]]）。
- 成本：小资金的最低佣金与冲击。
- 过拟合：因子越多、合成越复杂，过拟合风险越大（参见 [[multiple-testing]]）。
