---
title: LeetCode 149. Max Points on a Line
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 算法
url: 855.html
id: 855
categories:
  - LeetCode
date: 2016-10-08 19:17:13
---
题目描述:

> Given *n* points on a 2D plane, find the maximum number of points that lie on the same straight line.

寻找一个平面上最多有多少个点共线. 首先应该复杂度应该是O(n<sup>2</sup>)的, 因为要判断每一个点与其他点的关系(或者说判断是否在之前的点所连成的线上). 对每一个点, 计算与其他点的连线的斜率, 找出出现次数最多的斜率, 它的出现次数就是共线的点的个数(但是这里没有包括改点自己, 再加上重复点的问题, 所以最后要加上该点自己的出现次数). 使用一个hash表来保存斜率的出现次数即可.

还要注意对于连线斜率为无穷大的点来说(横坐标相同), 要单独处理.

```cpp
/**
 * Definition for a point.
 * struct Point {
 *     int x;
 *     int y;
 *     Point() : x(0), y(0) {}
 *     Point(int a, int b) : x(a), y(b) {}
 * };
 */
class Solution {
public:
    int maxPoints(vector<Point>& points) {
        if(points.size() < 2) return points.size();
        
        int maxNum = 2;
        for(int i = 0; i < points.size(); i++){
            unordered_map<double, int> slope;
            int num = 1, mmax = 0, infiniteSlope = 0;
            for(int j = 0; j < i; j++){
                if(points[i].x == points[j].x){
                    if(points[i].y == points[j].y){
                        num++;
                    }
                    else{
                        mmax = max(mmax, ++infiniteSlope);
                    }
                }
                else{
                    double k = (double)(points[i].y - points[j].y) / (points[i].x - points[j].x);
                    mmax = max(mmax, ++slope[k]);
                }
            }
            maxNum = max(maxNum, mmax + num);
        }
        return maxNum;
    }
};
```

