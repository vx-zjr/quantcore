---
id: return-distributions
title: 收益率的统计特征
kind: knowledge
summary: 金融收益不服从正态分布：厚尾、负偏、波动聚集、相关性不稳定；简单收益与对数收益的区别；这些特征决定了风险度量和统计检验应如何调整。
domains: [math-stats, risk]
tags: [厚尾, 偏度, 峰度, 对数收益, 波动聚集]
status: todo
importance: 4
confidence: high
related: [performance-metrics, volatility-basics, time-series-stationarity, risk-management, survival-first]
prereqs: [probability-statistics]
created: 2026-10-10
updated: 2026-10-10
---

## 简单收益 vs 对数收益

| | 简单收益 $R = P_t/P_{t-1} - 1$ | 对数收益 $r = \ln(P_t/P_{t-1})$ |
|---|---|---|
| 跨时间加总 | 连乘 $\prod(1+R)$ | 直接相加 $\sum r$ |
| 跨资产加总（组合） | 加权平均 ✅ | 不能直接加权 |
| 下界 | -100% | $-\infty$ |

- 组合收益用简单收益；时间序列建模常用对数收益。
- 二者关系：$r = \ln(1+R)$，小收益时近似相等。

## 典型事实（stylized facts）

1. **厚尾（高峰度）**：极端涨跌出现的频率远高于正态分布的预测。正态下「5 个标准差」的日跌幅几乎不可能发生，现实中却多次出现。
2. **负偏**：股票指数大跌比大涨更剧烈（「上楼梯、坐电梯」）。
3. **波动聚集**：大波动之后往往跟着大波动（参见 [[volatility-basics]]）。
4. **收益自相关很弱，但绝对收益/平方收益自相关很强**：方向难以预测，波动大小可以预测。
5. **杠杆效应**：价格下跌时波动率上升。
6. **相关性不稳定**：危机中资产相关性上升。

## 对量化的影响

- 基于正态假设的 VaR 会**低估**尾部风险（参见 [[risk-management]]）。
- 夏普比率无法刻画偏度和峰度——卖期权类策略可以有很高的夏普，同时隐藏着巨大的尾部风险。
- 统计检验（如 t 检验）在厚尾和自相关下需要稳健修正（如 Newey-West 标准误、bootstrap）。
- 回测中的最大回撤只是一次实现，未来会出现更大的（参见 [[survival-first]]）。

## 常见误区

- 用正态分布模拟未来收益做压力测试。
- 认为「历史上从没跌过这么多」就意味着不会发生。
