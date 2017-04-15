---
title: LeetCode 154. Find Minimum in Rotated Sorted Array II
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 算法
url: 871.html
id: 871
categories:
  - LeetCode
date: 2016-10-11 16:37:29
---
题目描述:

> Suppose a sorted array is rotated at some pivot unknown to you beforehand.
>
> (i.e., `0 1 2 4 5 6 7` might become `4 5 6 7 0 1 2`).
>
> Find the minimum element.
>
> The array may contain duplicates.

与上一题类似, 但是有重复元素, 所以要用遍历的方法跳过这些元素.

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0, right = nums.size() - 1, mid = (right + left) / 2;
        while(left < right){
            if(nums[mid] > nums[right]) left = mid + 1;
            else if(nums[mid] == nums[right]) right--;
            else right = mid;
            mid = (right + left) / 2;
        }
        return nums[left];
    }
};
```

