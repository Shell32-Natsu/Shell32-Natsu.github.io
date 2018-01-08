---
title: LeetCode 759. Employee Free Time
date: 2018-01-07 10:19:17
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

We are given a list `schedule` of employees, which represents the working time for each employee.

Each employee has a list of non-overlapping `Intervals`, and these intervals are in sorted order.

Return the list of finite intervals representing **common, positive-length free time** for *all* employees, also in sorted order.

**Example 1:**

```
Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
Explanation:
There are a total of three employees, and all common
free time intervals would be [-inf, 1], [3, 4], [10, inf].
We discard any intervals that contain inf as they aren't finite.
```

**Example 2:**

```
Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
Output: [[5,6],[7,9]]
```

(Even though we are representing `Intervals` in the form `[x, y]`, the objects inside are `Intervals`, not lists or arrays. For example, `schedule[0][0].start = 1, schedule[0][0].end = 2`, and `schedule[0][0][0]` is not defined.)

Also, we wouldn't include intervals like [5, 5] in our answer, as they have zero length.

**Note:**

1. `schedule` and `schedule[i]` are lists with lengths in range `[1, 50]`.
2. `0 <= schedule[i].start < schedule[i].end <= 10^8`.

<!-- more -->

对于每一个区间，遍历现有的区间，找到有重叠的，合并并删除之，最后再插入进现有区间。

```cpp
struct comp {
    bool operator() (const Interval& lhs, const Interval& rhs) const
    {return lhs.start < rhs.start;}
};

class Solution {
public:
    vector<Interval> employeeFreeTime(vector<vector<Interval>>& avails) {
        set<Interval, comp> s;
        for (auto & employee: avails) {
            for (auto &avail : employee) {
                Interval toInsert = avail;
                vector<Interval> toDelete;
                for (auto &Int : s) {
                    if (overlap(Int, toInsert)) {
                        toInsert.start = min(toInsert.start, Int.start);
                        toInsert.end = max(toInsert.end, Int.end);
                        toDelete.push_back(Int);
                    }
                }
                for (auto &Int : toDelete) {
                    s.erase(Int);
                }
                s.insert(toInsert);
            }
        }

        vector<Interval> ans;
        auto iter = s.begin();
        int cnt = 1;
        Interval prev = *iter;
        iter++;
        while (cnt < s.size()) {
            ans.emplace_back(prev.end, iter->start);
            prev = *iter;
            cnt++;
            iter++;
        }
        return ans;
    }

    bool overlap (const Interval& a, const Interval& b) {
        return !(a.end < b.start || a.start > b.end);
    }
};
```

