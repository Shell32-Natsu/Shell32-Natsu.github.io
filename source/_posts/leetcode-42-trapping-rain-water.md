---
title: LeetCode 42. Trapping Rain Water
tags:
  - CPP
  - LeetCode
  - 双指针
  - 算法
url: 501.html
id: 501
categories:
  - LeetCode
date: 2016-07-28 19:35:57
---
﻿题目描述:

> Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.
> 
> For example,
> Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.
>
> ![](http://www.leetcode.com/wp-content/uploads/2012/08/rainwatertrap.png)
> 
> The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

蓄水的问题，我的想法是一个凹槽能蓄水，意味着它的两边比最低处高。考虑两边的话，最高的水面高度与较矮的一边相同。所以从左到右遍历每一个高度，对每一个高度向右寻找比它高的第一个高度，得到的就是蓄水的宽度。但是也有左边高右边低的情况，所以我先找到最高的高度，该高度左边的高度的右边都必然存在一个比它高的高度（最高的）。最高高度右边的高度则从右向左遍历。

    class Solution {
    public:
        int trap(vector<int>& height) {
            int i = 0, j = 0;
            int len = height.size(), ret = 0;
            int maxPos = 0, maxHeight = INT_MIN;
            for(int i = 0; i < len; i++){
                if(height[i] > maxHeight){
                    maxHeight = height[i];
                    maxPos = i;
                }
            }
            while(i < maxPos){
                for(j = i + 1; j < maxPos && height[j] < height[i]; j++) ret += (height[i] - height[j]);
                i = j;
            }
            i = len - 1;
            while(i > maxPos){
                for(j = i - 1; j > maxPos && height[j] < height[i]; j--) ret += (height[i] - height[j]);
                i = j;
            }
            return ret;
        }
    };