---
id: qmt-ptrade
title: QMT / miniQMT / PTrade 券商量化终端
kind: source
summary: 国内券商提供给个人的主流程序化交易终端：迅投 QMT（含 miniQMT 外接 Python）与恒生 PTrade，支持 Python 策略与 API 下单；开通门槛与费用因券商而异。
format: platform
cost: freemium
markets: [cn-a, cn-bond]
lang: zh
rating: 4
status: todo
url: https://www.thinktrader.net
domains: [execution]
tags: [券商终端, 实盘, 程序化交易, Python]
importance: 4
confidence: medium
related: [retail-quant-ecosystem-cn, execution-operations, cn-programmatic-trading-rules, vnpy, execution-basics]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

## 提供什么

| 终端 | 开发商 | 特点 |
|---|---|---|
| QMT | 迅投 | 本地客户端，内置 Python 策略环境，回测与实盘一体 |
| miniQMT | 迅投 | 极简模式，通过 `xtquant` 在本地任意 Python 环境中调用行情与交易接口，灵活度高 |
| PTrade | 恒生电子 | 策略托管在券商服务器端运行，无需本地常开电脑，但对外部依赖与网络访问有限制 |

迅投官网：https://www.thinktrader.net （具体以开户券商提供的版本为准）

## 优点

- 合规的个人 A 股程序化交易通道；可交易股票、ETF、可转债等。
- miniQMT 可以与自己的研究代码（pandas、DuckDB 等）无缝衔接。

## 局限/坑

- **开通门槛因券商而异**：常见要求一定的资产规模（历史上多为数十万元以上，近年部分券商降低），佣金与服务费也不同——逐家咨询。
- QMT/miniQMT 主要为 Windows 客户端，需要常开的电脑或云服务器。
- 需履行程序化交易报告义务（参见 [[cn-programmatic-trading-rules]]）。
- 内置回测功能的规则建模不一定满足要求，研究回测建议在自己的框架中完成。

## 怎么用

Phase 3 之后再开通。开通前先确认：资金门槛、佣金、是否支持 miniQMT、是否提供模拟环境。
