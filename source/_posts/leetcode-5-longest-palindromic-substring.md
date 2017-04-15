---
title: LeetCode 5. Longest Palindromic Substring
url: 341.html
id: 341
categories:
  - LeetCode
date: 2016-07-09 18:01:27
tags:
---
题目描述:

> Given a string S, find the longest palindromic substring in S. You may assume that the maximum length of S is 1000, and there exists one unique longest palindromic substring.

要求找出一个字符串中出现的最长的回文子串. 我自己没有想出什么特别好的办法, 只能用比较暴力的手段来通过. 主要思想就是遍历每一个字符, 对这个字符向两边延伸, 直到不符合回文的定义, 记录下最大值.

代码:

    class Solution {
    public:
        string longestPalindrome(string s) {
            int len = s.length(), longestLen = 0, longestBegin;
            for(int i = 0; i < len; i++){
                bool oddInvalidFlag = false, evenInvalidFlag = false;
                for(int j = 0; i - j >= 0 && i + j + 1 < len; j++){
                    if(s[i - j] != s[i + j]) oddInvalidFlag = true;
                    if(s[i - j] != s[i + j + 1]) evenInvalidFlag = true;
                    if(oddInvalidFlag && evenInvalidFlag)
                        break;
                    if(!oddInvalidFlag && s[i - j] == s[i + j] && (j << 1) + 1 > longestLen){
                        longestLen = (j << 1) + 1;
                        longestBegin = i - j;
                    }
                    if(!evenInvalidFlag && s[i - j] == s[i + j + 1] && (j << 1) + 2 > longestLen){
                        longestLen = (j << 1) + 2;
                        longestBegin = i - j;
                    }
                }
                int j = len - i - 1;
                if(!oddInvalidFlag && i >= j && s[i - j] == s[i + j] && (j << 1) + 1 > longestLen){
                    longestLen = (j << 1) + 1;
                    longestBegin = i - j;
                }
                
            }
            
            return s.substr(longestBegin, longestLen);
        }
    };

以上代码对每一个字符使用了一个循环, 运行时间120ms左右. 但是如果把子串长度为奇数和偶数分开来的话, 速度反而会变快, 我想应该是特定测试数据使总得指令数变少了.

另一个版本:

    class Solution {
    public:
        string longestPalindrome(string s) {
            int len = s.length(), longestLen = 0, longestBegin;
            for(int i = 0; i < len; i++){
                for(int j = 0; i - j >= 0 && i + j < len; j++){
                    if(s[i - j] != s[i + j])
                        break;
                    if((j << 1) + 1 > longestLen){
                        longestLen = (j << 1) + 1;
                        longestBegin = i - j;
                    }
                }
                
                for(int j = 0; i - j >= 0 && i + j + 1 < len; j++){
                    if(s[i - j] != s[i + j + 1])
                        break;
                    if((j << 1) + 2 > longestLen){
                        longestLen = (j << 1) + 2;
                        longestBegin = i - j;
                    }
                }
            }
            
            return s.substr(longestBegin, longestLen);
        }
    };

**一个优化小Trick**

在最外层循环中将循环条件`i < len`变为`i < len - longestLen / 2`, Runtime可缩短近半.

**更优解**

根据这个帖子的方法<https://discuss.leetcode.com/topic/49578/directly-reaching-the-best-solution-4ms-in-c-quite-simple>, 运行时间成功缩短到4ms.

    class Solution {
    public:
        string longestPalindrome(string s) {
            int len = s.length(), longestLen = 0, longestBegin = 0;
            int i = 0;
            while(i < len - longestLen / 2){
                int r = i, l = i;
                for(; r < len - 1 && s[r] == s[r + 1]; r++);
                i = r + 1;
                for(; l >= 0 && r < len && s[l] == s[r]; l--, r++);
                int curLen = r - l - 1;
                if(curLen > longestLen) longestLen = curLen, longestBegin = l + 1;
            }
            
            return s.substr(longestBegin, longestLen);
        }
    };

说明: 判断回文子串的方法不变, 都是向两边延伸, 关键在于回文串中心的选择, `for(; r < len - 1 && s[r] == s[r + 1]; r++);`跳过了连续相同的字符, 这是因为连续的相同字符必然是回文串, 可以直接从这样的回文串开始向两边延伸.