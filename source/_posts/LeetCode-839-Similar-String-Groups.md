---
title: LeetCode 839. Similar String Groups
date: 2018-05-21 17:02:56
tags:
 - LeetCode
 - 算法
 - 并查集
 - 字符串
categories:
 - LeetCode
---

Two strings `X` and `Y` are similar if we can swap two letters (in different positions) of `X`, so that it equals `Y`.

For example, `"tars"` and `"rats"` are similar (swapping at positions `0` and `2`), and `"rats"` and `"arts"` are similar, but `"star"` is not similar to `"tars"`, `"rats"`, or `"arts"`.

Together, these form two connected groups by similarity: `{"tars", "rats", "arts"}` and `{"star"}`.  Notice that `"tars"` and `"arts"`are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list `A` of unique strings.  Every string in `A` is an anagram of every other string in `A`.  How many groups are there?

**Example 1:**

```
Input: ["tars","rats","arts","star"]
Output: 2
```

**Note:**

1. `A.length <= 2000`
2. `A[i].length <= 1000`
3. `A.length * A[i].length <= 20000`
4. All words in `A` consist of lowercase letters only.
5. All words in `A` have the same length and are anagrams of each other.
6. The judging time limit has been increased for this question.

 <!-- more -->

一个分类问题，一下就想到用并查集来做，因为放宽了时间要求所以并不是很难。判断两个字符串是否相似比较简单，看能不能通过一次swap得到就行了。一开始每个字符串自己一个集合，然后对于每一个字符串，遍历所有已经分类过的字符串，如果有相似的，就把它们所在的集合合并。

```cpp
class Solution {
    vector<int> uf;
public:
    int numSimilarGroups(vector<string>& A) {
        int len = A.size();
        uf = vector<int>(len);
        for (int i = 0; i < len; i++) {
            uf[i] = i;
        }
        for (int i = 1; i < len; i++) {
            for (int j = 0; j < i; j++) {
                if (uf[i] == uf[j])
                    continue;
                if (similar(A[i], A[j])) {
                    merge(i, j);
                }
            }
        }
        int ans = 0;
        for (int i = 0; i < len; i++) {
            if (uf[i] == i)
                ans++;
        }
        return ans;
    }

    void merge (int n1, int n2) {
        int h1 = head(n1), h2 = head(n2);
        if (h1 == h2)
            return;
        uf[h2] = h1;
    }

    int head (int n) {
        int p = n;
        while (uf[p] != p) {
            p = uf[p];
        }
        return p;
    }

    bool similar (const string &s1, const string &s2) {
        vector<int> pos;
        int n = 0;
        for (int i = 0; i < s1.length(); i++) {
            if (s1[i] != s2[i]) {
                if (++n > 2) {
                    return false;
                }
                pos.push_back(i);
            }
        }
        if (n != 2)
            return false;
        int p1 = pos[0], p2 = pos[1];
        if (s1[p1] == s2[p2] && s1[p2] == s2[p1])
            return true;
        return false;
    }
};
```

