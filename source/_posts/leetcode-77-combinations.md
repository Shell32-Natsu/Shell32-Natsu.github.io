---
title: LeetCode 77. Combinations
tags:
  - CPP
  - LeetCode
  - 排列组合
  - 算法
url: 615.html
id: 615
categories:
  - LeetCode
date: 2016-08-12 18:52:07
---
题目描述:

> Given two integers *n* and *k*, return all possible combinations of *k* numbers out of 1 ... *n*.
>
> For example,
> If *n* = 4 and *k* = 2, a solution is:
>
> ```
> [
>   [2,4],
>   [3,4],
>   [2,3],
>   [1,2],
>   [1,3],
>   [1,4],
> ]
> ```

从[1,n]中选出k个数, 这道题只要求组合, 不要求排列, 因此用递归可以比较容易的解决.

```cpp
class Solution {
    vector<vector<int>> kElement;
public:
    vector<vector<int>> combine(int n, int k) {
        vector<int> v;
        getKElement(n, k, 1, v);
        return kElement;
    }
    
    void getKElement(int n, int k, int start, vector<int> &v){
        if(k == 1){
            for(int i = start; i <= n; i++){
                v.push_back(i);
                kElement.push_back(v);
                v.pop_back();
            }
            return;
        }
        for(int i = start; i <= n - k + 1; i++){
            v.push_back(i);
            getKElement(n, k - 1, i + 1, v);
            v.pop_back();
        }
    }
};
```

