---
title: LeetCode 740. Delete and Earn
date: 2017-12-29 21:56:51
tags:
 - LeetCode
 - CPP
 - 算法
 - 动态规划
 - 哈希表
categories:
 - LeetCode
---

Given an array `nums` of integers, you can perform operations on the array.

In each operation, you pick any `nums[i]` and delete it to earn `nums[i]` points. After, you must delete **every** element equal to `nums[i] - 1` or `nums[i] + 1`.

You start with 0 points. Return the maximum number of points you can earn by applying such operations.

**Example 1:**

```
Input: nums = [3, 4, 2]
Output: 6
Explanation: 
Delete 4 to earn 4 points, consequently 3 is also deleted.
Then, delete 2 to earn 2 points. 6 total points are earned.
```

**Example 2:**

```
Input: nums = [2, 2, 3, 3, 3, 4]
Output: 9
Explanation: 
Delete 3 to earn 3 points, deleting both 2's and the 4.
Then, delete 3 again to earn 3 points, and 3 again to earn 3 points.
9 total points are earned.
```

**Note:**

The length of `nums` is at most `20000`.

Each element `nums[i]` is an integer in the range `[1, 10000]`.

<!-- more -->

动态规划问题，对于`nums`中出现的最大的数`n`来说，有两种可能：

1. 能挣到点数，那么最大的分数就是`n×n出现的次数`+`最大值为n-2时的分数`
2. 不能挣到点数，那么最大值就是最大值为`n-1`的分数

因为`nums`的元素取值范围为`[1,10000]`所以可以用哈希表来保存每个数字出现了多少次。

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        vector<int> flag(10001, 0);
        for (int i = 0; i < nums.size(); i++) {
            flag[nums[i]]++;
        }

        vector<int> dp(10001, 0);
        dp[1] = flag[1];
        dp[2] = max(flag[2] * 2, dp[1]);
        for (int i = 3; i < dp.size(); i++) {
            dp[i] = max(dp[i - 1], dp[i - 2] + flag[i] * i);
        }
        return dp.back();
    }
};
```



