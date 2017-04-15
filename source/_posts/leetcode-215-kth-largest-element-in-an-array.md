---
title: LeetCode 215. Kth Largest Element in an Array
tags:
  - CPP
  - LeetCode
  - 堆
  - 排序
  - 算法
url: 1112.html
id: 1112
categories:
  - LeetCode
date: 2017-01-21 19:04:40
---
题目描述：

> Find the **k**th largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.
>
> For example,
> Given `[3,2,1,5,6,4]` and k = 2, return 5.
>
> **Note: **
> You may assume k is always valid, 1 ≤ k ≤ array's length.

堆排序，我直接用STL了……

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        partial_sort(nums.begin(), nums.begin() + k, nums.end(), greater<int>());
        return nums[k - 1];
    }
};
```

