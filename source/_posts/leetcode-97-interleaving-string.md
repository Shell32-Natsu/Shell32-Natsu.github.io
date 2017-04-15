---
title: LeetCode 97. Interleaving String
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 字符串
  - 算法
url: 673.html
id: 673
categories:
  - LeetCode
date: 2016-08-24 19:44:12
---
题目描述:

> Given *s1*, *s2*, *s3*, find whether *s3* is formed by the interleaving of *s1* and *s2*.
>
> For example,
> Given:
> *s1* = `"aabcc"`,
> *s2* = `"dbbca"`,
>
> When *s3* = `"aadbbcbcac"`, return true.
> When *s3* = `"aadbbbaccc"`, return false.

使用动态规划, `dp[i][j]`代表s1的前i个字符与s2的前j个字符是否能组成s3的前i+j个字符. 

显然`dp[0][0]`能组成空字符串, 所以`dp[0][0]`为真. 而对于`i=0`和`j=0`的情况来说, 直接比较s1的前i个字符或s2的前j个字符与s3是否相同就可以了.

接下来的`dp[i][j]`分为两种情况:

1. `s3[i+j-1]`的字符与`s1[i-1]`相同, 代表`s3[i+j-1]`的字符可以从s1中取得. 此时`dp[i][j]`为真则要求`dp[i-1][j]`为真.
2. `s3[i+j-1]`的字符与`s2[j-1]`相同, 代表`s3[i+j-1]`的字符可以从s2中取得. 此时`dp[i][j]`为真则要求`dp[i][j-1]`为真.

递推方程为

```
dp[i][j] = (dp[i - 1][j] && s3[i + j - 1] == s1[i - 1]) || (dp[i][j - 1] && s3[i + j - 1] == s2[j - 1])
```

```cpp
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        if(s1.length() + s2.length() != s3.length()) return false;
        vector<vector<int>> dp(s1.size() + 1, vector<int>(s2.size() + 1, 0));
        dp[0][0] = 1;
        for(int i = 1; i <= s1.size(); i++){
            if(!dp[i - 1][0]) break;
            if(s1[i - 1] == s3[i - 1]) dp[i][0] = 1;
        }
        for(int i = 1; i <= s2.size(); i++){
            if(!dp[0][i - 1]) break;
            if(s2[i - 1] == s3[i - 1]) dp[0][i] = 1;
        }
        for(int i = 1; i <= s1.size(); i++){
            for(int j = 1; j <= s2.size(); j++){
                if((dp[i - 1][j] && s3[i + j - 1] == s1[i - 1]) || (dp[i][j - 1] && s3[i + j - 1] == s2[j - 1])) dp[i][j] = 1;
            }
        }
        return dp[s1.size()][s2.size()];
    }
};
```

