---
title: LeetCode 390. Elimination Game
tags:
  - CPP
  - LeetCode
  - 算法
  - 递归
url: 1091.html
id: 1091
categories:
  - LeetCode
date: 2017-01-13 16:47:01
---
题目描述：

> There is a list of sorted integers from 1 to *n*. Starting from left to right, remove the first number and every other number afterward until you reach the end of the list.
>
> Repeat the previous step again, but this time from right to left, remove the right most number and every other number from the remaining numbers.
>
> We keep repeating the steps again, alternating left to right and right to left, until a single number remains.
>
> Find the last number that remains starting with a list of length *n*.
>
> **Example:**
>
> ```
> Input:
> n = 9,
> 1 2 3 4 5 6 7 8 9
> 2 4 6 8
> 2 6
> 6
>
> Output:
> 6
> ```

这道题我一开始认为会有一个公式来直接计算出最后一个剩下的数是多少，然后又尝试DP从n-1推出n，都没想出来，最后采用的是递归的方法。对于n来说，当n为偶数时，经过一次处理后剩下`n/2`个数；当为n奇数时，经过一次处理后剩下`(n-1)/2`个数，把剩下的数的个数作为下一次处理的输入（假设我们的每次处理返回的是数的下标而不是数的具体值），得到的结果为m，那么我们只要把下标m恢复为本次处理的下标即可。

那么如何回复呢？同样分奇偶进行分类，当n为奇数时，举个例子：

```
Index: 0 1 2 3 4
Value: 1 2 3 4 5
Index: _ 0 _ 1 _
Value: _ 2 _ 4 _
```

无论处理方向正反得到的结果是一样的。可以看出这么一个映射：

```
m
0 => 1
1 => 3
2 => 5
...
```

所以`m * 2 + 1`就是本次处理的结果中下标为m的数在本次处理之前的下标。

当m为奇数时有类似的规律，只不过要分处理正（从头到尾）反（从尾到头）方向来讨论。对于正向来说，仍然是`m * 2 + 1`，对于反向来说则是`m * 2`。

递归终止条件显然为`n==1`时返回0。每次递归时要对处理方向取反。

```cpp
class Solution {
    const int L2R = 1, R2L = -1;
    
public:
    int lastRemaining(int n) {
        return lastRemainingImpl(n, L2R) + 1;
    }
    
    int lastRemainingImpl(int n, int direction){
        if(n == 1){
            return 0;
        }
        
        int t = lastRemainingImpl(n % 2 ? (n - 1) / 2 : n / 2, -direction);
        if(n % 2 || direction == L2R){
            return t * 2 + 1;
        }
        else{
            return t * 2;
        }
    }
};
```

