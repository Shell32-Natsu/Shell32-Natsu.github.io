---
title: STL容器学习笔记三 - Forward_list
url: 449.html
id: 449
categories:
  - STL
date: 2016-07-20 19:18:15
tags:
  - 备忘
  - STL
  - C++
---

# [Forward list](http://www.cplusplus.com/reference/forward_list/forward_list/) 前向链表[C++11]

前向链表是提供常数复杂度的插入删除操作的容器, 它被实现为一个单链接链表.

`forward_list`与`list`的区别在于前者保存指向每个节点的后一个节点的指针, 而后者保存前后两个节点的指针. `forward_list`比`list`稍微高效, 但是缺点在于只能向前遍历.

与其他顺序容器相比主要优点在于在容器任意位置插入, 提取和移动的表现更好. 不足在于不能根据元素在容器中的位置来访问元素.

`forward_list`被设计得非常高效, 它与一个简单的C语言手写单向链表的效率相当. 实际上, **它是唯一一个出于性能考虑而不提供`size`成员函数的标准容器**.

# 部分函数

只列举一些我不太熟悉的函数.

## 构造函数

### 默认构造函数

```c++
explicit forward_list (const allocator_type& alloc = allocator_type());
```

创建一个空容器.
​    
### 填充构造函数

```c++
explicit forward_list (size_type n);
explicit forward_list (size_type n, const value_type& val,
                      const allocator_type& alloc = allocator_type());
```

创建一个大小为n的容器, 如果提供了val, 则n个值都初始化为val.
​    
### 范围构造函数

```c++
template <class InputIterator>
  forward_list (InputIterator first, InputIterator last,
                    const allocator_type& alloc = allocator_type());
```

用`[first, last)`中的数据初始化.

### 拷贝构造函数

```c++
forward_list (const forward_list& fwdlst);
forward_list (const forward_list& fwdlst, const allocator_type& alloc);
```
    
### 移动构造函数
    
```c++
forward_list (forward_list&& fwdlst);
forward_list (forward_list&& fwdlst, const allocator_type& alloc);
```
    
除非alloc的类型与fwdlst不一致, 否则不会构造任何一个元素, 它们的所有权被直接转移.
    
### 初始化列表
    
```c++
forward_list (initializer_list<value_type> il,
const allocator_type& alloc = allocator_type());
```

## forward_list::before___begin

```c++
iterator before_begin() noexcept;
const_iterator before_begin() const noexcept;
```

返回指向容器中首个元素之前的元素的迭代器. 该迭代器不能解引用, 主要作为成员函数`emplace_after`, `insert_after`, `erase_after`和`splice_after`的参数.

## forward_list::emplace_after

```c++
template <class... Args>
iterator emplace_after (const_iterator position, Args&&... args);
```

在position的位置之后插入元素, args为插入的新元素的初始化参数.

## forward_list::emplace_front

```c++
template <class... Args>
void emplace_front (Args&&... args);
```

在容器头部插入新元素, args为插入的新元素的初始化参数.

## forward_list::erase_after

```c++
iterator erase_after (const_iterator position);
iterator erase_after (const_iterator position, const_iterator last);
```

删除容器中position之后的一个元素或者(position, last)范围内的元素.

## forward_list::merge

```c++
void merge (forward_list& fwdlst);
void merge (forward_list&& fwdlst);
template <class Compare>
void merge (forward_list& fwdlst, Compare comp);
template <class Compare>
void merge (forward_list&& fwdlst, Compare comp);
```

根据指定顺序将fwdlst与当前容器合并.

## forward_list::remove_if

```c++
template <class Predicate>
void remove_if (Predicate pred);
```

对容器中的每个元素, 执行pred(以`pred(*i)`的形式), 如果为true则删除该元素.

pred可以为函数指针或者函数对象.

## forward_list::sort

```c++
void sort();
template <class Compare>
void sort (Compare comp);
```

排序函数, 该函数是稳定排序. 整个操作不包括任何的元素构造, 析构和复制. 元素只是在容器内移动.

**时间复杂度**: NlogN.

## forward_list::unique

```c++
void unique();
template <class BinaryPredicate>
void unique (BinaryPredicate binary_pred);
```

删除重复元素. **这个操作只会删除与前一个元素相同的元素, 也就是说只能用于已经排序的容器.**

第二种形式中的参数binary_pred以`binary_pred(*i, *(i - 1))`的形式调用, 此函数返回true则认为两个元素相等.

binary_pred可以为函数指针或者函数对象.