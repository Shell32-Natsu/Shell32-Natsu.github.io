---
title: ctypes多次载入dll
url: 96.html
id: 96
categories:
  - Python
date: 2014-09-12 22:58:29
tags:
  - Python
  - 备忘
---

python中使用ctypes.CDLL可以载入dll文件，今天遇到一个问题就是如果先后载入同一个文件（例如有两个对象），实际上是共享了同一个dll对象。这在dll中存在参数并且两次载入进行了不同的操作时会造成问题。大概我的dll设计的不好，以后还是不要再dll中保存参数或者数据。

实验：
测试dll代码：
```c
#include 
int a=0;
void add(void)
{
    a=2;
}
int tprint(void)
{
    return a;
}
void set(int aa)
{
    a=aa;
}
```
测试python代码：
```python
import ctypes

class test:
	def __init__(self,id):
		self.so = ctypes.CDLL("dll.dll")
		self.id = id

a = test('a')
b = test('b')

a.so.set(1)
b.so.set(2)
aa=a.so.tprint()
bb=b.so.tprint()
print a.id+':'
print aa
print b.id+':'
print bb
```
输出结果:
```
a:
2
b:
2
```