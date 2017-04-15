---
title: LeetCode 172. Factorial Trailing Zeroes
tags:
  - CPP
  - LeetCode
  - 算法
url: 898.html
id: 898
categories:
  - LeetCode
date: 2016-10-20 17:01:56
---
题目描述:

> Given an integer *n*, return the number of trailing zeroes in *n*!.
>
> **Note: **Your solution should be in logarithmic time complexity.

统计结果中因子5的个数.

```cpp
class Solution {
public:
    int trailingZeroes(int n) {
        int ret = 0;
        while(n > 0){
            ret += n / 5; // 实际是计算比n小的最大的5的整数倍
            n /= 5; // 实际是计算比n小的最大的5的整数倍除以5
        }
        return ret;
    }
};
```

