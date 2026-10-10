---
id: book-afml
title: 《Advances in Financial Machine Learning》— Marcos López de Prado
kind: source
summary: 金融机器学习的方法论经典：数据结构（成交量/美元 bar）、三重障碍标签、样本权重、清洗交叉验证、特征重要性、回测过拟合；概念价值极高，但部分方法有争议、需批判性阅读。
format: book
cost: paid
markets: [global]
lang: en
rating: 4
status: todo
domains: [ml, backtest]
tags: [机器学习, 回测过拟合, 交叉验证, 方法论]
importance: 3
confidence: high
related: [ml-in-finance, cross-validation-finance, multiple-testing, papers-backtest-overfitting]
created: 2026-10-10
updated: 2026-10-10
---

## 提供什么

Marcos López de Prado, *Advances in Financial Machine Learning* (Wiley, 2018)。关键章节：
- 金融数据结构（time/volume/dollar bars）
- 标签：三重障碍法、元标签（meta-labeling）
- 样本唯一性与权重
- **清洗 K 折与禁区**（参见 [[cross-validation-finance]]）
- 特征重要性（MDI/MDA/SFI）
- **回测的危险**与过拟合概率（参见 [[multiple-testing]]）

## 优点

- 系统地指出了把通用 ML 方法直接套用于金融数据的问题，影响深远。

## 局限

- 写作风格较为强势，部分方法（如分数阶差分的实用性）在业界有争议。
- 代码片段需要自行整理调试，不能直接运行。

## 怎么用

Phase 2 之后阅读。重点读交叉验证与回测过拟合相关章节，其余作为参考。
