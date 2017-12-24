---
title: LeetCode 748. Shortest Completing Word
date: 2017-12-24 11:41:20
tags:
 - LeetCode
 - CPP
 - 算法
 - 哈希表
categories:
 - LeetCode
---

Find the minimum length word from a given dictionary `words`, which has all the letters from the string `licensePlate`. Such a word is said to *complete* the given string `licensePlate`

Here, for letters we ignore case. For example, `"P"` on the `licensePlate` still matches `"p"` on the word.

It is guaranteed an answer exists. If there are multiple answers, return the one that occurs first in the array.

The license plate might have the same letter occurring multiple times. For example, given a `licensePlate` of `"PP"`, the word `"pair"`does not complete the `licensePlate`, but the word `"supper"` does.

**Example 1:**

```
Input: licensePlate = "1s3 PSt", words = ["step", "steps", "stripe", "stepple"]
Output: "steps"
Explanation: The smallest length word that contains the letters "S", "P", "S", and "T".
Note that the answer is not "step", because the letter "s" must occur in the word twice.
Also note that we ignored case for the purposes of comparing whether a letter exists in the word.

```

**Example 2:**

```
Input: licensePlate = "1s3 456", words = ["looks", "pest", "stew", "show"]
Output: "pest"
Explanation: There are 3 smallest length words that contains the letters "s".
We return the one that occurred first.

```

**Note:**

1. `licensePlate` will be a string with length in range `[1, 7]`.
2. `licensePlate` will contain digits, spaces, or letters (uppercase or lowercase).
3. `words` will have a length in the range `[10, 1000]`.
4. Every `words[i]` will consist of lowercase letters, and have length in range `[1, 15]`.

<!-- more -->

没什么难度，用哈希表记录`licensePlate`中每个字母的出现次数，在对`words`中的每一个词判断能否覆盖，记录其中的最短字符串。

```cpp
class Solution {
    unordered_map<char, int> cnts;
public:
    string shortestCompletingWord(string licensePlate, vector<string>& words) {
        for (auto ch : licensePlate) {
            ch = tolower(ch);
            if (isalpha(ch)) {
                cnts[ch]++;
            }
        }
        
        string ans;
        for (auto &word : words) {
            if (!ans.empty() && ans.length() <= word.length())
                continue;
            if (cover(word)) {
                if (ans.empty() || ans.length() > word.length())
                    ans = word;
            }
        }
        return ans;
    }
    
    bool cover(const string& word) {
        auto tmpCnts = cnts;
        for (auto ch : word) {
            if (tmpCnts.count(ch) && tmpCnts[ch] > 0) {
                tmpCnts[ch]--;
            }
        }
        
        for (auto p : tmpCnts) {
            if (p.second > 0)
                return false;
        }
        return true;
    }
};
```

