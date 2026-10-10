---
id: qlib
title: Microsoft Qlib
kind: source
summary: 微软开源的 AI 量化研究平台，提供数据处理、因子（Alpha158/360）、模型训练、回测与评估的完整流水线，内置 A 股数据示例，是学习 ML 选股流程的好教材。
format: tool
cost: free
markets: [cn-a, us]
lang: en
rating: 4
status: todo
url: https://github.com/microsoft/qlib
domains: [ml, backtest]
tags: [开源, 机器学习, 因子, 研究平台]
importance: 3
confidence: medium
related: [ml-in-finance, machine-learning, strat-multi-factor-equity, backtest-frameworks]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

## 提供什么

- 高效的数据存储与表达式引擎（因子用表达式定义）。
- 内置因子集（Alpha158、Alpha360）与多种模型基线（LightGBM、各类神经网络）。
- 回测、组合与评估工具；工作流配置化。

## 优点

- 完整展示了「因子 → 模型 → 组合 → 回测」的 ML 选股流水线，代码质量高。

## 局限/坑

- 自带示例数据的时效与质量有限，严肃研究需要接入自己的数据。
- 内置示例的高收益结果不能直接当真——注意成本、数据与过拟合问题（参见 [[ml-in-finance]]）。

## 怎么用

Phase 2 之后，作为学习 ML 研究流水线设计的参考实现。
