---
title: LeetCode 400. Nth Digit
tags:
  - CPP
  - LeetCode
  - 算法
url: 768.html
id: 768
categories:
  - LeetCode
date: 2016-09-18 16:25:54
---


题目描述:

> Find the *n*th digit of the infinite integer sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...
>
> **Note:**
> *n* is positive and will fit within the range of a 32-bit signed integer (*n* < 231).
>
> **Example 1:**
>
> ```
> Input:
> 3
>
> Output:
> 3
>
> ```
>
> **Example 2:**
>
> ```
> Input:
> 11
>
> Output:
> 0
>
> Explanation:
> The 11th digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... is a 0, which is part of the number 10.
> ```

LeetCode现在每周的比赛都要出四道新题, 像我这种一边做老题一边追新题还要上课(自己选的统计学习, 跪着也要上完)的人来说还真是有点觉得追不上.

这道题算是比较简单, 就是算出1位数有多少个阿拉伯数字, 2位数有多少阿拉伯数字, 3位数有多少个阿拉伯数字......n位数有9×10^(n-1)×n个阿拉伯数字, 然后对于输入的n, 我们就可以通过前面得到的数据确定它有多少位, 进而确定是哪个数, 最终确定要找的数字.

1位数到n位数共有多少个数字可以先计算出来写在程序中, 

```cpp
int main () {
    long long sum = 0;
    for(int i = 0;; i++){
        long long t = 9 * (long long)pow(10, i) * (i + 1);
        if(t > INT_MAX) break;
        sum += t;
        cout<<i<<':'<<t<<" sum:"<<sum<<endl;
    }
    return 0;
}
```

输出:

```
0:9 sum:9
1:180 sum:189
2:2700 sum:2889
3:36000 sum:38889
4:450000 sum:488889
5:5400000 sum:5888889
6:63000000 sum:68888889
7:720000000 sum:788888889
```

这个结果还是挺有规律的. 接下来就是解题的代码:

```cpp
class Solution {
    int arr[9] = {0, 9, 189, 2889, 38889, 488889, 5888889, 68888889, 788888889};
public:
    int findNthDigit(int n) {
        int index;
        for(index = 0; index < 9 && arr[index] < n; index++); // 确定位数
        int t = (n - arr[index - 1] - 1);
        int num = (t / index) + (int)pow(10, index - 1); // 确定数
        int p = index - (t % index) - 1; // 确定第几位
        for(int i = 0; i < p; i++){ // 找出该位
            num /= 10;
        }
        return num % 10; // 个位为我们要找的数
    }
};
```

