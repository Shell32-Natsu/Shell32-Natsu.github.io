---
title: LeetCode 153. Find Minimum in Rotated Sorted Array
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 算法
url: 869.html
id: 869
categories:
  - LeetCode
date: 2016-10-11 16:30:34
---
题目描述:

> Suppose a sorted array is rotated at some pivot unknown to you beforehand.
>
> (i.e., `0 1 2 4 5 6 7` might become `4 5 6 7 0 1 2`).
>
> Find the minimum element.
>
> You may assume no duplicate exists in the array.

这道题虽然使用线性遍历的方法也能过, 但是是可以使用二分搜索的. 

一个经过了循环左移的有序数组相当于被分成了两部分, 我们要找的是这两部分的分界点, 判断一个点是在哪一部分是看它与两端的元素的大小关系, 如果比两端的元素大, 那么它是在左半部分; 如果比两端的元素小, 那么它是在右半部分; 如果它比左端元素小比右边元素大, 那么从左端到右端整体是有序的, 在这种情况下最左端元素就是最小值; 不可能出现比左端元素大而比右端元素小的情况.

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0, right = nums.size() - 1, mid = (left + right) / 2;
        while(true){
            if(nums[mid] < nums[left] && nums[mid] < nums[right]){
                right = mid;
            }
            else if(nums[mid] >= nums[left] && nums[mid] > nums[right]){
                left = mid + 1;
            }
            else{
                return nums[left];
            }
            mid = (left + right) / 2;
        }
    }
};
```

