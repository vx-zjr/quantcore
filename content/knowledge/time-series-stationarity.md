---
id: time-series-stationarity
title: 平稳性、自相关与协整
kind: knowledge
summary: 价格非平稳、收益近似平稳；伪回归陷阱；自相关检验；协整是配对交易的统计基础——这些是时间序列建模的入门门槛。
domains: [math-stats]
tags: [平稳性, 单位根, 协整, 自相关, 伪回归]
status: todo
importance: 4
confidence: high
related: [return-distributions, mean-reversion-cointegration, regime-change, time-series-analysis, volatility-basics]
prereqs: [probability-statistics]
created: 2026-10-10
updated: 2026-10-10
---

## 平稳性

**（弱）平稳**：均值、方差不随时间变化，自协方差只依赖时间间隔。

- **价格序列**通常是非平稳的（近似随机游走，有单位根）。
- **收益序列**近似平稳（但波动率时变，严格来说只是「更接近」平稳）。
- 检验：ADF 检验、KPSS 检验（二者原假设相反，最好一起用）。

## 伪回归

两个独立的随机游走序列做回归，常常得到「高度显著」的系数和很高的 $R^2$——这是**伪回归**。
**规则：不要直接对价格水平做回归，除非验证了协整关系。**

## 自相关

- **ACF / PACF**：衡量序列与其滞后值的相关性。
- **Ljung-Box 检验**：检验多个滞后阶的自相关是否联合显著。
- 收益的自相关通常很弱；如果发现很强的自相关，先检查数据错误（如过期价格、非同步交易）。

## 协整

两个非平稳序列 $X_t, Y_t$，若存在 $\beta$ 使 $Y_t - \beta X_t$ 平稳，则称二者协整。
- 直觉：两条醉汉牵着狗——各自乱走，但距离有界。
- 检验：Engle-Granger 两步法、Johansen 检验。
- 应用：配对交易、统计套利的价差回归（参见 [[mean-reversion-cointegration]]）。

## 关键要点

- 协整关系可能在样本外断裂（公司基本面变化、行业格局改变）。
- 用于检验的样本期和交易的样本期必须分开。
- 「非平稳」也是 [[regime-change]] 的统计学表述：生成数据的过程本身在变化。

## 常见误区

- 用相关性代替协整：两个高度相关的收益序列，价格可以无限发散。
- 在全样本上检验协整，再在同一样本上回测配对交易。
