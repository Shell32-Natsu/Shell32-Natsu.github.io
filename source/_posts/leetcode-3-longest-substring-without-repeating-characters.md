---
title: LeetCode 3. Longest Substring Without Repeating Characters
url: 337.html
id: 337
categories:
  - LeetCode
date: 2016-07-08 18:56:07
tags:
---
题目:

>Given a string, find the length of the longest substring without repeating characters.

>Examples:

>Given "abcabcbb", the answer is "abc", which the length is 3.

>Given "bbbbb", the answer is "b", with the length of 1.

>Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

基本思路是遍历一遍字符串, 每访问到一个新字符时, 先检查有没有出现过(而一个字符有没有出现过用一个用字符的ASCII码作为索引的数组保存). 如果没有出现过(用-1表示)就记录下这个第一次出现的下标; 如果出现过, 就把子串的起始位置变为上次出现位置+1, 并把上次出现位置之前的字符设置为-1. 每次循环记录找到的最长长度.

代码:

    class Solution {
    public:
        int lengthOfLongestSubstring(string s) {
            int charHash[128];
            for(int i = 0; i < 128; i++)
                charHash[i] = -1;
                
            int p1 = 0, p2 = 0, maxLength = 0;
            for(; p2 < s.length(); p2++){
                if(charHash[s[p2]] == -1)
                    charHash[s[p2]] = p2;
                else{
                    int t = charHash[s[p2]] + 1;
                    for(; p1 < t; p1++)
                        charHash[s[p2]] = -1;
                    charHash[s[p2]] = p2;
                }
                
                if(p2 - p1 + 1> maxLength)
                    maxLength = p2 - p1 + 1;
            }
            
            return maxLength;
        }
    };