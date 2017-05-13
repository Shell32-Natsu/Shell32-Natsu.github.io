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

~~期末考完了，春活也全甲全船了，来继续更这个没人看的系列~~

~~我的前端写的很丑，就不提CSS了……~~

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

`src`目录中有一个`index.js`文件，该文件调用`ReactDOM.render`来进行组件的渲染。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

而`App.js`中创建了一个继承`Component`的`App`类，并把它导出。这个类中的`render()`方法返回了HTML文本。

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

## 增加组件

创建一个`Chatroom.js`文件用于保存聊天室js代码。页面上显示三个component：标题，消息列表，发送消息的表单。所以先创建一个`Chatroom`类，它再创建这三个组件。

```js
render() {
  return (
    <div>
    <h1>{this.title}</h1>
    <MessageList messages = {this.messages}/>
    <NewMessageForm />
    </div>
  );
}
```

### `MessageList`

`MessageList`用于显示消息列表，它就是一个简单的`<ul>`标签，它的传入参数中有一个`messages`是要显示的消息的list。

```js
class MessageList extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  getMessageList (messages) {
    return messages.map((msg) =>
      <li>
      <Message message = {msg} />
      </li>
    );
  }


  render() {
    return (
      <ul>
      {this.getMessageList(this.props.messages)}
      </ul>
    );
  }
}
```

`getMessageList`这个函数使用`map`方法为`messages`中的每一条message创建一个`<li>`标签，`<li>`标签中包含`Message`组件。

### `Message`

`Message`组件返回一个包含message内容的`<div>`标签。

```js
class Message extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <div>
      <p>{this.props.message}</p>
      </div>
    );
  }
}
```

### `NewMessageForm`

`NewMessageForm`是发送消息的表单，关于React表单的使用参考这里<https://facebook.github.io/react/docs/forms.html>

```js
class NewMessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {inputMessage: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    alert("Message: " + this.state.inputMessage);
    event.preventDefault();
  }

  handleChange (event) {
    this.setState({inputMessage: event.target.value});
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <div>
      <label>Message:</label>
      <textarea value={this.state.inputMessage} onChange={this.handleChange} />
      </div>
      <div>
      <button type='submit'>Send</button>
      </div>
      </form>
      </div>
    );
  }
}
```

该类的实现中使用了`this.state`，它可以用于保存组件的各种状态，并且在`state`发生变更时自动地更新使用它的值的位置所显示的内容。关于state参考这里：<https://facebook.github.io/react/docs/state-and-lifecycle.html>。

在表单提交的时候，为了避免页面刷新，以前我都是使用AJAX来提交数据，不过这次我打算使用WebSocket来进行通信。

# 下一步

实现WebSocket通信。