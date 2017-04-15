---
title: LeetCode 554. Brick Wall
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 算法
url: 1198.html
id: 1198
categories:
  - LeetCode
date: 2017-04-09 17:17:29
---
题目描述：

> There is a brick wall in front of you. The wall is rectangular and has several rows of bricks. The bricks have the same height but different width. You want to draw a vertical line from the **top** to the **bottom** and cross the **least** bricks.
>
> The brick wall is represented by a list of rows. Each row is a list of integers representing the width of each brick in this row from left to right.
>
> If your line go through the edge of a brick, then the brick is not considered as crossed. You need to find out how to draw the line to cross the least bricks and return the number of crossed bricks.
>
> **You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.**
>
> **Example:**
>
> ```
> Input: 
> [[1,2,2,1],
> [3,1,2],
> [1,3,2],
> [2,4],
> [3,1,2],
> [1,3,1,1]]
> Output: 2
> Explanation: 
> ```
>
> **Note:**
>
> 1. The width sum of bricks in different rows are the same and won't exceed INT_MAX.
> 2. The number of bricks in each row is in range [1,10,000]. The height of wall is in range [1,10,000]. Total number of bricks of the wall won't exceed 20,000.

虽然行数与每一行的砖块数都可能达到10000，但是总的砖块数最大只有20000，又因为总的砖块间缝隙的数量一定小于砖块总数，所以可以用Hash表来记录每一个出现缝隙的位置一共出现了几次缝隙，出现缝隙次数最多的位置就是穿过砖块数最少的位置。

```cpp
class Solution {
public:
    int leastBricks(vector<vector<int>>& wall) {
        if (wall.empty()) return 0;
        int row = wall.size();
        unordered_map<int, int> occurTimes;
        int width;
        for (int i = 0; i < row; i++) {
            int sum = 0;
            for (auto j : wall[i]) {
                sum += j;
                occurTimes[sum]++;
            }
            width = sum;
        }
        occurTimes[width] = 0;
        int maxOccur = 0;
        for (auto &i : occurTimes) {
            maxOccur = max(maxOccur, i.second);
        }
        return row - maxOccur;
    }
};
```