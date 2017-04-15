---
title: LeetCode 132. Palindrome Partitioning II
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 795.html
id: 795
categories:
  - LeetCode
date: 2016-09-24 20:07:21
---
题目描述:

> Given a string *s*, partition *s* such that every substring of the partition is a palindrome.
>
> Return the minimum cuts needed for a palindrome partitioning of *s*.
>
> For example, given *s* = `"aab"`,
> Return `1` since the palindrome partitioning `["aa","b"]` could be produced using 1 cut.

这道题可以用两次DP来解, 第一个二维数组`palindrome[i][j]`表示s从i到j的子串是不是回文串, 第二个数组`dp[i]`保存从0到i的子串有几种分割方法. 对于`dp[i]`来说, 它有几种分割方法取决于以`s[i]`为结尾的回文串有多少个. 由于使用普通的遍历比较方法来判断所有的回文串是一个三重循环, 而用DP+从中间向两边比较的方法可以用双重循环解决. 所以总的复杂度是O(n<sup>2</sup>).

```cpp
class Solution {
public:
    int minCut(string s) {
        int len = s.length();
        vector<int> dp(len + 1);
        vector<vector<int>> palindrome(len, vector<int>(len, 0));
        for(int i = 0; i < len - 1; i++){
            palindrome[i][i] = 1;
            if(s[i] == s[i + 1]) palindrome[i][i + 1] = 1;
        }
        palindrome[len - 1][len - 1] = 1;
        for(int l = 2; l < len; l++){
            for(int i = 0; i + l < len; i++){
                if(s[i] == s[i + l]) palindrome[i][i + l] = palindrome[i + 1][i + l - 1];
            }
        }
      
        dp[0] = dp[1] = 0;
        for(int i = 2; i <= len; i++){
            if(palindrome[0][i - 1]) dp[i] = 0;
            else{
                int minCut = INT_MAX;
                for(int j = i - 1; j > 0 && minCut > 1; j--){
                    if(palindrome[j][i - 1]){
                        minCut = min(minCut, dp[j] + 1);
                    }
                }
                dp[i] = minCut;
            }
        }
        return dp[len];
    }
};
```

其实可以把第二个循环的内容也放到第一个循环中去. 为了按行列的顺序来访问数组, 我把`palindrome[i][j]`的含义改为从j到i的字串是否为回文串.

```cpp
class Solution {
public:
    int minCut(string s) {
        int len = s.length();
        if(len < 2) return 0;
        vector<int> dp(len);
        vector<vector<int>> palindrome(len, vector<int>(len, 0));
        for(int i = 0; i < len - 1; i++){
            palindrome[i][i] = 1;
            if(s[i] == s[i + 1]) palindrome[i + 1][i] = 1;
        }
        palindrome[len - 1][len - 1] = 1;
        dp[0] = 0;
        dp[1] = palindrome[1][0] ? 0 : 1;
        for(int i = 2; i < len; i++){
            int minCut = dp[i - 1] + 1;
            if(palindrome[i][i - 1]){
                minCut = min(dp[i - 2] + 1, minCut);
            }
            for(int j = i - 2; j >= 0; j--){
                if(s[j] == s[i]) palindrome[i][j] = palindrome[i - 1][j + 1];
                if(j > 0 && palindrome[i][j]){
                    minCut = min(minCut, dp[j - 1] + 1);
                }
            }
            dp[i] = palindrome[i][0] ? 0 : minCut;
        }
        return dp[len - 1];
    }
};
```

