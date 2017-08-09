---
title: LeetCode 593. Valid Square
date: 2017-08-08 19:06:43
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

Given the coordinates of four points in 2D space, return whether the four points could construct a square.

The coordinate (x,y) of a point is represented by an integer array with two integers.

**Example:**

```
Input: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
Output: True
```

Note:

1. All the input integers are in the range [-10000, 10000].
2. A valid square has four equal sides with positive length and four equal angles (90-degree angles).
3. Input points have no order.

<!-- more -->

-----------

判断四个点能不能组成正方形，我是直接算了四个点两两之间的距离（共六个），其中应该有四个边和两个对角线，判断这六个长度是不是这个规律就可以了。

```cpp
class Solution {
public:
    bool validSquare(vector<int>& p1, vector<int>& p2, vector<int>& p3, vector<int>& p4) {
        vector<int> length;
        length.push_back(getLength(p1, p2));
        length.push_back(getLength(p1, p3));
        length.push_back(getLength(p1, p4));
        length.push_back(getLength(p2, p3));
        length.push_back(getLength(p2, p4));
        length.push_back(getLength(p3, p4));
        sort(length.begin(), length.end());
        return (length[0] == length[1] && length[0] == length[2] && length[0] == length[3] && length[4] == length[5] && length[3] != length[4]);
    }
    
    int getLength(vector<int>& p1, vector<int>& p2) {
        return (p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]);
    }
    
};
```

