---
title: LeetCode 567. Permutation in String
date: 2017-05-01 18:10:57
tags:
 - LeetCode
 - CPP
 - 算法
 - 双指针
categories:
 - LeetCode
---
题目描述：

Given two strings **s1** and **s2**, write a function to return true if **s2** contains the permutation of **s1**. In other words, one of the first string's permutations is the **substring** of the second string.

**Example 1:**

```
Input:s1 = "ab" s2 = "eidbaooo"
Output:True
Explanation: s2 contains one permutation of s1 ("ba").

```

**Example 2:**

```
Input:s1= "ab" s2 = "eidboaoo"
Output: False

```

**Note:**

1. The input strings only contain lower case letters.
2. The length of both given strings is in range [1, 10,000].

-------------

双指针，在s2中寻找一个连续子串，其中包含所有的s1中的字符并且没有其他字符。用一个哈希表记录s1中每个字符的出现次数，然后右指针前进，直到左右指针之间的子串不满足条件（也就是有字符的出现次数多于其在s1中的出现次数），再向前移动左指针直到满足条件，当子串长度等于s1的长度时返回true，如果没有这样的子串返回false。

<!-- more-->

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        vector<int> occurs(26, 0);
        for (auto c : s1) {
            occurs[c - 'a']++;
        }
        int p1 = 0, p2 = p1;
        while (p2 < s2.length()) {
            if (--occurs[s2[p2] - 'a'] < 0) {
                while (p1 < p2 && s2[p1] != s2[p2]) {
                    occurs[s2[p1] - 'a']++;
                    p1++;
                }
                occurs[s2[p2] - 'a']++;
                p1++;
            }
            p2++;
            if (p2 - p1 == s1.length()) return true;
        }
        return false;
    }
};
```

