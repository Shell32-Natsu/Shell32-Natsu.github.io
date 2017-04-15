---
title: LeetCode 56. Merge Intervals
tags:
  - CPP
  - LeetCode
  - 算法
url: 552.html
id: 552
categories:
  - LeetCode
date: 2016-08-03 17:25:03
---
题目描述:

> Given a collection of intervals, merge all overlapping intervals.
> 
> For example,
>
> Given `[1,3],[2,6],[8,10],[15,18]`,
>
> return `[1,6],[8,10],[15,18]`.

合并(闭)区间, 区间以对象的形式给出. 首先将输入的区间数组按照`start`从小到大排序, 然后先取第一个元素放入结果集中, 从第二个元素开始遍历. 取当前区间为`cur`, 结果集中的最后一个元素为`pre`. 如果`cur.start > pre.end`, 说明`cur`与`pre`并无交集, 由于有序, 所以`cur`以后的区间与`pre`也都没有交集, 所以可以将`cur`放入结果集中. 如果`cur.start <= pre.end`, 说明有交集, 由于必然存在`cur.start >= pre.start`, 所以新区间的`start`等于`pre.start`, 只要考虑`cur.end`与`pre.end`的大小关系, 如果`cur.end <= pre.end`, 那么新区间与`pre`相同; 如果`cur.end > pre.end`那么要把`pre`也就是结果集的最后一个区间的`end`修改为`cur.end`.

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
        vector<Interval> merge(vector<Interval>& intervals) {
            vector<Interval> ret;
            if(intervals.empty()) return ret;
            sort(intervals.begin(), intervals.end(), [=](Interval &a, Interval &b){
                return a.start < b.start;
            });
            ret.push_back(intervals[0]);
            for(int i = 1; i < intervals.size(); i++){
                Interval cur = intervals[i], pre = ret.back();
                if(cur.start > pre.end){
                    ret.push_back(cur);
                }
                else{
                    if(cur.end > pre.end){
                        ret.back().end = cur.end;
                    }
                }
            }
            return ret;
        }
    };