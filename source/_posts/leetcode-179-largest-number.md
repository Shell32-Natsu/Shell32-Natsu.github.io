---
title: LeetCode 179. Largest Number
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 936.html
id: 936
categories:
  - LeetCode
date: 2016-11-01 18:55:20
---
题目描述:

> Given a list of non negative integers, arrange them such that they form the largest number.
>
> For example, given `[3, 30, 34, 5, 9]`, the largest formed number is `9534330`.
>
> Note: The result may be very large, so you need to return a string instead of an integer.

这是一个排序问题, 只要能判断两个数的先后顺序, 那就可以通过比较排序得到最后的有序序列. 对于两个int数据`a`, `b`, 把它们以`ab`和`ba`两种形式存储在`long long`中, 就可以通过直接的比较大小来判断顺序.

```cpp
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end(), [=](int a, int b){
            long long ab = func(a, b), ba = func(b, a);
            return ab > ba;
        });
        string re;
        for(int i = 0; i < nums.size(); i++){
            re += to_string(nums[i]);
        }
        auto iter = re.begin();
        for(; iter != re.end() && (*iter) == '0'; iter++);
        if(iter == re.end()) return string("0");
        else return string(iter, re.end());
    }
    
    long long func(int a, int b){
        if(b == 0) return a * 10;
        long long re = a;
        int t = b;
        while(t > 0) {
            re *= 10;
            t /= 10;
        }
        return re + b;
    }
};
```

