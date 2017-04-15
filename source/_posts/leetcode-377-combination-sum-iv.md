---
title: LeetCode 377. Combination Sum IV
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 排列组合
  - 算法
url: 509.html
id: 509
categories:
  - LeetCode
date: 2016-07-29 19:36:09
---
题目描述:

> Given an integer array with all positive numbers and no duplicates, find the number of possible combinations that add up to a positive integer target.
> 
> Example:
> 
>     nums = [1, 2, 3]
>     target = 4
>     
>     The possible combination ways are:
>     (1, 1, 1, 1)
>     (1, 1, 2)
>     (1, 2, 1)
>     (1, 3)
>     (2, 1, 1)
>     (2, 2)
>     (3, 1)
> 
>     Note that different sequences are counted as different combinations.
> 
>     Therefore the output is 7.
>
> Follow up:
> * What if negative numbers are allowed in the given array?
> * How does it change the problem?
> * What limitation we need to add to the question to allow negative numbers?

这是一道比较明显的动态规划题, 但是我一开始还是直接用了递归, 无悬念的超时.

和等于target的组合数量等于target减去nums中每一个元素后的所有新target的组合数量之和. 如果target与nums中某个值相等则再加1.

    class Solution {
    public:
        int combinationSum4(vector<int>& nums, int target) {
            vector<int> dp(target + 1);
            for(int i = 0; i <= target; i++){
                for(int j = 0; j < nums.size(); j++){
                    if(i == nums[j]) dp[i]++;
                    else if(i > nums[j]){
                        dp[i] += dp[i - nums[j]];
                    }
                }
            }
            return dp[target];
        }
    };

关于Follow up: 如果nums中出现了负数, 那么问题在于新的`target`值是通过`target - nums[i]`来得到的, 如果nums[i]为负, 那么新的`target`将会大于旧的`target`, 这会有两个问题

1. 动态规划只保存了小于旧`target`的值
2. 如果动态规划不以`target`为终点而继续到新的`target`值, 那么又会产生更大的`target`, `target`会无穷增长下去.

在题目中要求每个数只能选择一次就可以避免`target`的无限增长, 从而使求解成为可能.