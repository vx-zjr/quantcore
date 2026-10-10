---
id: 2026-10-10-facts-refresh
title: 复盘：2026-10 时效性内容联网核实
kind: journal
category: review
date: 2026-10-10
summary: 联网核实了规则、监管、行业与工具类节点，最重要的变化：主板 ST 涨跌幅 2026-07-06 起改为 ±10%、融资保证金比例 2026-01 上调至 100%、期货程序化交易规定 2025-10 施行、2026 年 7 月量化行业大幅回撤、2026-02 加密监管进一步收紧。
domains: [regulation, industry]
tags: [核实, 时效性, 更新]
importance: 4
confidence: high
related: [cn-a-share-rules, cn-programmatic-trading-rules, cn-futures-options, cn-quant-landscape, cn-quant-firms, cross-border-crypto-compliance, industry-trends]
created: 2026-10-10
updated: 2026-10-10
---

## 背景

初版内容基于截至 2026 年中的记忆，多处标了「需核实」。本次按 playbooks/review-stale.md 联网核实，来源写在各节点文末。

## 最重要的变化

| 领域 | 变化 | 节点 |
|---|---|---|
| A 股规则 | 2026-07-06 起：主板 ST/\*ST 涨跌幅 ±5% → **±10%**；上交所盘后固定价格交易扩至全部 A 股和 ETF；上交所基金收盘改为集合竞价 | [[cn-a-share-rules]] |
| 两融 | 2026-01-14 起新开融资合约保证金比例 80% → **100%**；转融券自 2024-07 暂停，未见恢复 | [[cn-a-share-rules]] |
| 程序化监管 | 证券端细则 2025-07-07 施行（高频：每秒 300 笔或单日 2 万笔，差异化收费）；**期货端规定 2025-10-09 施行**；2026 年证监会表态继续深化高频监管 | [[cn-programmatic-trading-rules]] |
| 期货品种 | 2025 年新增 18 个期货期权品种（含铂、钯）；2026 年焦煤期权、热卷/不锈钢/低硫燃料油期权上市 | [[cn-futures-options]] |
| 量化行业 | 2025 年末量化私募约 3.2 万亿元、百亿量化 55 家；**2026 年 7 月量化产品平均约 -9.5%，头部普遍回撤 15%–20% 以上** | [[cn-quant-landscape]] |
| AI 与机构 | 九坤等设立 AI 研究院并开源模型；多家量化私募组建 AI 实验室 | [[cn-quant-firms]] |
| 加密监管 | 2025-11 明确稳定币属虚拟货币；2026-02 八部门通知（银发〔2026〕42号）进一步收紧 | [[cross-border-crypto-compliance]] |
| 美股 | SEC 2026-04 批准取消 PDT 规则（2.5 万美元门槛），2026-06-04 生效 | [[cross-border-crypto-compliance]] |
| 工具 | Polygon.io 更名 Massive；QMT 门槛只查到问答类网站说法 | [[yfinance]]、[[qmt-ptrade]] |

## 仍未能确认的

- 「2026 年高频阈值降到每秒 15 笔」的说法：未找到官方原文，未采信。
- QMT/miniQMT 各券商的实际门槛：只有非官方来源。
- Tushare 积分规则是否在 2026 年调整：未找到官方公告。

## 对我（零基础学习者）意味着什么

- 规则一直在变——这正是「时点数据」思想的现实例子：回测用的规则也要按历史时点来。
- 2026 年 7 月的行业回撤是理解「拥挤」与「alpha 衰减」的最好案例，值得在学到 [[alpha-decay]] 时回来重读。
