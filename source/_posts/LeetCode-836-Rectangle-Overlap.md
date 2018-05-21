---
title: LeetCode 836. Rectangle Overlap
date: 2018-05-21 16:37:10
tags:
 - LeetCode
 - 算法
categories:
 - LeetCode
---

A rectangle is represented as a list `[x1, y1, x2, y2]`, where `(x1, y1)` are the coordinates of its bottom-left corner, and `(x2, y2)` are the coordinates of its top-right corner.

Two rectangles overlap if the area of their intersection is positive.  To be clear, two rectangles that only touch at the corner or edges do not overlap.

Given two rectangles, return whether they overlap.

**Example 1:**

```
Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]
Output: true
```

**Example 2:**

```
Input: rec1 = [0,0,1,1], rec2 = [1,0,2,1]
Output: false
```

**Notes:**

1. Both rectangles `rec1` and `rec2` are lists of 4 integers.
2. All coordinates in rectangles will be between `-10^9 `and` 10^9`.

 <!-- more -->

判断两个矩形是否有相交，反过来思考什么条件下两个矩形不相交比较简单。如果

- 一个矩形的下边比另一个上边大，那么它们不相交
- 一个矩形的左边比另一个右边大，那么它们不相交

反之它们相交。

```cpp
class Solution {
public:
    bool isRectangleOverlap(vector<int>& rec1, vector<int>& rec2) {
        if ((rec1[1] >= rec2[3] || rec2[1] >= rec1[3]) || (rec1[0] >= rec2[2] || rec2[0] >= rec1[2]))
            return false;
        return true;
    }
};
```

