---
title: LeetCode 12. Integer to Roman
url: 374.html
id: 374
categories:
  - LeetCode
date: 2016-07-12 17:52:55
tags:
---
﻿题目要求:

> Given an integer, convert it to a roman numeral.
> 
> Input is guaranteed to be within the range from 1 to 3999.

关于罗马数字的表示方法参考这里<https://www.wikiwand.com/en/Roman_numerals>

<table>
    <tr><th>Symbol</th><th>Value</th></tr>
    <tr><td>I</td><td>1</td></tr>
    <tr><td>V</td><td>5</td></tr>
    <tr><td>X</td><td>10</td></tr>
    <tr><td>L</td><td>50</td></tr>
    <tr><td>C</td><td>100</td></tr>
    <tr><td>D</td><td>500</td></tr>
    <tr><td>M</td><td>1000</td></tr>
</table>

同时有以下三条规则:

+ I placed before V or X indicates one less, so four is IV (one less than five) and nine is IX (one less than ten)
+ X placed before L or C indicates ten less, so forty is XL (ten less than fifty) and ninety is XC (ten less than a hundred)
+ C placed before D or M indicates a hundred less, so four hundred is CD (a hundred less than five hundred) and nine hundred is CM (a hundred less than a thousand)


整数转化为罗马数字，简单模拟。

    class Solution {
    public:
        string intToRoman(int num) {
            int numArr[4] = {0};
            int numArrIndex = 3;
            while(num > 0){
                numArr[numArrIndex--] = num % 10;
                num /= 10;
            }
            string ret;

            for(int i = 3, offset = 1; i >= 0; i--, offset *= 10){
                if(numArr[i] == 0) continue;
                else if(numArr[i] < 4){
                    for(int j = 0; j < numArr[i]; j++) ret.push_back(valToSymbol(1 * offset));
                }
                else if(numArr[i] == 4){
                    ret.push_back(valToSymbol(5 * offset));
                    ret.push_back(valToSymbol(1 * offset));
                }
                else if(numArr[i] < 9){
                    for(int j = 5; j < numArr[i]; j++) ret.push_back(valToSymbol(1 * offset));
                    ret.push_back(valToSymbol(5 * offset));
                }
                else{
                    ret.push_back(valToSymbol(10 * offset));
                    ret.push_back(valToSymbol(1 * offset));
                }
            }
            reverse(ret.begin(), ret.end());
            return ret;
        }
        
        char valToSymbol(int val){
            switch(val){
                case 1:
                    return 'I';
                case 5:
                    return 'V';
                case 10:
                    return 'X';
                case 50:
                    return 'L';
                case 100:
                    return 'C';
                case 500:
                    return 'D';
                case 1000:
                    return 'M';
                default:
                    return 0;
            }
        }
    };

Runtime: 28ms