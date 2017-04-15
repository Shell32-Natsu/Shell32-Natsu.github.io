---
title: LeetCode 476. Number Complement
tags:
  - CPP
  - LeetCode
  - 位运算
  - 算法
url: 1086.html
id: 1086
categories:
  - LeetCode
date: 2017-01-13 16:17:59
---
题目描述：

> Given a positive integer, output its complement number. The complement strategy is to flip the bits of its binary representation.
>
> **Note:**
>
> 1. The given integer is guaranteed to fit within the range of a 32-bit signed integer.
> 2. You could assume no leading zero bit in the integer’s binary representation.
>
> **Example 1:**
>
> ```
> Input: 5
> Output: 2
> Explanation: The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.
>
> ```
>
> **Example 2:**
>
> ```
> Input: 1
> Output: 0
> Explanation: The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.
> ```

就是简单的按位取反，不过不能把前导零给取反了，所以要先确定最高位所在的位置，取反后将更高位置零。

```cpp
class Solution {
public:
    int findComplement(int num) {
        unsigned int unum = num;
        int sigbit = 0;
        while(unum){
            unum >>= 1;
            sigbit++;
        }
        unum = ~num;
        unum = unum << (32 - sigbit) >> (32 - sigbit);
        return (int)unum;
    }
};
```

