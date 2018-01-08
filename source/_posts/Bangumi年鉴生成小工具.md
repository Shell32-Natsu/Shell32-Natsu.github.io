---
title: Bangumi年鉴生成小工具
date: 2018-01-04 11:00:48
tags:
 - Python
 - 工具
 - ACG
 - WEB
categories:
 - ACG
---

前天晚上受这个[帖子](http://bgm.tv/group/topic/344635)的启发，想写一个爬取Bangumi时光机数据生成海报年鉴的工具。昨天开始付诸实施，一开始的想法是拼成一张大图，然后发现我傻了，生成一个HTML就OK。于是用requests下载数据，jinja2生成网页，成功搞定。

[GitHub](https://github.com/xiadong1994/bangumi_yearly_report)

[Demo1](https://www.xiadong.info/html/bangumi-2017-report.html) [Demo2](https://www.xiadong.info/html/bangumi-all-report.html)

![](https://i.imgur.com/cLYQie2.jpg)