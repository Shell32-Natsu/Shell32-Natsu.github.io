---
title: LeetCode 11. Container With Most Water
url: 372.html
id: 372
categories:
  - LeetCode
date: 2016-07-12 17:01:40
tags:
---
﻿题目描述:

> Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.
>
> Note: You may not slant the container.

稍微优化的暴力搜索，时间复杂度比`O(n^2)`稍低。

C:

    int maxArea(int height[], int n) {
        int max = 0, len = n;
        for(int i = 0; i < len; i++){
            if(height[i] * (len - i - 1) <= max)continue;
            for(int j = i + (max / height[i] > 1 ? max / height[i] : 1); j < len; j++){
                int area = (j - i) * (height[i] < height[j] ? height[i] : height[j]);
                if(area > max)max = area;
            }
        }
        
        return max;
    }

使用双指针的方法，从数组两端向中间遍历，时间复杂度约为`O(n)`。

C++:

    class Solution {
    public:
        int maxArea(vector<int> &height) {
            int start = 0, end = height.size() - 1, max = 0, area;
            
            while(start < end){
                if(height[start] < height[end]){
                    area = height[start] * (end - start);
                    max = max > area ? max : area;
                    start++;
                }
                else{
                    area = height[end] * (end - start);
                    max = max > area ? max : area;
                    end--;
                }
            }
            
            return max;
        }
    };