---
id: sec-edgar
title: SEC EDGAR
kind: source
summary: 美国证监会的公司披露数据库：10-K、10-Q、8-K、13F 等全部原始文件，免费且有结构化 API（XBRL），是美股基本面与事件研究的一手来源。
format: data
cost: free
markets: [us]
lang: en
rating: 4
status: todo
url: https://www.sec.gov/edgar/search/
domains: [data]
tags: [美股, 公告, 13F, XBRL]
importance: 2
confidence: high
related: [cninfo-exchanges, financial-statements, strat-event-driven]
created: 2026-10-10
updated: 2026-10-10
---

## 提供什么

上市公司定期报告与临时报告全文、机构持仓（13F）、内部人交易（Form 4）；XBRL 结构化财务数据 API。

## 优点

- 一手、免费、带精确的提交时间戳（便于时点研究）。

## 局限/坑

- 原始数据需要解析与清洗；API 有访问频率要求（需设置 User-Agent）。

## 怎么用

若主攻市场包含美股，作为基本面与事件数据的来源；也是学习 NLP 处理公告的好素材。
