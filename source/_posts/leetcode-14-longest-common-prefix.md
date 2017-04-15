---
title: LeetCode 14. Longest Common Prefix
url: 389.html
id: 389
categories:
  - LeetCode
date: 2016-07-13 18:17:10
tags:
---
题目描述:

> Write a function to find the longest common prefix string amongst an array of strings.

寻找一组字符串的最长公共前缀. 首先, 如果只有一个字符串, 那么它就是最长公共前缀, 如果有两个, 那么再跟第二个字符串逐个字符对比, 找出最长公共前缀. 再增加字符串则依次类推. 

在这个方法的基础上, 可以想到最长公共前缀一定不会比字符串数组中最短的字符串长, 因此可以先找到最短字符串, 以它为一开始的基准.

代码:

    class Solution {
    public:
        string longestCommonPrefix(vector<string>& strs) {
            if(strs.empty())
                return "";
            
            int shortestIndex = findShortest(strs);
            int prefixLen = strs[shortestIndex].length();
            int len = strs.size();
            
            for(int i = 0; i < len; i++){
                if(prefixLen == 0) return "";
                string s = strs[i];
                int l1 = prefixLen, l2 = s.length(), j;
                for(j = 0; j < l1 && j < l2; j++){
                    if(strs[0][j] != s[j])
                        break;
                }
                
                if(j != l1 && j != l2){
                    prefixLen = j;
                }
                else if(j == l2){
                    prefixLen = l2;
                }
            }
            
            return strs[shortestIndex].substr(0, prefixLen);
        }
        
        int findShortest(vector<string> &strs){
            int minLen = INT_MAX, index;
            for(int i = 0; i < strs.size(); i++){
                if(strs[i].length() < minLen){
                    minLen = strs[i].length();
                    index = i;
                }
            }
            return index;
        }
    };