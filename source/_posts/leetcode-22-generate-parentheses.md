---
title: LeetCode 22. Generate Parentheses
url: 435.html
id: 435
categories:
  - LeetCode
date: 2016-07-18 17:32:24
tags:
---
题目描述:

> Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
>
> For example, given n = 3, a solution set is:
>
>     [
>       "((()))",
>       "(()())",
>       "(())()",
>       "()(())",
>       "()()()"
>     ]

题目要求输出n个括号的所有组合. 每个合法的字符串的长度都是`2*n`, 其中每个位置的字符有两种可能: 左括号和右括号. 因此循环`2*n`次, 每次对于结果集ret中的每个字符串末尾添加括号, 判断两种情况哪一种合法.或者两种都合法.

**左括号合法的情况**

字符串中出现的左括号总数没有超过`n`, 则在尾部添加左括号总是合法的.

**右括号合法的情况**

字符串中含有未配对的左括号. 注意: 如果左括号总数没有超过`n`, 那么该字符串添加左右括号都是合法的, 因此要在结果集末尾增加一条; 如果已经有了`n`个左括号, 那么只能添加右括号.

    class Solution {
    public:
        vector<string> generateParenthesis(int n) {
            vector<string> ret = {"("};
            vector<int> leftNum = {1};   //ret中每个字符串中左括号的数量
            vector<int> singleLeftNum = {1};  //ret中每个字符串中未配对的左括号数量
            int strLen = n * 2;
            for(int i = 1; i < strLen; i++){
                int len = ret.size();
                for(int j = 0; j < len; j++){
                    if(singleLeftNum[j] > 0){
                        if(leftNum[j] == n){
                            ret[j].push_back(')');
                            singleLeftNum[j]--;
                        }
                        else{
                            ret.push_back(ret[j] + ")");
                            leftNum.push_back(leftNum[j]);
                            singleLeftNum.push_back(singleLeftNum[j] - 1);
                        }
                    }
                    if(leftNum[j] < n){
                        ret[j].push_back('(');
                        leftNum[j]++;
                        singleLeftNum[j]++;
                    }
                }
            }
            return ret;
        }
    };