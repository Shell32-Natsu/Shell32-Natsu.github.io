---
title: LeetCode 6. ZigZag Conversion
url: 345.html
id: 345
categories:
  - LeetCode
date: 2016-07-09 18:35:38
tags:
---
题目描述:

> The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
> 
>     P   A   H   N
>     A P L S I I G
>     Y   I   R
> 
> And then read line by line: `"PAHNAPLSIIGYIR"`
> 
> Write the code that will take a string and make this conversion given a number of rows:
> 
>     string convert(string text, int nRows);
> `convert("PAYPALISHIRING", 3)` should return `"PAHNAPLSIIGYIR"`.

比较简单的字符串处理, 根据给定的要求模拟即可.

    class Solution {
    public:
        string convert(string s, int numRows) {
            int n = numRows * 2 - 2, len = s.length(), column;
            if(len == 0)
                return string("");
            if(numRows == 1)
                return s;
            else
                column = (len / n) * 2 + 2;
            char arr[numRows][column];

            memset(arr, 0, sizeof(arr));
            for(int i = 0; i < len; i++){
                if((i % n) < numRows)
                    arr[i % n][i / n * 2] = s[i];
                else
                    arr[numRows - (i % n - numRows) - 2][i / n * 2+ 1] = s[i];
            }

            string re;
            for(int i = 0; i < numRows; i++){
                for(int j = 0; j < column; j++)
                    if(arr[i][j] != 0)
                        re.push_back(arr[i][j]);
            }

            return re;
        }
    };