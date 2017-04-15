---
title: LeetCode 402. Remove K Digits
tags:
  - CPP
  - LeetCode
  - 字符串
  - 栈
  - 算法
url: 772.html
id: 772
categories:
  - LeetCode
date: 2016-09-19 17:02:06
---
题目描述:

> Given a non-negative integer *num* represented as a string, remove *k* digits from the number so that the new number is the smallest possible.
>
> **Note:**
>
> - The length of *num* is less than 10002 and will be ≥ *k*.
> - The given *num* does not contain any leading zero.
>
> **Example 1:**
>
> ```
> Input: num = "1432219", k = 3
> Output: "1219"
> Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
>
> ```
>
> **Example 2:**
>
> ```
> Input: num = "10200", k = 1
> Output: "200"
> Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
>
> ```
>
> **Example 3:**
>
> ```
> Input: num = "10", k = 2
> Output: "0"
> Explanation: Remove all the digits from the number and it is left with nothing which is 0.
> ```

这道题的主要思想就是"如果遇到了一个较小的值, 那么就把已得到的字符串中尾部所有比它大的值删除, 再把它放入末尾; 如果比末尾元素大, 那么就把它直接添加到末尾". 这是一个栈的问题, 但是除了主要的思路以外还有另一个问题: 最终栈的大小必须是`num.size()-k`, 所以在添加和删除时必须要考虑栈的大小.

在元素比栈顶元素大的情况下还要增加一个条件: 栈的大小还没有达到`num.size()-k`.

而元素比栈顶元素小的情况下, 在弹出栈顶元素时要求num中剩下的元素数量>=栈的目标大小-栈目前的大小, 这样才能保证栈能被填满.

```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        string ans;
        int target = num.size() - k, size = num.size(), i;
        if(target == 0) return "0";
        ans.push_back(num[0]);
        for(i = 1; i < k + ans.size(); i++){
            if(num[i] > ans.back() && ans.size() < target) ans.push_back(num[i]);
            else{
                while(!ans.empty() && ans.back() > num[i] && size - i - 1 >= target - ans.size()) ans.pop_back();
                if(ans.size() < target) ans.push_back(num[i]);
            }
        }
        for(; ans.size() < target; i++){
            ans.push_back(num[i]);
        }
        for(i = 0; ans[i] == '0'; i++);
        if(ans.empty() || i == ans.size()) return "0";
        return ans.substr(i);
    }
};
```

