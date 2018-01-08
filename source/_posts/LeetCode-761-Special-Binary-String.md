---
title: LeetCode 761. Special Binary String
date: 2018-01-07 10:38:44
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

*Special* binary strings are binary strings with the following two properties:

The number of 0's is equal to the number of 1's.

Every prefix of the binary string has at least as many 1's as 0's.

Given a special string `S`, a *move* consists of choosing two consecutive, non-empty, special substrings of `S`, and swapping them. *(Two strings are consecutive if the last character of the first string is exactly one index before the first character of the second string.)*

At the end of any number of moves, what is the lexicographically largest resulting string possible?

**Example 1:**

```
Input: S = "11011000"
Output: "11100100"
Explanation:
The strings "10" [occuring at S[1]] and "1100" [at S[3]] are swapped.
This is the lexicographically largest string possible after some number of swaps.

```

**Note:**

1. `S` has length at most `50`.
2. `S` is guaranteed to be a *special* binary string as defined above.

<!-- more -->

这道题用暴力就可以过，我在比赛时还尝试了DP，分治……每次迭代都遍历一次字符串，找到所有能交换的*Special string*，交换它们，从所有交换得到的结果中选择字典序最大的，进入下一个迭代。终止条件是找不到更大的交换后字符串。

```cpp
class Solution {
public:
    string makeLargestSpecial(string S) {
        int len = S.length();
        string ans = S;
        do {
            S = ans;
            for (int i = 0; i < len; i++) {
                for (int j = 1; j + i <= len; j++) {
                    string tmp = S.substr(i, j);
                    if (!isSpecial(tmp))
                        continue;

                    int cnt = 0;
                    string maxStr = tmp;
                    for (int k = 0; k < tmp.length(); k++) {
                        if (tmp[k] == '0')
                            cnt--;
                        else
                            cnt++;

                        if (k != tmp.length() - 1 && cnt == 0) {
                            string a = tmp.substr(0, k + 1), b = tmp.substr(k + 1);
                            maxStr = max(maxStr, max(a + b, b + a));
                        }
                    }

                    ans = max(ans, S.substr(0, i).append(maxStr).append(S.substr(i + j)));
                }
            }
        } while (ans != S);

        return ans;
    }

    bool isSpecial (const string& str) {
        int cnt = 0;
        for (int i = 0; i < str.length(); i++) {
            if (str[i] == '0')
                cnt--;
            else
                cnt++;
            if (cnt < 0)
                return false;
        }
        return cnt == 0;
    }
};
```

