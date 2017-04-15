---
title: LeetCode 150. Evaluate Reverse Polish Notation
tags:
  - CPP
  - LeetCode
  - 栈
  - 算法
url: 857.html
id: 857
categories:
  - LeetCode
date: 2016-10-08 19:25:58
---
题目描述:

> Evaluate the value of an arithmetic expression in [Reverse Polish Notation](http://en.wikipedia.org/wiki/Reverse_Polish_notation).
>
> Valid operators are `+`, `-`, `*`, `/`. Each operand may be an integer or another expression.
>
> Some examples:
>
> ```
>   ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
>   ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6
> ```

*逆波兰表达式*的意思就是运算符后缀, 这种方式就是为栈设计的. 当读入数字的时候就将其入栈, 读入运算符的时候就将栈顶的两个元素取出运算后再压入栈.

```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        vector<int> nums;
        for(int i = 0; i < tokens.size(); i++){
            string s = tokens[i];
            if(s.size() == 1 && (s == "+" || s == "-" || s == "*" || s == "/")){
                int a = nums.back();
                nums.pop_back();
                int b = nums.back();
                nums.pop_back();
                int re;
                switch(s[0]){
                    case '+':
                        re = a + b;
                        break;
                    case '-':
                        re = b - a;
                        break;
                    case '*':
                        re = b * a;
                        break;
                    case '/':
                        re = b / a;
                        break;
                }
                nums.push_back(re);
            }
            else{
                nums.push_back(stoi(s));
            }
        }
        return nums[0];
    }
};
```

