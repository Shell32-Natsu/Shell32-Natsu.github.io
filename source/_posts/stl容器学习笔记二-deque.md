---
title: STL容器学习笔记二 - Deque
url: 432.html
id: 432
categories:
  - STL
date: 2016-07-17 19:06:39
tags:
  - STL
  - C++
  - 备忘
---

# [Deque](http://www.cplusplus.com/reference/deque/deque/)简介

deque(读作*deck*)是双向队列的缩写(**d**ouble-**e**nded **que**ue), 它是可以在两端动态变更大小的顺序容器.

不同的库可能会以不同的方法来实现deque, 但不管怎样, 它们都允许通过随机访问迭代器访问特定元素, 并且根据需要自动管理存储空间.

deque提供与vector相似的功能, 但是允许首尾两端高效的插入删除元素而不是像vector一样只能在尾部. **但是**, deque不像vector一样保证使用顺序存储空间来保存元素, 因此如果通过指针和偏移量访问deque中的另一个元素会引发**未定义行为**.

Vector与deque提供相似的接口并且可以用于相似的用途, 但它们的内部实现确完全不同. Vector使用一个在元素数量增长时偶尔需要重新分配空间的数组, 而deque中的元素可以分散存储在内存中的不同位置, deque容器内部通过保存必要的信息来提供在常数时间内访问任意元素的功能, 并且通过迭代器提供一个统一的顺序访问接口. 因此, deque的内部实现比vector要复杂, 但是这使得它在特定情况下可以更高效的增长, 比如在序列非常长时, 重新分配空间会非常耗时.

对于需要在首尾以外的位置频繁插入删除的操作来说, deque比list和forward list表现要差.

# 容器属性

## 顺序

顺序容器中的元素都遵循严格的线性序列, 每个元素都可以通过他们在序列中的位置来访问.

## 动态数组

通常实现类似于动态数组, 提供随机访问序列中任意元素的能力并且提供在序列首尾高效插入/删除的操作.

##  Allocator-aware[?]

容器使用一个allocator对象来动态管理存储空间.

# 部分常用函数

一些常用的函数比如`size`, `back`, `push_back`, `pop_back`, `push_front`, `pop_front`等我就不再赘述了

## 构造函数
### 默认构造函数 *Default constructor*
    explicit deque (const allocator_type& alloc = allocator_type());

创建一个空容器.

### 填充构造函数 *Fill constructor*
    explicit deque (size_type n);
             deque (size_type n, const value_type& val,
                    const allocator_type& alloc = allocator_type());

创建一个有n个元素的容器, 如果提供了val, 则n个元素的值都为val.

### 范围构造函数 *Range constructor*
    template <class InputIterator>
      deque (InputIterator first, InputIterator last,
             const allocator_type& alloc = allocator_type());

构建一个数量与[first, last)相同的容器, 以与之相同的顺序初始化每个元素.

### 拷贝构造函数

    deque (const deque& x);
    deque (const deque& x, const allocator_type& alloc);

创建一个以x中的元素的拷贝组成的容器.

### 移动构造函数 *Move constructor*
    deque (deque&& x);
    deque (deque&& x, const allocator_type& alloc);

创建一个由从x中取得的元素组成的容器, 下面这句话我没有太看懂: 
> If alloc is specified and is different from x's allocator, the elements are moved. Otherwise, no elements are constructed (their ownership is directly transferred).

x会保持一个未定义但合法的状态.

### 初始化列表构造函数
    deque (initializer_list<value_type> il,
           const allocator_type& alloc = allocator_type());

以il中元素的顺序用每个元素的拷贝创建一个容器.

### 例子

    // code url: http://www.cplusplus.com/reference/deque/deque/deque/
    // constructing deques
    #include <iostream>
    #include <deque>

    int main ()
    {
        unsigned int i;

        // constructors used in the same order as described above:
        std::deque<int> first;                                // empty deque of ints
        std::deque<int> second (4,100);                       // four ints with value 100
        std::deque<int> third (second.begin(),second.end());  // iterating through second
        std::deque<int> fourth (third);                       // a copy of third

        // the iterator constructor can be used to copy arrays:
        int myints[] = {16,2,77,29};
        std::deque<int> fifth (myints, myints + sizeof(myints) / sizeof(int) );

        std::cout << "The contents of fifth are:";
        for (std::deque<int>::iterator it = fifth.begin(); it!=fifth.end(); ++it)
            std::cout << ' ' << *it;

        std::cout << '\n';

        return 0;
    }
输出

    The contents of fifth are: 16 2 77 29

## deque::assign

**range (1)**

    template <class InputIterator>
    void assign (InputIterator first, InputIterator last);

**fill (2)**

    void assign (size_type n, const value_type& val);

**initializer list (3)**

    void assign (initializer_list<value_type> il);

重新配置deque中的内容, 并相应地调整大小. 使用方法类似于相应的构造函数.

## deque::clear

    void clear() noexcept;

清空容器中的所有元素.

**时间复杂度:** 与size有关的线性(因为要执行元素的析构函数).

## deque::max_size

    size_type max_size() const noexcept;

返回deque容器所能保存的最大元素数量. 但是deque不保证一定能达到这个数量.