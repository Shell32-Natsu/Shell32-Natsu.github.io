---
title: python ctypes传值的问题
url: 102.html
id: 102
categories:
  - Python
date: 2014-09-13 10:29:17
tags:
  - Python
  - 备忘
---

使用ctypes调用dll时又遇到了一个问题，向ctypes调用的dll中的函数传递一个参数时参数值发送了变化。我是在Django中使用的这个dll，用shell直接使用传值没有任何问题。
问题代码：
```python
#构造函数中载入dll并且初始化一个字符串保存路径
self.so = ctypes.CDLL("/home/pi/RaspCloud/bin/librcfile.so")
self.cur_path = path
......
fun = self.so.list_file
string = ctypes.create_string_buffer(MAXN)
fun(string, self.cur_path)
...
```
但是到了dll的函数中，路径就变成了"/"，现在还没有搞明白原因，暂时的解决方案如下：
```python
fun = self.so.list_file
string = ctypes.create_string_buffer(MAXN)
path = ctypes.create_string_buffer(MAXN)
path.value = self.cur_path
fun(string, path)
```
猜测原因可能是字符串的兼容，但是shell中却没有问题。。。难道是Django的原因吗。。。