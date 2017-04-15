---
title: LeetCode 1. Two Sum
url: 330.html
id: 330
categories:
  - LeetCode
date: 2016-07-08 16:47:22
tags:
---
LeetCode的第一题，题目如下：

> Given an array of integers, return indices of the two numbers such that they add up to a specific target.

> You may assume that each input would have exactly one solution.

> **Example:**

>     Given nums = [2, 7, 11, 15], target = 9,
>     Because nums[0] + nums[1] = 2 + 7 = 9,
>     return [0, 1].

首先是简单粗暴的使用STL Map的方法. 基本思路是把nums中的数据与其下标建立一个映射关系, 这样就可以在logn的时间里通过数值获得它的下标：

    class Solution {
    public:
        vector<int> twoSum(vector<int>& nums, int target) {
            map<int, int> a;
            for(int i = 0; i < nums.size(); i++){
                a[nums[i]] = i;
            }
            for(int i = 0; i < nums.size(); i++){
                auto p = a.find(target - nums[i]);
                if(p != a.end() && p->second != i){
                    vector<int> re = {i, p->second};
                    return re;
                }
            }
            return vector<int>();
        }
    };

以上方法有两个循环, 其中第一个循环遍历了一遍nums,同时对于每个nums中的数据都进行了map的插入/修改操作, 假设nums的数据个数为n, 复杂度约为O(nlogn). 第二个循环中也是遍历了一遍nums, 然后每一遍循环都执行了一次map的find()操作,最好的情况下只需要循环一次,最坏的情况下需要循环n次,因此平均复杂度约为O((n/2)logn), 总的复杂度在O(nlogn)级别.

这段程序运行时间28ms.

但是这个代码使用了STL中的Map容器, 可能有较大的额外开销, 接下来使用排序 + 二分搜索的方法:

    class Solution {
    public:
        vector<int> twoSum(vector<int>& nums, int target) {
            vector<int> re;
            vector<int> oldNums = nums;
            sort(nums.begin(), nums.end());
            for(int i = 0; i < nums.size(); i++){
                int t = target - nums[i];
                if(t < nums.front() || t > nums.back()) continue;
                int j = binSearch(nums, t);
                if(j == -1 || j == i) continue;
                else {
                    int num1 = nums[i], num2 = nums[j];
                    for(int k = 0; k < oldNums.size(); k++){
                        if(oldNums[k] == num1 || oldNums[k] == num2) re.push_back(k);
                        if(re.size() == 2) break;
                    }
                    return re;
                }
            }
            return re;
        }
        
        int binSearch(vector<int> &nums, int t){
            int l = 0, r = nums.size(), m = (l + r) / 2;
            while(l < r){
                if(nums[m] == t) return m;
                else if(nums[m] > t) r = m;
                else l = m + 1;
                m = (l + r) / 2;
            }
            return -1;
        }
    };

第二个方法的运行时间缩短为12ms.

还有另一种更加简洁的双指针方法:

    class Solution {
    public:
        vector<int> twoSum(vector<int>& nums, int target) {
            vector<int> re;
            vector<int> oldNums = nums;
            sort(nums.begin(), nums.end());
            int l = 0, r = nums.size() - 1;
            while(l < r){
                int sum = nums[l] + nums[r];
                if(sum == target){
                    for(int i = 0; i < nums.size() && re.size() < 2; i++){
                        if(oldNums[i] == nums[l] || oldNums[i] == nums[r]) re.push_back(i);
                    }
                    break;
                }
                else if(sum > target){
                    r--;
                }
                else{
                    l++;
                }
            }
            return re;
        }
    };