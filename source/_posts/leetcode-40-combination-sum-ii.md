---
title: LeetCode 40. Combination Sum II
tags:
  - CPP
  - LeetCode
  - 排列组合
  - 算法
  - 递归
url: 497.html
id: 497
categories:
  - LeetCode
date: 2016-07-28 17:24:38
---
题目描述:

> Given a collection of candidate numbers (C) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.
> 
> Each number in C may only be used once in the combination.
>
> Note:
> + All numbers (including target) will be positive integers.
> + The solution set must not contain duplicate combinations.
>
> For example, given candidate set [10, 1, 2, 7, 6, 1, 5] and target 8, 
>
> A solution set is: 
> 
>     [
>       [1, 7],
>       [1, 2, 5],
>       [2, 6],
>       [1, 1, 6]
>     ]


解法参照上一题: [LeetCode 39. Combination Sum](http://xiadong.info/2016/07/leetcode-39-combination-sum/), 区别在于两点

+ 输入数组中可能存在重复数字
+ 每个元素只能选择一次

解决第二个问题的办法很简单, 就是在每次进入下一级递归时从下一个元素开始. 解决第一个问题的办法是当一个值已经出现在结果中的某个位置时跳过接下来与这个值相等的所有元素.

代码如下:

    class Solution {
    public:
        vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
            sort(candidates.begin(), candidates.end());
            vector<vector<int>> re;
            for (int i = 0; i < candidates.size(); i++) {
                if(i > 0 && candidates[i] == candidates[i - 1]) continue; //防止重复而跳过元素
                vector<int> path;
                getWithFirst(candidates, target, i, re, path);
            }

            return re;
        }
        
        void getWithFirst(vector<int>& c, int target, int first, vector<vector<int>> &ret, vector<int> &path) {
            if (c[first] == target) {
                path.push_back(c[first]);
                ret.push_back(path);
                path.pop_back();
                return;
            }
            int newTarget = target - c[first];
            path.push_back(c[first]);
            for (int i = first + 1; i < c.size() && c[i] <= newTarget; i++) { //从first+1开始循环
                if(i > first + 1 && c[i] == c[i - 1]) continue; //防止重复而跳过元素
                getWithFirst(c, newTarget, i, ret, path);
            }
            path.pop_back();
        }
    };