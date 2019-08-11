---
title: LeetCode 1155. Number of Dice Rolls With Target Sum
date: 2019-08-11 10:37:18
tags:
 - LeetCode
 - CPP
 - 动态规划
categories:
 - LeetCode
---

You have `d` dice, and each die has `f` faces numbered `1, 2, ..., f`.

Return the number of possible ways (out of `fd` total ways) **modulo 10^9 + 7** to roll the dice so the sum of the face up numbers equals `target`.

 

**Example 1:**

```
Input: d = 1, f = 6, target = 3
Output: 1
Explanation: 
You throw one die with 6 faces.  There is only one way to get a sum of 3.
```

**Example 2:**

```
Input: d = 2, f = 6, target = 7
Output: 6
Explanation: 
You throw two dice, each with 6 faces.  There are 6 ways to get a sum of 7:
1+6, 2+5, 3+4, 4+3, 5+2, 6+1.
```

**Example 3:**

```
Input: d = 2, f = 5, target = 10
Output: 1
Explanation: 
You throw two dice, each with 5 faces.  There is only one way to get a sum of 10: 5+5.
```

**Example 4:**

```
Input: d = 1, f = 2, target = 3
Output: 0
Explanation: 
You throw one die with 2 faces.  There is no way to get a sum of 3.
```

**Example 5:**

```
Input: d = 30, f = 30, target = 500
Output: 222616187
Explanation: 
The answer must be returned modulo 10^9 + 7.
```

 

**Constraints:**

- `1 <= d, f <= 30`
- `1 <= target <= 1000`

<!-- more -->

基本思路是使用动态规划，有`n`个骰子投出`m`点的可能数量为`sum(n-1个骰子投出m-1的数量, n-1个骰子投出m-2的数量,..., n-1个骰子投出m-f的数量)`。对于每一个`d`都要遍历一遍`f`个点，每一次遍历中要再遍历一次`d-1`时的`f`个点所以最佳时间复杂度应为`O(df^2)`，在我的实现中因为不知道`d-1`时的可能点数的起始位置所以实际遍历了所有`d*f`个可能，实际复杂度为`O(d^2f^2)`。

```cpp
class Solution {
    int MOD = pow(10, 9) + 7;
public:
    int numRollsToTarget(int d, int f, int target) {
        if (target > d * f)
            return 0;
        vector<int> dp1(d * f + 1, 0), dp2(d * f + 1, 0);
        for (int i = 1; i <= f; i++) {
            dp1[i] = 1;
        }

        for (int i = 2; i <= d; i++) {
            for (int j = 1; j < dp1.size(); j++) {
                if (dp1[j] == 0)
                    continue;
                for (int k = 1; k <= f; k++) {
                    dp2[k + j] += dp1[j] % MOD;
                    dp2[k + j] %= MOD;
                }
            }
            swap(dp1, dp2);
            dp2.assign(d * f + 1, 0);
        }

        return dp1[target];
    }
};
```

