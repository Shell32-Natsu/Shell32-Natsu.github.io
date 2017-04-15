---
title: LeetCode 438. Find All Anagrams in a String
tags:
  - CPP
  - LeetCode
  - 双指针
  - 字符串
  - 算法
url: 917.html
id: 917
categories:
  - LeetCode
date: 2016-10-30 19:26:32
---
题目描述:
> Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.
>
> Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100.
>
> The order of output does not matter.
>
> Example 1:
> ```
> Input:
> s: "cbaebabacd" p: "abc"
>
> Output:
> [0, 6]
>
> Explanation:
> The substring with start index = 0 is "cba", which is an anagram of "abc".
> The substring with start index = 6 is "bac", which is an anagram of "abc".
> ```
> Example 2:
> ```
> Input:
> s: "abab" p: "ab"
>
> Output:
> [0, 1, 2]
>
> Explanation:
> The substring with start index = 0 is "ab", which is an anagram of "ab".
> The substring with start index = 1 is "ba", which is an anagram of "ab".
> The substring with start index = 2 is "ab", which is an anagram of "ab".
> ```

使用哈希表和双指针, 可以在`O(n)`的时间复杂度内完成.

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> letters(26, 0);
        vector<int> ans;
        if(s.empty() || p.empty() || s.length() < p.length()) return ans;
        for(auto c : p){
            letters[c - 'a']++;
        }
        int i = 0, j;
        vector<int> tmp = letters;
        for(j = 0; j < p.length(); j++){
            tmp[s[j] - 'a']--;
        }
        while(j <= s.length()){
            bool match = true;
            for(auto k : tmp){
                if(k != 0){
                    match = false;
                    break;
                }
            }
            if(match) ans.push_back(i);
            if(j == s.length()) break;
            tmp[s[i] - 'a']++;
            tmp[s[j] - 'a']--;
            i++;
            j++;
        }

        return ans;
    }
};
```
