---
id: cninfo-exchanges
title: 巨潮资讯与交易所/监管官网
kind: source
summary: 一手官方信息源：巨潮资讯（上市公司公告全文）、上交所/深交所/北交所与期货交易所官网（规则、数据）、证监会官网（法规）——核实任何规则与公告的最终依据。
format: data
cost: free
markets: [cn-a, cn-futures, cn-options, cn-bond]
lang: zh
rating: 5
status: todo
url: https://www.cninfo.com.cn
domains: [data, regulation]
tags: [公告, 官方, 交易规则, 一手资料]
importance: 4
confidence: high
related: [cn-a-share-rules, cn-programmatic-trading-rules, financial-statements, strat-event-driven, point-in-time-data]
created: 2026-10-10
updated: 2026-10-10
---

## 提供什么

| 来源 | 网址 | 内容 |
|---|---|---|
| 巨潮资讯 | https://www.cninfo.com.cn | 证监会指定的上市公司信息披露网站，公告原文（年报、预告、回购、增减持等） |
| 上海证券交易所 | https://www.sse.com.cn | 业务规则、市场数据、公告 |
| 深圳证券交易所 | https://www.szse.cn | 同上 |
| 中国金融期货交易所 | http://www.cffex.com.cn | 股指/国债期货与期权规则、数据 |
| 中国证监会 | http://www.csrc.gov.cn | 法规、部门规章、政策发布 |

## 优点

- 权威、免费、一手。规则类内容的最终依据（参见 [[cn-a-share-rules]]、[[cn-programmatic-trading-rules]]）。

## 局限/坑

- 非结构化（PDF、网页），批量使用需要自行解析——大语言模型在这里很有用（参见 [[llm-assisted-research]]）。

## 怎么用

- 复核本中心的规则类节点时，以这里的原文为准（参见 playbooks/review-stale.md）。
- 事件驱动研究的事件时间，以公告的实际发布时间为准（参见 [[strat-event-driven]]）。
