---
title: LeetCode 189. Rotate Array
tags:
  - CPP
  - LeetCode
  - 算法
url: 974.html
id: 974
categories:
  - LeetCode
date: 2016-11-18 20:05:50
---
题目描述:

> Rotate an array of *n* elements to the right by *k* steps.
>
> For example, with *n* = 7 and *k* = 3, the array `[1,2,3,4,5,6,7]` is rotated to `[5,6,7,1,2,3,4]`.

循环右移, 没啥好说的......可以选择一起移动, 也可以选择一个元素一个元素移动; 前者时间复杂度低, 后者空间复杂度低.

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        k = k % nums.size();
        vector<int> tmp(nums.begin(), nums.begin() + (nums.size() - k));
        nums.erase(nums.begin(), nums.begin() + (nums.size() - k));
        for(auto i : tmp){
            nums.push_back(i);
        }
    }
};
```

