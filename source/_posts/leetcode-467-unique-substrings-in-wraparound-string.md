---
title: LeetCode 467. Unique Substrings in Wraparound String
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 1002.html
id: 1002
categories:
  - LeetCode
date: 2016-12-05 16:25:58
---
题目描述:

> Consider the string `s` to be the infinite wraparound string of "abcdefghijklmnopqrstuvwxyz", so `s` will look like this: "...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd....".
>
> Now we have another string `p`. Your job is to find out how many unique non-empty substrings of `p` are present in `s`. In particular, your input is the string `p` and you need to output the number of different non-empty substrings of `p` in the string `s`.
>
> **Note:** `p` consists of only lowercase English letters and the size of p might be over 10000.
>
> **Example 1:**
>
> ```
> Input: "a"
> Output: 1
>
> Explanation: Only the substring "a" of string "a" is in the string s.
>
> ```
>
> **Example 2:**
>
> ```
> Input: "cac"
> Output: 2
> Explanation: There are two substrings "a", "c" of string "cac" in the string s.
>
> ```
>
> **Example 3:**
>
> ```
> Input: "zab"
> Output: 6
> Explanation: There are six substrings "z", "a", "b", "za", "ab", "zab" of string "zab" in the string s.
> ```

动态规划题目. `dp[i]`记录以`p[i]`为结尾的符合要求的子串的长度. 为了防止重复, 用另一个数组`tail`以字母为索引保存结果中以某个字母结尾的最长的子串的长度. 当`p[i]`与`p[i-1]`是连续的时候, `p[i]=p[i-1]`; 否则`p[i]=1`. 再检查`tail[p[i]-'a']`与`dp[i]`的大小关系, 若`tail[p[i]-'a']>=dp[i]`, 说明`p[i]`结尾的所有子串都已经在结果中了; 否则更新`tail[p[i]-'a']=dp[i]`, 增加结果集中以`p[i]`这个字母结尾的子串的数量. 最后再对`tail`数组求和就得到结果. 时间复杂度O(n).

```cpp
class Solution {
public:
    int findSubstringInWraproundString(string p) {
        if(p.empty()) return 0;
        vector<int> dp(p.length(), 0);
        vector<int> tail(26, 0);
        dp[0] = 1;
        tail[p[0] - 'a'] = 1;
        for(int i = 1; i < p.length(); i++){
            if((p[i - 1] != 'z' && p[i] == p[i - 1] + 1) || (p[i - 1] == 'z' && p[i] == 'a')){
                dp[i] = dp[i - 1] + 1;
            }
            else{
                dp[i] = 1;
            }
            int index = p[i] - 'a';
            tail[index] = max(tail[index], dp[i]);
        }
        int ans = 0;
        for(auto i : tail){
            ans += i;
        }
        return ans;
    }
};
```

