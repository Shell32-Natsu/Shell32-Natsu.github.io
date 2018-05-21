---
title: LeetCode 838. Push Dominoes
date: 2018-05-21 16:53:52
tags:
 - LeetCode
 - 算法
 - 字符串
categories:
 - LeetCode
---

There are `N` dominoes in a line, and we place each domino vertically upright.

In the beginning, we simultaneously push some of the dominoes either to the left or to the right.

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/05/18/domino.png)

After each second, each domino that is falling to the left pushes the adjacent domino on the left.

Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.

When a vertical domino has dominoes falling on it from both sides, it stays still due to the balance of the forces.

For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino.

Given a string "S" representing the initial state. `S[i] = 'L'`, if the i-th domino has been pushed to the left; `S[i] = 'R'`, if the i-th domino has been pushed to the right; `S[i] = '.'`, if the `i`-th domino has not been pushed.

Return a string representing the final state. 

**Example 1:**

```
Input: ".L.R...LR..L.."
Output: "LL.RR.LLRRLL.."
```

**Example 2:**

```
Input: "RR.L"
Output: "RR.L"
Explanation: The first domino expends no additional force on the second domino.
```

**Note:**

1. `0 <= N <= 10^5`
2. String `dominoes` contains only `'L`', `'R'` and `'.'`

<!-- more -->

这道题我使用双指针

- 如果遇到`L`，那么就把之前的`.`设置成`L`。
- 如果遇到`R`，那么就往后搜索`L`
  - 如果没有`L`了，那么就把后面的全部设置成`R`
  - 如果遇到了`R`，那么这两个`R`之间的`.`就全部设置成`R`，把新的`R`当成新的起点
  - 如果遇到了`L`，那么就从两边的`R`和`L`向中间合拢，直到相遇

时间复杂度`O(n)`

```cpp
class Solution {
public:
    string pushDominoes(string dominoes) {
        int p1 = 0, p2 = 0;
        while (p1 < dominoes.length()) {
            while (p1 < dominoes.length() && dominoes[p1] == '.')
                p1++;
            if (dominoes[p1] == 'L') {
                p2 = p1;
                int i = p1 - 1;
                while (i >= 0 && dominoes[i] == '.')
                    dominoes[i--] = 'L';
            }
            else {
                p2 = p1;
                while (p2 < dominoes.length() && dominoes[p2] != 'L') {
                    p2++;
                    if (dominoes[p2] == 'R') {
                        for (int i = p1; i < p2; i++)
                            dominoes[i] = 'R';
                        p1 = p2;
                    }
                }
                if (p2 == dominoes.length()) {
                    for (p2 = p1; p2 < dominoes.length(); p2++)
                        dominoes[p2] = 'R';
                }
                else {
                    for (int i = 0; i < (p2 - p1 + 1) / 2; i++) {
                        dominoes[p1 + i] = 'R';
                        dominoes[p2 - i] = 'L';
                    }
                }
            }
            p1 = p2 + 1;
        }
        return dominoes;
    }
};
```

