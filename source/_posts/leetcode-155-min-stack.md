---
title: LeetCode 155. Min Stack
tags:
  - CPP
  - LeetCode
  - 栈
  - 算法
url: 873.html
id: 873
categories:
  - LeetCode
date: 2016-10-11 16:44:31
---
题目描述:

> Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
>
> - push(x) -- Push element x onto stack.
> - pop() -- Removes the element on top of the stack.
> - top() -- Get the top element.
> - getMin() -- Retrieve the minimum element in the stack.
>
> **Example:**
>
> ```
> MinStack minStack = new MinStack();
> minStack.push(-2);
> minStack.push(0);
> minStack.push(-3);
> minStack.getMin();   --> Returns -3.
> minStack.pop();
> minStack.top();      --> Returns 0.
> minStack.getMin();   --> Returns -2.
> ```

实现一个栈的同时能在常数时间内取得栈内的最小值. 使用两个栈即可, 一个栈用来保存元素, 另一个栈用来保存对应元素时栈内的最小值.

```cpp
class MinStack {
public:
    vector<int> stack;
    vector<int> min;
    void push(int x) {
        stack.push_back(x);
        if(min.empty() || min.back() > x) min.push_back(x);
        else min.push_back(min.back());
    }

    void pop() {
        stack.pop_back();
        min.pop_back();
    }

    int top() {
        if(stack.empty()) return -1;
        return stack.back();
    }

    int getMin() {
        return min.back();
    }
};
```

