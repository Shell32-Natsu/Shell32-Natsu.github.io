---
title: LeetCode 385. Mini Parser
tags:
  - CPP
  - LeetCode
  - 栈
  - 算法
url: 635.html
id: 635
categories:
  - LeetCode
date: 2016-08-16 23:19:24
---
题目描述:

> Given a nested list of integers represented as a string, implement a parser to deserialize it.
>
> Each element is either an integer, or a list -- whose elements may also be integers or other lists.
>
> **Note:** You may assume that the string is well-formed:
>
> - String is non-empty.
> - String does not contain white spaces.
> - String contains only digits `0-9`, `[`, `-` `,`, `]`.
>
> **Example 1:**
>
> ```
> Given s = "324",
>
> You should return a NestedInteger object which contains a single integer 324.
>
> ```
>
> **Example 2:**
>
> ```
> Given s = "[123,[456,[789]]]",
>
> Return a NestedInteger object containing a nested list with 2 elements:
>
> 1. An integer containing value 123.
> 2. A nested list containing two elements:
>     i.  An integer containing value 456.
>     ii. A nested list with one element:
>          a. An integer containing value 789.
> ```

题目要求把一个合法的字符串转换为对应的嵌套的数据格式, 一开始我想使用递归, 但是在处理嵌套的问题上遇到了麻烦, 所以改为使用栈来做.

把每一层嵌套视为栈的一个元素, 每遇到一个`[`就入栈一个新的NestedInteger, 然后遇到数字就把它加入到栈顶的NestedInteger中去, 遇到`]`就把栈顶的元素弹出, 加入到新的栈顶中, 如果弹出栈顶后栈为空说明处理结束.

```cpp
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *   public:
 *     // Constructor initializes an empty nested list.
 *     NestedInteger();
 *
 *     // Constructor initializes a single integer.
 *     NestedInteger(int value);
 *
 *     // Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     bool isInteger() const;
 *
 *     // Return the single integer that this NestedInteger holds, if it holds a single integer
 *     // The result is undefined if this NestedInteger holds a nested list
 *     int getInteger() const;
 *
 *     // Set this NestedInteger to hold a single integer.
 *     void setInteger(int value);
 *
 *     // Set this NestedInteger to hold a nested list and adds a nested integer to it.
 *     void add(const NestedInteger &ni);
 *
 *     // Return the nested list that this NestedInteger holds, if it holds a nested list
 *     // The result is undefined if this NestedInteger holds a single integer
 *     const vector<NestedInteger> &getList() const;
 * };
 */
class Solution {
public:
    NestedInteger deserialize(string s) {
        vector<NestedInteger> nestedIntSt;
        for(int i = 0; i < s.length(); i++){
            if(s[i] == '['){
                NestedInteger tmp;
                nestedIntSt.push_back(tmp);
            }
            else if(s[i] == ']'){
                NestedInteger tmp = nestedIntSt.back();
                nestedIntSt.pop_back();
                if(!nestedIntSt.empty()) nestedIntSt.back().add(tmp);
                else return tmp;
            }
            else if((s[i] == '-' || isDigit(s[i])) && !nestedIntSt.empty()){
                int start = i, end = i + 1;
                while(isDigit(s[end])){
                    end++;
                }
                nestedIntSt.back().add(stoi(s.substr(start, end - start)));
                i = end - 1;
            }
        }
        return NestedInteger(stoi(s)); // 如果循环中没有返回, 说明字符串中只包含一个数字
    }
    
    bool isDigit(char ch){
        return ch >= '0' && ch <= '9';
    }
};
```

