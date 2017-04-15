---
title: LeetCode 20. Valid Parentheses
url: 428.html
id: 428
categories:
  - LeetCode
date: 2016-07-17 17:05:53
tags:
---
题目描述:

>Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
>
>The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.

要求判断输入字符串中的括号是否正确匹配, 因为括号要正确闭合, 因此使用计数器来记录左右括号数量是不行的. 我用栈来保存所有的左括号, 每遇到一个右括号就与栈顶端的左括号匹配, 不匹配则返回false, 匹配则将栈顶括号出栈. 循环过程中如果出现栈为空, 或者循环结束后栈不为空则返回false. 其他情况返回true.

    class Solution {
    public:
        bool isValid(string s) {
            vector<char> bracket;
            for(auto i : s){
                if(i == '(' || i == '[' | i == '{')
                    bracket.push_back(i);
                else{
                    if(bracket.empty())
                        return false;
                    else if( (i == ')' && bracket.back() == '(') || (i == ']' && bracket.back() == '[') || (i == '}' && bracket.back() == '{'))
                        bracket.pop_back();
                    else
                        return false;
                }
            }
            
            return bracket.empty() ? true : false;
        }
    };