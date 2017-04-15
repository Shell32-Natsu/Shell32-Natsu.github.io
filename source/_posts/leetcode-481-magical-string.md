---
title: LeetCode 481. Magical String
tags:
  - CPP
  - LeetCode
  - 双指针
  - 算法
url: 1071.html
id: 1071
categories:
  - LeetCode
date: 2017-01-10 17:59:37
---
题目描述：

> A magical string **S** consists of only '1' and '2' and obeys the following rules:
>
> The string **S** is magical because concatenating the number of contiguous occurrences of characters '1' and '2' generates the string **S** itself.
>
> The first few elements of string **S** is the following: **S** = "1221121221221121122……"
>
> If we group the consecutive '1's and '2's in **S**, it will be:
>
> 1 22 11 2 1 22 1 22 11 2 11 22 ......
>
> and the occurrences of '1's or '2's in each group are:
>
> 1 2	2 1 1 2 1 2 2 1 2 2 ......
>
> You can see that the occurrence sequence above is the **S** itself.
>
> Given an integer N as input, return the number of '1's in the first N number in the magical string **S**.
>
> **Note:** N will not exceed 100,000.
>
> **Example 1:**
>
> ```
> Input: 6
> Output: 3
> Explanation: The first 6 elements of magical string S is "12211" and it contains three 1's, so return 3.
> ```

按照一个序列中的数值往这个序列的末尾增加元素，要求1与2是间隔的，不能超过两个相同的值在一起。按照题目给出的规律生成这个序列就可以了。

```cpp
class Solution {
public:
    int magicalString(int n) {
        if(n == 0) return 0;
        vector<int> s(n + 1);
        s[0] = 1, s[1] = 2, s[2] = 2;
        int index1 = 3, index2 = 2;
        int ans = 1;
        while(index1 < n){
            int t = s[index1 - 1] == 1 ? 2 : 1;
            for(int i = 0; i < s[index2]; i++){
                s[index1 + i] = t;
            }
            if(t == 1){
                ans += s[index2];
            }
            index1 += s[index2];
            index2++;
        }
        if(index1 > n && s[index1 - 1] == 1) ans--; 
        return ans;
    }
};
```

