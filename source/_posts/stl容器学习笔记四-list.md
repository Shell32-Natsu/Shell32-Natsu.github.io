---
title: STL容器学习笔记四 - List
tags:
  - STL
  - 笔记
url: 521.html
id: 521
categories:
  - STL
date: 2016-07-30 18:11:46
---
[TOC]
# [List](http://www.cplusplus.com/reference/list/list/) 双向链表

list是允许在容器内任意位置以常数时间进行插入删除操作的顺序容器, 它的迭代器也是双向的.

list被实现为双向链表, 它与`forward_list`的主要区别在于`forward_list`是单向链表, 迭代器只能向前.

与其他顺序容器相比主要优点在于在容器任意位置插入, 提取和移动的表现更好. 不足在于不能根据元素在容器中的位置来访问元素.

# 部分函数

list没有随机访问方法, 没有`at`成员函数或者`[]`运算符.

## 构造函数

与其他顺序容器类似
| 类型          | 原型                                       |
| ----------- | ---------------------------------------- |
| default (1) | `explicit list (const allocator_type& alloc = allocator_type());` |
| fill (2)    | `explicit list (size_type n, const value_type& val = value_type(),` `const allocator_type& alloc = allocator_type());` |
| range (3)   | `template <class InputIterator>  list (InputIterator first, InputIterator last,` `const allocator_type& alloc = allocator_type());` |
| copy (4)    | `list (const list& x);`                  |


## list::merge

    void merge (list& x);
      void merge (list&& x);
    template <class Compare>
      void merge (list& x, Compare comp);
    template <class Compare>
      void merge (list&& x, Compare comp);

将x中的元素按照相应的顺序放入容器中, 两个容器都应有序. 该操作移除x中的所有元素, 但不会析构或构造任何对象.

该函数的模板版本使用comp作为比较元素大小的方法. 结果得到的list是稳定的. 当`&x == this`时不会做任何事.

## list::splice

将元素从x中转移到当前容器中, 插入到position指定的位置.

晕啊素会从x中移除, 两个容器的大小都会改变. 该操作不会析构或构造任何对象.

    void splice (const_iterator position, list& x);
    void splice (const_iterator position, list&& x);

x中的所有元素都转移到list中.

    void splice (const_iterator position, list& x, const_iterator i);
    void splice (const_iterator position, list&& x, const_iterator i);

只有迭代器`i`指定的元素被移动.

    void splice (const_iterator position, list& x,
                const_iterator first, const_iterator last);
    void splice (const_iterator position, list&& x,
                const_iterator first, const_iterator last);

`[first, last)`范围内的元素被移动.

## list::unique

    void unique();

删除除了第一个元素以外的重复元素. **注意:**只有与前一个元素相等的元素才会被移除, 所以该函数只能用于有序list.

    template <class BinaryPredicate>
        void unique (BinaryPredicate binary_pred);

使用一个比较函数来决定两个元素是否相等. `unique`会对每个相邻元素调用`binary_pred(*i, *(i - 1))`, 如果返回true则删除`i`.