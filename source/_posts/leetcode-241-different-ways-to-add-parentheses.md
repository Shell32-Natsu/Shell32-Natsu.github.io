---
title: LeetCode 241. Different Ways to Add Parentheses
tags:
  - CPP
  - LeetCode
  - 分治
  - 算法
  - 递归
url: 1165.html
id: 1165
categories:
  - LeetCode
date: 2017-03-10 21:11:14
---
题目描述：

> Given a string of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. The valid operators are `+`, `-` and `*`.
>
> Example 1
>
> Input: `"2-1-1"`.
>
> ```
> ((2-1)-1) = 0
> (2-(1-1)) = 2
> ```
>
> Output: `[0, 2]`
>
> Example 2
>
> Input: `"2*3-4*5"`
>
> ```
> (2*(3-(4*5))) = -34
> ((2*3)-(4*5)) = -14
> ((2*(3-4))*5) = -10
> (2*((3-4)*5)) = -10
> (((2*3)-4)*5) = 10
> ```
>
> Output: `[-34, -14, -10, -10, 10]`

一开始我以为这是个排列组合问题，实际上也确实是，但是使用分治+递归可以更容易的解决。使用每个运算符把算式分割成两部分，再对两部分分别递归地处理，直到没有运算符，就直接返回数值。两边的字符串分别返回一个结果数组，根据操作符对数组中的元素两两进行运算，将结果放到结果集中返回给上一层函数。

要注意的是这道题并不用去重。

```cpp
class Solution {
public:
    vector<int> diffWaysToCompute(string input) {
        return diffWaysToComputeImpl(input, 0, input.length());
    }
    
    vector<int> diffWaysToComputeImpl(string &input, int left, int right) {
        vector<int> ans;
        for (int i = left; i < right; i++) {
            if (isOperation(input[i])) {
                auto leftResult = diffWaysToComputeImpl(input, left, i);
                auto rightResult = diffWaysToComputeImpl(input, i + 1, right);
                for (auto j : leftResult) {
                    for (auto k : rightResult) {
                        ans.push_back(operate(j, k, input[i]));
                    }
                }
            }
        }
        if (ans.empty()) {
            ans.push_back(stoi(input.substr(left, right - left)));
        }
        return ans;
    }
    
    int operate (int a, int b, char op) {
        switch(op){
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
        }
    }
    
    bool isOperation (char c) {
        return (c == '+' || c == '-' || c == '*');
    }
};
```

