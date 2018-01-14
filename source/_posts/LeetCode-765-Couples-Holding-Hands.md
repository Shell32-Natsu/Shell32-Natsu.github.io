---
title: LeetCode 765. Couples Holding Hands
date: 2018-01-14 11:09:28
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

N couples sit in 2N seats arranged in a row and want to hold hands. We want to know the minimum number of swaps so that every couple is sitting side by side. A *swap* consists of choosing **any** two people, then they stand up and switch seats.

The people and seats are represented by an integer from `0` to `2N-1`, the couples are numbered in order, the first couple being `(0, 1)`, the second couple being `(2, 3)`, and so on with the last couple being `(2N-2, 2N-1)`.

The couples' initial seating is given by `row[i]` being the value of the person who is initially sitting in the i-th seat.

**Example 1:**

```
Input: row = [0, 2, 1, 3]
Output: 1
Explanation: We only need to swap the second (row[1]) and third (row[2]) person.

```

**Example 2:**

```
Input: row = [3, 2, 0, 1]
Output: 0
Explanation: All couples are already seated side by side.

```

**Note:**

1. `len(row)` is even and in the range of `[4, 60]`.
2. `row` is guaranteed to be a permutation of `0...len(row)-1`.

<!-- more -->

说是Hard，其实并不Hard。从前到后依次把应该配对的人配好对就行了。

```cpp
class Solution {
public:
    int minSwapsCouples(vector<int>& row) {
        vector<int> seats(row.size());
        for (int i = 0; i < row.size(); i++) {
            seats[row[i]] = i;
        }
        
        int ans = 0;
        for (int i = 0; i < row.size(); i += 2) {
            int couple;
            if (row[i] % 2 == 0) {
                couple = row[i] + 1;
            }
            else {
                couple = row[i] - 1;
            }
            
            if (row[i + 1] != couple) {
                int coupleSeat = seats[couple];
                swap(seats[row[i + 1]], seats[couple]);
                swap(row[i + 1], row[coupleSeat]);
                ans++;
            }
        }
        return ans;
    }
};
```

