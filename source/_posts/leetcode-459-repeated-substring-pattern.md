---
title: LeetCode 459. Repeated Substring Pattern
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 960.html
id: 960
categories:
  - LeetCode
date: 2016-11-16 19:08:27
---
题目描述:

> Given a non-empty string check if it can be constructed by taking a substring of it and appending multiple copies of the substring together. You may assume the given string consists of lowercase English letters only and its length will not exceed 10000.
>
> **Example 1:**
>
> ```
> Input: "abab"
>
> Output: True
>
> Explanation: It's the substring "ab" twice.
>
> ```
>
> **Example 2:**
>
> ```
> Input: "aba"
>
> Output: False
>
> ```
>
> **Example 3:**
>
> ```
> Input: "abcabcabcabc"
>
> Output: True
>
> Explanation: It's the substring "abc" four times. (And the substring "abcabc" twice.)
> ```

这道题用最简单的遍历+回溯就可以AC

```cpp
class Solution {
public:
    bool repeatedSubstringPattern(string str) {
        for(int i = 1; i <= str.length() / 2; i++){
            string sub = str.substr(0, i);
            if(check(str, sub)) return true;
        }
        return false;
    }
    
    bool check(string &str, string &sub){
        if(str.length() % sub.length() != 0) return false;
        for(int i = 0; i < str.length(); i += sub.length()){
            if(!strEqual(str, i, sub)) return false;
        }
        return true;
    }
    
    bool strEqual(string &str, int start, string &sub){
        for(int i = 0; i < sub.length(); i++){
            if(sub[i] != str[start + i]) return false;
        }
        return true;
    }
};
```

Runtime 92ms, 不是好解法, 看Discussion有许多人用KMP, 但是我不太懂KMP(加入学习列表), 而且感觉有点大材小. 所以选择了另一种办法: 主要思路就是把字符串循环左移(右移), 当正好移出了要找的子串的时候, 这个字符串应该是跟原字符串相等的. 我们可以只考虑移动字符串长度因子的长度, 因为其他长度都是不可能相等的. 这个解法的Runtime是29ms.

```cpp
class Solution {
public:
    bool repeatedSubstringPattern(string str) {
        string nextStr = str;
        int len = str.length();
        if(len < 1) return false;
        for(int i = 1; i <= len / 2; i++){
            if(len % i == 0){
                nextStr = leftShift(str, i);
                if(nextStr == str) return true;
            }
        }
        return false;
    }
    
    string leftShift(string &str, int l){
        string ret = str.substr(l);
        ret += str.substr(0, l);
        return ret;
    }
};
```

