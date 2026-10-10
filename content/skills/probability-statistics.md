---
id: probability-statistics
title: 概率与统计
kind: skill
summary: 量化的母语：分布、期望与方差、条件概率、假设检验、回归、bootstrap——用来判断一个结果是信号还是噪声。
domains: [math-stats]
tags: [概率, 统计推断, 回归, 假设检验]
level: 0
target: 4
importance: 5
confidence: high
related: [multiple-testing, return-distributions, ic-analysis, performance-metrics, book-statistical-learning]
prereqs: []
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

量化研究的每一个判断——「这个 IC 显著吗」「这个夏普可信吗」「这两个策略相关吗」——本质上都是统计推断。统计能力不足，是个人量化被噪声欺骗的主要原因。

## 等级标准

- **L1 入门**：理解均值、方差、标准差、相关系数、正态分布；会用 pandas 计算描述统计。
- **L2 会用**：理解条件概率与贝叶斯公式；会做 t 检验和简单线性回归并解释系数与 p 值；理解中心极限定理与标准误。
- **L3 熟练**：理解多重检验、自相关对标准误的影响（Newey-West）、bootstrap；知道厚尾分布下哪些方法失效；能识别伪回归。
- **L4 精通**：能为一个新问题设计合适的检验并估计统计功效；熟练运用稳健回归、面板回归（Fama-MacBeth）、收缩估计。
- **L5 专家**：能在研究中提出新的统计方法或纠正领域内常见的错误用法。

## 练习路径

1. 读 [[book-statistical-learning]] 前 3 章（线性回归）+ 任一本统计学入门教材。
2. 用模拟数据练习：生成 1000 个随机策略，观察最好那个的夏普（直观理解 [[multiple-testing]]）。
3. 用真实指数数据计算收益分布的偏度、峰度，与正态分布对比（参见 [[return-distributions]]）。
4. 学习 bootstrap：对一个策略收益序列做 block bootstrap，估计夏普的置信区间。

## 验收方式

- L2：独立写出一份报告，检验「周一效应」在 A 股是否存在，正确报告 t 值与结论的局限。
- L3：用 bootstrap 和 Newey-West 两种方法估计同一策略夏普的置信区间，并解释差异。
