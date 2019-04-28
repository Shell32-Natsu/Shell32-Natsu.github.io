---
title: 关于舰C直连
date: 2017-09-07 09:35:04
tags:
 - Life
 - ACG
 - 舰C
categories:
 - ACG
---

# 关于直连
舰C游戏不允许非日本ip访问，然而在国内用代理访问经常会偶遇猫神。我现在即使在一个没有墙的地方，距离日本却隔了半个地球，用我的服务器也总是狂猫不止。没办法就只能琢磨琢磨直连了。

**注意⚠️**：由于舰C本身就是禁止非日本ip访问，使用直连方法可能会有不可预估的风险，包括但不限于**封号**等后果。如果担心这个问题请全程代理。

准备工作：一个可用的日本代理，如ss。不要用全局vpn。

其实也可以使用改hosts的方法来使用反向代理服务器实现直连，但是反代不是这篇文章的内容，所以请自行搜索。**这篇文章的方法适合手上有代理，但是连接不是很稳定的玩家。**

<!-- more -->

# 原理
舰C登录使用dmm，但是登录之后游戏服务器是裸ip，而游戏服务器是不检测ip地理位置的。也就是说，只有登录阶段有需要用到代理，而游戏阶段是不用走代理的，所以我们只要代理`www.dmm.com`域名就可以了。然而一般的代理设置（填写代理地址和端口）是使应用内流量全部走代理的。如果是使用全局vpn，那么有登录后关闭vpn的办法，但是对于socks或者http代理却不行。

接下来我说一说我使用的poi浏览器和74eo的设置方法，其他工具的设置大同小异。
# poi浏览器
新版poi浏览器中有使用pac文件来访问代理的方法

{% sinaimage http://wx3.sinaimg.cn/large/4c1654ddgy1fjbbwbnqlyj20ey0af74y.jpg %}

因此只要新建一个如下的pac文件，再把它的地址填上就ok了。

```pac
function FindProxyForURL(url, host) {
    if (host.endsWith('.dmm.com') || host.endsWith('.dmm.co.jp')) {
        url = url.split('/');
        if (url[0] == 'http:') return 'PROXY 127.0.0.1:1080';
        if (url[0] == 'https:') return 'PROXY 127.0.0.1:1080';
    }
    return "DIRECT";
}
```

注意要把`127.0.0.1：1080`换成自己的代理地址。

# 74eo
74eo不能使用pac文件，但是我们可以用一个工具：proxifier，来指定代理规则。

首先，还是设置好代理

![](http://i.imgur.com/7apAhgs.png)

然后对74eo的可执行程序设置代理规则

![](http://i.imgur.com/RpzoLAq.png)

注意要把默认的规则改为direct，否则就是全局代理了。
