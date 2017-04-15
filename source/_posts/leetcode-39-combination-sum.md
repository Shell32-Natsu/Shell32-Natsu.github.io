---
title: LeetCode 39. Combination Sum
tags:
  - CPP
  - LeetCode
  - 算法
  - 递归
url: 494.html
id: 494
categories:
  - LeetCode
date: 2016-07-27 18:37:36
---
题目描述:

> Given a set of candidate numbers (C) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.
>
> The same repeated number may be chosen from C unlimited number of times.
>
> Note:
> + All numbers (including target) will be positive integers.
> + The solution set must not contain duplicate combinations.
> 
> For example, given candidate set [2, 3, 6, 7] and target 7, 
> A solution set is: 
>
>     [
>       [7],
>       [2, 2, 3]
>     ]

在一个整数集合中取出元素(同一个元素可以选出多次)使它们的和等于`target`. 思路是先对数组排序, 然后以每个元素作为第一个元素, 从它后面的元素(包括它自己)中再继续选取元素. 使用递归来实现这个思路.

    class Solution {
    public:
        vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
            sort(candidates.begin(), candidates.end());
            vector<vector<int>> re;
            for (int i = 0; i < candidates.size() && candidates[i] <= target; i++) {
                vector<int> path;
                getWithFirst(candidates, target, i, re, path);
            }
            return re;
        }

        //函数参数和返回值都应该尽量不要直接使用对象, 虽然这样会损失函数封装性.
        void getWithFirst(vector<int>& c, int target, int first, vector<vector<int>> &ret, vector<int> &path) {
            if (c[first] == target) {
                //找到一组符合要求的元素
                path.push_back(c[first]);
                ret.push_back(path);
                path.pop_back();
                return;
            }
            int newTarget = target - c[first];
            path.push_back(c[first]);
            for (int i = first; i < c.size() && c[i] <= newTarget; i++) {
                //继续遍历first下标及之后的元素
                getWithFirst(c, newTarget, i, ret, path);
            }
            path.pop_back();
        }
    };