---
title: LeetCode 397. Integer Replacement
tags:
  - CPP
  - LeetCode
  - 算法
  - 递归
url: 754.html
id: 754
categories:
  - LeetCode
date: 2016-09-12 17:40:10
---
题目描述:

> Given a positive integer *n* and you can do operations as follow:
>
> 1. If *n* is even, replace *n* with `n/2`.
> 2. If *n* is odd, you can replace *n* with either `n + 1` or `n - 1`.
>
> What is the minimum number of replacements needed for *n* to become 1?
>
> **Example 1:**
>
> ```
> Input:
> 8
>
> Output:
> 3
>
> Explanation:
> 8 -> 4 -> 2 -> 1
> ```
>
> **Example 2:**
>
> ```
> Input:
> 7
>
> Output:
> 4
>
> Explanation:
> 7 -> 8 -> 4 -> 2 -> 1
> or
> 7 -> 6 -> 3 -> 2 -> 1
> ```

我一开始想用动态规划, 但是这个题的测试数据有INT_MAX这么大, 根本开不了这么大的数组, 所以不行. 说明这道题有一些小窍门. 仔细想想, n为偶数是直接除以2没有什么问题, 问题在于奇数时有两种情况, `(n+1)/2`与`(n-1)/2`恰好是相邻的两个数, 一个奇数一个偶数, 对于其中的偶数还是直接除以2, 但是奇数就要多一步加1或减1, 所以在选择加1还是减1时应该选择的是除以2后还是偶数的那一个. 

这道题因为数据是指数下降的, 所以最多迭代几十次, 递归与循环的性能差距不大, 用递归更好理解一点. 

当n等于INT_MAX时, 再加1会导致溢出, 所以下次递归选择次数相同的INT_MAX-1.

还有一个问题在于n等于3时的情况, `(n+1)`与`(n-1)/2`分别是4和2, 按照先前的规则应该选择4, 但实际上应该选择2, 我对于这种情况单独处理.

```cpp
class Solution {
public:
	int integerReplacement(int n) {
	    if(n == 1) return 0;
	    else if(n == 2) return 1;
	    else if(n == 4 || n == 3) return 2;
	    else if(n % 2 == 0) return integerReplacement(n / 2) + 1;
	    else if(n == INT_MAX) return integerReplacement(n - 1);
	    else{
	        return integerReplacement(((n - 1) / 2) % 2 ? (n + 1) : (n - 1)) + 1;
	    }
	}
};
```

