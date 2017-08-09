---
title: LeetCode 540. Single Element in a Sorted Array
date: 2017-08-09 17:48:13
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

Given a sorted array consisting of only integers where every element appears twice except for one element which appears once. Find this single element that appears only once.

**Example 1:**

```
Input: [1,1,2,3,3,4,4,8,8]
Output: 2

```

**Example 2:**

```
Input: [3,3,7,7,10,11,11]
Output: 10

```

**Note:** Your solution should run in O(log n) time and O(1) space.

<!-- more -->

-----------

很经典的题，用异或。

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int ans = 0;
        for (auto i : nums) {
            ans ^= i;
        }
        return ans;
    }
};
```

