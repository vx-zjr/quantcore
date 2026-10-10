---
id: vnpy
title: vn.py
kind: source
summary: 国内最知名的开源量化交易框架（Python），对接国内期货 CTP、股票与多种海外接口，含 CTA 策略、回测、风控与图形界面模块，社区活跃。
format: tool
cost: free
markets: [cn-futures, cn-a, cn-options]
lang: zh
rating: 4
status: todo
url: https://www.vnpy.com
domains: [execution, programming]
tags: [开源, 交易框架, CTP, 期货]
importance: 3
confidence: medium
related: [qmt-ptrade, execution-operations, strat-trend-following, backtest-frameworks, retail-quant-ecosystem-cn]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

## 提供什么

- 交易接口：国内期货（CTP 等）、期权、部分股票接口与海外接口。
- 应用模块：CTA 策略、价差交易、回测、数据管理、风控等。
- GitHub：https://github.com/vnpy/vnpy

## 优点

- 国内期货程序化交易的成熟开源方案，社区与文档以中文为主。
- 架构（事件引擎、网关抽象）值得学习。

## 局限/坑

- 框架较大，学习曲线明显；版本升级时接口可能变化。
- 实盘接入需要期货公司开通相应接口权限。

## 怎么用

若主攻期货趋势策略（参见 [[strat-trend-following]]），Phase 3 之后作为执行框架候选。
