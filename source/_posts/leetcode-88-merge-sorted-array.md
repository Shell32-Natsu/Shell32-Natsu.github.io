---
title: LeetCode 88. Merge Sorted Array
tags:
  - CPP
  - LeetCode
  - 算法
url: 648.html
id: 648
categories:
  - LeetCode
date: 2016-08-19 15:43:00
---
题目描述:

> Given two sorted integer arrays *nums1* and *nums2*, merge *nums2* into *nums1* as one sorted array.
>
> **Note:**
> You may assume that *nums1* has enough space (size that is greater or equal to *m* + *n*) to hold additional elements from *nums2*. The number of elements initialized in *nums1* and *nums2* are *m* and *n* respectively.

合并两个有序数组, 合并的结果放在第一个数组中, 数组长度通过函数参数给出, 所以不能使用`size()`成员函数来获得数组长度.

使用另一个数组nums3来保存原来nums1的元素, 然后再逐个比较nums2和nums3中的元素大小, 放入nums1中.

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        vector<int> nums3;
        for(int i = 0; i < m; i++){
            nums3.push_back(nums1[i]);
        }
        int p = m + n - 1;
        while(!nums2.empty() || !nums3.empty()){
            if(nums2.empty()){
                nums1[p--] = nums3.back();
                nums3.pop_back();
            }
            else if(nums3.empty()){
                nums1[p--] = nums2.back();
                nums2.pop_back();
            }
            else if(nums2.back() > nums3.back()){
                nums1[p--] = nums2.back();
                nums2.pop_back();
            }
            else{
                nums1[p--] = nums3.back();
                nums3.pop_back();
            }
        }
    }
};
```

