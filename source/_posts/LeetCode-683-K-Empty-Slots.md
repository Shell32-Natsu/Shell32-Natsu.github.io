---
title: LeetCode 683. K Empty Slots
date: 2017-09-24 11:38:46
tags:
 - LeetCode
 - CPP
 - 二叉索引树BIT
 - 二分搜索
categories:
 - LeetCode
---

There is a garden with `N` slots. In each slot, there is a flower. The `N` flowers will bloom one by one in `N` days. In each day, there will be `exactly` one flower blooming and it will be in the status of blooming since then.

Given an array `flowers` consists of number from `1` to `N`. Each number in the array represents the place where the flower will open in that day.

For example, `flowers[i] = x` means that the unique flower that blooms at day `i` will be at position `x`, where `i` and `x` will be in the range from `1` to `N`.

Also given an integer `k`, you need to output in which day there exists two flowers in the status of blooming, and also the number of flowers between them is `k` and these flowers are not blooming.

If there isn't such day, output -1.

**Example 1:**

```
Input: 
flowers: [1,3,2]
k: 1
Output: 2
Explanation: In the second day, the first and the third flower have become blooming.

```

**Example 2:**

```
Input: 
flowers: [1,2,3]
k: 1
Output: -1

```

**Note:**

1. The given array will be in the range [1, 20000].

<!-- more -->

这道题是我上周才做过的Google内推OA题（这次Contest的另一道题681. Next Closest Time则是第一题，这是第二题，LC真是消息灵通啊）。不过有一点小不一样，就是Google的OA没有要求靠近两边的连续未开花花圃不算数。

LeetCode上这道题，用二叉堆（也就是STL里的`set`）能过，但是我觉得理论上的时间复杂度不太对（Google的OA要求是O(nlogn)的复杂度），最坏情况下我觉得是O(nklogn)，如果k比较大的话我就不太确定这个复杂度的问题了……

我当时做OA的时候是用的deque+二分搜索（时间很紧，而且当时还有点看错题），之所以用deque是因为它既可以随即访问（适用二分搜索）也可以常数复杂度实现插入删除，所以我用它来维护一个区间列表，每次搜索到开花所在区间，将其拆分后插入到原位置。在这个过程中判断区间长度是否为k。

```cpp
class Solution {
    int binarySearchInterval(deque<pair<int, int>> &intervals, int target) {
        int l = 0, r = intervals.size(), m = (r + l) / 2;
        while (l < r) {
            if (intervals[m].first <= target && intervals[m].second >= target) {
                return m;
            }
            else if (intervals[m].first > target) {
                r = m;
            }
            else {
                l = m + 1;
            }
            m = (l + r) / 2;
        }
        return -1;
    }
public:
    int kEmptySlots(vector<int>& flowers, int k) {
        int n = flowers.size();
        deque<pair<int, int>> intervals;
        intervals.push_back(make_pair(0, n - 1));
        
        for (int i = 0; i < n; i++) {
            int pos = flowers[i] - 1;
            int index = binarySearchInterval(intervals, pos);
            if (index == -1) break;
            auto interval = intervals[index];
            intervals.erase(intervals.begin() + index);
            if (pos - interval.first == k && interval.first != 0) {
                return i + 1;
            }
            if (interval.second - pos == k && interval.second != n - 1) {
                return i + 1;
            }
            if (pos + 1 <= interval.second)
                intervals.insert(intervals.begin() + index, make_pair(pos + 1, interval.second));
            if (interval.first <= pos - 1)
                intervals.insert(intervals.begin() + index, make_pair(interval.first, pos - 1));
        }
        return -1;
    }
};
```

但是这道题的更好解法是用二叉索引树（[BIT](http://www.cnblogs.com/pengzhen/p/4373491.html)）。讲真，我在LC上还没用过二叉索引树，当时做OA时想到一种什么树的数据结构可以高效的解决这种前缀和的问题但是没想到。BIT在可以允许更新元素的情况下在logn的复杂度内计算一个数组的前缀和，进而计算任意区间的元素和。而我们就是要找到长度为k和为0的区间。

```cpp
class BIT {
    vector<int> slots;
public:
    BIT(int n) {
        slots = vector<int>(n, 0);
    }
    
    int lowBit(int x) {
        return x & -x;
    }
    
    void update(int pos) {
        int p = pos;
        while (p < slots.size()) {
            slots[p]++;
            p = p + lowBit(p);
        }
    }
    
    int getPrefixSum(int pos) {
        if (pos == 0) return slots[0];
        int p = pos, sum = 0;
        while (p > 0) {
            sum += slots[p];
            p = p - lowBit(p);
        }
        return sum;
    }
    
    int getIntervalSum(int begin, int end) {
        return getPrefixSum(end) - getPrefixSum(begin);
    }
};

class Solution {
public:
    int kEmptySlots(vector<int>& flowers, int k) {
        BIT bit(flowers.size() + 1);
        vector<int> bloom(flowers.size() + 1, 0);
        for (int i = 0; i < flowers.size(); i++) {
            bit.update(flowers[i]);
            bloom[flowers[i]] = 1;
            if (flowers[i] - k - 1 > 0 && bloom[flowers[i] - k - 1] && bit.getIntervalSum(flowers[i] - k - 1, flowers[i] - 1) == 0) {
                return i + 1;
            }
            if (flowers[i] + k + 1 < flowers.size() + 1 && bloom[flowers[i] + k + 1] && bit.getIntervalSum(flowers[i], flowers[i] + k) == 0) {
                return i + 1;
            }
        }
        return -1;
    }
};
```

