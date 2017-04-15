---
title: LeetCode 452. Minimum Number of Arrows to Burst Balloons
tags:
  - CPP
  - LeetCode
  - 算法
  - 贪心
url: 953.html
id: 953
categories:
  - LeetCode
date: 2016-11-07 11:00:20
---
题目描述:

> There are a number of spherical balloons spread in two-dimensional space. For each balloon, provided input is the start and end coordinates of the horizontal diameter. Since it's horizontal, y-coordinates don't matter and hence the x-coordinates of start and end of the diameter suffice. Start is always smaller than end. There will be at most 104 balloons.
>
> An arrow can be shot up exactly vertically from different points along the x-axis. A balloon with xstart and xend bursts by an arrow shot at x if xstart ≤ x ≤ xend. There is no limit to the number of arrows that can be shot. An arrow once shot keeps travelling up infinitely. The problem is to find the minimum number of arrows that must be shot to burst all balloons.
>
> **Example:**
>
> ```
> Input:
> [[10,16], [2,8], [1,6], [7,12]]
>
> Output:
> 2
>
> Explanation:
> One way is to shoot one arrow for example at x = 6 (bursting the balloons [2,8] and [1,6]) and another arrow at x = 11 (bursting the other two balloons).
> ```

基本思路是每次尽可能多的刺破气球, 所以一开始从最左边的气球的右边缘发射一支箭, 否则最左边的气球就无法刺破了, 这样也能保证刺破尽可能多的气球. 

但是问题在于如何判断哪个气球在"最左边", 不能以左边缘来进行判断, 因为有这种情况: `(1,10),(2,5)`, 第一支箭应该从`x=5`发出而不是`x=10`, 所以排序时应该使用每个气球的右边缘来进行排序.

```cpp
class Solution {
public:
    int findMinArrowShots(vector<pair<int, int>>& points) {
        if(points.empty()) return 0;
        sort(points.begin(), points.end(), [](pair<int, int> &a, pair<int, int> &b){
            return a.second < b.second;
        });
        int ans = 1, arrow = points[0].second;
        for(int i = 1; i < points.size(); i++){
            if(points[i].first > arrow){
                ans++;
                arrow = points[i].second;
            }
        }
        return ans;
    }
};
```

