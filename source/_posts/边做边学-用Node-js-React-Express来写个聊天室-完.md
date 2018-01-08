---
title: '[边做边学]用Node.js+React+Express来写个聊天室(完)'
date: 2018-01-08 00:48:08
tags:
 - Node.js
 - JavaScript
 - WEB
 - React
 - Express
categories:
 - Study
---

大半年前，我开始着手用Node.js+Express+React来写一个聊天室：
 - [[边做边学]用Node.js+React+Express来写个聊天室(1)](https://www.xiadong.info/2017/04/28/%E8%BE%B9%E5%81%9A%E8%BE%B9%E5%AD%A6-%E7%94%A8Node-js-React-Express%E6%9D%A5%E5%86%99%E4%B8%AA%E8%81%8A%E5%A4%A9%E5%AE%A4(1)/)
 - [[边做边学]用Node.js+React+Express来写个聊天室(2)](https://www.xiadong.info/2017/05/13/%E8%BE%B9%E5%81%9A%E8%BE%B9%E5%AD%A6-%E7%94%A8Node-js-React-Express%E6%9D%A5%E5%86%99%E4%B8%AA%E8%81%8A%E5%A4%A9%E5%AE%A4-2/)

后来因为实习，考试等等原因坑掉了。结果在上周，我收到了一封邮件，来自我下学期要选的一门课的instructor。这门课使用Node.js来开发，要求在上课之前用Node.js+Express写一个聊天室。~~咦，我还是真是有先见之明啊~~。不过这也是一个填坑的好机会。我用了两天时间把剩下的东西写完了，但是因为要作为作业来上交，所以就不能放到公开的repo里面了，代码也不能全贴出来。写这篇文章只是个总结吧。

<!-- more -->

---

我没有系统地学过Node.js，连JavaScript都没有。以前随便写点网页效果也还算差强人意，但是这次用来写后端以及在前端使用从来没接触过的React也还是感觉语言地基本功还是不够。[我之前说过](https://www.xiadong.info/2017/07/16/%E5%BA%94%E8%AF%A5%E5%A6%82%E4%BD%95%E5%AD%A6%E7%BC%96%E7%A8%8B%EF%BC%9F/#关于脚本语言)，JS这种语言我基本是处于拿来就用的状态，对于一些更深入的东西，比如闭包，依赖，各种方言之间的区别，异常等等方面并不清楚。这次地经历也让我明报如果要写好的前端的话，JS的基本功还是要扎实。

---

然而这又让我重新思考了要不要真的深入地去学习前端，坦白地说，这两天的代码经历并不让我开心（虽然最终的成果还是挺有意思的）。JS纷繁复杂的框架，库甚至语法让我觉得这不是一个确定可预期的东西。前端圈子似乎永远不缺乏热点，然而热得快，凉得也快，恐怕唯一不怎么变的只有造轮子吧。JS的语法也很容易就写出来问题多多的代码，除非是expert，否则只能是不断地试错。

---

最后说下这个小项目的成果吧。前端结构上是React，样式还是用的Bootstrap~~懒人福音~~，主要通信用websocket。最终的结果就是差不多这个样子：
![](https://i.imgur.com/TLYYkUo.png)
![](https://i.imgur.com/SZnW1uW.png)

虽然很丑，但是用起来还是蛮有意思的。