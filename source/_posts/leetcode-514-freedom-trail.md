---
title: LeetCode 514. Freedom Trail
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 1183.html
id: 1183
categories:
  - LeetCode
date: 2017-03-27 18:46:47
---
题目描述：

> In the video game Fallout 4, the quest "Road to Freedom" requires players to reach a metal dial called the "Freedom Trail Ring", and use the dial to spell a specific keyword in order to open the door.
>
> Given a string **ring**, which represents the code engraved on the outer ring and another string **key**, which represents the keyword needs to be spelled. You need to find the **minimum** number of steps in order to spell all the characters in the keyword.
>
> Initially, the first character of the **ring** is aligned at 12:00 direction. You need to spell all the characters in the string **key** one by one by rotating the ring clockwise or anticlockwise to make each character of the string **key** aligned at 12:00 direction and then by pressing the center button. 
>
> At the stage of rotating the ring to spell the key character **key[i]**:
>
> 1. You can rotate the **ring** clockwise or anticlockwise **one place**, which counts as 1 step. The final purpose of the rotation is to align one of the string **ring's** characters at the 12:00 direction, where this character must equal to the character **key[i]**.
> 2. If the character **key[i]** has been aligned at the 12:00 direction, you need to press the center button to spell, which also counts as 1 step. After the pressing, you could begin to spell the next character in the key (next stage), otherwise, you've finished all the spelling.
>
> **Example:**
>
> ![img](https://leetcode.com/static/images/problemset/ring.jpg)
>
> ```
> Input: ring = "godding", key = "gd"
> Output: 4
> Explanation:
>  For the first key character 'g', since it is already in place, we just need 1 step to spell this character. 
>  For the second key character 'd', we need to rotate the ring "godding" anticlockwise by two steps to make it become "ddinggo".
>  Also, we need 1 more step for spelling.
>  So the final output is 4.
> ```
>
> **Note:**
>
> 1. Length of both **ring** and **key** will be in range 1 to 100.
> 2. There are only lowercase letters in both strings and might be some duplcate characters in both strings.
> 3. It's guaranteed that string **key** could always be spelled by rotating the string **ring**.

LeetCode做得比较多了就很容易发现一个规律，就是LeetCode所能接受的最大总时间复杂度大约在`10^6`左右，根据观察输入数据的规模就能大致的知道所用算法的时间复杂度上限是多少。比如输入数据是10000或以上，那么`O(n^2)`一般就是TLE（除非大量剪枝有可能勉强能过），如果输入数据是1000，那么`O(n^2)`就是可接受的。这道题的输入数据规模只有100，所以`O(n^3)`的算法也是可以的，我用的DP就是三次方的复杂度。

设一个二维数组`dp`，`dp[i][j]`表示输入`key[i]`字符时位于12点位置的是`ring[j]`字符时所使用的总的步数。显然`ring[j]`和`key[i]`要相同，否则直接不用考虑。

DP的基本思想是对于`key[i]`，从`key[i - 1]`时所有可能的`ring`结束位置的总步数+从该位置转到`ring[j]`所需要的步数+按按钮中选出最小值，就是`dp[i][j]`的值。

```
dp[i][j] = min(dp[i - 1][k] + 1 + min(abs(k - j), ringLength - abs(k - j))), 0 <= k < ringLength
```

最后再从`dp[keyLength - 1]`的所有元素中找到最小值，就是所求的结果。

```cpp
class Solution {
    vector<vector<int>> ringChar2Index, dp;
public:
    int findRotateSteps(string ring, string key) {
        if (key.empty()) return 0;
        int keyLen = key.length(), ringLen = ring.length();
        
        dp = vector<vector<int>>(keyLen, vector<int>(ringLen, -1));
        
        for (int i = 0; i < ringLen; i++) {
            if (ring[i] == key[0]) {
                dp[0][i] = min(i, ringLen - i) + 1;
            }
        }
        
        for (int i = 1; i < keyLen; i++) {
            for (int j = 0; j < ringLen; j++) {
                if (ring[j] == key[i]) {
                    int step = INT_MAX;
                    for (int k = 0; k < ringLen; k++) {
                        if (dp[i - 1][k] >= 0) {
                            int t = abs(k - j);
                            step = min(step, min(t, ringLen - t) + 1 + dp[i - 1][k]);
                        }
                    }
                    dp[i][j] = step;
                }
            }
        }
        
        int minStep = INT_MAX;
        for (int i = 0; i < ringLen; i++) {
            if (dp[keyLen - 1][i] >= 0) {
                minStep = min(minStep, dp[keyLen - 1][i]);
            }
        }
        
        return minStep;
    }
};
```

