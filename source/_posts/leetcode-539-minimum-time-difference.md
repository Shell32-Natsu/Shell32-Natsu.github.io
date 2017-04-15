---
title: LeetCode 539. Minimum Time Difference
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 1170.html
id: 1170
categories:
  - LeetCode
date: 2017-03-14 18:03:51
---
题目描述：

> Given a list of 24-hour clock time points in "Hour:Minutes" format, find the minimum **minutes** difference between any two time points in the list.
>
> **Example 1:**
>
> ```
> Input: ["23:59","00:00"]
> Output: 1
>
> ```
>
> **Note:**
>
> 1. The number of time points in the given list is at least 2 and won't exceed 20000.
> 2. The input time is legal and ranges from 00:00 to 23:59.

先进行排序，然后依次计算相邻时间的时间差，这个时间差有两个方向，选择较小的一个。最后要注意还要算最后一个时间与第一个时间的时间差。

```cpp
class Solution {
public:
    int findMinDifference(vector<string>& timePoints) {
        if (timePoints.size() >= 1440) return 0;
        sort(timePoints.begin(), timePoints.end());
        int minDiff = INT_MAX;
        for (int i = 1; i < timePoints.size(); i++) {
            minDiff = min(minDiff, calcDiff(timePoints[i - 1], timePoints[i]));
        }
        minDiff = min(minDiff, calcDiff(timePoints[0], timePoints.back()));
        return minDiff;
    }
    
    int calcDiff (string &a, string &b) {
        int aH = stoi(a.substr(0, 2)), 
            bH = stoi(b.substr(0, 2)),
            aM = stoi(a.substr(3, 2)),
            bM = stoi(b.substr(3, 2));
            
        int diff;
        
        if (bH == aH) {
            return bM - aM;
        }
        else {
            diff = (60 - aM) + bM + (bH - aH - 1) * 60;
        }
        return min(diff, 1440 - diff);
    }
};
```

