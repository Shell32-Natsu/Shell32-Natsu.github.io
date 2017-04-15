---
title: LeetCode 475. Heaters
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 算法
url: 1040.html
id: 1040
categories:
  - LeetCode
date: 2016-12-19 17:59:26
---
题目描述:

> Winter is coming! Your first job during the contest is to design a standard heater with fixed warm radius to warm all the houses.
>
> Now, you are given positions of houses and heaters on a horizontal line, find out minimum radius of heaters so that all houses could be covered by those heaters.
>
> So, your input will be the positions of houses and heaters seperately, and your expected output will be the minimum radius standard of heaters.
>
> **Note:**
>
> 1. Numbers of houses and heaters you are given are non-negative and will not exceed 25000.
> 2. Positions of houses and heaters you are given are non-negative and will not exceed 10^9.
> 3. As long as a house is in the heaters' warm radius range, it can be warmed.
> 4. All the heaters follow your radius standard and the warm radius will the same.
>
> **Example 1:**
>
> ```
> Input: [1,2,3],[2]
> Output: 1
> Explanation: The only heater was placed in the position 2, and if we use the radius 1 standard, then all the houses can be warmed.
>
> ```
>
> **Example 2:**
>
> ```
> Input: [1,2,3,4],[1,4]
> Output: 1
> Explanation: The two heater was placed in the position 1 and 4. We need to use radius 1 standard, then all the houses can be warmed.
> ```

我使用二分搜索, 对每个房子搜索与它最近的heater, 维护一个最长的最短距离.

```cpp
class Solution {
public:
    int findRadius(vector<int>& houses, vector<int>& heaters) {
        sort(heaters.begin(), heaters.end());
        int ans = 0;
        for(auto i : houses){
            int index = binSearch(heaters, i);
            if(index == heaters.size()) index--;
            int tmp = min(abs(heaters[index] - i), abs(index < heaters.size() - 1 ? heaters[index + 1] - i : INT_MAX));
            tmp = min(tmp, abs(index > 0 ? heaters[index - 1] - i : INT_MAX));
            ans = max(ans, tmp);
        }
        return ans;
    }
    
    int binSearch(vector<int>&heaters, int target){
        int left = 0, right = heaters.size(), mid = (left + right) / 2;
        while(left < right){
            if(heaters[mid] == target) return mid;
            else if(heaters[mid] > target) right = mid;
            else left = mid + 1;
            
            mid = (left + right) / 2;
        }
        return left;
    }
};
```

