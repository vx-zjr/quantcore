---
id: execution-operations
title: 交易执行与运维
kind: skill
summary: 券商接口与下单程序、订单状态管理、每日对账、监控告警、故障应急——把策略安全地变成真实交易的能力（Phase 3 之后才需要）。
domains: [execution, programming]
tags: [实盘, 券商接口, 对账, 监控, QMT]
level: 0
target: 2
importance: 3
confidence: high
related: [execution-basics, go-live-checklist, qmt-ptrade, vnpy, cn-programmatic-trading-rules, git-linux]
prereqs: [python, engineering-practices]
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

研究阶段的 bug 只会让你得出错误结论；执行阶段的 bug 会直接亏钱。实盘系统需要处理大量研究阶段不存在的问题：部分成交、拒单、断线重连、重复下单、持仓不一致。

## 等级标准

- **L1 入门**：了解券商量化接口的种类（QMT/PTrade、期货 CTP、海外 IBKR 等，参见 [[qmt-ptrade]]）。
- **L2 会用**：能在模拟环境中通过 API 下单、撤单、查询持仓与成交；有基本的日志。
- **L3 熟练**：订单状态机完整（处理部分成交、拒单、超时）；每日自动对账；异常告警；有一键停止开关。
- **L4 精通**：多账户多策略的执行管理、执行质量分析、高可用部署。
- **L5 专家**：机构交易系统工程师水平。

## 练习路径

1. 先完成 [[go-live-checklist]] 的阅读。
2. Phase 3 起在模拟盘上练习（参见 [[phase-3-paper-trading]]）。
3. 了解程序化交易报告与异常交易规则（参见 [[cn-programmatic-trading-rules]]）。

## 验收方式

- L3：模拟盘连续运行 3 个月，系统持仓与券商持仓每日自动核对一致，所有异常均有日志与告警记录。
