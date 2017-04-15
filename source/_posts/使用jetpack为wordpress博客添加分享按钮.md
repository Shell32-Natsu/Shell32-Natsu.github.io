---
title: 使用Jetpack为Wordpress博客添加分享按钮
url: 368.html
id: 368
categories:
  - WEB
date: 2016-07-11 19:02:52
tags:
  - WEB
  - 备忘
---

分享按钮对于博客来说是一个很有用的小工具, Wordpress也有很多分享插件, 但是可惜都是支持国外的社交网络, 支持国内的都许久未更新了. 现在国内比较好用的分享工具就是百度家的了, 鉴于百度劣迹斑斑, 今天我决定不用百度的分享工具而转而使用Wordpress官方出品的Jetpack工具包中的分享功能. 和绝大多数国外开发的插件一样, 这个工具默认没有国内的社交网络, 但是它有自定义分享连接的功能, 我就用这个工具来添加自己的分享按钮. 本文只介绍微信和微博的分享按钮设置方法, 其他网站都很类似, 就不在赘述了.

Wordpress版本: 4.5.3

JetPack版本: 4.1.1

*本文中所有图片都使用Google服务, 如无法显示请自备梯子.*

## 开启分享功能

在Jetpack后台中启用分享功能

![https://lh3.googleusercontent.com/-liLebQ3iGHA/V4NwgSWebTI/AAAAAAAAD0g/bTnW9EqxTZYZFY-eOisTrVHml2p8k3JcgCCo/s800/QQ%25E6%2588%25AA%25E5%259B%25BE20160711180858.png](https://lh3.googleusercontent.com/-liLebQ3iGHA/V4NwgSWebTI/AAAAAAAAD0g/bTnW9EqxTZYZFY-eOisTrVHml2p8k3JcgCCo/s800/QQ%25E6%2588%25AA%25E5%259B%25BE20160711180858.png)

## 设置

在设置=>共享菜单中可以设置分享按钮的外观等属性, 设置好后就可以使用它本身自带的FB, Twitter等分享功能了. 但是我想分享到微博怎么办呢? 在这里有一个"添加一个新的服务"功能, 就是自定义分享链接啦. 

![https://lh3.googleusercontent.com/-7y3GiYpLU5I/V4NyFYj31MI/AAAAAAAAD04/3utLPaLzr68CKQ3qVmG68mqcgh8JneFpQCCo/s800/QQ%25E6%2588%25AA%25E5%259B%25BE20160711181616.png](https://lh3.googleusercontent.com/-7y3GiYpLU5I/V4NyFYj31MI/AAAAAAAAD04/3utLPaLzr68CKQ3qVmG68mqcgh8JneFpQCCo/s800/QQ%25E6%2588%25AA%25E5%259B%25BE20160711181616.png)

点击连接后弹出该窗口:

![https://lh3.googleusercontent.com/-Od71yJSjhow/V4NzBVJw8CI/AAAAAAAAD1I/iDly88CEai4IhYR5uJsAR8NeQpH-BzLRQCCo/s800/QQ%25E6%2588%25AA%25E5%259B%25BE20160711182011.png](https://lh3.googleusercontent.com/-Od71yJSjhow/V4NzBVJw8CI/AAAAAAAAD1I/iDly88CEai4IhYR5uJsAR8NeQpH-BzLRQCCo/s800/QQ%25E6%2588%25AA%25E5%259B%25BE20160711182011.png)

服务名称我们可以自己选择, 接下来的参数就是分享链接和图标了, 我们先来搞定分享链接.

## 微博分享链接

一般的分享链接都是通过URL参数传递的要分享的数据, 我们先来看看一个正常的微博分享链接长什么样. 首先随便打开一篇门户网站的文章, 比如这篇<http://cul.qq.com/a/20160711/007865.htm>, 找到分享按钮然后点击, 打开的URL是这样的:

`http://service.weibo.com/share/share.php?url=http%3A%2F%2Fcul.qq.com%2Fa%2F20160711%2F007865.htm&appkey=&title=%A1%B6%B4%F3%D3%E3%BA%A3%CC%C4%A1%B7%B3%F6%C1%CB%CE%CA%CC%E2%A3%AC%BB%B9%CA%C7%B9%DB%D6%DA%B3%F6%C1%CB%CE%CA%CC%E2&pic=http://img1.gtimg.com/cul/pics/hv1/7/145/2096/136329382.jpg||http://img1.gtimg.com/cul/pics/hv1/56/145/2096/136329431.jpg||http://img1.gtimg.com/cul/pics/hv1/83/145/2096/136329458.jpg&ralateUid=&language=&searchPic=false`

它有这样几个参数:

 + url: 要分享的URL
 + appkey
 + title: 标题
 + pic: 应该是文章图片了
 + relateUid
 + language
 + searchPic

其中我们只要关心url和title两个参数就可以了, 尝试删除其他参数, 只保留url和title

`http://service.weibo.com/share/share.php?url=http%3A%2F%2Fcul.qq.com%2Fa%2F20160711%2F007865.htm&title=%A1%B6%B4%F3%D3%E3%BA%A3%CC%C4%A1%B7%B3%F6%C1%CB%CE%CA%CC%E2%A3%AC%BB%B9%CA%C7%B9%DB%D6%DA%B3%F6%C1%CB%CE%CA%CC%E2`

OK, 工作地很好. 这样我们就可以进行设置了, 把分享链接设置如下:

`http://service.weibo.com/share/share.php?url=%post_full_url%&title=%post_title%`

## 微博分享图标

直接使用Google图片搜索, 设置图片大小为16*16, 可以找到微博官方提供的图标:

<http://www.sinaimg.cn/blog/developer/wiki/LOGO_16x16.png>

## 微信分享

微信分享网页一般都是通过二维码扫描后在微信内置浏览器内打开后再分享, 因此分享到微信我们只要生成URL对应的二维码即可. 有许多在线二维码生成的网站, 我使用<http://cli.im/api>这个网站提供的API.

分享链接设置为`http://cli.im/api/qrcode/code?text=%post_full_url%&mhid=sELPDFnok80gPHovKdI`, 图标设置为<https://res.wx.qq.com/zh_CN/htmledition/v2/images/favicon2e4e03.ico>

## 最终效果

![https://lh3.googleusercontent.com/-x44806CaDcE/V4N7foI_EMI/AAAAAAAAD1Y/dbS4bBzEs0IP1fxmDJgyCmi6Mbzsn6l6ACCo/s800/QQ%25E6%2588%25AA%25E5%259B%25BE20160711185625.png](https://lh3.googleusercontent.com/-x44806CaDcE/V4N7foI_EMI/AAAAAAAAD1Y/dbS4bBzEs0IP1fxmDJgyCmi6Mbzsn6l6ACCo/s800/QQ%25E6%2588%25AA%25E5%259B%25BE20160711185625.png)