---
title: LeetCode 1033. Moving Stones Until Consecutive
date: 2019-04-27 23:12:43
tags:
 - LeetCode
 - CPP
categories:
 - LeetCode
---

Three stones are on a number line at positions `a`, `b`, and `c`.

Each turn, let's say the stones are currently at positions `x, y, z` with `x < y < z`.  You pick up the stone at either position `x` or position `z`, and move that stone to an integer position `k`, with `x < k < z` and `k != y`.

The game ends when you cannot make any more moves, ie. the stones are in consecutive positions.

When the game ends, what is the minimum and maximum number of moves that you could have made?  Return the answer as an length 2 array: `answer = [minimum_moves, maximum_moves]`

**Example 1:**

```
Input: a = 1, b = 2, c = 5
Output: [1, 2]
Explanation: Move stone from 5 to 4 then to 3, or we can move it directly to 3.
```

**Example 2:**

```
Input: a = 4, b = 3, c = 2
Output: [0, 0]
Explanation: We cannot make any moves.
```

**Note:**

1. `1 <= a <= 100`
2. `1 <= b <= 100`
3. `1 <= c <= 100`
4. `a != b, b != c, c != a`

<!-- more -->

对于最大值，就是两端的石头以每次一格的速度往中间靠拢。每次一格，每个格子走一次。所以就是两端的石头之间的格子数（`stones[2] - stones[0] - 1`）再减掉中间的石头。

最小值有三种情况：

1. 已经相邻，最小步数为0.
2. 任意两个石头之间只有一个格子，把另一个石头移过来就可以了，步数为1.
3. 其他情况。先移动一个石头使其与另一个的石头差一格或相邻，再移动另一个石头。共2步。

```cpp
class Solution {
public:
    vector<int> numMovesStones(int a, int b, int c) {
        vector<int> stones = {a, b, c};
        sort(stones.begin(), stones.end());
        vector<int> ans(2);
        ans[1] = stones[2] - stones[0] - 2;
        if (stones[1] - stones[0] == 1 && stones[2] - stones[1] == 1)
            ans[0] = 0;
        else if (stones[1] - stones[0] == 1 || stones[2] - stones[1] == 1)
            ans[0] = 1;
        else if (stones[1] - stones[0] == 2 ||
                stones[2] - stones[1] == 2)
            ans[0] = 1;
        else
            ans[0] = 2;

        return ans;
    }
};
```

