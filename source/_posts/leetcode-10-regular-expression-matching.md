---
title: LeetCode 10. Regular Expression Matching
url: 357.html
id: 357
categories:
  - LeetCode
date: 2016-07-10 20:37:24
tags:
---
正则表达式匹配, 题目描述:

> Implement regular expression matching with support for '.' and '*'.
>
>     '.' Matches any single character.
>     '*' Matches zero or more of the preceding element.
> 
>     The matching should cover the entire input string (not partial).
> 
>     The function prototype should be:
>     bool isMatch(const char *s, const char *p)
> 
>     Some examples:
>     isMatch("aa","a") → false
>     isMatch("aa","aa") → true
>     isMatch("aaa","aa") → false
>     isMatch("aa", "a*") → true
>     isMatch("aa", ".*") → true
>     isMatch("ab", ".*") → true
>     isMatch("aab", "c*a*b") → true

这个题目我是用动态规划AC的, 主要思路是这样的: 数组`dp[i][j]`表示s的前i个字符(下标从0到i - 1)和p的前j个字符(下标从0到j - 1)是否匹配(p经过处理, 表示重复任意次的`*`单独保存在另一个数组里). 因此我们的随后结果就是要得到`dp[s.size()][p.size()]`. 而`dp[i][j]`的值为真有以下三种可能:

1. dp[i - 1][j]为真且s[i - 1]这个字符加与不加不影响匹配成立与否. 这要求p[j - 1]这个字符是被*标记的, 并且字符s[i - 1]与p[j - 1]可以匹配, 即s[i - 1] == p[j- 1]或p[j - 1] == '.'.
2. dp[i][j - 1]为真且p[j - 1]这个字符加与不加不影响匹配成立与否. 这要求p[j - 1]这个字符是被*标记的.
3. dp[i - 1][j - 1]为真并且s[i - 1]与p[j - 1]可以匹配, 即s[i - 1] == p[j- 1]或p[j - 1] == '.'.

可以得到`dp[i][j] = (dp[i - 1][j] && (s[i - 1] == p[j - 1] || p[j - 1] == '.') && star[j - 1]) || (dp[i][j - 1] && (star[j - 1])) || (dp[i - 1][j - 1] && (s[i - 1] == p[j - 1] || p[j - 1] == '.'))`, 其中star[i]表示p[i]是否被*标记.


    class Solution {
    public:
        bool isMatch(string s, string p) {
            string e;
            vector<bool> star;
            for(int i = 0; i < p.size(); i++){
                if(p[i] == '*') star.back() = true;
                else{
                    e.push_back(p[i]);
                    star.push_back(false);
                }
            }
            p = e;
            vector<vector<bool>> dp(s.size() + 1, vector<bool>(p.size() + 1, false));
            dp[0][0] = true;
            for(int i = 1; i <= p.size(); i++){
                dp[0][i] = dp[0][i - 1] && star[i - 1];
            }
            for(int i = 1; i <= s.size(); i++)
                for(int j = 1; j <= p.size(); j++){
                    dp[i][j] = (dp[i - 1][j] && (s[i - 1] == p[j - 1] || p[j - 1] == '.') && star[j - 1]) || (dp[i][j - 1] && (star[j - 1])) || (dp[i - 1][j - 1] && (s[i - 1] == p[j - 1] || p[j - 1] == '.'));
                }
            return dp[s.size()][p.size()];
        }
    };