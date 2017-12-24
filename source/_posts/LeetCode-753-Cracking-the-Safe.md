---
title: LeetCode 753. Cracking the Safe
date: 2017-12-24 11:24:29
tags:
 - LeetCode
 - CPP
 - 算法
 - 搜索
categories:
 - LeetCode
---

There is a box protected by a password. The password is `n` digits, where each letter can be one of the first `k` digits `0, 1, ..., k-1`.

You can keep inputting the password, the password will automatically be matched against the last `n` digits entered.

For example, assuming the password is `"345"`, I can open it when I type `"012345"`, but I enter a total of 6 digits.

Please return any string of minimum length that is guaranteed to open the box after the entire string is inputted.

**Example 1:**

```
Input: n = 1, k = 2
Output: "01"
Note: "10" will be accepted too.

```

**Example 2:**

```
Input: n = 2, k = 2
Output: "00110"
Note: "01100", "10011", "11001" will be accepted too.

```

**Note:**

1. `n` will be in the range `[1, 4]`.
2. `k` will be in the range `[1, 10]`.
3. `k^n` will be at most `4096`.

<!-- more -->

这道题我使用DFS来实现回溯，假设上一个迭代所得到的结果为字符串`s`，那么在本次迭代中就在`s`末尾加上所有可能的数字，如果加上后尾部的n个数字组合还没有出现过，那么就将它作为新的`s`进行递归，直到所有的组合都出现。

因为组合的总数目是确定的`k^n`个，所以递归深度不会超过`4096`。还有一个问题要注意，那就是递归的结束条件。因为我们每次只在`s`末尾增加一个字符，所以一旦所有的组合都出现了，那么结果串的长度就一定是最短的，此时就可以结束递归了，而不用把所有的可能结果串都找出来。

```cpp
class Solution {
    string ans;
    unordered_set<string> visited;
    int _n, _k;
public:
    string crackSafe(int n, int k) {
        _n = n, _k = k;
        int num = pow(k, n);
        string input(n, '0');
        visited.insert(input);
        dfs(num - 1, input);
        return ans;
    }

    void dfs(int passwordNum, string &input) {
        if (passwordNum == 0) {
            ans = input;
            return;
        }

        for (int i = 0; i < _k; i++) {
            input.push_back(i + '0');
            string back = input.substr(input.length() - _n);
            if (!visited.count(back)) {
                visited.insert(back);
                dfs(passwordNum - 1, input);
                if (!ans.empty())
                    return;
                visited.erase(back);
            }
            input.pop_back();
        }
    }
};
```

