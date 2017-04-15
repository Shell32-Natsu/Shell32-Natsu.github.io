---
title: LeetCode 139. Word Break
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 字符串
  - 算法
url: 822.html
id: 822
categories:
  - LeetCode
date: 2016-09-29 17:49:15
---
题目描述:

> Given a string *s* and a dictionary of words *dict*, determine if *s* can be segmented into a space-separated sequence of one or more dictionary words.
>
> For example, given
> *s* = `"leetcode"`,
> *dict* = `["leet", "code"]`.
>
> Return true because `"leetcode"` can be segmented as `"leet code"`.

使用DP, 从前到后遍历字符串, 记录下可以分割的坐标(也就是从开头到该坐标的子串是可以被分割的). 对于每增加一个字母, 判断每个被记录的坐标到该字母所组成的子串是否在dict中, 如果在, 那么这个坐标也是可以分割的. 最后判断所记录的坐标的最后一个是不是字符串的结尾.

```cpp
class Solution {
public:
    bool wordBreak(string s, unordered_set<string>& wordDict) {
        vector<int> trueIndex;
        for(int i = 0; i < s.size(); i++){
            for(auto j = trueIndex.rbegin(); j != trueIndex.rend(); j++){
                if(wordDict.count(s.substr(*j + 1, i - *j))){
                    trueIndex.push_back(i);
                    break;
                }
            }
            if((trueIndex.empty() || trueIndex.back() != i) && wordDict.count(s.substr(0, i + 1))) trueIndex.push_back(i);
        }
        return !trueIndex.empty() && trueIndex.back() == (s.length() - 1);
    }
};
```

