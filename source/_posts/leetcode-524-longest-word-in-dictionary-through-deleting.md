---
title: LeetCode 524. Longest Word in Dictionary through Deleting
tags:
  - CPP
  - LeetCode
  - 双指针
  - 字符串
  - 算法
url: 1144.html
id: 1144
categories:
  - LeetCode
date: 2017-03-01 17:51:05
---
题目描述：

> Given a string and a string dictionary, find the longest string in the dictionary that can be formed by deleting some characters of the given string. If there are more than one possible results, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.
>
> **Example 1:**
>
> ```
> Input:
> s = "abpcplea", d = ["ale","apple","monkey","plea"]
>
> Output: 
> "apple"
>
> ```
>
> **Example 2:**
>
> ```
> Input:
> s = "abpcplea", d = ["a","b","c"]
>
> Output: 
> "a"
>
> ```
>
> **Note:**
>
> 1. All the strings in the input will only contain lower-case letters.
> 2. The size of the dictionary won't exceed 1,000.
> 3. The length of all the strings in the input won't exceed 1,000.

用双指针来判断一个单词可不可以从另一个单词通过删除字母的来。依次判断，选出最长的。如果有多个最长的，就保留字典序较小的。当遍历到一个单词时，可以进行一定的剪枝。

```cpp
class Solution {
public:
    string findLongestWord(string s, vector<string>& d) {
        string ans;
        for (auto word : d) {
            int wordLen = word.length(), ansLen = ans.length();
            if (wordLen <= s.length() && wordLen >= ansLen && match(s, word)) {
                if (wordLen > ansLen) ans = word;
                else if (wordLen == ansLen) {
                    ans = min(ans, word);
                }
            }
        }
        return ans;
    }
    
    bool match(string s, string w) {
        int si = 0, wi = 0;
        while (si < s.length() && wi < w.length()) {
            if (s[si] == w[wi]) {
                wi++;
                si++;
            }
            else {
                si++;
            }
        }
        return wi == w.length();
    }
};
```

