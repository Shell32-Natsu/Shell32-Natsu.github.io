---
title: '[边做边学]用Node.js+React+Express来写个聊天室(2)'
tags:
  - Node.js
  - React
  - Express
  - JavaScript
  - WEB
categories:
  - Study
---

<!-- toc -->

# 前端

## React

[React](tps://facebook.github.io/react/)是Facebook开源的一个前端框架，它把本来应该写在HTML文件中的HTML语句放到JS中，HTML结构不是由浏览器直接下载解析，而是执行JS语句之后才会生成，再交给浏览器解析。那么相比于传统的HTML+JS的结构，React这种框架有什么优势呢，以下的链接可能会有帮助：

- https://facebook.github.io/react/blog/2013/06/05/why-react.html
- https://blog.syncano.io/reactjs-reasons-why-part-1/

从我这个初学者的角度来说，React的组件化开发方式相比于HTML的树状结构在结构上更清晰，开发效率也更高，更接近传统桌面应用程序的结构。对于页面结构（也就是HTML的结构）的变化更容易处理，适合构建[单页应用](https://www.wikiwand.com/en/Single-page_application)。

React文档地址：<https://facebook.github.io/react/docs/hello-world.html>

## 初始化React应用程序

安装指引：<https://facebook.github.io/react/docs/installation.html>

```bash
npm install -g create-react-app
create-react-app frontend

cd frontend
npm start
```

我当前的React版本

```js
"dependencies": {
  "react": "^15.5.4",
  "react-dom": "^15.5.4"
},
```



最后的`npm start`会启动一个HTTP调试服务器，访问`http://localhost:3000`可以看到初始页面。运行`npm run build`可以在`build/static`目录下编译出静态js和css文件。

虽然React把HTML放在了JS中，但是还是要有一个最简单的HTML文件作为基础，这个文件在`public/index.html`。这个文件很简单，`body`标签中只有一个`id="root"`的`div`标签，整个过程中我们基本不需要修改这个文件，我们的主要目标在`src`目录中。

## 渲染组件

`src`目录中