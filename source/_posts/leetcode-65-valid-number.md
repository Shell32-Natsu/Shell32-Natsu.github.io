---
title: LeetCode 65. Valid Number
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 580.html
id: 580
categories:
  - LeetCode
date: 2016-08-06 20:44:34
---
题目描述:

>Validate if a given string is numeric.
>
>Some examples:
>
>`"0"` => `true`
>
>`" 0.1 "` => `true`
>
>`"abc"` => `false`
>
>`"1 a"` => `false`
>
>`"2e10"` => `true`
>
>Note: It is intended for the problem statement to be ambiguous. You should gather all requirements up front before implementing one.

判断一个输入字符串是否是数字, 这道题的要求并不是很明确, 一下子很难想的全面, 并且也不容易跟出题人想到一块去. 实际上主要有以下几点:

+ 字符串前后可以有空格, 但是数字中间不能出现空格
+ 允许出现的字符有`+`, `-`, `.`, `e`和阿拉伯数字
+ 数字可以以`.`开头或结尾
+ e后面的指数部分只能是整数


    class Solution {
    public:
        bool isNumber(string s) {
            delSpace(s);
            for(int i = 0; i < s.length(); i++){ // 检查除e, ., 和数字以外的字符
                if((s[i] < '0' || s[i] > '9')  && s[i] != 'e' && s[i] != '.' && s[i] != '-' && s[i] != '+') return false;
            }
            int eCnt = 0;
            for(int i = 0; i < s.length(); i++){ // 计算e的个数
                if(s[i] == 'e') eCnt++;
            }
            //printf("%d\n", eCnt);
            if(eCnt > 1) return false; // e多于1个则返回false
            if(eCnt == 1){
                // 如果有e出现, 前后都有不含e的数字
                int i;
                for(i = 0; s[i] != 'e'; i++);
                // e的前面可以是小数, 但是后面不可以
                if(!isNumberWithoutE(s.substr(0, i)) || !isNumberWithoutEAndDot(s.substr(i + 1, s.length() - i - 1))){
                    return false;
                }
                else return true;
            }
            else{
                // 如果没有e
                return isNumberWithoutE(s);
            }
        }
        
        bool isNumberWithoutE(string s){ // 判断是不是不包含e的数字
            if(s.empty()) return false;
            if(s.length() == 1 && (s[0] == '.' || s[0] == '-' || s[0] == '+')) return false; // 只有符号或小数点
            int dashPos = -1, dotCnt = 0, plusSignPos = -1;
            for(int i = 0; i < s.length(); i++){ // 查找是否有不位于开头的正负号
                if(s[i] == '-') dashPos = i;
                else if(s[i] == '+') plusSignPos = i;
            }
            if(dashPos > 0 || plusSignPos > 0) return false;
            if(s[0] == '+' || s[0] == '-'){ // 清除开头的正负号
                s.erase(s.begin(), s.begin() + 1);
            }
            if(s.length() == 1 && s[0] == '.') return false; // 如果去掉符号后只有小数点了, 那么不是数字
            for(int i = 0; i < s.length(); i++){ // 计算小数点的数量
                if(s[i] == '.') dotCnt++;
            }
            if(dotCnt > 1) return false;
            else return true;
        }
        
        bool isNumberWithoutEAndDot(string s){ //判断是不是不包含e的整数
            if(s.empty()) return false;
            if(s.length() == 1 && (s[0] == '.' || s[0] == '-' || s[0] == '+')) return false;
            int dashPos = -1, plusSignPos = -1;
            for(int i = 0; i < s.length(); i++){ // 查找是否有不位于开头的正负号
                if(s[i] == '-') dashPos = i;
                else if(s[i] == '+') plusSignPos = i;
                else if(s[i] == '.') return false; // 如果有小数点则返回false
            }
            if(dashPos > 0 || plusSignPos > 0) return false;
            else return true;
        }
        
        void delSpace(string &s){ //删除前后空格
            int i;
            for(i = 0; i < s.size() && s[i] == ' '; i++);
            s.erase(s.begin(), s.begin() + i);
            for(i = 0; i < s.size() && s[s.size() - i - 1] == ' '; i++);
            s.erase(s.end() - i, s.end());
        }
    };