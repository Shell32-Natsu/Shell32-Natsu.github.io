---
title: LeetCode 13. Roman to Integer
url: 376.html
id: 376
categories:
  - LeetCode
date: 2016-07-12 18:06:53
tags:
---
题目描述:

> Given a roman numeral, convert it to an integer.
> 
> Input is guaranteed to be within the range from 1 to 3999.

与第12题相反, 同样是简单模拟:

    class Solution {
    public:
        int romanToInt(string s) {
            int ret = 0;

            int last_weight = -1;
            for(int i = s.length() - 1; i >= 0; i--){
                int w = symbolToVal(s[i]);
                if(w < last_weight)
                    ret -= w;
                else{
                    last_weight = w;
                    ret += w;
                }
            }

            return ret;
        }
        
        int symbolToVal(char s){
            switch(s){
                case 'I':
                    return 1;
                case 'V':
                    return 5;
                case 'X':
                    return 10;
                case 'L':
                    return 50;
                case 'C':
                    return 100;
                case 'D':
                    return 500;
                case 'M':
                    return 1000;
                default:
                    return -1;
            }
        }
    };