---
id: linear-algebra
title: 线性代数
kind: skill
summary: 矩阵运算、特征分解、协方差矩阵、最小二乘与 PCA——组合优化、因子模型与向量化计算的基础。
domains: [math-stats]
tags: [矩阵, PCA, 协方差, 最小二乘]
level: 0
target: 3
importance: 3
confidence: high
related: [portfolio-construction, factor-models, optimization, pandas-numpy]
prereqs: []
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

组合的方差是 $w^\top \Sigma w$；回归的解是 $(X^\top X)^{-1}X^\top y$；PCA 是协方差矩阵的特征分解。不懂线性代数，看不懂大多数组合与因子的文献，也写不好向量化代码。

## 等级标准

- **L1 入门**：会矩阵乘法、转置、求逆；理解向量点积的几何意义。
- **L2 会用**：能用矩阵形式写出组合收益/方差和 OLS；能用 NumPy 实现。
- **L3 熟练**：理解特征值/特征向量、正定矩阵、PCA；理解协方差矩阵病态（条件数）对优化的影响及收缩估计的作用。
- **L4 精通**：熟悉 SVD、矩阵分解在因子模型中的应用；能推导带约束的组合优化解析解。
- **L5 专家**：随机矩阵理论等高级工具的研究级应用。

## 练习路径

1. 3Blue1Brown《线性代数的本质》系列视频建立几何直觉。
2. 用 NumPy 手写：组合方差、OLS 回归、最小方差组合，并与库函数结果对比。
3. 对 30 只股票的收益做 PCA，观察第一主成分是否近似「市场因子」。

## 验收方式

- L3：用矩阵运算实现最小方差组合与风险平价（数值求解），并解释为什么样本协方差需要收缩。
