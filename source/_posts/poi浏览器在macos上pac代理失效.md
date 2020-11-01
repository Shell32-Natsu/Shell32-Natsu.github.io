---
title: 'Poi浏览器在macOS上PAC代理失效'
tags:
  - 备忘
  - 舰C
  - ACG
categories:
  - ACG
date: 2020-10-31 23:15:58
---

我之前一直是用的Poi浏览器的PAC代理功能来上舰，
见[这篇文章](https://blog.xiadong.info/2017/09/07/%E5%85%B3%E4%BA%8E%E8%88%B0C%E7%9B%B4%E8%BF%9E/)。但是从今年年初开始，PAC代理功能就不work了，本来我以为是[这个问题](https://github.com/poooi/poi/issues/2266)，但是在后来的10.6.0版本中http-proxy-agent和pac-proxy-agent都更新了，PAC代理功能在我的系统上却还是不work，具体的表现为http请求总是返回200的空response，而https请求却没有问题，很不幸，舰C的游戏URL至今还是http的。今天我终于花了半天时间找了找原因，现记录在此。

首先考虑的就是POI的代码中还是有BUG，于是我从源码直接跑POI，PAC代理竟然神奇地work了，我以为是10.6.0之后修了什么bug，于是重新build，安装，又不行了……于是我花了好久看代码，但是看不出什么所以然，毕竟直接run是没有问题的，build之后问题才会出现。POI使用electron-builder来进行打包，我也不是很清楚怎么debug打包后的application，于是我尝试在[proxy.es](https://github.com/poooi/poi/blob/master/lib/proxy.es)文件中用`console.log`来打log。

由于这些log是打在electron的main process中的，所以它们不会出现在开发者工具的console里，而是会输出到stdout，所以我尝试着从terminal里运行打包后的application，命令如下
```bash
open -W /Application/poi.app
```
但是这样是不会在terminal中打出log的，怀疑与macOS的application加载机制有关。于是我就直接运行了POI的binary而不是整个application
```bash
/Application/poi.app/Contents/MacOS/poi
```
这样就可以看到`console.log`的输出了。神奇的事情发生了，通过这种方式打开POI，PAC代理的问题消失了，功能完全正常，当时我就一脸黑人问号.jpg。这是什么神奇的bug？搞了半天是macOS的application加载机制作祟。我猜测是electron+electron-builder+pac-proxy-agent+macOS产生了什么不为人知的神奇化学反应导致了这个现象。

知道了问题，那么只要直接跑`/Application/poi.app/Contents/MacOS/poi`就可以了。我用macOS自带的Automator建了一个一行shell语句的application
```bash
nohup /Applications/poi.app/Contents/MacOS/poi > /dev/null 2>&1 &
```
然后就可以通过运行这个application来启动PAC正常工作的POI了。