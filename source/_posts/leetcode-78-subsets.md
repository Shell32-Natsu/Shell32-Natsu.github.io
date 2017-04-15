---
title: LeetCode 78. Subsets
tags:
  - CPP
  - LeetCode
  - 排列组合
  - 算法
url: 619.html
id: 619
categories:
  - LeetCode
date: 2016-08-13 16:50:13
---
题目描述:

> Given a set of distinct integers, *nums*, return all possible subsets.
>
> **Note:** The solution set must not contain duplicate subsets.
>
> For example,
> If **nums** = `[1,2,3]`, a solution is:
>
> ```
> [
>   [3],
>   [1],
>   [2],
>   [1,2,3],
>   [1,3],
>   [2,3],
>   [1,2],
>   []
> ]
> ```

取得一个数组的所有子集, 这道题可以直接使用上一道题[LeetCode 77. Combinations](http://xiadong.info/2016/08/leetcode-77-combinations/)的方法, 上一题是从[1,n]中取得k个数, 只要把它们当作下标, 然后n从1遍历到nums.size()即可, 然后再插入一个空集.

```cpp
class Solution {
    vector<vector<int>> kElement;
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> ret(1, vector<int>());
        for(int i = 1; i <= nums.size(); i++){
            kElement.clear();
            combine(nums.size(), i);
            for(int i = 0; i < kElement.size(); i++){
                vector<int> t(kElement[i].size());
                for(int j = 0; j < kElement[i].size(); j++){
                    t[j] = nums[kElement[i][j] - 1];
                }
                ret.push_back(t);
            }
        }
        return ret;
    }
    
    void combine(int n, int k) {
        vector<int> v;
        getKElement(n, k, 1, v);
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

