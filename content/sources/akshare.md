---
id: akshare
title: AKShare
kind: source
summary: 开源的 Python 金融数据接口库，聚合了大量公开网站的数据（A 股、期货、基金、债券、宏观、海外等），完全免费，覆盖广但稳定性依赖上游网站。
format: data
cost: free
markets: [cn-a, cn-futures, cn-bond, hk, us, global]
lang: zh
rating: 4
status: todo
url: https://akshare.akfamily.xyz
domains: [data]
tags: [开源, 数据接口, Python, 爬虫]
importance: 4
confidence: medium
related: [tushare, baostock, data-types, data-engineering, retail-quant-ecosystem-cn]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

## 提供什么

覆盖面极广的数据接口：股票行情、财务、资金流、期货与期权、基金净值、债券与可转债、宏观指标、部分海外市场等。GitHub 仓库：akfamily/akshare。

## 优点

- 免费、开源、更新活跃，适合快速获取各种「长尾」数据。
- 文档中列出了每个接口的数据来源网站。

## 局限/坑

- 本质是对公开网站的抓取：**上游网站改版会导致接口失效**，字段与口径可能随版本变化。
- 不适合作为唯一的历史数据源；建议把需要的数据落地到本地并记录下载时间与版本。
- 部分数据的历史深度与时点正确性需要自行验证。

## 怎么用

用于快速探索与补充数据；关键数据与 [[tushare]] 或官方来源交叉核对。
