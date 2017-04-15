---
title: LeetCode 31. Next Permutation
tags:
  - CPP
  - LeetCode
  - 排列组合
  - 算法
url: 473.html
id: 473
categories:
  - LeetCode
date: 2016-07-24 17:24:46
---
题目描述:

> Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.
> 
> If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).
> 
> The replacement must be in-place, do not allocate extra memory.
> 
> Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
> 
> `1,2,3 → 1,3,2`
> 
> `3,2,1 → 1,2,3`
> 
> `1,1,5 → 1,5,1`

提要求输入一个数组, 返回下一个字典序比它大的排列, 如果不存在比它大的就返回最小的排列. 首先解决判断一个排列是不是最大的问题, 这个问题比较简单: 只要是这个序列是从大到小排列的, 那么它就是最大的序列. 然后再思考比较两个序列大小的问题: 从前到后逐个比较数组中的数字, 出现第一个不相等的位置, 较大的那一个序列就是字典序较大的. 然后再考虑给定一个序列获得它的下一个序列的方法, 因为随着数组下标增加, 该下标位置的数对于整个序列大小的影响是越来越小的, 因此要获得下一个排列, 应该修改尽量靠后位置的元素, 同时这个元素应该变为一个较大的值, 但是这个较大的值要在该元素之后, 因为要是与该位置之前的较大元素交换位置这个排列是变小了; 而且这个变换的目标值应该尽量小, 也就是找到该位置之后比该位置元素大的最小值. 然后是该位置之后的序列要最小, 把它们从小到大排序就可以了.

因此算法如下:

+ 判断是不是最大值
+ 从后向前查找第一个在它之后有比它大的值的元素
+ 在这个元素之后找到比它大的最小值
+ 交换之后对于该元素之后的序列从小到大排序



    class Solution {
    public:
        bool isBiggest(vector<int>& nums){
            if(nums.size() <= 1)
                return true;
            for(int i = 1; i < nums.size(); i++){
                if(nums[i] > nums[i - 1])
                    return false;
            }
            return true;
        }
        int findCloestBiggerBehind(vector<int>& nums, int pos){
            int index = pos, n = INT_MAX;
            for(int i = pos + 1; i < nums.size(); i++){
                if(nums[i] > nums[pos] && nums[i] < n){
                    index = i;
                    n = nums[i];
                }
            }
            return index;
        }
        void nextPermutation(vector<int>& nums) {
            if(isBiggest(nums)){
                sort(nums.begin(), nums.end());
                return;
            }
            int maxNum = INT_MIN;
            for(int i = nums.size() - 1; i >= 0; i--){
                if(nums[i] < maxNum){
                    int pos = findCloestBiggerBehind(nums, i);
                    int t = nums[i];
                    nums[i] = nums[pos];
                    nums[pos] = t;
                    sort(nums.begin() + i + 1, nums.end());
                    break;
                }
                maxNum = nums[i];
            }
        }
    };