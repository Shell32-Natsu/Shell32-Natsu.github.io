---
title: '[边做边学]用Node.js+React+Express来写个聊天室(1)'
tags:
  - Node.js
  - React
  - Express
  - JavaScript
  - WEB
categories:
  - Study
date: 2017-04-28 18:54:37
---


<!-- toc -->

# 前言

Node.js现在实在是火的不行，搞得我也想来学一学。以我的经验，上手的最快办法就是直接开始做这篇文章就是我边做边学的记录吧。但是以我几年前学的三脚猫js水平，想要直接开始做真的是有点困难。所以先找几篇文章来补补基础知识。

**我也是只个纯新手，难免有错漏之处，欢迎指出。**

<!-- more -->

## 事前学习

首先，你不能一点编程不会，至少要有基本js语法知识，比如变量、函数、类之类的东西多少懂一点。在开始动手前，我先看了以下的资料：

1. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript>：如果你没接触过js但是对自己有信心或者接触过但是记忆模糊了，花几十分钟时间看看MDN的这个简单介绍吧。
2. <http://www.nodebeginner.org/index-zh-cn.html>：Node.js简单入门。
3. <http://es6.ruanyifeng.com/>：《ECMAScript 6入门》，主流浏览器基本已经全部支持了ECMAScript 6，Node.js也基本都支持了，但是诸如`import`之类的却没有支持。所幸可以用[Babel](https://babeljs.io/)来提供ES6的支持，不用在前端与后端之间使用不同的代码风格。


以下的资料都是在代码编写过程中参考：

1. <https://expressjs.com/>：Express官方网站
2. <https://nodejs.org/en/>：Node.js官方网站
3. <https://facebook.github.io/react/>：React官方网站


## 环境

Node.js的安装方法、框架的安装方法，编辑器的安装与使用都请参考官方网站的指导，任何其他人的教程都没有官方指导来的及时权威。

# 后端

## 初始化一个Express项目

我们可以使用*Express generator*[^1]来创建一个Express项目的基本骨架：

```bash
$ npm install express-generator -g
$ express --view=pug myapp
$ cd myapp
$ npm install
```
目前的Express默认使用Jade模板引擎，但是Jade因为商标原因更名为Pug[^2]，所以我就直接使用Pug了。

目录结构：

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

在`myapp`目录中运行`npm start`，然后在浏览器内打开`http://localhost:3000/`就可以看到示例页面了。

![](http://wx3.sinaimg.cn/mw690/4c1654ddgy1ff1jp2n1bcj20dn096jrf.jpg)

## 看看初始化了些什么

从`package.json`中可以看到以下配置：

```json
"scripts": {
    "start": "node ./bin/www"
},
```

所以我们刚才的`npm start`便是执行了`./bin/www`这个文件。这个文件中注释很清晰，主要是做了一些HTTP服务器的初始化工作，其中引入了`app`这个依赖

```js
var app = require('../app');
```

在`./app.js`这个文件中，同样先是引入依赖，然后设置了一些*中间件*[^3]，然后增加了两个*路由*[^4]

```js
...
var index = require('./routes/index');
var users = require('./routes/users');
...
app.use('/', index);
app.use('/users', users);
```

再接下来是一些错误处理。

我们再到`./routes/index`里看看主页的处理函数是怎么写的

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

可以看出主页是通过渲染`index`这个文件来的（实际是`views/index.pug`），`index.pug`的文件内容如下

```jade
extends layout

block content
  h1= title
  p Welcome to #{title}
```

关于Pug的语法如果有兴趣的话可以参见文档<https://pugjs.org/api/getting-started.html>。

现在我们搞明白了一个最简单的页面是怎么产生的，但是在后端部分我并不打算通过模板引擎来产生前端页面，这是React的工作，后台我们只要提供API就可以了，也就是说返回的数据是JSON而不是HTML。

## 添加一个新的路由

现在我们添加一个新的路由用来处理`/chat`这个path，或者以它开头的path。先在`routes`目录下创建一个新的文件`chat.js`，内容如下：

```js
var express = require('express');
var router = express.Router();

/* Chat room homepage.*/
router.get('/', (req, res) => {
    res.send("Welcome to chat room!");
});

/* A sample sub page.*/
router.get('/sub-page', (req, res) => {
    res.send("Welcome to chat room sub page!");
});

module.exports = router;
```

然后回到`app.js`中，增加路由的绑定

```js
...
var chat = require('./routes/chat');
...
app.use('/chat', chat);
...
```

然后启动服务器，访问`http://localhost:3000/chat`，和`http://localhost:3000/chat/sub-page`就可以看到我们在处理函数中设置的文字了。

怎么样？依葫芦画瓢是不是很简单？接下来工作就没有模板来参照了，换句话说下面的实现都是我的一家之言，如果写得太烂还请多多包涵。

## 要增加的功能

回到我最初的目的上来，我想做一个最最简单的在线聊天的页面，有这么几个功能：

- 有个页面来显示聊天信息和输入框
- 增加新的聊天内容
- 新的内容能**推送**给所有用户（需要WebSocket）

酌情考虑的功能：

- 数据持久化；一开始我可能不会使用数据库，数据直接放在内存中
- 用户登录；可能会使用cookie来进行身份识别，但是因为是个匿名的聊天室所以不打算有注册登录功能

下面我一步一步地来增加这些功能。

## 聊天信息保存

出于简化的考虑，我先不引入数据库，直接使用一个数组来保存所有的消息。暂时决定每一条消息记录有三个字段：

| 字段     | 含义                     |
| ------ | ---------------------- |
| time   | 消息发送的时间                |
| msg    | 消息内容                   |
| sender | 消息发送者，需要cookie的配合，暂时留空 |

增加数组和创建消息记录的函数

```js
let chat_content = [];

let makeMsgRecord = (msg, sender) => {
    let date = new Date();
    return {
        'time': date.toString(), 
        'msg': msg,
        'sender': sender
    }
}
```

## 通过POST提交数据

网页向服务器提交数据一般都是通过POST（当然也可以通过GET，只不过我们是要更新服务器上的数据，GET并不太合适），那么就要从Express中获取浏览器通过POST提交的数据。分析HTTP Request的body来获取POST数据，这个工作是由`bodyParser`中间件来完成的，而我们在初始化项目时就已经为我们在`app.js`中设置好了这个中间件。

```js
...
var bodyParser = require('body-parser');
...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
...
```

我们可以直接在`chat.js`中的处理函数里取得POST提交的数据

```js
/* Add new message.*/
router.post('/add-new', (req, res) => {
    chat_content.push(makeMsgRecord(req.body.msg, ''));
    res.json({result: 'OK'});
});
```

## 返回消息列表

返回消息列表就很简单了，不过每次都返回所有的消息太浪费，所以我用了两个URL，`/range-list`和`/list`，前者返回一个范围内的消息，后者可以返回最近的`num`条消息，为了配合`/range-list`增加了`/list-length`来返回消息数目

```js
...
/* For router '/range-list', check and set the value. */
let checkBeginEnd = (begin, end) => {
    let _begin = 0, _end = chat_content.length;
    if (begin !== undefined && parseInt(begin) !== NaN) {
        _begin = parseInt(begin);
    }
    if (end !== undefined && parseInt(end) !== NaN) {
        _end = parseInt(end);
    }
    return [_begin, _end];
}
...
/* Return the range of message list, from begin to end. */
router.get('/range-list', (req, res) => {
    let [begin, end] = checkBeginEnd(req.query.begin, req.query.end);
    res.json(chat_content.slice(begin, end));
});

/* Return the last num records of message. If the num is not specified, return the whole list.*/
router.get('/list', (req, res) => {
    if (req.query.num !== undefined && parseInt(req.query.num) !== NaN) {
        let num = parseInt(req.query.num);
        res.json(chat_content.slice(chat_content.length - num));
    }
    else {
        res.json(chat_content);
    }
});

/* Return the length of the messages list. */
router.get('/list-length', (req, res) => {
    res.json({length: chat_content.length});
});
...
```

# つづく

最简单的功能已经差不多了，先写到这里，接下来的工作就需要前端的配合，包括

- 使用WebSocket与服务器连接
- 通过Cookie来生成随机的用户名

下一篇Blog开始用React写前端页面。



[^1]: http://expressjs.com/en/starter/generator.html
[^2]: https://github.com/pugjs/pug#rename-from-jade
[^3]: http://expressjs.com/en/guide/using-middleware.html
[^4]: http://expressjs.com/en/guide/routing.html

