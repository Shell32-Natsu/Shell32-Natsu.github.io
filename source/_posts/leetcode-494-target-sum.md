---
title: LeetCode 494. Target Sum
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 搜索
  - 算法
url: 1119.html
id: 1119
categories:
  - CPP
date: 2017-02-03 18:36:29
---
题目描述：

> You are given a list of non-negative integers, a1, a2, ..., an, and a target, S. Now you have 2 symbols `+` and `-`. For each integer, you should choose one from `+` and `-` as its new symbol.
>
> Find out how many ways to assign symbols to make sum of integers equal to target S.
>
> **Example 1:**
>
> ```
> Input: nums is [1, 1, 1, 1, 1], S is 3. 
> Output: 5
> Explanation: 
>
> -1+1+1+1+1 = 3
> +1-1+1+1+1 = 3
> +1+1-1+1+1 = 3
> +1+1+1-1+1 = 3
> +1+1+1+1-1 = 3
>
> There are 5 ways to assign symbols to make the sum of nums be target 3.
>
> ```
>
> **Note:**
>
> 1. The length of the given array is positive and will not exceed 20.
> 2. The sum of elements in the given array will not exceed 1000.
> 3. Your output answer is guaranteed to be fitted in a 32-bit integer.

暴力的DFS可以AC，但是Runtime不理想.

```cpp
class Solution {
    int ans = 0;
public:
    int findTargetSumWays(vector<int>& nums, int S) {
        DFS(nums, 0, 0, S);
        return ans;
    }
    
    void DFS(vector<int>& nums, int i, int path, int S) {
        if (i == nums.size() - 1) {
            if (path + nums[i] == S) ans++;
            if (path - nums[i] == S) ans++;
            return ;
        }
        DFS(nums, i + 1, path + nums[i], S);
        DFS(nums, i + 1, path - nums[i], S);
    }
};
```

使用DP是比较好的选择。`dp[i][j]`表示前`i+1`个元素中和为`j`的情况数，由于和可能为负，所以为了确保下标非负，所有的`j`减去所有元素的和`sum`后才是真正的和。

要注意在初始化时，第一个元素如果为0，那么和0所对应的下标`sum`应该初始化为2而不是1。

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int S) {
        int sum = 0;
        for (auto i : nums) sum += i;
        
        int dp[nums.size()][sum * 2 + 1];
        memset(dp, 0, sizeof(dp));
        if (S > sum || S < -sum) return 0;
        dp[0][nums[0] + sum]++;
        dp[0][-nums[0] + sum]++;
        for (int i = 1; i < nums.size(); i++) {
            for (int j = 0; j <= sum * 2; j++) {
                if (dp[i - 1][j]) {
                    int index = j + nums[i];
                    if (index >= 0 && index <= sum * 2) dp[i][index] += dp[i - 1][j];
                    index = j - nums[i];
                    if (index >= 0 && index <= sum * 2) dp[i][index] += dp[i - 1][j];
                }
            }
        }
        return dp[nums.size() - 1][S + sum];
    }
};
```

