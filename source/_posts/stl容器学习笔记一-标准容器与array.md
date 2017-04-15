---
title: STL容器学习笔记一 - 标准容器与Array
url: 417.html
id: 417
categories:
  - STL
date: 2016-07-15 18:46:14
tags:
  - 备忘
  - STL
  - C++
---

在做LeetCode题目的过程中, 我发现我对于STL容器的了解还是过于浅薄, 因此决定专门学习总结一下. 主要资料来源是[http://www.cplusplus.com/reference/stl/](http://www.cplusplus.com/reference/stl/).

# 标准容器

一个**容器**是一个保存一组其他对象(元素 _element_)的对象, 他们都是用类模板来实现的. 容器管理着保存元素的存储空间并且提供直接或通过迭代器(_iterators_)访问它们的成员函数.

stack, queue和priority_queue被实现为**容器适配器(container adaptors)**, 容器适配器不是完整的容器类, 而是提供依赖于容器类(如deque或list)对象的特定接口的类.

## 顺序容器 Sequence Containers

*   array
*   vector
*   deque
*   forward_list
*   list

## 容器适配器 Container Adaptors

*   stack
*   queue
*   priority_queue

## 关联容器 Associative Containers

*   set
*   multiset
*   map
*   multimap

## 无序关联容器 Unordered Associative Containers

*   unordered_set
*   unordered_multiset
*   unordered_map
*   unordered_multimap

_更多参考资料: [http://www.cplusplus.com/reference/stl/](http://www.cplusplus.com/reference/stl/)_

# [Array](http://www.cplusplus.com/reference/array/array/) _[C++11]_

Array是固定大小的顺序容器, 它以固定的线性顺序存储特定数量的元素(注意**不是**特定的大小顺序). 在内部, Array不保存除了它包含的元素以外的任何数据(包括容器大小, 它是在编译期确定的值). 不同于vector, array不能动态改变大小. 大小为0的array是合法的, 但是它不应该被解引用(front, back和data成员函数). 不同于其他STL容器, swap两个array是一个线性操作, 会对每一个元素单独进行swap, 这一般被认为是一种低效操作.

## 部分成员函数

绝大部分array容器的成员函数时间复杂度都是常数时间复杂度.

## array::data
```c++
    value_type* data() noexcept;
    const value_type* data() const noexcept;`</pre>
```
返回指向array对象首个元素的指针. 因为元素是连续存储的, 因此可以用偏移量(_offset_)来访问array中的元素.
​    
## array::fill

```c++
void fill (const value_type& val);
```

把array中的所有元素都设置为val.
**时间复杂度:** 线性.
## array::swap
```c++
void swap (array& x) noexcept(noexcept(swap(declval<value_type&>(),declval<value_type&>())));
```
与array x交换内容.
**时间复杂度:** 线性.
**迭代器合法性:** 所有迭代器, 引用和指针的合法性都不会改变. 它们仍然与调用前相同的容器的相同位置相关联, 但是他们指向的值会是交换后的值.