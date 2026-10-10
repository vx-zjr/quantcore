---
id: retail-quant-ecosystem-cn
title: 国内个人量化生态与工具链
kind: industry
category: landscape
summary: 个人在国内做量化的现实路径：数据（Tushare/AKShare 等）、研究（本地 Python 或在线平台）、交易（券商 QMT/PTrade 终端、期货 CTP）、社区与学习资源，以及各自的门槛与限制。
domains: [industry, execution]
tags: [个人量化, QMT, PTrade, 工具链, 券商]
importance: 5
confidence: medium
related: [qmt-ptrade, tushare, akshare, joinquant-ricequant, vnpy, python-data-stack, cn-programmatic-trading-rules, small-player-edge]
created: 2026-10-10
updated: 2026-10-10
review: 2027-04-10
---

> ⚠️ 券商终端的开通门槛、费用与功能经常调整。2026-10 联网查到的只是问答类网站的常见说法（可信度有限），务必向具体券商索取书面说明。

## 一条典型的个人量化工具链

```
数据            研究                 交易                    监控
Tushare  ─▶  本地 Python  ─▶   券商 QMT / PTrade  ─▶  日志 + 对账
AKShare      (pandas/DuckDB)     期货 CTP（vn.py）       + 消息告警
交易所公告    或在线平台
```

## 各环节选择

**数据**
- 免费/低价：[[akshare]]（开源爬虫聚合）、[[tushare]]（积分制）、[[baostock]]。
- 付费终端：Wind / Choice / iFinD（参见 [[wind-choice-ifind]]），个人一般不必要。
- 一手公告：巨潮资讯、交易所官网（参见 [[cninfo-exchanges]]）。

**研究**
- 本地 Python 数据栈（推荐，完全可控，参见 [[python-data-stack]]）。
- 在线量化平台：聚宽、米筐、BigQuant、掘金等（参见 [[joinquant-ricequant]]）——上手快，但数据与代码在平台上，迁移与复现受限。
- 开源框架：[[vnpy]]、[[qlib]]、各类回测框架（参见 [[backtest-frameworks]]）。

**交易（股票）**
- **QMT / miniQMT**（迅投）与 **PTrade**（恒生）：券商提供的量化交易终端，支持 Python 策略与 API 下单（参见 [[qmt-ptrade]]）。
- 开通门槛因券商而异：常见说法是 miniQMT 基础版约需近 20 个交易日日均资产 10 万元左右、全功能 QMT 约 50 万元，另有交易经验与风险测评（C4 及以上）要求——**仅供参考，逐家确认**。
- 程序化交易需按规定履行报告义务（参见 [[cn-programmatic-trading-rules]]）；期货程序化交易自 2025-10-09 起同样需要报告。

**交易（期货）**
- 期货公司提供 CTP 等接口；[[vnpy]] 对国内期货接口支持较好。

## 现实约束

- 股票 T+1、融券困难 → 个人多为纯多头或用期货对冲（参见 [[cn-a-share-rules]]）。
- 终端多为 Windows 客户端，需要常开的电脑或云服务器。
- 小资金下最低佣金（5 元）对高频调仓不友好。

## 社区与学习

- 中文社区：知乎、集思录、雪球、各类公众号与开源项目社区（参见 [[cn-communities]]）。
- 券商金工研报（参见 [[sellside-research-cn]]）。
- 对「付费课程」「付费信号」保持高度警惕（参见 [[base-rates]]）。
