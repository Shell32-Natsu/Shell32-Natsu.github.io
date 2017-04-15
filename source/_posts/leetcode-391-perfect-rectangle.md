---
title: LeetCode 391. Perfect Rectangle
tags:
  - CPP
  - LeetCode
  - 算法
url: 684.html
id: 684
categories:
  - LeetCode
date: 2016-08-30 18:14:26
---
题目描述:

> Given N axis-aligned rectangles where N > 0, determine if they all together form an exact cover of a rectangular region.
>
> Each rectangle is represented as a bottom-left point and a top-right point. For example, a unit square is represented as [1,1,2,2]. (coordinate of bottom-left point is (1, 1) and top-right point is (2, 2)).
>
> ![img](https://leetcode.com/static/images/problemset/rectangle_perfect.gif)
>
> **Example 1:**
>
> ```
> rectangles = [
>   [1,1,3,3],
>   [3,1,4,2],
>   [3,2,4,4],
>   [1,3,2,4],
>   [2,3,3,4]
> ]
>
> Return true. All 5 rectangles together form an exact cover of a rectangular region.
>
> ```
>
> ![img](https://leetcode.com/static/images/problemset/rectangle_separated.gif)
>
> **Example 2:**
>
> ```
> rectangles = [
>   [1,1,2,3],
>   [1,3,2,4],
>   [3,1,4,2],
>   [3,2,4,4]
> ]
>
> Return false. Because there is a gap between the two rectangular regions.
>
> ```
>
> ![img](https://leetcode.com/static/images/problemset/rectangle_hole.gif)
>
> **Example 3:**
>
> ```
> rectangles = [
>   [1,1,3,3],
>   [3,1,4,2],
>   [1,3,2,4],
>   [3,2,4,4]
> ]
>
> Return false. Because there is a gap in the top center.
>
> ```
>
> ![img](https://leetcode.com/static/images/problemset/rectangle_intersect.gif)
>
> **Example 4:**
>
> ```
> rectangles = [
>   [1,1,3,3],
>   [3,1,4,2],
>   [1,3,2,4],
>   [2,2,4,4]
> ]
>
> Return false. Because two of the rectangles overlap with each other.
> ```

一开始我对于这道题的思路是这样的:

* 第一步, 遍历所有小的矩形计算它们的面积之和并且计算出最终应该拼成的大矩形的端点位置(左下角和右上角), 如果面积之和与大矩形的面积不相等, 那么就肯定不可能拼成.
* 第二步, 判断小矩形之间是不是有重叠.

问题在于第二步, 判断矩形是否有重叠比较容易, 但是两两比较要求O(n<sup>2</sup>)的时间复杂度, 超时了. 

如果不对小矩形两两判断是否有重叠而使用累积的办法看某个小矩形与之前所有小矩形拼成的多边形是否有重合的话, 实现起来相当复杂, 所以应该有更好的方法.

在Discuss中看到了一个相当妙的办法<https://discuss.leetcode.com/topic/56081/easy-understanding-o-n-python-solution>, 基本思想就是如果最终能拼成大矩形, 那么除了大矩形的四个顶点只出现一次外, 其他的每个小矩形的顶点只能出现两次或者四次. 所以就可以用一个map来记录小矩形的每个顶点出现的次数, 然后再遍历这个map判断其中的顶点是不是都满足条件. 时间复杂度(O(nlogn + n)).

```cpp
class Solution {
public:
    bool isRectangleCover(vector<vector<int>>& rectangles) {
        int n = rectangles.size(), areaSum = 0;
        vector<int> finalRect(4);
        map<pair<int, int>, int> corners;
        finalRect[0] = finalRect[1] = INT_MAX, finalRect[2] = finalRect[3] = INT_MIN;
        vector<int> areas(n, 0);
        for(int i = 0; i < n; i++){
            areas[i] = (rectangles[i][2] - rectangles[i][0]) * (rectangles[i][3] - rectangles[i][1]);
            vector<pair<int, int>> corner = {{rectangles[i][0], rectangles[i][1]}, {rectangles[i][2], rectangles[i][3]}, {rectangles[i][0], rectangles[i][3]}, {rectangles[i][2], rectangles[i][1]}};
            for(int j = 0; j < 4; j++){
                if(corners.count(corner[j])){
                    corners[corner[j]]++;
                }
                else{
                    corners[corner[j]] = 1;
                }
            }
            finalRect[0] = min(finalRect[0], rectangles[i][0]);
            finalRect[1] = min(finalRect[1], rectangles[i][1]);
            finalRect[2] = max(finalRect[2], rectangles[i][2]);
            finalRect[3] = max(finalRect[3], rectangles[i][3]);
            areaSum += areas[i];
        }
        int finalArea = (finalRect[2] - finalRect[0]) * (finalRect[3] - finalRect[1]);
        if(areaSum != finalArea) return false;
        
        for(auto i = corners.begin(); i != corners.end(); i++){
            if(((i->first.first == finalRect[0] && i->first.second == finalRect[1]) || (i->first.first == finalRect[2] && i->first.second == finalRect[3]) || (i->first.first == finalRect[0] && i->first.second == finalRect[3]) || (i->first.first == finalRect[2] && i->first.second == finalRect[1]))){
                if(i->second != 1){
                    return false;
                }
            }
            else if(i->second == 2 || i->second == 4){
                continue;
            }
            else{
                return false;
            }
        }
        return true;
    }
};
```

