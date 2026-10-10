---
id: python
title: Python 编程
kind: skill
summary: 量化研究与工程的主力语言：语法、数据结构、函数与模块、类型提示、虚拟环境与包管理、调试与性能意识。
domains: [programming]
tags: [Python, 编程基础, 虚拟环境]
level: 0
target: 4
importance: 5
confidence: high
related: [pandas-numpy, engineering-practices, git-linux, python-data-stack]
prereqs: []
created: 2026-10-10
updated: 2026-10-10
---

## 为什么需要

Python 是量化研究的事实标准：数据处理、统计、机器学习、回测框架、券商接口（QMT/PTrade 也支持 Python）都围绕它。编程能力直接决定研究的速度与可靠性。

## 等级标准

- **L1 入门**：会写变量、循环、函数，能运行别人的脚本和 notebook。
- **L2 会用**：熟练使用列表/字典/集合、推导式、异常处理、文件读写；会组织模块；会用 venv/uv/conda 管理环境。
- **L3 熟练**：写出结构清晰、带类型提示和测试的代码；理解可变对象、作用域、生成器、装饰器；会用调试器和 profiler 定位问题。
- **L4 精通**：能设计中等规模的系统（数据管道、回测引擎）；理解并发、内存与性能优化；能写出供他人复用的库。
- **L5 专家**：深入理解解释器与生态，能为开源项目做核心贡献。

## 练习路径

1. 官方教程 + 一本入门书，配合大量小练习。
2. 用 Python 自动化一件日常的事（如每日下载指数数据并存档）。
3. 学习 `pytest`、类型提示、`ruff` 格式化（参见 [[engineering-practices]]）。
4. 与 AI 编码助手协作时，要求它解释每段代码；自己能读懂、能修改，才算掌握（参见 [[llm-assisted-research]]）。

## 验收方式

- L3：一个带测试、类型提示和 README 的小项目（如「数据下载与清洗工具」），他人可以 clone 后一条命令运行。
