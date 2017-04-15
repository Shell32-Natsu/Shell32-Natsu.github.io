---
title: LeetCode 128. Longest Consecutive Sequence
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 算法
url: 786.html
id: 786
categories:
  - LeetCode
date: 2016-09-22 17:02:34
---
题目描述:

> Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
>
> For example,
> Given `[100, 4, 200, 1, 3, 2]`,
> The longest consecutive elements sequence is `[1, 2, 3, 4]`. Return its length: `4`.
>
> Your algorithm should run in O(*n*) complexity.

从一个无序的数组中找出最长的连续数字序列. 每读入一个数字, 就要判断能否加入到一个已经存在的区间中去, 而如何在常数时间内判断能否加入到某个区间中就是主要的问题. 我的方法是使用两个map, key的值分别为区间的开始和结束, 这样就可以在常数时间内确定能否加入到已经存在的区间的开头或结尾. 当一个值既能插入到某个区间的开头, 也能插入到某个区间的结尾时, 这两个区间就可以合并. 但是这个解法的效率并不是很高.

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if(nums.empty()) return 0;
        int maxLen = 1;
        unordered_map<int, int> SE, ES; //SE = start<->end, ES = end<->start
        unordered_set<int> included; // 保存区间中已经包含的数
        for(int i = 0; i < nums.size(); i++){
            if(included.count(nums[i])) continue;
            bool SEext = SE.count(nums[i] + 1), ESext = ES.count(nums[i] - 1);
            if(SEext && ESext){
                int newStart = ES[nums[i] - 1], newEnd = SE[nums[i] + 1];
                SE.erase(nums[i] + 1);
                ES.erase(nums[i] - 1);
                SE[newStart] = newEnd;
                ES[newEnd] = newStart;
                maxLen = max(maxLen, newEnd - newStart + 1);
            }
            else if(SEext){
                SE[nums[i]] = SE[nums[i] + 1];
                SE.erase(nums[i] + 1);
                ES[SE[nums[i]]] = nums[i];
                maxLen = max(maxLen, SE[nums[i]] - nums[i] + 1);
            }
            else if(ESext){
                ES[nums[i]] = ES[nums[i] - 1];
                ES.erase(nums[i] - 1);
                SE[ES[nums[i]]] = nums[i];
                maxLen = max(maxLen, nums[i] - ES[nums[i]] + 1);
            }
            else{
                SE[nums[i]] = nums[i];
                ES[nums[i]] = nums[i];
            }
            included.insert(nums[i]);
        }
        
        return maxLen;
    }
};
```

