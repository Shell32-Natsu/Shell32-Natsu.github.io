---
title: LeetCode 561. Array Partition I
date: 2017-04-24 18:31:55
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

题目描述：

> Given an array of **2n** integers, your task is to group these integers into **n** pairs of integer, say (a1, b1), (a2, b2), ..., (an, bn) which makes sum of min(ai, bi) for all i from 1 to n as large as possible.
>
> **Example 1:**
>
>
>     Input: [1,4,3,2]
>     Output: 4
>     Explanation: n is 2, and the maximum sum of pairs is 4.
>
>
> **Note:**
>
> 1. **n** is a positive integer, which is in the range of [1, 10000].
> 2. All the integers in the array will be in the range of [-10000, 10000].

将数组排序之后从第一个元素开始相邻的元素为一组，将每一组中较小的值加起来就可以了。

<!-- more -->

```cpp
class Solution {
public:
    int arrayPairSum(vector<int>& nums) {
        int n = nums.size() / 2;
        sort(nums.begin(), nums.end());
        int ans = 0;
        for (int i = 0; i < n * 2; i += 2) {
            ans += nums[i];
        }
        return ans;
    }
};
```

