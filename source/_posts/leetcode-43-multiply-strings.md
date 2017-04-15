---
title: LeetCode 43. Multiply Strings
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 504.html
id: 504
categories:
  - LeetCode
date: 2016-07-29 17:07:21
---
题目描述:

> Given two numbers represented as strings, return multiplication of the numbers as a string.
> 
> Note:
> + The numbers can be arbitrarily large and are non-negative.
> + Converting the input string to integer is NOT allowed.
> + You should NOT use internal library such as BigInteger.

输入两个用数组表示的非负数, 输出它们相乘的结果. 使用模拟手算的方法:

    class Solution {
    public:
        void multiplyWithOneDigit(string& num1, char num2, vector<string>& v){
            int jw = 0;
            string re;
            for(int i = num1.size() - 1; i >= 0; i--){
                int t = (num2) * (num1[i]) + jw;
                re.push_back((t % 10));
                jw = t / 10;
            }
            if(jw)
                re.push_back(jw);
            v.push_back(re);
        }
        void plusString(string& a, string& b){
            if(a.size() < b.size()){
                swap(a, b);
            }
            string re;
            int jw = 0;
            for(int i = 0; i < b.size(); i++){
                int t = a[i] + b[i] + jw;
                re.push_back((t % 10));
                jw = t / 10;
            }
            for(int i = b.size(); i < a.size(); i++){
                int t = a[i] + jw;
                re.push_back((t % 10));
                jw = t / 10;
            }
            if(jw)
                re.push_back(jw);
            a = re;
        }
        string plusAll(vector<string>& v){
            string re = {0};
            for(int i = 0; i < v.size(); i++){
                plusString(re, v[i]);
            }
            while(!re.empty() && re.back() == 0) re.pop_back();
            if(re.empty())
                re = {0};
            return re;
        }
        string multiply(string num1, string num2) {
            for(auto &i : num1) i -= '0';
            for(auto &i : num2) i -= '0';
            vector<string> v;
            if(num2.size() > num1.size()) swap(num1, num2);
            for(int i = num2.size() - 1; i >= 0; i--){
                multiplyWithOneDigit(num1, num2[i], v);
                v.back().insert(v.back().begin(), num2.size() - i - 1, 0);
            }
            string ret = plusAll(v);
            reverse(ret.begin(), ret.end());
            for(auto &i : ret) i += '0';
            return ret;
        }
    };