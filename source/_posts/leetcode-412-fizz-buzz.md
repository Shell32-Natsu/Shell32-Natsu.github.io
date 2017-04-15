---
title: LeetCode 412. Fizz Buzz
tags:
  - CPP
  - LeetCode
  - 算法
url: 901.html
id: 901
categories:
  - LeetCode
date: 2016-10-29 16:24:34
---
题目描述:

> Write a program that outputs the string representation of numbers from 1 to *n*.
>
> But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. For numbers which are multiples of both three and five output “FizzBuzz”.
>
> **Example:**
>
> ```
> n = 15,
>
> Return:
> [
>     "1",
>     "2",
>     "Fizz",
>     "4",
>     "Buzz",
>     "Fizz",
>     "7",
>     "8",
>     "Fizz",
>     "Buzz",
>     "11",
>     "Fizz",
>     "13",
>     "14",
>     "FizzBuzz"
> ]
> ```

直接判断数字是不是3或5的倍数就可以了.

```cpp
class Solution {
public:
    vector<string> fizzBuzz(int n) {
        vector<string> ans;
        for(int i = 1; i <= n; i++){
            string s;
            if(i % 3 && i % 5){
                s = to_string(i);
            }
            else {
                if(i % 3 == 0){
                    s += "Fizz";
                }
                if(i % 5 == 0){
                    s += "Buzz";
                }
            }
            ans.push_back(s);
        }
        return ans;
    }
};
```

