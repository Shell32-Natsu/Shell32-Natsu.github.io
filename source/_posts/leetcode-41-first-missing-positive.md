---
title: LeetCode 41. First Missing Positive
tags:
  - CPP
  - LeetCode
  - 算法
url: 499.html
id: 499
categories:
  - LeetCode
date: 2016-07-28 18:22:38
---
题目描述:

> Given an unsorted integer array, find the first missing positive integer.
> 
> For example,
>
> Given [1,2,0] return 3,
> 
> and [3,4,-1,1] return 2.
> 
> Your algorithm should run in O(n) time and uses constant space.

给定一个未排序数组, 要求找到其中缺失的最小正整数. 由于题目要求使用常数的空间, 因此只能利用输入数组中的空间. 我的思路是将正整数`1...n`与下标`0...n-1`对应起来, 假设数组大小为n, 将数值在[1, n]范围内的元素放到下标[0,n-1]的对应位置上, 然后再从头遍历一次数组, `nums[i] != i + 1`的位置就是缺失的第一个正整数. 对与`<=0`和`>n`的数不需要处理, 因为`<=0`的数与结果无关, 而如果出现了`>n`的数, 那么必然在[1,n]中有缺失的数, 也只需要处理[1,n]即可. 时间复杂度O(n).

由于交换nums中的两个元素后, 将`nums[i]`中的数放到了`nums[nums[i] - 1]`中, 因此`nums[i]`中此时仍然储存一个没有放到相应位置的数, 所以下一个循环还要处理i而不是i+1, 所以i要减1, 但是这在`[1,1]`这种输入数据中会导致死循环, 因此还要加一个判断, 即要交换的目标位置是不是已经有了对应的数, 如果有则不再需要处理.

    class Solution {
    public:
        int firstMissingPositive(vector<int>& nums) {
            for(int i = 0; i < nums.size(); i++){
                if(nums[i] <= nums.size() && nums[i] > 0 && nums[nums[i] - 1] != nums[i]){
                    swap(nums[nums[i] - 1], nums[i]);
                    i--;
                }
            }
            for(int i = 0; i < nums.size(); i++){
                if(nums[i] != i + 1) return i + 1;
            }
            return nums.size() + 1;
        }
    };