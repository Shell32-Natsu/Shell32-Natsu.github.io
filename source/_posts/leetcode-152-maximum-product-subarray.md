---
title: LeetCode 152. Maximum Product Subarray
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 867.html
id: 867
categories:
  - LeetCode
date: 2016-10-10 16:14:54
---
题目描述:

> Find the contiguous subarray within an array (containing at least one number) which has the largest product.
>
> For example, given the array `[2,3,-2,4]`,
> the contiguous subarray `[2,3]` has the largest product = `6`.

DP问题, 主要问题在于数组中可能会出现负数, 所以要在维护最大值的同时维护一个最小值, 因为如果一个元素为负, 那么最小值也有可能变为最大值.

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int maxPrevP = nums[0], minPrevP = nums[0], maxP = nums[0];
        for(int i = 1; i < nums.size(); i++){
            int maxCurP = max(maxPrevP * nums[i], max(nums[i], minPrevP * nums[i]));
            int minCurP = min(maxPrevP * nums[i], min(nums[i], minPrevP * nums[i]));
            if(maxP < maxCurP) maxP = maxCurP;
            maxPrevP = maxCurP, minPrevP = minCurP;
        }
        return maxP;
    }
};
```

