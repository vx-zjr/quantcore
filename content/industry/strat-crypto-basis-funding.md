---
id: strat-crypto-basis-funding
title: 加密资产基差 / 资金费率套利
kind: industry
category: strategy
summary: 持有现货多头 + 永续合约（或交割合约）空头，赚取资金费率或期现基差；看似低风险，实则承担交易所、强平、费率反转风险，且对中国大陆居民存在合规问题。
horizon: days
capacity: 2
barrier: 3
retailFit: 2
domains: [strategy, regulation]
tags: [加密货币, 资金费率, 基差, 套利]
importance: 2
confidence: medium
related: [crypto-market-structure, cross-border-crypto-compliance, strat-arbitrage, survival-first, ccxt]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

> ⚠️ 中国大陆居民参与虚拟货币交易属于不受法律保护的活动（参见 [[cross-border-crypto-compliance]]）。本节点仅作为策略原型知识。

## 概览

- 永续合约通过资金费率让合约价格贴近现货（参见 [[crypto-market-structure]]）。牛市中多头拥挤，资金费率常为正：空头收取费用。
- **策略**：买入现货 + 等额做空永续，Delta 中性，收取资金费率。
- 交割合约版本：买现货 + 卖出升水的交割合约，持有到期赚取基差。

## 逻辑与 edge 来源

为杠杆多头提供对手盘（流动性与杠杆需求的补偿）。

## 主要风险（远非「无风险」）

- **交易所风险**：资产托管在交易所，交易所倒闭则归零（FTX 2022）。
- **强平风险**：空头腿在暴涨中保证金不足被强平，Delta 中性被破坏。
- **费率反转**：熊市中资金费率转负，空头需要付费。
- **收益随拥挤下降**：机构参与增加后，费率与基差收敛。
