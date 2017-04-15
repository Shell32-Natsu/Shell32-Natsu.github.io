---
title: LeetCode 90. Subsets II
tags:
  - CPP
  - LeetCode
  - 排列组合
  - 算法
  - 递归
url: 653.html
id: 653
categories:
  - LeetCode
date: 2016-08-19 18:02:07
---
题目描述:

> Given a collection of integers that might contain duplicates, **nums**, return all possible subsets.
>
> **Note:** The solution set must not contain duplicate subsets.
>
> For example,
> If **nums** = `[1,2,2]`, a solution is:
>
> ```
> [
>   [2],
>   [1],
>   [1,2,2],
>   [2,2],
>   [1,2],
>   []
> ]
> ```

返回一个包含重复元素的集合的所有子集, 要求不能重复. 获得子集的思路都是使用回溯法, 如果不考虑重复问题, 那么整个的实现过程可以分为两步:

1. 实现从nums中获得n个元素的所有情况函数, 使用递归, 即先取一个元素, 然后从之后的数组中再取n-1个元素.
2. 从nums中取得1个到nums.size()个元素

对于去除重复的情况, 在选择元素的时候跳过之后的与该元素相等的元素就可以避免重复, 为此, 要先对nums排序.

```cpp
class Solution {
    vector<vector<int>> ret;
    int len;
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> path;
        ret.push_back(path);
        len = nums.size();
        for(int i = 1; i <= len; i++){
            subsetWithN(nums, 0, i, path);
        }
        return ret;
    }
    
  	// 从nums中从start开始取得n个元素并放入ret中
    void subsetWithN(vector<int> &nums, int start, int n, vector<int> &path){
        if(n == 0){
            ret.push_back(path);
            return;
        }
        for(int i = start; i <= len - n; i++){
            path.push_back(nums[i]);
            subsetWithN(nums, i + 1, n - 1, path); // 递归调用
            path.pop_back();
            while(i + 1 <= len - n && nums[i] == nums[i + 1]){
                i++;
            }
        }
    }
};
```

