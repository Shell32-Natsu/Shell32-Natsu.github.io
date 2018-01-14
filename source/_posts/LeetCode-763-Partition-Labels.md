---
title: LeetCode 763. Partition Labels
date: 2018-01-14 10:48:36
tags:
 - LeetCode
 - CPP
 - 算法
 - 动态规划
categories:
 - LeetCode
---

A string `S` of lowercase letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

**Example 1:**

```
Input: S = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
```

**Note:**

1. `S` will have length in range `[1, 500]`.
2. `S` will consist of lowercase letters (`'a'` to `'z'`) only.

<!-- more -->

从前往后和从后往前遍历一遍数组，对于每一个元素，记录它之前（含自己）和之后（含自己）每个字符出现的个数。然后再遍历一次，每一个字符都没有在某下标之前和之后都出现，那么这个下标就可以用来分割。注意结尾的corner case。

```cpp
class Solution {
public:
    vector<int> partitionLabels(string S) {
        vector<vector<int>> front, back;
        vector<int> v(26, 0);
        for (int i = 0; i < S.length(); i++) {
            char ch = S[i];
            v[ch - 'a']++;
            front.push_back(v);
        }

        v.assign(26, 0);
        for (int i = S.length() - 1; i >= 0; i--) {
            char ch = S[i];
            v[ch - 'a']++;
            back.push_back(v);
        }

        reverse(back.begin(), back.end());

        vector<int> ans;
        int prev = 0;

        for (int i = 0; i < S.length() - 1; i++) {
            bool flag = true;
            for (int j = 0; j < 26; j++) {
                if (!(front[i][j] == 0 || back[i + 1][j] == 0)) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                ans.push_back(i + 1 - prev);
                prev = i + 1;
            }
        }

        if (prev != S.length()) {
            ans.push_back(S.length() - prev);
        }

        return ans;
    }

};
```

