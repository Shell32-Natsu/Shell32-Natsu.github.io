---
title: LeetCode 436. Find Right Interval
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 哈希表
  - 算法
url: 940.html
id: 940
categories:
  - LeetCode
date: 2016-11-02 17:48:50
---
题目描述:

> Given a set of intervals, for each of the interval i, check if there exists an interval j whose start point is bigger than or equal to the end point of the interval i, which can be called that j is on the "right" of i.
>
> For any interval i, you need to store the minimum interval j's index, which means that the interval j has the minimum start point to build the "right" relationship for interval i. If the interval j doesn't exist, store -1 for the interval i. Finally, you need output the stored value of each interval as an array.
>
> **Note:**
>
> 1. You may assume the interval's end point is always bigger than its start point.
> 2. You may assume none of these intervals have the same start point.
>
> **Example 1:**
>
> ```
> Input: [ [1,2] ]
>
> Output: [-1]
>
> Explanation: There is only one interval in the collection, so it outputs -1.
>
> ```
>
> **Example 2:**
>
> ```
> Input: [ [3,4], [2,3], [1,2] ]
>
> Output: [-1, 0, 1]
>
> Explanation: There is no satisfied "right" interval for [3,4].
> For [2,3], the interval [3,4] has minimum-"right" start point;
> For [1,2], the interval [2,3] has minimum-"right" start point.
>
> ```
>
> **Example 3:**
>
> ```
> Input: [ [1,4], [2,3], [3,4] ]
>
> Output: [-1, 2, -1]
>
> Explanation: There is no satisfied "right" interval for [1,4] and [3,4].
> For [2,3], the interval [3,4] has minimum-"right" start point.
> ```

使用排序+二分搜索. 要注意记录排序之前每个interval的下标.

```cpp
/**
 * Definition for an interval.
 * struct Interval {
 *     int start;
 *     int end;
 *     Interval() : start(0), end(0) {}
 *     Interval(int s, int e) : start(s), end(e) {}
 * };
 */
class Solution {
public:
    vector<int> findRightInterval(vector<Interval>& intervals) {
        vector<pair<int, int>> maps(intervals.size());
        for(int i = 0; i < intervals.size(); i++){
            maps[i].first = intervals[i].start;
            maps[i].second = i;
        }
        
        sort(maps.begin(), maps.end(), [&](pair<int, int> &a, pair<int, int> &b){
            return a.first < b.first;
        });
        
        vector<int> ans(intervals.size());
        for(int i = 0; i < intervals.size(); i++){
            int target = intervals[i].end;
            ans[i] = binSearch(maps, 0, target);
        }
        return ans;
    }
    
    int binSearch(vector<pair<int, int>> &m, int begin, int target){
        int left = begin, right = m.size(), mid = (left + right) / 2;
        while(left < right){
            if(m[mid].first == target){
                return m[mid].second;
            }
            else if(m[mid].first < target){
                left = mid + 1;
            }
            else{
                right = mid;
            }
            mid = (left + right) / 2;
        }
        return -1;
    }
};
```

或者可以使用hash表.

```cpp
/**
 * Definition for an interval.
 * struct Interval {
 *     int start;
 *     int end;
 *     Interval() : start(0), end(0) {}
 *     Interval(int s, int e) : start(s), end(e) {}
 * };
 */
class Solution {
public:
    vector<int> findRightInterval(vector<Interval>& intervals) {
        unordered_map<int, int> maps;
        for(int i = 0; i < intervals.size(); i++){
            maps[intervals[i].start] = i;
        }
        vector<int> ans(intervals.size());
        for(int i = 0; i < intervals.size(); i++){
            ans[i] = maps.count(intervals[i].end) ? maps[intervals[i].end] : -1;
        }
        return ans;
    }
};
```

