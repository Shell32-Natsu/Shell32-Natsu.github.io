---
title: LeetCode 164. Maximum Gap
tags:
  - CPP
  - LeetCode
  - 排序
  - 算法
url: 880.html
id: 880
categories:
  - LeetCode
date: 2016-10-12 19:07:59
---
题目描述:

> Given an unsorted array, find the maximum difference between the successive elements in its sorted form.
>
> Try to solve it in linear time/space.
>
> Return 0 if the array contains less than 2 elements.
>
> You may assume all elements in the array are non-negative integers and fit in the 32-bit signed integer range.

这道题就是一个排序问题, 但是要求O(n)时间复杂度, 可用的办法有桶排序([bucket sort](https://en.wikipedia.org/wiki/Bucket_sort))和基数排序([radix sort](https://en.wikipedia.org/wiki/Radix_sort)), 但是虽然说这两种算法有近似O(n)的复杂度, 但是它们并不一定真的比快排之类的算法快, 因为虽然快排, 堆排的时间复杂度是O(nlogn), 但即使n达到2<sup>32</sup>, logn也只有32而已, 实际中要排序的数据达到这个数量级时我觉得应该考虑外部排序了, 因为很可能数据已经无法完全装入内存了. 而桶排序和基数排序的O(n)算法系数也并不小, 所以这道题直接用快排或者STL的sort函数也是能过的.

更进一步来说, 基于比较的排序算法时间复杂度下界是O(nlogn), 而能到达O(n)复杂度的算法是非比较的排序算法(计数排序, 基数排序, 桶排序).(<http://blog.csdn.net/zouliping123/article/details/8934856>)

桶排序:

```cpp
class Solution {
public:
    int maximumGap(vector<int> &nums) {
        int length = nums.size();
        if (length < 2) return 0;
        int max_item = nums[0], min_item = nums[0];

        for(int i = 1; i < length; i++){
            max_item = max(max_item, nums[i]);
            min_item = min(min_item, nums[i]);
        }

        int bucket_gap = ( max_item - min_item ) / length >= 1 ? ( max_item - min_item ) / length : 1;
        int bucket_size = ( max_item - min_item ) / bucket_gap + 1;

        vector<vector<int>> bucket(bucket_size);

        for(int i = 0; i < length; i++){
            bucket[(nums[i] - min_item) / bucket_gap].push_back(nums[i]);
        }

        int max_gap = 0;

        for(int i = 0; i < bucket_size; i++){
            sort(bucket[i].begin(), bucket[i].end());
        }
        
        int lastNoneEmptyIndex = -1;
        for(int i = 0; i < bucket.size(); i++){
            if(!bucket[i].empty() && i != 0 && lastNoneEmptyIndex != -1){
                max_gap =max(max_gap, bucket[i][0] - bucket[lastNoneEmptyIndex].back());
            }
            
            if(!bucket[i].empty()){
                lastNoneEmptyIndex = i;
                for(int j = 1; j < bucket[i].size() && max_gap < bucket_gap; j++){
                    max_gap = max(max_gap, bucket[i][j] - bucket[i][j - 1]);
                }
            }
        }

        return max_gap;
    }
};
```

基数排序:

```cpp
class Solution {
public:
    int maximumGap(vector<int> &nums) {
        int length = nums.size();
        if (length < 2) return 0;
        int max_gap = 0;
        vector<int> radix(10, 0);
        vector<int> tmp(length);
        int i = 0, r = 1;
        while(i < 10){
            for(int j = 0; j < 10; j++){
                radix[j] = 0;
            }
            for(auto j : nums){
                radix[(j / r) % 10]++;
            }
            for(int j = 1; j < 10; j++){
                radix[j] += radix[j - 1];
            }
            for(int j = length - 1; j >= 0; j--){
                int k = (nums[j] / r) % 10;
                tmp[--radix[k]] = nums[j];
            }
            i++;
            r *= 10;
            nums = tmp;
        }
        
        for(int i = 0; i < length - 1; i++){
            max_gap = max(max_gap, nums[i + 1] - nums[i]);
        }

        return max_gap;
    }
};
```

