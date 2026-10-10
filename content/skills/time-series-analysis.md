---
id: time-series-analysis
title: 时间序列分析
kind: skill
summary: 平稳性检验、ARMA、GARCH、协整、状态空间与滚动估计——处理金融数据时间结构的核心工具。
domains: [math-stats]
tags: [时间序列, ARIMA, GARCH, 协整, statsmodels]
level: 0
target: 3
importance: 4
confidence: high
related: [time-series-stationarity, volatility-basics, mean-reversion-cointegration, return-distributions]
prereqs: [probability-statistics]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

金融数据首先是时间序列。不懂自相关、平稳性、波动聚集，就会犯伪回归、信息泄漏、错误标准误等错误。

## 等级标准

- **L1 入门**：理解收益 vs 价格、滚动均值/标准差；能画 ACF 图。
- **L2 会用**：能做 ADF 检验、拟合 AR/ARMA 与 GARCH(1,1)（`statsmodels`、`arch` 库）；理解对数收益的性质。
- **L3 熟练**：能做协整检验并构造价差；理解 EWMA、卡尔曼滤波的直觉；能正确处理滚动/扩展窗口避免前视。
- **L4 精通**：熟练使用状态空间模型、区制转换模型（Markov switching）；能评估模型的样本外预测力。
- **L5 专家**：研究级的高频计量与非线性时序方法。

## 练习路径

1. 学习 `statsmodels` 的时间序列教程。
2. 对沪深 300 日收益：画 ACF、检验平稳性、拟合 GARCH 并预测下月波动率，再与实际对比。
3. 选两只同行业股票做协整检验，在样本外观察价差行为（参见 [[mean-reversion-cointegration]]）。

## 验收方式

- L2：一份 notebook，比较历史波动率、EWMA、GARCH 三种方法对下月波动率的样本外预测误差。
