---
title: LeetCode 526. Beautiful Arrangement
tags:
  - CPP
  - LeetCode
  - 回溯
  - 算法
  - 递归
url: 1148.html
id: 1148
categories:
  - LeetCode
date: 2017-03-03 22:19:59
---
题目描述：

> Suppose you have **N** integers from 1 to N. We define a beautiful arrangement as an array that is constructed by these **N** numbers successfully if one of the following is true for the ith position (1 ≤ i ≤ N) in this array:
>
> 1. The number at the ith position is divisible by **i**.
> 2. **i** is divisible by the number at the ith position.
>
> Now given N, how many beautiful arrangements can you construct?
>
> **Example 1:**
>
> ```
> Input: 2
> Output: 2
> Explanation: 
>
> The first beautiful arrangement is [1, 2]:
>
> Number at the 1st position (i=1) is 1, and 1 is divisible by i (i=1).
>
> Number at the 2nd position (i=2) is 2, and 2 is divisible by i (i=2).
>
> The second beautiful arrangement is [2, 1]:
>
> Number at the 1st position (i=1) is 2, and 2 is divisible by i (i=1).
>
> Number at the 2nd position (i=2) is 1, and i (i=2) is divisible by 1.
> ```
>
> **Note:**
>
> 1. **N** is a positive integer and will not exceed 15.

因为数据规模比较小，可以先确定对于每一个位置可以选择数值有哪些，然后再用回溯法穷举。

```cpp
class Solution {
    vector<vector<int>> possibleValue;
    int ans = 0;
public:
    int countArrangement(int N) {
        setPossibleValue(N);
        vector<int> visited(N, 0);
        tryValue(0, visited);
        return ans;
    }
    
    void tryValue (int index, vector<int> &visited) {
        if (index == visited.size()) {
            ans++;
            return;
        }
        for (int i = 0; i < possibleValue[index].size(); i++) {
            if (!visited[possibleValue[index][i]]) {
                visited[possibleValue[index][i]] = 1;
                tryValue(index + 1, visited);
                visited[possibleValue[index][i]] = 0;
            }
        }
    }
    
    void setPossibleValue (int N) {
        for (int i = 1; i <= N; i++) {
            vector<int> val;
            for (int j = 1; j <= N; j++) {
                if (i % j == 0 || j % i == 0) {
                    val.push_back(j - 1);
                }
            }

            possibleValue.push_back(val);
        }
    }
};
```

