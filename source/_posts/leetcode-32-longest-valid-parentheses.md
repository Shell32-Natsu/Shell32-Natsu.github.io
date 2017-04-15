---
title: LeetCode 32. Longest Valid Parentheses
tags:
  - CPP
  - LeetCode
  - 括号匹配
  - 栈
  - 算法
url: 475.html
id: 475
categories:
  - LeetCode
date: 2016-07-24 18:34:18
---
题目描述:

> Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.
> 
> For "(()", the longest valid parentheses substring is "()", which has length = 2.
> 
> Another example is ")()())", where the longest valid parentheses substring is "()()", which has length = 4.

求最长的合法括号的长度, 采用先求匹配, 再求长度的方法.

    class Solution {
    public:
        int longestValidParentheses(string s) {
            if(s.empty()) return 0;
            vector<int> pStack;
            vector<bool> pMatch(s.length(), false);
            int len = s.length();
            for(int i = 0; i < len; i++){
                if(s[i] == '('){
                    pStack.push_back(i);
                }
                else if(pStack.empty() || s[pStack.back()] == ')'){
                    pStack.push_back(i);
                }
                else{
                    pMatch[i] = pMatch[pStack.back()] = true;
                    pStack.pop_back();
                }
            }
            int maxLen = 0, curLen = 0;
            for(int i = 0; i < len; i++){
                if(pMatch[i]){
                    curLen++;
                    if(curLen > maxLen) maxLen = curLen;
                }
                else{
                    curLen = 0;
                }
            }
            return maxLen;
        }
    };