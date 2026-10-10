---
id: papers-backtest-overfitting
title: 经典论文：回测过拟合与多重检验
kind: source
summary: 关于数据窥探、多重检验与回测过拟合的必读论文（Harvey-Liu-Zhu、通缩夏普、回测过拟合概率、伪数学等），是建立「默认怀疑」研究习惯的理论基础。
format: paper
cost: free
markets: [global]
lang: en
rating: 5
status: todo
domains: [backtest, math-stats]
tags: [论文, 过拟合, 多重检验, DSR, PBO]
importance: 4
confidence: high
related: [multiple-testing, overfitting-is-default, cross-validation-finance, book-afml, papers-classic-factors]
created: 2026-10-10
updated: 2026-10-10
---

## 必读清单

| 论文 | 要点 |
|---|---|
| Harvey, Liu & Zhu (2016), *…and the Cross-Section of Expected Returns*, RFS | 「因子动物园」；新因子 t 值应 > 3 |
| Bailey & López de Prado (2014), *The Deflated Sharpe Ratio*, Journal of Portfolio Management | 校正尝试次数与非正态的夏普 |
| Bailey, Borwein, López de Prado & Zhu (2017), *The Probability of Backtest Overfitting*, Journal of Computational Finance | 用 CSCV 估计 PBO |
| Bailey, Borwein, López de Prado & Zhu (2014), *Pseudo-Mathematics and Financial Charlatanism*, Notices of the AMS | 面向大众的回测过拟合警示 |
| Harvey & Liu (2015), *Backtesting*, Journal of Portfolio Management | 用多重检验框架对回测夏普打折 |
| Lo (2002), *The Statistics of Sharpe Ratios*, Financial Analysts Journal | 夏普比率的抽样分布与自相关修正 |

## 怎么读

- 先读《Pseudo-Mathematics…》建立直觉，再读 Harvey-Liu-Zhu 与 DSR。
- 读后用自己的话更新 [[multiple-testing]] 节点（这是检验理解的好方式）。
