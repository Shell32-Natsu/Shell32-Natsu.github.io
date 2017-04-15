---
title: LeetCode 26. Remove Duplicates from Sorted Array
url: 445.html
id: 445
categories:
  - LeetCode
date: 2016-07-20 18:13:09
tags:
---
问题描述:

> Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.
> 
> Do not allocate extra space for another array, you must do this in place with constant memory.
> 
> For example,
> Given input array nums = [1,1,2],
> 
> Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. It doesn't matter what you leave beyond the new length.

对一个有序数组去重, 并且要求不使用额外的存储空间. 

首先解决的是去重的问题, 如果没有额外空间的限制, 首先想到的是创建一个新的数组, 然后遍历nums, 大于新数组末尾的数则把当前的数加入新数组. 这里数组末尾的数其实就是已经遍历过的最大值, 因此可以用一个变量来保存.

接下来是存储空间的问题, 由于nums中每个数在遍历时的作用只是与当前遍历过的最大值比较, 而已经遍历过的数是没有什么作用的, 所以可以使用已经遍历过的nums数所占的空间.

    class Solution {
    public:
        int removeDuplicates(vector<int>& nums) {
            int num = 0, totalLen = nums.size(), curMax = INT_MIN;
            for(int i = 0, j = 0; i < totalLen; i++){
                if(nums[i] > curMax){
                    curMax = nums[i];
                    num++;
                    nums[j++] = nums[i];
                }
            }
            return num;
        }
    };

这段代码的Runtime是36毫秒, 但是许多AC代码的Runtime都在32ms, 说明这个程序还有一定的优化空间.

首先循环体内部的操作已经非常简洁, 应该很难有所作为, 所以优化的目标应该在循环次数上. 先将nums中最大的数保存下来, 当遍历到与该值相等的时候, 把这个数处理完后就可以退出循环了. 所以最终代码:

    class Solution {
    public:
        int removeDuplicates(vector<int>& nums) {
            int num = 0, totalLen = nums.size(), curMax = INT_MIN;
            int maxItem = nums.empty() ? 0 : nums.back();
            for(int i = 0, j = 0; i < totalLen; i++){
                if(nums[i] > curMax){
                    curMax = nums[i];
                    num++;
                    nums[j++] = nums[i];
                }
                if(nums[i] == maxItem){
                    break;
                }
            }
            return num;
        }
    };