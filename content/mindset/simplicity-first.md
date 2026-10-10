---
id: simplicity-first
title: 简单优先
kind: mindset
category: principle
summary: 在低信噪比环境里，参数少、逻辑清楚、可解释的策略通常比复杂模型更稳健；复杂度必须用样本外证据来「购买」。
domains: [strategy, backtest]
tags: [奥卡姆剃刀, 稳健性, 参数]
status: todo
importance: 4
confidence: high
related: [overfitting-is-default, ml-in-finance, strat-trend-following, strat-asset-allocation]
created: 2026-10-10
updated: 2026-10-10
---

## 核心

每增加一个参数、一条规则、一个特征，就多了一个拟合噪声的自由度。复杂度的成本是隐性的：它不会出现在回测曲线上，而会出现在实盘的失望里。

**规则：复杂度必须用证据购买。** 只有当复杂版本在严格的样本外检验中显著优于简单版本时，才值得采用。

## 在量化中的体现

- 先实现最朴素的基线（等权、简单均线、单因子），再证明每个改进的增量价值。
- 优先选择「对参数不敏感」的方法：例如用多个周期的趋势信号取平均，而不是寻找最优单一周期。
- 机器学习不是禁区，但在金融上它最容易过拟合；先确认线性/规则基线已被吃透（参见 [[ml-in-finance]]）。
- 简单系统更容易执行、监控和排错——对个人而言，运维复杂度本身就是风险。
- Rob Carver 的系统化交易框架是这一原则的范例：少量稳健的规则 + 严格的风险缩放（参见 [[book-systematic-trading]]）。

## 自检问题

- 去掉这条规则，结果会差多少？差异是否在噪声范围内？
- 我能在一分钟内向别人解释这个策略为什么赚钱吗？
- 半年后的我还能看懂、维护这套系统吗？
