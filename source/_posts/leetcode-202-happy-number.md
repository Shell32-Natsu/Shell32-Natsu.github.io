---
title: LeetCode 202. Happy Number
tags:
  - CPP
  - LeetCode
  - 算法
url: 1005.html
id: 1005
categories:
  - LeetCode
date: 2016-12-06 18:17:46
---
 题目描述:

> Write an algorithm to determine if a number is "happy".
>
> A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.
>
> **Example: **19 is a happy number
>
> - 12 + 92 = 82
> - 82 + 22 = 68
> - 62 + 82 = 100
> - 12 + 02 + 02 = 1

最直观的解法可以使用hash表.

```cpp
class Solution {
public:
    bool isHappy(int n) {
        unordered_set<int> s;
        s.insert(n);
        int t = n;
        while(t != 1){
            long long sum = 0;
            while(t > 0){
                sum += ((t % 10) * (t % 10));
                t /= 10;
            }
            t = sum;
            if(s.count(t)) return false;
            else s.insert(t);
        }
        return true;
    }
};
```

但是仔细想想, 输入数据最多为一个十位数, 每一位数字的平方最多为81, 因此中间过程所产生的数肯定落在`[1,810]`之间, 我们只要开一个较大的数组来保存某个数是否出现过就可以了.

```cpp
class Solution {
public:
    bool isHappy(int n) {
        vector<int> s(1000, 0);
        int t = n;
        while(t != 1){
            int sum = 0;
            while(t > 0){
                sum += ((t % 10) * (t % 10));
                t /= 10;
            }
            t = sum;
            if(s[t]) return false;
            else s[t] = 1;
        }
        return true;
    }
};
```

