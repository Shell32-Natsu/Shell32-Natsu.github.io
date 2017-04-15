---
title: LeetCode 462. Minimum Moves to Equal Array Elements II
tags:
  - CPP
  - LeetCode
  - 算法
url: 984.html
id: 984
categories:
  - LeetCode
date: 2016-12-03 23:30:23
---
 题目描述:

> Given a **non-empty** integer array, find the minimum number of moves required to make all array elements equal, where a move is incrementing a selected element by 1 or decrementing a selected element by 1.
>
> You may assume the array's length is at most 10,000.
>
> **Example:**
>
> ```
> Input:
> [1,2,3]
>
> Output:
> 2
>
> Explanation:
> Only two moves are needed (remember each move increments or decrements one element):
>
> [1,2,3]  =>  [2,2,3]  =>  [2,2,2]
> ```

这道题我的首先思路是先找到最终每个元素所等于的值再计算需要的步数.

先考虑三个数$a_1 \ge a_2 \ge a_3$, 我们要找一个数$n$使得$|a_1-n|+|a_2-n|+|a_3-n|$最小. 比较容易想到$n$应该在区间$[a_1,a_3]$之间, 所以我们假设一个新的$n$, 满足$a_1 \ge a_2+n \ge a_3$, $a_2+n$就是我们要找的值. 这时我们要使$[a_1-(a_2+n)] + |n| + [(a_2 + n) - a_3]$最小.
$$
[a_1-(a_2+n)] + |n| + [(a_2 + n) - a_3] = a_1 - a_3 + |n|
$$
发现在$n=0$的时候才能取到最小值$a_1 - a_3$, 所以最终每个元素应有的值是原来所有元素的值的中位数.

以上是奇数的情况, 那么偶数的时候中位数有两个候选. 我们再假设$a_1 \ge a_2 \ge a_3 \ge a_4$, 当选择$a_2$作为最后的目标时, 总步数为$(a_1 - a_2) + (a_2 - a_3) + (a_2  - a_4) = a_1 - a_3 +a_2 - a_4$, 当选择$a_3$作为最后目标时, 总步数为$(a_1 - a_3) + (a_2 - a_3) + (a_3 - a_4) = a_1 - a_3 + a_2 - a_4$, 两种情况是相同, 因此我们只要随便选一个就可以了.

关于找到中位数, 不需要使用`sort`对所有数据进行排序, 可以使用`nth_element`来节省时间.

```cpp
class Solution {
public:
    int minMoves2(vector<int>& nums) {
        int midIndex = nums.size() / 2;
        nth_element(nums.begin(), nums.begin() + midIndex, nums.end());
        int mid = nums[midIndex];
        int ans = 0;
        for(auto i : nums){
            ans += abs(i - mid);
        }
        return ans;
    }
};
```


