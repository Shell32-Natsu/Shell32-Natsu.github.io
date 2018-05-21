---
title: LeetCode 837. New 21 Game
date: 2018-05-21 16:44:32
tags:
 - LeetCode
 - 算法
 - 动态规划
categories:
 - LeetCode
---

Alice plays the following game, loosely based on the card game "21".

Alice starts with `0` points, and draws numbers while she has less than `K` points.  During each draw, she gains an integer number of points randomly from the range `[1, W]`, where `W` is an integer.  Each draw is independent and the outcomes have equal probabilities.

Alice stops drawing numbers when she gets `K` or more points.  What is the probability that she has `N` or less points?

**Example 1:**

```
Input: N = 10, K = 1, W = 10
Output: 1.00000
Explanation:  Alice gets a single card, then stops.
```

**Example 2:**

```
Input: N = 6, K = 1, W = 10
Output: 0.60000
Explanation:  Alice gets a single card, then stops.
In 6 out of W = 10 possibilities, she is at or below N = 6 points.
```

**Example 3:**

```
Input: N = 21, K = 17, W = 10
Output: 0.73278
```

**Note:**

1. `0 <= K <= N <= 10000`
2. `1 <= W <= 10000`
3. Answers will be accepted as correct if they are within `10^-5` of the correct answer.
4. The judging time limit has been reduced for this question.

<!-- more -->

这道题可以用DP+滑动窗口来解决。

最终获得N点的概率是`[N-W, N-1]`中每个点数出现的概率×`1/W`。所以`P(N)=P(N-1)-P(N-W-1)*1/W+P(N-1)*1/W`，这个步骤类似于把长度为W的窗口往前滑动一格。

要注意`>=K`的点数要排除掉。最后要把`[K, N]`的所有概率加起来。

时间复杂度`O(n)`。

```cpp
class Solution {
public:
    double new21Game(int N, int K, int W) {
        if (K == 0)
            return 1;
        vector<double> dp(N + 1, 0);

        double f = (1 / (double)W);
        dp[1] = f;

        for (int i = 2; i <= N; i++) {
            int j = i - 1;
            double t = dp[j];
            if (j <= W) {
                t -= f;
            }
            else {
                t -= (dp[j - W] * f);
            }
            if (j < K)
                t += dp[j] * f;
            if (i <= W) {
                t += f;
            }
            dp[i] = t;

        }
        double ans = 0;
        for (int i = K; i <= N; i++) {
            ans += dp[i];
        }
        return ans;
    }
};
```

