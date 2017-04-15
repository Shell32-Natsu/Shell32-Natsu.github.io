---
title: LeetCode 115. Distinct Subsequences
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 727.html
id: 727
categories:
  - LeetCode
date: 2016-09-08 17:56:51
---
题目描述:

> Given a string **S** and a string **T**, count the number of distinct subsequences of **T** in **S**.
>
> A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, `"ACE"` is a subsequence of `"ABCDE"` while `"AEC"` is not).
>
> Here is an example:
> **S** = `"rabbbit"`, **T** = `"rabbit"`
>
> Return `3`.

这道题第一反应是动态规划, 使用`dp[i][j]`表示从`s[0]`到`s[i]`(含, 以下用`s[0:i]`表示)这个字符串中包含多少个`t[0:j]`字符串. 但是递推公式不太好想, 所以我先把例子中给出的`"rabbbit"`和`"rabbit"`的dp数组写出来:

```
  r a b b i t
r 1 0 0 0 0 0
a 1 1 0 0 0 0
b 1 1 1 0 0 0
b 1 1 2 1 0 0
b 1 1 3 3 0 0
i 1 1 3 3 3 0
t 1 1 3 3 3 3
```

通过观察这个数组我们可以发现, 递推公式可能为:

```cpp
dp[i][j] = (s[i] == t[j]) ? dp[i - 1][j - 1] + dp[i - 1][j] : dp[i - 1][j]
```

那么为什么会是这个公式呢? 首先, 如果`s[i]`与`t[j]`不相等, 那么说明没有增加新的子串, 所以`s[0:i]`中包含的`t[0:j]`数量与`s[0:i-1]`相同. 而如果`s[i] == t[j]`, 那么说明增加了新的子串, 就要在`s[0:i-1]`中包含`t[0:j]`的基础上加上`s[0:i-1]`中包含`t[0:j-1]`的数量.

```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        vector<vector<int>> dp(s.length(), vector<int>(t.length(), 0));
        if(s.empty() || t.empty()) return 0;
        if(s[0] == t[0]) dp[0][0] = 1;
        for(int i = 1; i < s.length(); i++){ //初始化第一列
            if(s[i] == t[0]) dp[i][0] = dp[i - 1][0] + 1;
            else dp[i][0] = dp[i - 1][0];
        }
        for(int j = 1; j < t.length(); j++){
            for(int i = j; i < s.length(); i++){ // s的长度一定大于等于t的长度
                if(s[i] == t[j]) dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
                else dp[i][j] = dp[i - 1][j];
            }
        }
        return dp[s.length() - 1][t.length() - 1];
    }
};
```

以上的代码的运行效率有问题, 大家都知道受到Cache命中的影响, 遍历二维数组时, 按行列比按列行的效率更高, 所以把行列代表的含义交换一下, 得到按行列遍历的数组. 同时进行一些剪枝和dp初始化的优化.

```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        // s的长度应该大于等于t长度
        if(s.empty() || t.empty() || s.length() < t.length()) return 0;
        int dp[t.length()][s.length()];
        memset(dp, 0, sizeof(dp));
        if(s[0] == t[0]) dp[0][0] = 1;
        // 记录t中是否有s中不存在的元素
        vector<int> chars(128, 0);
        chars[s[0]]++;
        for(int i = 1; i < s.length(); i++){
            if(s[i] == t[0]) dp[0][i] = dp[0][i - 1] + 1;
            else dp[0][i] = dp[0][i - 1];
            chars[s[i]]++;
        }
        for(int i = 0; i < t.length(); i++){
            // 如果t中含有s中不存在的元素则直接返回0
            if(--chars[t[i]] < 0) return 0;
        }
        
        for(int i = 1; i < t.length(); i++){
            for(int j = i; j < s.length(); j++){
                if(s[j] == t[i]) {
                    dp[i][j] = dp[i - 1][j - 1] + dp[i][j - 1];
                }
                else dp[i][j] = dp[i][j - 1];
            }
        }
        return dp[t.length() - 1][s.length() - 1];
    }
};
```

