---
title: LeetCode 44. Wildcard Matching
tags:
  - CPP
  - LeetCode
  - 回溯
  - 字符串
  - 算法
url: 507.html
id: 507
categories:
  - LeetCode
date: 2016-07-29 18:51:07
---
题目描述:

> Implement wildcard pattern matching with support for '?' and '*'.
> 
>     '?' Matches any single character.
>     '*' Matches any sequence of characters (including the empty sequence).
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
>     isMatch("aa", "*") → true
>     isMatch("aa", "a*") → true
>     isMatch("ab", "?*") → true
>     isMatch("aab", "c*a*b") → false

与[LeetCode 10. Regular Expression Matching](http://xiadong.info/2016/07/leetcode-10-regular-expression-matching/)这道题看起来十分相似, 但是使用相同的方法的话会超时. 然后我参考了这篇文章: <http://yucoding.blogspot.jp/2013/02/leetcode-question-123-wildcard-matching.html>. 主要思路如下:

 * 用两个指针i,j或下标分别指向字符串s和p的开头
 * `s[i] == p[j]`或`p[j] == '?'`, 字符匹配, i和j都加1
 * `p[j] == '*'`, 也匹配, 记录下该`*`出现的位置`lastStar`和此时匹配的s中的位置`lastPosAfterStarMatch`, 这种情况下先认为`*`符号匹配空串, 所以只有j++
 * 剩下的情况就是不匹配, 先看p串之前有没有位置`lastStar`, 如果有, 就将该位置的`*`所匹配的串长度加1(初始为0), 也就是把i变为`++lastPosAfterStarMatch`, j变为`lastStar + 1`
 * 如果之前没有`*`, 那么就返回不匹配
 * 整个循环要处理完s, 然后查看p中剩下的字符是不是都是`*`, 如果是就返回true

这个方法实际是回溯法, 只不过只回溯到上一个`*`而不再往前回溯.

代码:

    class Solution {
    public:
        bool isMatch(string s, string p) {
            int i = 0, j = 0, lastStar = -1, lastPosAfterStarMatch = -1;
            while(i < s.size()){
                if(j < p.size() && (s[i] == p[j] || p[j] == '?')){
                    i++;j++;
                }
                else if(j < p.size() && p[j] == '*'){
                    lastStar = j++;
                    lastPosAfterStarMatch = i;
                }
                else if(lastStar != -1){
                    i = ++lastPosAfterStarMatch;
                    j = lastStar + 1;
                }
                else return false;
            }
            for(; j < p.size(); j++){
                if(p[j] != '*') return false;
            }
            return true;
        }
    };