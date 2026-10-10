---
id: crypto-market-structure
title: 加密资产市场结构
kind: knowledge
summary: 7×24 小时交易、永续合约与资金费率、中心化与去中心化交易所、交易所对手方风险——机会与风险都不同于传统市场，且对中国大陆居民存在合规问题。
domains: [market-structure, regulation]
tags: [加密货币, 永续合约, 资金费率, 交易所风险]
status: todo
importance: 2
confidence: medium
related: [strat-crypto-basis-funding, cross-border-crypto-compliance, ccxt, survival-first]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

> ⚠️ 中国大陆居民参与加密资产交易存在明确的合规与法律风险，务必先阅读 [[cross-border-crypto-compliance]]。本节点仅作为行业知识。截至 2026-10 部分核实（CLARITY Act 进展来源：[tech-insider 2026-08](https://tech-insider.org/clarity-act-2026-status/)）。

## 是什么

- **全天候交易**：没有收盘、没有涨跌停，周末照常波动。
- **中心化交易所（CEX）**：撮合与托管都在交易所，用户实际持有的是交易所的负债。
- **去中心化交易所（DEX）**：链上自动做市（AMM）或链上订单簿，自托管，但有智能合约风险与 MEV（抢跑）问题。
- **永续合约（Perpetual Swap）**：无到期日的期货，通过**资金费率（funding rate）**定期（常见每 8 小时）在多空之间转移支付，使合约价格贴近现货。
- **机构化进程**：美国于 2024 年批准比特币与以太坊现货 ETF，CME 有比特币/以太坊期货；2025 年美国通过稳定币立法（GENIUS Act），市场结构法案（CLARITY Act）截至 2026 年 8 月仍在参议院推进（以 Congress.gov 为准）。

## 为什么重要

- 它是 API 最开放、数据最易获取的市场之一，常被用作量化入门练习场。
- 永续资金费率、期现基差在牛市中经常为正且较高，形成了「基差/资金费率套利」（参见 [[strat-crypto-basis-funding]]）。

## 关键风险

- **交易所对手方风险**：2022 年 FTX 破产，用户资产被挪用。交易所风险是「尾部归零」型风险（参见 [[survival-first]]）。
- **极端波动与连环强平**：高杠杆导致的瀑布式下跌。
- **监管风险**：各国政策差异大且变化快。中国大陆 2025–2026 年进一步收紧，明确稳定币属于虚拟货币（参见 [[cross-border-crypto-compliance]]）。
- **数据质量**：交易量造假（刷量）曾普遍存在，不同交易所价格可能显著偏离。

## 常见误区

- 把交易所当银行。
- 把资金费率套利当成无风险收益——它承担了交易所风险、强平风险和费率反转风险。
