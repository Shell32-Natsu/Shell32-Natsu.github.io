---
title: LeetCode 214. Shortest Palindrome
tags:
  - CPP
  - KMP
  - LeetCode
  - 字符串
  - 算法
url: 1110.html
id: 1110
categories:
  - LeetCode
date: 2017-01-21 18:59:57
---
题目描述：

> Given a string S, you are allowed to convert it to a palindrome by adding characters in front of it. Find and return the shortest palindrome you can find by performing this transformation.
>
> For example:
>
> Given `"aacecaaa"`, return `"aaacecaaa"`.
>
> Given `"abcd"`, return `"dcbabcd"`.

这道题用直接的双重循环**可能**会超时，但是也不一定，比如我下面的代码就可以AC：

```cpp
class Solution {
public:
    string shortestPalindrome(string s) {
        if(s.empty()) return s;
        int max_r = INT_MIN;
        for (int i = s.length() / 2; i >= 0; i--) {
            if ((max_r = palindromeBeside(s, i)) != -1) {
                break;
            }
        }
        string t = s.substr(max_r);
        reverse(t.begin(), t.end());
        return t + s;
    }
    
    int palindromeBeside(string &s, int axis) {
        int l = axis, r = axis;
        for (; l >= 0 && r < s.length(); l--, r++) {
            if(s[l] != s[r]) 
                break;
        }
        if (l < 0) {
            return r;
        }
        l = axis - 1, r = axis;
        for (; l >= 0 && r < s.length(); l--, r++) {
            if(s[l] != s[r]) 
                break;
        }
        if (l < 0) {
            return r;
        }
        return -1;
    }
};
```

但是这肯定不是一道Hard题的解法。这道题的本质在于寻找一个字符串`S`的最长回文前缀子串`k`，回文串的一个特征就是翻转之后保持不变，如果我们把`S`整个翻转之后接到`S`的后面得到的是以`k`开头，以`k`结尾的字符串。可以使用KMP算法中计算字符串自我覆盖情况的算法来进行计算，这个算法有点DP的意思，但是理解起来还是有点困难的，具体介绍可以Google关键字KMP。

```cpp
class Solution {
public:
    string shortestPalindrome(string s) {
        if(s.empty()) return s;
        string ts = s;
        reverse(ts.begin(), ts.end());
        ts = s + "|" + ts;
        vector<int> v(ts.length(), 0);
        for (int i = 1; i < ts.length(); i++) {
            int index = i - 1;
            while (index >= 0 && ts[v[index]] != ts[i]) {
                index = v[index] - 1;
            }
            if (index >= 0) {
                v[i] = v[index] + 1;
            }
        }
        
        ts = s.substr(v.back());
        reverse(ts.begin(), ts.end());
        return ts + s;
    }
};
```

