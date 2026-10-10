---
id: volatility-basics
title: 波动率：估计、预测与应用
kind: knowledge
summary: 波动率比收益更可预测：历史波动率、EWMA、GARCH、已实现波动率与隐含波动率；波动率目标、波动率风险溢价和「低波动异象」都建立在它之上。
domains: [risk, math-stats]
tags: [波动率, GARCH, EWMA, 隐含波动率, 波动率风险溢价]
status: todo
importance: 4
confidence: high
related: [return-distributions, position-sizing-kelly, options-basics, strat-options-volatility, strat-trend-following, cn-factor-landscape]
prereqs: [return-distributions]
created: 2026-10-10
updated: 2026-10-10
---

## 估计方法

| 方法 | 做法 | 特点 |
|---|---|---|
| 历史波动率 | 过去 N 天收益的标准差 | 简单，对窗口长度敏感 |
| EWMA | 指数加权，近期权重更大（RiskMetrics 常用 λ≈0.94） | 反应快，实务常用 |
| GARCH(1,1) | $\sigma_t^2 = \omega + \alpha \epsilon_{t-1}^2 + \beta \sigma_{t-1}^2$ | 刻画波动聚集与均值回归 |
| 已实现波动率 | 用日内高频收益估计当日波动 | 精确，需要分钟数据 |
| 区间估计量 | 用最高、最低、开盘、收盘价（Parkinson、Garman-Klass） | 只需日线，比收盘价法更有效 |
| 隐含波动率 | 由期权价格反推 | 市场对未来波动的预期（含风险溢价） |

## 为什么重要

- **波动率可预测**：波动聚集意味着近期波动率是未来波动率的好预测——这让「波动率目标」仓位管理可行（参见 [[position-sizing-kelly]]）。
- **风险统一度量**：不同资产按波动率归一后才能比较和组合。

## 相关现象

- **波动率风险溢价（VRP）**：隐含波动率平均高于随后的已实现波动率——卖出期权在平均意义上获得补偿，但承担尾部风险（参见 [[strat-options-volatility]]）。
- **低波动异象**：低波动股票的风险调整收益往往高于高波动股票（与 CAPM 预测相反），在 A 股同样显著（参见 [[cn-factor-landscape]]）。
- **杠杆效应**：下跌时波动上升，股票的波动与收益负相关。

## 常见误区

- 用很长的窗口估计波动率，导致危机来临时仓位调整滞后。
- 把低波动当作低风险——波动率低不代表没有跳跃风险。
