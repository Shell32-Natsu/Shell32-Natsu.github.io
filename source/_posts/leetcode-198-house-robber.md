---
title: LeetCode 198. House Robber
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 981.html
id: 981
categories:
  - LeetCode
date: 2016-11-20 17:35:46
---
题目描述

> You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.
>
> Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight **without alerting the police**.

简单的动态规划问题. 相邻的房子不能同时入侵, 所以如果前一个房子入侵过了, 当前的房子就不能入侵. 

`dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])`

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        if(nums.size() == 0)
            return 0;
        if(nums.size() == 1)
            return nums[0];
        int dp[nums.size()];
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);
        for(int i = 2; i < nums.size(); i++){
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[nums.size() - 1];
    }
};
```

