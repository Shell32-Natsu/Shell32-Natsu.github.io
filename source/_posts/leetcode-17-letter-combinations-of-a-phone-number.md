---
title: LeetCode 17. Letter Combinations of a Phone Number
url: 415.html
id: 415
categories:
  - LeetCode
date: 2016-07-15 17:34:29
tags:
---
题目描述:

> Given a digit string, return all possible letter combinations that the number could represent.
> 
> A mapping of digit to letters (just like on the telephone buttons) is given below.
> 
> ![](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)
> 
>     Input:Digit string "23"
>     Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
> 
> **Note:**
> Although the above answer is in lexicographical order, your answer could be in any order you want.

这道题要求输入一串手机九宫格按键, 输出所有可能的字母组合. 方法是每读入一个按键, 就将原字符串数组复制数次(数量取决于这个按键上有几个字母), 然后加上当前读入的按键.

    class Solution {
    public:
        vector<string> letterCombinations(string digits) {
            int letterNumOnButton[] = {1, 1, 3, 3 ,3, 3, 3, 4, 3, 4};
            vector<string> m = {
                " ", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
            };
            
            if(digits.empty())
                return vector<string>();
            
            vector<string> re = {""};
            for(int i = 0; i < digits.length(); i++){
                int button = digits[i] - '0';
                
                int size = re.size();
                for(int j = 0; j < letterNumOnButton[button] - 1; j++){
                    for(int k = 0; k < size; k++){
                        re.push_back(re[k]);
                    }
                }
                
                for(int j = 0; j < m[button].length(); j++){
                    for(int k = 0; k < size; k++){
                        re[j * size + k].push_back(m[button][j]);
                    }
                }
            }
            
            return re;
        }
    };