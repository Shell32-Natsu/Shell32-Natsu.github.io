---
title: LeetCode 87. Scramble String
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
  - 递归
url: 642.html
id: 642
categories:
  - LeetCode
date: 2016-08-18 19:11:47
---
题目描述:

> Given a string *s1*, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively.
>
> Below is one possible representation of *s1* = `"great"`:
>
> ```
>     great
>    /    \
>   gr    eat
>  / \    /  \
> g   r  e   at
>            / \
>           a   t
>
> ```
>
> To scramble the string, we may choose any non-leaf node and swap its two children.
>
> For example, if we choose the node `"gr"` and swap its two children, it produces a scrambled string `"rgeat"`.
>
> ```
>     rgeat
>    /    \
>   rg    eat
>  / \    /  \
> r   g  e   at
>            / \
>           a   t
>
> ```
>
> We say that `"rgeat"` is a scrambled string of `"great"`.
>
> Similarly, if we continue to swap the children of nodes `"eat"` and `"at"`, it produces a scrambled string `"rgtae"`.
>
> ```
>     rgtae
>    /    \
>   rg    tae
>  / \    /  \
> r   g  ta  e
>        / \
>       t   a
>
> ```
>
> We say that `"rgtae"` is a scrambled string of `"great"`.
>
> Given two strings *s1* and *s2* of the same length, determine if *s2* is a scrambled string of *s1*.

看完这道题, 首先想到的是使用递归, 但是思维惯性让我觉得递归可能超时, 所以按照tag中的动态规划方法来做, 我是使用了三维数组来进行动态规划, 有四重循环, 所以可能还有优化空间. `dp[i][j][k]`表示s1[i]和s2[j]开始的长度为k的子串是不是scramble的, 最后要返回的结果是`dp[0][0][s1.length()]`, 所以i和j要从大到小遍历.

```cpp
class Solution {
public:
    bool isScramble(string s1, string s2) {
        if(s1.length() != s2.length()) return false;
        int len = s1.length();
        vector<vector<vector<int>>> dp(len, vector<vector<int>>(len, vector<int>(len + 1, 0)));
        
        for(int i = 0; i < len; i++){
            for(int j = 0; j < len; j++){
                if(s1[i] == s2[j]){
                    dp[i][j][1] = 1;
                }
            }
        }
        
        for(int i = len - 1; i >= 0; i--){
            for(int j = len - 1; j >= 0; j--){
                for(int k = 2; i + k <= len && j + k <= len; k++){
                    for(int r = 1; r < k && !dp[i][j][k]; r++){
                        dp[i][j][k] = (dp[i][j][r] && dp[i + r][j + r][k - r]) || (dp[i][j + k - r][r] && dp[i + r][j][k - r]);
                    }
                }
            }
        }

        return dp[0][0][len];
    }
};
```

但是这个方法速度并不是很理想, 比较快的方法反而是递归+剪枝, 在递归前先判断字符串中字母数量是不是相同, 如果不相同则可以直接返回false.

```cpp
class Solution {
public:
    bool isScramble(string s1, string s2) {
        if(s1.length() != s2.length()) return false;
        return isScrambleImpl(s1, s2, 0, 0, s1.length());
    }
    
    bool isScrambleImpl(string &s1, string &s2, int start1, int start2, int len){
        vector<int> charTimes(26, 0);
        for(int i = start1; i < start1 + len; i++){
            charTimes[s1[i] - 'a']++;
        }
        int flag  = true;
        for(int i = start2; i < start2 + len; i++){
            charTimes[s2[i] - 'a']--;
            if(charTimes[s2[i] - 'a'] < 0){
                flag = false;
                break;
            }
        }
        if(!flag) return false;
        if(len == 1 && len == 1) return true; // 只有一个字母并且相同
        for(int i = 1; i < len; i++){
            if((isScrambleImpl(s1, s2, start1, start2, i) && isScrambleImpl(s1, s2, start1 + i, start2 + i, len - i))
                || (isScrambleImpl(s1, s2, start1, start2 + len - i, i) && isScrambleImpl(s1, s2, start1 + i, start2, len - i))){
                    return true;
                }
        }
        return false;
    }
};
```

