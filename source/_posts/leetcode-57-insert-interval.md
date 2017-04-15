---
title: LeetCode 57. Insert Interval
tags:
  - CPP
  - LeetCode
  - 算法
url: 554.html
id: 554
categories:
  - LeetCode
date: 2016-08-03 18:04:10
---
题目描述:

>Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).
>
>You may assume that the intervals were initially sorted according to their start times.
>
>Example 1:
>
>Given intervals `[1,3],[6,9]`, insert and merge `[2,5]` in as `[1,5],[6,9]`.
>
>Example 2:
>
>Given `[1,2],[3,5],[6,7],[8,10],[12,16]`, insert and merge `[4,9]` in as `[1,2],[3,10],[12,16]`.
>
>This is because the new interval `[4,9]` overlaps with `[3,5],[6,7],[8,10]`.

向一个已经按照start排好序的区间数组中插入新区间, 问题分为两个部分:

1. 找到插入位置
2. 确定区间是否需要合并, 如何合并

用语言来说还是不太好说清楚, 还是看注释吧.

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
        vector<Interval> insert(vector<Interval>& intervals, Interval newInterval) {
            vector<Interval> ret;
            if(intervals.empty()){ // 如果intervals为空就返回只包含newInterval的数组
                ret.push_back(newInterval);
                return ret;
            }
            int i;
            // 以下循环用于跳过所有end小于newInterval.start, 也就是所有小于newInterval并且
            // 与newInterval没有交集的区间
            for(i = 0; i < intervals.size() && intervals[i].end < newInterval.start; i++);
            // 如果i == intervals.size(), 说明所有元素都小于newInterval, 把它插入到最后即可
            if(i == intervals.size()){
                intervals.push_back(newInterval);
                return intervals;
            }
            int j = i;
            // 将要插入的新区间
            Interval t;
            // 此时j = i, intervals[j]是end >= newInterval.start的第一个元素,但它们的start
            // 关系还不确定, 因此要插入的start值是intervals[j].start和newInterval.start中较
            // 小的一个
            t.start = min(intervals[j].start, newInterval.start);
            // 寻找start > newInterval.end的元素, 该元素之前的元素是要与newInterval合并的区间
            for(; j < intervals.size() && intervals[j].start <= newInterval.end; j++);
            // 如果j == intervals.size()说明i之后的所有区间都要与newInterval合并,
            // 所以t.end是newInterval.end和intervals.back().end中较大的值.
            // 然后删除intervals中i之后的元素(包括i, 因为i也与newInterval有交集),
            // 最后插入t
            if(j == intervals.size()){
                t.end = max(newInterval.end, intervals.back().end);
                intervals.erase(intervals.begin() + i, intervals.end());
                intervals.push_back(t);
                return intervals;
            }
            // 否则intervals[j - 1]是start <= newInterval.end的最后一个元素, 也就是与newInterval
            // 有交集的最后一个元素, t.end的值是newInterval.end和intervals[j - 1].end中较大的.
            // 从intervals中移除下标在[i, j-1]范围内的元素, 在i位置插入新区间t.
            else{
                t.end = max(newInterval.end, intervals[j - 1].end);
                intervals.erase(intervals.begin() + i, intervals.begin() + j);
                intervals.insert(intervals.begin() + i, t);
            }
            return intervals;
        }
    };