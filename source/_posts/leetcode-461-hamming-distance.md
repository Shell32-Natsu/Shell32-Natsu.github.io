---
title: LeetCode 461. Hamming Distance
tags:
  - CPP
  - LeetCode
  - 位运算
  - 算法
url: 1042.html
id: 1042
categories:
  - LeetCode
date: 2016-12-27 18:02:10
---
题目描述：

> The [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) between two integers is the number of positions at which the corresponding bits are different.
>
> Given two integers `x` and `y`, calculate the Hamming distance.
>
> **Note:**
> 0 ≤ `x`, `y` < 231.
>
> **Example:**
>
> ```
> Input: x = 1, y = 4
>
> Output: 2
>
> Explanation:
> 1   (0 0 0 1)
> 4   (0 1 0 0)
>        ↑   ↑
>
> The above arrows point to positions where the corresponding bits are different.
> ```

把两个数异或之后看结果有多少个1.

```cpp
class Solution {
public:
    int hammingDistance(int x, int y) {
        unsigned int z = x ^ y;
        int ans = 0;
        while(z > 0){
            if(z & 1) ans++;
            z >>= 1;
        }
        return ans;
    }
};
```

