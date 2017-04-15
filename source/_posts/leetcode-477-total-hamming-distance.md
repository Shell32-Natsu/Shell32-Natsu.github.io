---
title: LeetCode 477. Total Hamming Distance
tags:
  - CPP
  - LeetCode
  - 位运算
  - 算法
url: 1044.html
id: 1044
categories:
  - LeetCode
date: 2016-12-27 18:03:03
---
题目描述：

> The [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) between two integers is the number of positions at which the corresponding bits are different.
>
> Now your job is to find the total Hamming distance between all pairs of the given numbers.
>
> **Example:**
>
> ```
> Input: 4, 14, 2
>
> Output: 6
>
> Explanation: In binary representation, the 4 is 0100, 14 is 1110, and 2 is 0010 (just
> showing the four bits relevant in this case). So the answer will be:
> HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.
> ```
>
> **Note:**
>
> 1. Elements of the given array are in the range of `0 `to `10^9`
> 2. Length of the array will not exceed `10^4`.

跟 *461. Hamming Distance* 这道题类似，不过数量增加了。我们可以对int的每一位分别求HammingDistance再求和。n个二进制位中有i个0和j个1，那么它们两两组合成0与1的种类有i*j种。

```cpp
class Solution {
public:
    int totalHammingDistance(vector<int>& nums) {
        int ans = 0;
        for(int i = 0; i < 32; i++){
            int num[2] = {0, 0};
            for(auto j : nums){
                if(j & (1 << i))
                    num[1]++;
                else
                    num[0]++;
            }
            ans += (num[0] * num[1]);
        }
        return ans;
    }
};
```

