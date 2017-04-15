---
title: LeetCode 162. Find Peak Element
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 算法
url: 878.html
id: 878
categories:
  - LeetCode
date: 2016-10-12 16:42:12
---
题目描述:

> A peak element is an element that is greater than its neighbors.
>
> Given an input array where `num[i] ≠ num[i+1]`, find a peak element and return its index.
>
> The array may contain multiple peaks, in that case return the index to any one of the peaks is fine.
>
> You may imagine that `num[-1] = num[n] = -∞`.
>
> For example, in array `[1, 2, 3, 1]`, 3 is a peak element and your function should return the index number 2.
>
> **Note:**Your solution should be in logarithmic complexity.

二分搜索，每次比较找到的nums[mid]与邻居的大小来决定向哪边搜索,注意对于边界的处理,下标不能越界.

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        if(nums.size() == 1) return 0;
        if(nums.size() == 2) return nums[0] > nums[1] ? 0 : 1;
        int start = 0, end = nums.size(), mid, len = nums.size();
        while(start < end){
            mid = (start + end) / 2;
            if(mid == 0) return nums[0] > nums[1] ? 0 : 1;
            if(mid == nums.size() - 1) return nums[len - 2] > nums[len - 1] ? len - 2 : len - 1;
            if(nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]){
                return mid;
            }else if(nums[mid] > nums[mid - 1] && nums[mid + 1] > nums[mid]){
                start = mid + 1;
            }else{
                end = mid;
            }
        }
        return start;
    }
};
```

