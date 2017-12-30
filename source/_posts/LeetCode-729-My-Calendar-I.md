---
title: LeetCode 729. My Calendar I
date: 2017-12-30 17:40:44
tags:
 - LeetCode
 - CPP
 - 算法
 - 二分搜索
categories:
 - LeetCode
---

Implement a `MyCalendar` class to store your events. A new event can be added if adding the event will not cause a double booking.

Your class will have the method, `book(int start, int end)`. Formally, this represents a booking on the half open interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.

A *double booking* happens when two events have some non-empty intersection (ie., there is some time that is common to both events.)

For each call to the method `MyCalendar.book`, return `true` if the event can be added to the calendar successfully without causing a double booking. Otherwise, return `false` and do not add the event to the calendar.

Your class will be called like this: 

```
MyCalendar cal = new MyCalendar();
MyCalendar.book(start, end)
```

**Example 1:**

```
MyCalendar();
MyCalendar.book(10, 20); // returns true
MyCalendar.book(15, 25); // returns false
MyCalendar.book(20, 30); // returns true
Explanation: 
The first event can be booked.  The second can't because time 15 is already booked by another event.
The third event can be booked, as the first event takes every time less than 20, but not including 20.

```

**Note:**

The number of calls to `MyCalendar.book` per test case will be at most `1000`.

In calls to `MyCalendar.book(start, end)`, `start` and `end` are integers in the range `[0, 10^9]`.

<!-- more -->

暴力解法：遍历已经booked的每一个区间判断是否有冲突。

```cpp
class MyCalendar {
    vector<pair<int, int>> booked;
public:
    MyCalendar() {
        
    }
    
    bool book(int start, int end) {
        auto interval = make_pair(start, end);
        for (auto &p : booked) {
            if (!notConflict(p, interval)) {
                return false;
            }
        }
        
        booked.push_back(interval);
        return true;
    }
    
    bool notConflict(pair<int,int> &p1, pair<int,int> &p2) {
        return (p1.first >= p2.second) || (p1.second <= p2.first);
    }
};
```

改进：使用二分搜索找出区间的应插入位置，判断前后是否有重叠。并且可以在插入后合并相邻的区间，因为我使用vector，所以删除区间会比较耗时。

```cpp
class MyCalendar {
    vector<pair<int, int>> booked;
public:
    MyCalendar() {
        
    }
    
    bool book(int start, int end) {
        auto interval = make_pair(start, end);
        if (booked.empty()) {
            booked.push_back(interval);
            return true;
        }
        auto iter = upper_bound(booked.begin(), booked.end(), interval);
    
        if (iter == booked.begin()) {
            if (!notConflict(*iter, interval))
                return false;
        }
        else if (iter == booked.end()) {
            if (!notConflict(*(iter - 1), interval)) 
                return false;
        }
        else if (!notConflict(*(iter - 1), interval) || !notConflict(*iter, interval)) {
            return false;
        }
        
        auto insert_iter = booked.insert(iter, interval);
        if (insert_iter == booked.begin()) {
            if (insert_iter->second == (insert_iter + 1)->first) {
                insert_iter->second = (insert_iter + 1)->second;
                booked.erase(insert_iter + 1);
            }
        }
        else if (insert_iter == booked.end() - 1) {
            if (insert_iter->first == (insert_iter - 1)->second) {
                insert_iter->first = (insert_iter - 1)->first;
                booked.erase(insert_iter - 1);
            }
        }
        else {
            if (insert_iter->second == (insert_iter + 1)->first) {
                insert_iter->second = (insert_iter + 1)->second;
                booked.erase(insert_iter + 1);
            }
            if (insert_iter->first == (insert_iter - 1)->second) {
                insert_iter->first = (insert_iter - 1)->first;
                booked.erase(insert_iter - 1);
            }
        }
        
        return true;
    }
    
    bool notConflict(pair<int,int> &p1, pair<int,int> &p2) {
        return (p1.first >= p2.second) || (p1.second <= p2.first);
    }
};
```

