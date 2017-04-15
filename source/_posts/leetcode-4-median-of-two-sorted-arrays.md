---
title: LeetCode 4. Median of Two Sorted Arrays
url: 339.html
id: 339
categories:
  - LeetCode
date: 2016-07-08 19:36:09
tags:
---
题目:

> There are two sorted arrays nums1 and nums2 of size m and n respectively.

> Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

> Example 1:

>     nums1 = [1, 3]
>     nums2 = [2]

>     The median is 2.0

> Example 2:

>     nums1 = [1, 2]
>     nums2 = [3, 4]

>     The median is (2 + 3)/2 = 2.5

最直接方法, 合并为一个数组后进行排序, 运行时间56ms:

    class Solution {
    public:
        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
            for(int i = 0 ; i < nums2.size(); i++)
                nums1.push_back(nums2[i]);
            
            int n = nums1.size();
            partial_sort(nums1.begin(), nums1.end(), nums1.end());
            if(n % 2 == 0)
                return ((double)nums1[n / 2] + (double)nums1[n / 2 - 1]) / 2;
            else
                return (double)nums1[n / 2];
            
        }
    };

另一种方法是利用两个数组都是排好序的这一属性, 将两个数组看作堆, 每次pop出两个数组顶端较小的值, 直到有一半的数被pop出去, 剩下的两个顶端值就可以求得中间值.

运行速度稍有提升:

    class Solution {
    public:
        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
            int numTotal = nums1.size() + nums2.size();
            int n = numTotal / 2;
            int p1 = 0, p2 = 0;
            if(numTotal % 2){
                while(p1 < nums1.size() && p2 < nums2.size() && p1 + p2 < n){
                    if(nums1[p1] < nums2[p2]) p1++;
                    else p2++;
                }
                if(p1 + p2 < n){
                    if(p1 == nums1.size()){
                        while(p1 + p2 < n) p2++;
                    }
                    if(p2 == nums2.size()){
                        while(p1 + p2 < n) p1++;
                    }
                }
                if(p1 == nums1.size()) return (double)nums2[p2];
                else if(p2 == nums2.size()) return (double)nums1[p1];
                else return (double)min(nums1[p1], nums2[p2]);
            }
            else{
                while(p1 < nums1.size() && p2 < nums2.size() && p1 + p2 < n - 1){
                    if(nums1[p1] < nums2[p2]) p1++;
                    else p2++;
                }
                if(p1 + p2 < n - 1){
                    if(p1 == nums1.size()){
                        while(p1 + p2 < n - 1) p2++;
                    }
                    if(p2 == nums2.size()){
                        while(p1 + p2 < n - 1) p1++;
                    }
                }
                if(p1 == nums1.size()) return (double)((nums2[p2] + nums2[p2 + 1]) / 2.0);
                else if(p2 == nums2.size()) return (double)((nums1[p1] + nums1[p1 + 1]) / 2.0);
                else{
                    int t1, t2;
                    if(nums1[p1] < nums2[p2]) t1 = nums1[p1++];
                    else t1 = nums2[p2++];
                    if(p1 == nums1.size()){
                        t2 = nums2[p2++];
                    }
                    else if(p2 == nums2.size()){
                        t2 = nums1[p1++];
                    }
                    else{
                        if(nums1[p1] < nums2[p2]) t2 = nums1[p1++];
                        else t2 = nums2[p2++];
                    }
                    return (double)((t1 + t2) / 2.0);
                }
            }
        }
    };