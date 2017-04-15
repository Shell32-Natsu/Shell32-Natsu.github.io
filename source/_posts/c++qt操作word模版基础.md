---
title: C++&Qt操作Word模版基础
url: 285.html
id: 285
categories:
  - C++
  - Study
  - 备忘
date: 2016-01-02 21:03:40
tags:
---

项目中要对Word模版进行操作, 使用C++&Qt进行开发, 将学到的东西记录如下.

## 0 参考链接

1. [https://en.wikipedia.org/wiki/OLE_Automation](https://en.wikipedia.org/wiki/OLE_Automation)

2. [http://www.cgoakley.org/prog/oleaut.html](http://www.cgoakley.org/prog/oleaut.html)

3. [https://zh.wikipedia.org/wiki/ActiveX](https://zh.wikipedia.org/wiki/ActiveX)

4. [http://www.oschina.net/question/1243014_120926](http://www.oschina.net/question/1243014_120926)

5. [http://blog.csdn.net/csxiaoshui/article/details/47333989](http://blog.csdn.net/csxiaoshui/article/details/47333989)

## 1 基础知识

### 1.1 OLE Automation

在Windows应用开发中, OLE Automation是一种进程间通信机制. 它基于COM和MFC, 因此在我的项目中并不适用.[[1]](https://en.wikipedia.org/wiki/OLE_Automation)[[2]](http://www.cgoakley.org/prog/oleaut.html)

> OLE（Object Linking and Embedding，对象链接与嵌入），是能让应用程序创建包含不同来源的复合文档的一项技术。OLE不仅是桌面应用程序集成，而且还定义和实现了一种允许应用程序作为软件“对象”（数据集合和操作数据的函数）彼此进行“链接”的机制，这种链接机制和协议称为部件对象模型(Component Object Model),简称COM。OLE可以用来创建复合文档，复合文档包含了创建于不同源应用程序，有着不同类型的数据，因此它可以把文字、声音、图像、表格、应用程序等组合在一起。

### 1.2 ActiveX

根据Wikipedia[[3]](https://zh.wikipedia.org/wiki/ActiveX), ActiveX的含义是:

> ActiveX在广义上是指微软公司的整个COM架构，但是现在通常用来称呼基于标准COM接口来实现对象链接与嵌入（OLE）的ActiveX控件。[1]后者是指从VBX发展而来的，面向微软的Internet Explorer技术而设计的以OCX为扩展名的OLE控件。通过定义容器和组件之间的接口规范，如果编写了一个遵循规范的控件，那么可以很方便地在多种容器中使用而不用修改控件的代码。同样，通过实现标准接口调用，一个遵循规范的容器可以很容易地嵌入任何遵循规范的控件。由于OLE在ActiveX控件中的应用的普及，现在OLE技术中只有少数独立于ActiveX技术，例如复合文档。

## 2 Qt中的ActiveX[[5]](http://blog.csdn.net/csxiaoshui/article/details/47333989)

Qt中提供QtActiveX模块来支持ActiveX, 有两种开发方式:

1.  将已有的COM或者ActiveX空间引入到Qt的应用程序中
2.  将Qt应用程序或者Qt的对象导出成COM对象或者ActiveX控件供他人使用

Qt是通过两个模块来支持上述所说的两种方式的:

1.  使用QAxContainer模块, 通过QAxObject和QAxWidget分别支持COM对象和ActiveX控件的开发, 可以通过这两个对象将外部的COM或者ActiveX组件接入到Qt应用程序.
2.  使用QAxServer模块, 通过QAxAggregated, QAxBindable和QAxFactory类, 通过了进程内和可执行程序exe两种方式的COM Server模式, 用来将Qt写的内容导出为COM或者ActiveX供他人使用.

## 3 Qt中使用ActiveX[[4]](http://www.oschina.net/question/1243014_120926)

Qt版本5.4.2, 编译器: MinGW 4.9.1 32-bit.

### 3.1 准备工作

创建一个Word模版, 插入一个表格和三个书签: pos1, pos2, pos3\. 保存为Doc1.dot.

![](https://lh3.googleusercontent.com/-Vh0Ca5Homwc/VofF7M2vCwI/AAAAAAAAD0M/BazOwEELCWwZjizGLApPj9JHnXGzQARrACCo/s800/20160102200655.png)

### 3.2 在项目的.pro文件中增加如下一行

    QT   += axcontainer`</pre>

### 3.3 新建Qt项目,输入如下代码:

```c++
#include "mainwindow.h"
#include <QApplication>
#include <QAxWidget>
#include <QAxObject>

int main(int argc, char *argv[])
{
  QApplication a(argc, argv);
  MainWindow w;
  w.show();

  //新建一个word应用程序
  QAxWidget *word = new QAxWidget("Word.Application", 0, Qt::MSWindowsOwnDC);
  //设置为不可见
  word->setProperty("Visible", false);
  //获取所有工作文档
  QAxObject *docs = word->querySubObject("Documents");
  //新建一个文档
  docs->dynamicCall("Add(QString)", QString::fromLocal8Bit("E:\\Study\\Design\\WordTempTest\\Doc1.dot"));
  //获取激活文档
  QAxObject *activeDoc = word->querySubObject("ActiveDocument");
  //获取pos1标签
  QAxObject *bookmarkPos1 = activeDoc->querySubObject("Bookmarks(QVariant)", "pos1");
  //选中并插入字符
  if(!bookmarkPos1->isNull()){
    bookmarkPos1->dynamicCall("Select(void)");
    bookmarkPos1->querySubObject("Range")->setProperty("Text", "pos1");
  }
  //获取pos2标签
  QAxObject *bookmarkPos2 = activeDoc->querySubObject("Bookmarks(QVariant)", "pos2");
  //选中并插入字符
  if(!bookmarkPos2->isNull()){
    bookmarkPos2->dynamicCall("Select(void)");
    bookmarkPos2->querySubObject("Range")->setProperty("Text", "pos2");
  }
  //获取pos3标签
  QAxObject *bookmarkPos3 = activeDoc->querySubObject("Bookmarks(QVariant)", "pos3");
  //选中并插入字符
  if(!bookmarkPos3->isNull()){
    bookmarkPos3->dynamicCall("Select(void)");
    bookmarkPos3->querySubObject("Range")->setProperty("Text", "pos3");
  }
  //文档另存为Doc1.doc
  activeDoc->dynamicCall("SaveAs (const QString&)", QString("E:\\Study\\Design\\WordTempTest\\Doc1.doc"));
  activeDoc->dynamicCall("Close (boolean)", false);
  word->dynamicCall("Quit()");

  return a.exec();
}
```
## 3.4 运行结果

程序运行后Doc1.doc文件的内容:

![](https://lh3.googleusercontent.com/-dAT5kINBxfQ/VofF7O-Oo7I/AAAAAAAAA18/iiKZDWcC8wo/s800-Ic42/20160102204208.png)