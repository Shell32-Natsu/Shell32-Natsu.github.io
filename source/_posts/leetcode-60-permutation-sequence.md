---
title: LeetCode 60. Permutation Sequence
tags:
  - CPP
  - LeetCode
  - 排列组合
  - 算法
url: 566.html
id: 566
categories:
  - LeetCode
date: 2016-08-04 18:12:39
---
题目描述:

>The set [1,2,3,…,n] contains a total of n! unique permutations.
>
>By listing and labeling all of the permutations in order,
>We get the following sequence (ie, for n = 3):
>
>1. "123"
>2. "132"
>3. "213"
>4. "231"
>5. "312"
>6. "321"
>
>Given n and k, return the kth permutation sequence.
>
>Note: Given n will be between 1 and 9 inclusive.

返回[1,n]n个数字的全排列按照字典序排序后的第k个排列, n在[1,9]的范围内. 

通过观察题目给出的`n = 3`的全排列可以看出, 以1, 2, 3开头的排列各有两个. n的全排列有`n!`种, 而以[1,n]中某个数字开头的排列种数有`(n - 1)!`种, 所以第k个排列的第一个数为`(k - 1) / (n - 1)! + 1`. 将k更新为`k % (n - 1)!`, 把第一个已经确定的数从数字集合中去掉(该集合应有序), 就可以以类似递归的方法确定整个序列. 

实际上每一次确定数字在集合数组中的下标比直接确定数字要更加有效. 而且由于n在1到9之间, 因此可以先把`n!`计算出来放到数组中.

    class Solution {
    public:
        vector<int> arr = {0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880};
        string getPermutation(int n, int k) {
            int kk = k - 1;
            vector<int> nums;
            for(int i = 1; i <= n; i++){
                nums.push_back(i); //nums[i]的值实际是i + 1
            }
            string ret;
            for(int i = 0; i < n; i++){
                if(i == n - 1){
                    ret.push_back(nums[0] + '0'); //i = n - 1时下方会出现除零错误
                    break;
                }
                int t = kk / arr[n - 1 - i];
                ret.push_back(nums[t] + '0'); //因为nums[i] = i + 1, 所以不需要再加1
                nums.erase(nums.begin() + t); //把已经确定的元素删除
                kk = kk % arr[n - i - 1];
            }
            return ret;
        }
    };