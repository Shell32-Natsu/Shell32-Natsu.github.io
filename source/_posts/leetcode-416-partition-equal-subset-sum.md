---
title: LeetCode 416. Partition Equal Subset Sum
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 861.html
id: 861
categories:
  - LeetCode
date: 2016-10-09 18:27:26
---
题目描述:

> Given a **non-empty** array containing **only positive integers**, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.
>
> **Note:**
> Both the array size and each of the array element will not exceed 100.
>
> **Example 1:**
>
> ```
> Input: [1, 5, 11, 5]
>
> Output: true
>
> Explanation: The array can be partitioned as [1, 5, 5] and [11].
>
> ```
>
> **Example 2:**
>
> ```
> Input: [1, 2, 3, 5]
>
> Output: false
>
> Explanation: The array cannot be partitioned into equal sum subsets.
> ```

动态规划问题, 比较容易看出如果用`dp[i][j]`表示前i+1个数字能否找出和为j的子集的话, `dp[i][j]=dp[i-1][j] || dp[i-1][j-nums[i]]`. 但是用二维数组来进行dp的话, 数组的列数是不知道的, 我一开始用hash表来存储行, 但是运行速度很慢, 后来注意到总的元素数目最多只有100个, 每个最多只有100, 而我们要找的目标是和的一半, 也就是最多5000, 完全可以把数组的列数设置为和的一半, 然后从下往上dp.

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for(int i = 0; i < nums.size(); i++){
            sum += nums[i];
        }
        if(sum % 2) return false;
        
        sum /= 2;
        vector<int> dp(sum + 1), tmpDp(sum + 1);
        dp[0] = 1;
        dp[nums[0]] = 1;
        
        for(int i = 1; i < nums.size(); i++){
            tmpDp = dp;
            for(int j = 0; j < dp.size(); j++){
                if(tmpDp[j] == 0) continue;
                int t = j + nums[i];
                if(t == sum) return true;
                if(t < sum) dp[t] = 1;
            }
        }
        return false;
    }
};
```

