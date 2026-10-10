---
id: quantconnect-lean
title: QuantConnect / LEAN
kind: source
summary: 海外领先的量化平台与其开源引擎 LEAN（C#/Python），覆盖美股、期货、期权、外汇、加密等多资产，事件驱动、数据丰富、学习资料多。
format: platform
cost: freemium
markets: [us, crypto, global]
lang: en
rating: 4
status: todo
url: https://www.quantconnect.com
domains: [backtest]
tags: [回测平台, 开源, 事件驱动, 多资产]
importance: 2
confidence: medium
related: [backtest-frameworks, joinquant-ricequant, cross-border-crypto-compliance]
created: 2026-10-10
updated: 2026-10-10
---

## 提供什么

- 在线 IDE、回测、实盘对接（多家海外券商）；
- 开源引擎 LEAN（https://github.com/QuantConnect/Lean），可本地运行；
- 文档与教程丰富，社区活跃。

## 优点

- 引擎设计成熟（事件驱动、多资产、细致的成交与费用模型），是学习回测引擎架构的好范例（参见 [[backtest-engineering]]）。

## 局限/坑

- 不覆盖 A 股；海外实盘涉及跨境合规问题（参见 [[cross-border-crypto-compliance]]）。

## 怎么用

阅读其文档与 LEAN 源码，学习专业回测引擎如何处理订单、成交、费用与数据对齐。
