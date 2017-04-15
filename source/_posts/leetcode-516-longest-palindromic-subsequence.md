---
title: LeetCode 516. Longest Palindromic Subsequence
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 1167.html
id: 1167
categories:
  - LeetCode
date: 2017-03-14 18:00:49
---
题目描述：

> Given a string s, find the longest palindromic subsequence's length in s. You may assume that the maximum length of s is 1000.
>
> **Example 1:**
> Input:
>
> ```
> "bbbab"
>
> ```
>
> Output:
>
> ```
> 4
>
> ```
>
> One possible longest palindromic subsequence is "bbbb".
>
> **Example 2:**
> Input:
>
> ```
> "cbbd"
>
> ```
>
> Output:
>
> ```
> 2
>
> ```
>
> One possible longest palindromic subsequence is "bb".

二维DP。`dp[i][j]`表示`s[i]`到`s[j]`（含两端）的字符串中最长的回文子串。状态转移方程如下：

1. `i==j`，`dp[i][j]=1`
2. `s[i]==s[j-1]`，`dp[i][j]=2`
3. `s[i]==s[j]`， `dp[i][j]=dp[i+1][j-1]+2`
4. `s[i]!=s[j]`，`dp[i][j]=max(dp[i+1][j], dp[i][j-1])`

```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        vector<vector<int>> dp(s.length(), vector<int>(s.length(), 0));
        if (s.empty()) return 0;
        int maxLen = 1;
        for (int i = 0; i < s.length(); i++) {
            dp[i][i] = 1;
        }
        for (int i = s.length() - 1; i >= 0; i--) {
            for (int j = i + 1; j < s.length(); j++) {
                if (s[i] == s[j]) {
                    if (i + 1 == j) dp[i][j] = 2;
                    else dp[i][j] = dp[i + 1][j - 1] + 2;
                }
                else {
                    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[0][s.length() - 1];
    }
};
```

