---
title: LeetCode 758. Bold Words in String
date: 2018-01-07 10:12:55
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

Given a set of keywords `words` and a string `S`, make all appearances of all keywords in `S` bold. Any letters between `<b>` and `</b>` tags become bold.

The returned string should use the least number of tags possible, and of course the tags should form a valid combination.

For example, given that `words = ["ab", "bc"]` and `S = "aabcd"`, we should return `"a<b>abc</b>d"`. Note that returning `"a<b>a<b>b</b>c</b>d"` would use more tags, so it is incorrect.

**Note:**

1. `words` has length in range `[0, 50]`.
2. `words[i]` has length in range `[1, 10]`.
3. `S` has length in range `[0, 500]`.
4. All characters in `words[i]` and `S` are lowercase letters.

<!-- more -->

先用双重循环找到有所得子串，对于每一个子串，判断是否要加粗，如果是，那么就把这个子串的所有位置设置为`1`（要加粗）。最后再把所有标记为要加粗的字符两边加上`<b></b>`。

```cpp
class Solution {
public:
    string boldWords(vector<string>& _words, string S) {
        if (S.empty())
            return "";
        unordered_set<string> words(_words.begin(), _words.end());
        vector<int> flag(S.length(), 0);
        for (int i = 0; i < S.length(); i++) {
            for (int j = 0; j <= i; j++) {
                string tmp = S.substr(j, i - j + 1);
                if (words.count(tmp)) {
                    for (int k = j; k <= i; k++) {
                        flag[k] = 1;
                    }
                    break;
                }
            }
        }

        string ans;
        if (flag.front()) {
            ans += "<b>";
        }
        for (int i = 0; i < S.length() - 1; i++) {
            ans.push_back(S[i]);
            if (flag[i] == 0 && flag[i + 1] == 1) {
                ans += "<b>";
            }
            else if (flag[i] == 1 && flag[i + 1] == 0) {
                ans += "</b>";
            }
        }
        ans.push_back(S.back());
        if (flag.back()) {
            ans += "</b>";
        }
        return ans;
    }
};
```

