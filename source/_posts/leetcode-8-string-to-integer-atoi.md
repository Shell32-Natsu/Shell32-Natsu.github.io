---
title: LeetCode 8. String to Integer (atoi)
url: 350.html
id: 350
categories:
  - LeetCode
date: 2016-07-09 18:50:48
tags:
---
题目描述:

>Implement atoi to convert a string to an integer.
>
>Hint: Carefully consider all possible input cases. If you want a challenge, please do not see below and ask yourself what are the possible input cases.
>
>Notes: It is intended for this problem to be specified vaguely (ie, no given input specs). You are responsible to gather all the input requirements up front.

比较简单的题目, 因为要转换的是整数, 因此只需要考虑前导空格和符号.

代码:

    class Solution {
    public:
        bool isNumber(char a){
            return a >= '0' && a <= '9';
        }

        int myAtoi(string str) {
            int len = str.length(), p = 0;
            if(str[0] == ' '){
                for(int i = 0; str[i] == ' '; i++) p++;
            }
            if(!(isNumber(str[p]) || str[p] == '-' || str[p] == '+'))
                return 0;
                
            int sign = 1;
            if(str[p] == '-'){
                sign = -1;
            }
            
            if(str[p] == '-' || str[p] == '+')
                p++;
                
            long long re = 0;
            len = str.length();
            for(int i = p; i < len && isNumber(str[i]); i++){
                re *= 10;
                re += str[i] - '0';
                
                if(sign > 0 && re > INT_MAX)
                    return INT_MAX;
                if(sign < 0 && -re < INT_MIN)
                    return INT_MIN;
            }
            
            return sign * re;
        }
    };