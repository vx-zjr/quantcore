---
id: ic-analysis
title: 信号评价：IC、IR 与主动管理基本定律
kind: knowledge
summary: 用信息系数（IC）衡量信号的预测力，用 ICIR 衡量稳定性，用分层回测检验单调性；基本定律 IR ≈ IC × √广度 揭示了预测力、交易次数与收益质量的关系。
domains: [backtest, asset-pricing]
tags: [IC, ICIR, 分层回测, 基本定律, 因子检验]
status: todo
importance: 4
confidence: high
related: [alpha-research-pipeline, factor-models, performance-metrics, book-active-portfolio-management, probability-statistics]
prereqs: [factor-models, probability-statistics]
created: 2026-10-10
updated: 2026-10-10
---

## 信息系数（IC）

每一期，计算信号值与下一期收益在截面上的相关系数：
$$IC_t = \text{corr}(s_{i,t},\; r_{i,t+1})$$
- **Rank IC**：用排序（Spearman）相关，更稳健，业界更常用。
- 日频/周频截面因子的 IC 通常很小：**|IC| 在 0.02–0.05 已经算有用**，> 0.1 要怀疑有问题。

## 稳定性：ICIR

$$ICIR = \frac{\text{mean}(IC_t)}{\text{std}(IC_t)}$$
衡量预测力的稳定性。同时看 IC 为正的期数占比、IC 的时间序列图（有没有明显衰减）。

## 分层回测

按信号分成 5 或 10 组，看各组未来收益：
- **单调性**：从低到高各组收益应大致单调。
- 多空收益主要来自哪一端？在 A 股，做空端通常无法实现，只有多头端的超额才有实际意义。

## 衰减与换手

- **IC 衰减**：信号对未来 1、5、10、20 天收益的 IC。衰减快的信号需要高频调仓，成本高。
- **因子自相关/换手**：信号排序在相邻期之间的相关性越低，换手越高。

## 主动管理基本定律（Grinold）

$$IR \approx IC \times \sqrt{BR}$$
- $BR$（广度）：每年独立下注的次数。
- 含义：微弱但稳定的预测力，乘以足够多的独立下注，可以得到高质量的收益。这是统计套利与多因子选股的理论基础。
- 局限：假设下注相互独立，现实中高度相关的下注会大幅降低有效广度。

## 常见误区

- IC 很高但没扣除行业/市值影响——可能只是重复了已知因子。
- 只看 IC 均值不看分层，忽视了非线性关系。
- 用 IC 选出最好的信号后，再用同一段数据报告它的 IC（参见 [[multiple-testing]]）。
