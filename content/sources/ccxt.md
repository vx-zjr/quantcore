---
id: ccxt
title: CCXT
kind: source
summary: 统一了上百家加密货币交易所 API 的开源库（Python/JS 等），可获取行情、订单簿、资金费率并下单；是加密市场量化研究与工具开发的事实标准。
format: tool
cost: free
markets: [crypto]
lang: en
rating: 4
status: todo
url: https://github.com/ccxt/ccxt
domains: [data, execution]
tags: [加密货币, API, 开源]
importance: 1
confidence: high
related: [crypto-market-structure, strat-crypto-basis-funding, cross-border-crypto-compliance]
created: 2026-10-10
updated: 2026-10-10
---

## 提供什么

统一接口访问各交易所的行情、K 线、订单簿、成交、资金费率、账户与下单功能。

## 优点

- 一套代码适配多个交易所，社区活跃。

## 局限/坑

- 各交易所的细节差异（限流、精度、订单类型）仍需处理。
- 合规提示：参见 [[cross-border-crypto-compliance]]。

## 怎么用

仅在确认合规的前提下用于研究加密市场结构（参见 [[crypto-market-structure]]）。
