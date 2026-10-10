---
id: multiple-testing
title: 多重检验与夏普折扣
kind: knowledge
summary: 尝试的策略越多，最好那个的回测夏普就越被运气抬高；用 t > 3 的更高门槛、通缩夏普比率（DSR）和回测过拟合概率（PBO）来校正。
domains: [backtest, math-stats]
tags: [多重检验, DSR, PBO, 数据窥探, 因子动物园]
status: todo
importance: 5
confidence: high
related: [overfitting-is-default, cross-validation-finance, performance-metrics, papers-backtest-overfitting, research-as-science, ic-analysis]
prereqs: [probability-statistics, performance-metrics]
created: 2026-10-10
updated: 2026-10-10
---

## 问题

假设你测试了 $N$ 个**完全没有预测力**的策略，每个的真实夏普都是 0。它们的回测夏普会围绕 0 随机分布，而其中最大的那个，期望值会随 $N$ 增长：

| 尝试次数 $N$ | 最佳回测夏普的大致期望（5 年日频，真实夏普=0） |
|---|---|
| 1 | 0 |
| 10 | ≈ 0.7 |
| 100 | ≈ 1.1 |
| 1000 | ≈ 1.4 |

（量级示意：$T$ 年数据下年化夏普的标准误约 $1/\sqrt{T}$；$N$ 个独立标准正态的最大值期望随 $N$ 缓慢增长，量级上界约 $\sqrt{2\ln N}$。表中按 $N$ 个独立正态最大值的期望计算。）

**结论：不知道尝试了多少次，就无法评价一个回测夏普。**

## 校正方法

**1. 提高显著性门槛**
- Harvey, Liu & Zhu (2016) 指出，考虑到已有数百个因子被测试，新因子的 t 统计量应 **> 3.0**（而不是传统的 2.0）。

**2. 通缩夏普比率（Deflated Sharpe Ratio, DSR）**
- Bailey & López de Prado (2014)：考虑尝试次数、样本长度、收益的偏度与峰度，计算观测夏普显著大于「最好的随机结果」的概率。

**3. 回测过拟合概率（Probability of Backtest Overfitting, PBO）**
- Bailey 等 (2017)：用组合对称交叉验证（CSCV），估计「样本内最优的配置在样本外表现低于中位数」的概率。PBO 高说明选择过程本身在拟合噪声。

**4. 控制错误发现率（FDR）**
- Benjamini-Hochberg 等方法，在大量信号中控制假阳性比例。

## 实践要点

- **记录每一次尝试**（包括换参数、换股票池、换时间段），这是计算 $N$ 的前提（参见 [[research-as-science]]）。
- 相关的尝试不是完全独立的，有效 $N$ 小于原始次数，但仍远大于 1。
- 对自己报告的夏普「打折」：经验上实盘夏普常为回测夏普的一半左右。

## 常见误区

- 只算最终版本那一次回测。
- 认为「我没调参，只是试了几个不同的想法」——那也算。
