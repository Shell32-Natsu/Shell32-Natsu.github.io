---
title: LeetCode 137. Single Number II
tags:
  - CPP
  - LeetCode
  - 位运算
  - 哈希表
  - 算法
url: 817.html
id: 817
categories:
  - LeetCode
date: 2016-09-29 17:05:33
---
题目描述:

> Given an array of integers, every element appears *three* times except for one. Find that single one.
>
> **Note:**
> Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

最简单的方法是使用哈希表. 但是要不使用额外空间就要用位运算的方法, 思路是除了要找的元素外, 每个数字都重复了三次, 所以32-bit整数中的每一位出现1的总次数是3的倍数, 找出出现次数不是3的倍数的位, 就是要找的数.

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        return useBit(nums);
    }
    
    int useMap(vector<int> &nums){
        // 使用哈希表的方法
        unordered_map<int, int> m;
        for(int i = 0; i < nums.size(); i++){
            if(++m[nums[i]] == 3) m.erase(nums[i]);
        }
        return m.begin()->first;
    }
    
    int useBit(vector<int> &nums){
        // 使用位运算的方法
        int re = 0;
        for(int i = 0; i < 32; i++){
            int b = 1 << i;
            int n = 0;
            for(int i = 0; i < nums.size(); i++){
                if(nums[i] & b) n++;
            }
            if(n % 3) re |= b;
        }
        return re;
    }
};
```

