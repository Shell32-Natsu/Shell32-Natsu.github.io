---
title: LeetCode 204. Count Primes
tags:
  - CPP
  - LeetCode
  - 算法
url: 1009.html
id: 1009
categories:
  - LeetCode
date: 2016-12-06 18:46:51
---
题目描述:

> **Description:**
>
> Count the number of prime numbers less than a non-negative number, **n**.

使用筛法, 从小到大剔除每个遇到的素数的小于n的倍数, 直到$\sqrt n$, 每剔除一个就将素数个数减1. sum一开始减2是为了去掉1和n自身.

```cpp
class Solution {
public:
	int countPrimes(int n) {
	    if(n <= 1) return 0;
		vector<int> s(n, 0);
		int sum = n - 2;
		for (int i = 2; i * i < n; i++) {
		    if(s[i]) continue;
			for (int j = i; i * j < n; j++) {
			    int index = i * j;
			    if(!s[index]) {
			        sum--;
				    s[index] = 1;
			    }
			}
		}
		return sum;
	}
};
```

