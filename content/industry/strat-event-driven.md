---
id: strat-event-driven
title: 事件驱动
kind: industry
category: strategy
summary: 围绕可预期或可识别的事件交易：指数成分调整、业绩预告/超预期、回购与增减持、限售解禁、分红等；edge 来自结构性需求与信息处理，数据整理是主要门槛。
horizon: days
capacity: 3
barrier: 3
retailFit: 3
domains: [strategy, data]
tags: [事件驱动, 指数调仓, 业绩预告, 公告]
importance: 3
confidence: high
related: [edge-first, point-in-time-data, data-types, cninfo-exchanges, llm-assisted-research]
created: 2026-10-10
updated: 2026-10-10
---

## 概览

| 事件 | 可能的机制 |
|---|---|
| 指数成分调整 | 被动资金在生效日集中买卖（结构性需求） |
| 业绩预告/快报超预期 | 市场对盈利信息反应不足（盈余公告后漂移，PEAD） |
| 回购、增持 | 信号效应与资金支撑 |
| 限售股解禁 | 潜在供给压力 |
| 高送转、分红 | 散户偏好与除权效应 |

## 逻辑与 edge 来源

- **结构性**：被动资金、规则约束带来的可预测买卖。
- **信息处理**：公告数量大、格式不统一，能快速结构化处理的人有优势——这正是 AI/大模型可以帮忙的地方（参见 [[llm-assisted-research]]）。

## 对个人的意义

- ✅ 公告数据可免费获取（参见 [[cninfo-exchanges]]），持有期短到中等，容量适中。
- ⚠️ 事件样本数有限，统计检验功效低，容易过拟合。
- ⚠️ 事件日期必须严格按公告时间（含盘后公告）对齐（参见 [[point-in-time-data]]）。

## 主要风险

- 热门事件（如指数调仓）已被充分预期和交易，超额被提前透支。
- 监管与规则变化（如指数编制规则调整）。
