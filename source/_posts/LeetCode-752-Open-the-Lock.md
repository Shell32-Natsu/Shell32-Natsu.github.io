---
title: LeetCode 752. Open the Lock
date: 2017-12-24 11:19:21
tags:
 - LeetCode
 - 算法
 - 搜索
 - CPP
categories:
 - LeetCode
---

You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: `'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'`. The wheels can rotate freely and wrap around: for example we can turn `'9'` to be `'0'`, or `'0'` to be `'9'`. Each move consists of turning one wheel one slot.

The lock initially starts at `'0000'`, a string representing the state of the 4 wheels.

You are given a list of `deadends` dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.

Given a `target` representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.

**Example 1:**

```
Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
Explanation:
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end "0102".

```

**Example 2:**

```
Input: deadends = ["8888"], target = "0009"
Output: 1
Explanation:
We can turn the last wheel in reverse to move from "0000" -> "0009".

```

**Example 3:**

```
Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation:
We can't reach the target without getting stuck.

```

**Example 4:**

```
Input: deadends = ["0000"], target = "8888"
Output: -1

```

**Note:**

1. The length of `deadends` will be in the range `[1, 500]`.
2. `target` will not be in the list `deadends`.
3. Every string in `deadends` and the string `target` will be a string of 4 digits from the 10,000 possibilities `'0000'` to `'9999'`.

<!-- more -->

这道题我使用BFS从起点`0000`到`target`进行搜索（或者反过来进行），避开`deadends`中的组合，看能否到达，每次把其中一位移动一次。

```cpp
class Solution {
    unordered_set<string> _deadends;
public:
    int openLock(vector<string>& deadends, string target) {
        _deadends = unordered_set<string>(deadends.begin(), deadends.end());
        return bfs(target);
    }

    int bfs (const string &target) {
        queue<string> q;
        queue<int> steps;
        unordered_set<string> visited;
        if (_deadends.count(target))
            return -1;

        q.push(target);
        steps.push(0);
        visited.insert(target);
        while (!q.empty()) {
            string pw = q.front();
            int s = steps.front();
            if (pw == "0000")
                return s;
            for (int i = 0; i < pw.length(); i++) {
                int digit = pw[i] - '0';
                int tmp = digit == 9 ? 0 : digit + 1;
                pw[i] = tmp + '0';
                if (!_deadends.count(pw) && !visited.count(pw)) {
                    q.push(pw);
                    steps.push(s + 1);
                    visited.insert(pw);
                }
                tmp = digit == 0 ? 9 : digit - 1;
                pw[i] = tmp + '0';
                if (!_deadends.count(pw) && !visited.count(pw)) {
                    q.push(pw);
                    steps.push(s + 1);
                    visited.insert(pw);
                }
                pw[i] = digit + '0';
            }
            q.pop();
            steps.pop();
        }
        return -1;
    }
};
```

