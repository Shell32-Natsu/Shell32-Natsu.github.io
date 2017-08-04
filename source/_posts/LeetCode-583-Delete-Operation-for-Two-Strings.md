---
title: LeetCode 583. Delete Operation for Two Strings
date: 2017-08-04 18:02:00
tags:
 - LeetCode
 - CPP
 - 算法
 - 动态规划
 - 字符串
categories:
 - LeetCode
---

Given two words *word1* and *word2*, find the minimum number of steps required to make *word1* and *word2* the same, where in each step you can delete one character in either string.

**Example 1:**

```
Input: "sea", "eat"
Output: 2
Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".

```

**Note:**

1. The length of given words won't exceed 500.
2. Characters in given words can only be lower-case letters.

--------------

使用动态规划求出最长公共子串是很容易想到的方法。

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        if (word1.empty() || word2.empty()) return word1.length() + word2.length();
        vector<vector<int>> dp(word1.size(), vector<int>(word2.size(), 0));
        if (word1[0] == word2[0]) dp[0][0] = 1;
        for (int i = 1; i < word1.size(); i++) {
            if (word1[i] == word2[0]) dp[i][0] = 1;
            else dp[i][0] = dp[i - 1][0];
        }
        
        for (int i = 1; i < word2.size(); i++) {
            if (word1[0] == word2[i]) dp[0][i] = 1;
            else dp[0][i] = dp[0][i - 1];
        }
        
        for (int i = 1; i < word1.size(); i++) {
            for (int j = 1; j < word2.size(); j++) {
                if (word1[i] == word2[j]) dp[i][j] = dp[i - 1][j - 1] + 1;
                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        
        int len = dp.back().back();
        return word1.length() - len + word2.length() - len;
    }
};
```

但是也可以通过dp直接求解而不是找出最长公共子串的长度，思路基本相同，`dp[i][j]`表示`word1[0:i]`和`word2[0:j]`需要删除的次数，状态转移方程为

```
if (word1[i] == word2[j]) dp[i][j] = dp[i - 1][j - 1]
else dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + 1
```

如果`word1[i] == word2[j]`，那么不需要删除字符，删除操作次数不变；如果不相等，那么就要在原来的基础上再删除一个字符（word1或者word2的）。