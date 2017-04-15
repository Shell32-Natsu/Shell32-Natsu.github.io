---
title: LeetCode 435. Non-overlapping Intervals
tags:
  - CPP
  - LeetCode
  - 算法
url: 938.html
id: 938
categories:
  - LeetCode
date: 2016-11-02 17:10:21
---
题目描述:

> Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
>
> **Note:**
>
> 1. You may assume the interval's end point is always bigger than its start point.
> 2. Intervals like [1,2] and [2,3] have borders "touching" but they don't overlap each other.
>
> **Example 1:**
>
> ```
> Input: [ [1,2], [2,3], [3,4], [1,3] ]
>
> Output: 1
>
> Explanation: [1,3] can be removed and the rest of intervals are non-overlapping.
>
> ```
>
> **Example 2:**
>
> ```
> Input: [ [1,2], [1,2], [1,2] ]
>
> Output: 2
>
> Explanation: You need to remove two [1,2] to make the rest of intervals non-overlapping.
>
> ```
>
> **Example 3:**
>
> ```
> Input: [ [1,2], [2,3] ]
>
> Output: 0
>
> Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
> ```

先对区间按照左端点值, 右端点值的优先级从小到大排序, 然后从前到后依次处理. 对于前后两个区间a和b(它们并不一定相邻)来说, 有两种可能的情况:

1. 两个区间没有重叠. 这样的话b之后的区间也不可能与a有重叠, 不需要做处理.
2. 两个区间有重叠. 这又分两种情况: 1. a完全"盖住"了b; 2. a没有完全"盖住"b. 对于前者, 应该移除的是a区间, 因为a比b要"大", 之后的区间如果与b有重叠则一定与a有重叠, 但是与a有重叠不一定与b有重叠. 对于后者, 应该移除区间b, 因为与a有重叠则必然与b有重叠, 但是与b有重叠不一定与a有重叠.

a应该始终保存上一个没有被移除的区间.

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
    int eraseOverlapIntervals(vector<Interval>& intervals) {
        int ans = 0;
        if(intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end(), [&](Interval &a, Interval &b){
            if(a.start == b.start){
                return a.end < b.end;
            }
            return a.start < b.start;
        });
        int p = 0;
        for(int i = 1; i < intervals.size(); i++){
            if(overlap(intervals[p], intervals[i])){
                if(intervals[i].end < intervals[p].end){
                    p = i;
                }
                ans++;
            }
            else{
                p = i;
            }
        }
        return ans;
    }
    
    bool overlap(Interval &a, Interval &b){
        return !(a.start >= b.end || a.end <= b.start);
    }
};
```

