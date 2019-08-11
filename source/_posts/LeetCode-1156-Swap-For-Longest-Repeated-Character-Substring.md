---
title: LeetCode 1156. Swap For Longest Repeated Character Substring
date: 2019-08-11 10:51:41
tags:
 - LeetCode
 - CPP
 - 字符串
 - 二分搜索
 - 双指针
categories:
 - LeetCode
---

Given a string `text`, we are allowed to swap two of the characters in the string. Find the length of the longest substring with repeated characters. 

**Example 1:**

```
Input: text = "ababa"
Output: 3
Explanation: We can swap the first 'b' with the last 'a', or the last 'b' with the first 'a'. Then, the longest repeated character substring is "aaa", which its length is 3.
```

**Example 2:**

```
Input: text = "aaabaaa"
Output: 6
Explanation: Swap 'b' with the last 'a' (or the first 'a'), and we get longest repeated character substring "aaaaaa", which its length is 6.
```

**Example 3:**

```
Input: text = "aaabbaaa"
Output: 4
```

**Example 4:**

```
Input: text = "aaaaa"
Output: 5
Explanation: No need to swap, longest repeated character substring is "aaaaa", length is 5.
```

**Example 5:**

```
Input: text = "abcdef"
Output: 1
```

**Constraints:**

- `1 <= text.length <= 20000`
- `text` consist of lowercase English characters only

<!-- more -->

在可以swap一对字符位置的情况下查找最长的相同字符子串。用双指针来搜索这种子串，搜索过程中要注意可以跳过一个字符，记录下跳过的字符的位置，在遇到第二个需要跳过的字符或者字符串结尾的时候判断跳过的字符能不能被swap（也就是找到不在这个子串范围内的可以跟跳过字符swap构成同字符字符串的字符）。

先把每个字符的出现index记录下来，它自然是一个有序的序列，然后在每次查找时使用二分搜索搜索不在找到的子串的范围内的index，如果有那么就是可以swap的。

要注意的有三点：

- 一个子串处理完毕后下一次查找应该从被跳过的字符开始而不是子串结尾，所以最坏情况下每个字符会被访问两次。
- 一个字符都没有跳过的情况，这种情况肯定是到达原字符串结尾了。
- 在遇到第二个要跳过的字符的时候，其实`p2-p1-1`已经必然是一个可行解了，在这种情况下，`[p1, p2)`之间是`p2-p1-1`个相同字符+`1`个不同字符，必然可以swap成一个`p2-p1-1`长度的同字符序列。

```cpp
class Solution {
public:
    int maxRepOpt1(string text) {
        map<char, vector<int>> pos;
        for (int i = 0; i < text.length(); i++) {
            pos[text[i]].push_back(i);
        }

        int p1 = 0, p2 = 0;
        int ans = 0;
        while (p2 < text.length()) {
            p2 = p1;
            int skip = 0;
            int skip_pos = -1;
            while (p2 < text.length()) {
                if (text[p2] != text[p1]) {
                    skip++;
                    if (skip <= 1)
                        skip_pos = p2;
                }
                if (skip > 1)
                    break;
                p2++;
            }
            ans = max(ans, p2 - p1 - 1);
            if (findPossible(p1, p2, pos[text[p1]])) {
                ans = max(ans, p2 - p1);
            }
            if (skip == 0) {
                ans = max(ans, p2 - p1);
            }
            p1 = skip_pos == -1 ? p2 : skip_pos;
        }
        return ans;
    }

    bool findPossible(int left, int right, const vector<int>& pos) {
        int _right = upper_bound(pos.begin(), pos.end(), right) - pos.begin();
        int _left = lower_bound(pos.begin(), pos.end(), left) - pos.begin();
        return _left > 0 || _right < pos.size();
    }
};
```

