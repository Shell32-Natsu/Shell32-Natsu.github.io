---
title: LeetCode 136. Single Number
tags:
  - CPP
  - LeetCode
  - 位运算
  - 算法
url: 811.html
id: 811
categories:
  - LeetCode
date: 2016-09-28 16:06:00
---
题目描述:

> Given an array of integers, every element appears *twice* except for one. Find that single one.
>
> **Note:**
> Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

使用异或.

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ans = 0;
        for(auto i : nums){
            ans ^= i;
        }
        return ans;
    }
};
```

