---
id: joinquant-ricequant
title: 在线量化平台（聚宽、米筐、BigQuant、掘金等）
kind: source
summary: 提供在线数据、回测与模拟交易的一站式平台，上手快、社区策略多；但数据与代码锁定在平台，复现与迁移受限，免费额度与规则会变化。
format: platform
cost: freemium
markets: [cn-a, cn-futures]
lang: zh
rating: 3
status: todo
url: https://www.joinquant.com
domains: [backtest]
tags: [在线平台, 回测, 社区]
importance: 2
confidence: medium
related: [retail-quant-ecosystem-cn, backtest-frameworks, python-data-stack, base-rates]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

## 提供什么

- 聚宽 JoinQuant：https://www.joinquant.com
- 米筐 RiceQuant：https://www.ricequant.com
- BigQuant：https://bigquant.com
- 掘金量化：https://www.myquant.cn

共同点：内置清洗过的数据、在线 Notebook 与回测引擎、模拟交易，部分支持对接实盘。

## 优点

- 零配置开始研究，数据现成；社区有大量策略分享可供学习（与批判）。

## 局限/坑

- 代码与数据在平台上，**可复现性与长期可控性差**；平台规则、数据权限与收费会变。
- 社区分享策略的回测普遍存在过拟合与幸存者偏差（参见 [[base-rates]]、[[backtest-red-flags]]）。
- 回测引擎的细节（成交假设、成本）需要核实。

## 怎么用

适合 Phase 0 体验「回测是什么样的」、或审查社区策略做练习；长期研究建议建立本地环境（参见 [[python-data-stack]]）。
