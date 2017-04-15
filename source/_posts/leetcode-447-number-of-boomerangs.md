---
title: LeetCode 447. Number of Boomerangs
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 算法
url: 951.html
id: 951
categories:
  - LeetCode
date: 2016-11-07 10:29:12
---
题目描述:

> Given *n* points in the plane that are all pairwise distinct, a "boomerang" is a tuple of points `(i, j, k)` such that the distance between `i`and `j` equals the distance between `i` and `k` (**the order of the tuple matters**).
>
> Find the number of boomerangs. You may assume that *n* will be at most **500** and coordinates of points are all in the range **[-10000, 10000]**(inclusive).
>
> **Example:**
>
> ```
> Input:
> [[0,0],[1,0],[2,0]]
>
> Output:
> 2
>
> Explanation:
> The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]]
> ```

~~这道题似乎还没有什么好解法, 现在Runtime1368ms都可以beats 100%的C++提交......~~

现在已经不是了, 1000多ms的Runtime算是比较慢啦, 但是我暂时还没有时间来搞这道题......

使用双重循环+哈希表. 如果认为unordered_map的查询复杂度是O(1), 总体复杂度是O(n^2).

```cpp
class Solution {
public:
    int numberOfBoomerangs(vector<pair<int, int>>& points) {
        int ans = 0;
        for(int i = 0; i < points.size(); i++){
            unordered_map<long long, int> distance;
            for(int j = 0; j < points.size(); j++){
                if(j == i) continue;
                long long d = getDistance(points[i], points[j]);
                if(distance.count(d)){
                    ans += 2 * distance[d];
                }
                distance[d]++;
            }
        }
        return ans;
    }
    
    long long getDistance(pair<int, int> &p1, pair<int, int> &p2){
        return (long long)(p1.first - p2.first) * (long long)(p1.first - p2.first) 
             + (long long)(p1.second - p2.second) * (long long)(p1.second - p2.second);
    }
};
```
