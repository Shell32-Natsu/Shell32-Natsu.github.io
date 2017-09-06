---
title: LeetCode 605. Can Place Flowers
date: 2017-08-25 08:51:27
tags:
 - LeetCode
 - CPP
 - 算法
 - 贪心
categories:
 - LeetCode
---

Suppose you have a long flowerbed in which some of the plots are planted and some are not. However, flowers cannot be planted in adjacent plots - they would compete for water and both would die.

Given a flowerbed (represented as an array containing 0 and 1, where 0 means empty and 1 means not empty), and a number **n**, return if **n** new flowers can be planted in it without violating the no-adjacent-flowers rule.

**Example 1:**

```
Input: flowerbed = [1,0,0,0,1], n = 1
Output: True

```

**Example 2:**

```
Input: flowerbed = [1,0,0,0,1], n = 2
Output: False

```

**Note:**

1. The input array won't violate no-adjacent-flowers rule.
2. The input array size is in the range of [1, 20000].
3. **n** is a non-negative integer which won't exceed the input array size.

<!-- more -->

-------------

使用贪心法求出最多能种多少支花。

```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        int maxNum = 0;
        for (int i = 0; i < flowerbed.size(); i++) {
            if (flowerbed[i] == 0) {
                if ((i > 0 && flowerbed[i - 1] == 1) || (i < flowerbed.size() - 1 && flowerbed[i + 1] == 1)) {
                    continue;
                }
                else {
                    flowerbed[i] = 1;
                    maxNum++;
                }
            }
        }
        return maxNum >= n;
    }
};
```

