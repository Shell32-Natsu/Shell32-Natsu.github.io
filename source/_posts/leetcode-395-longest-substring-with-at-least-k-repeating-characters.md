---
title: LeetCode 395. Longest Substring with At Least K Repeating Characters
tags:
  - CPP
  - LeetCode
  - 分治
  - 算法
  - 递归
url: 714.html
id: 714
categories:
  - LeetCode
date: 2016-09-06 20:47:34
---
题目描述:

> Find the length of the longest substring **T** of a given string (consists of lowercase letters only) such that every character in **T** appears no less than *k* times.
>
> **Example 1:**
>
> ```
> Input:
> s = "aaabb", k = 3
>
> Output:
> 3
>
> The longest substring is "aaa", as 'a' is repeated 3 times.
>
> ```
>
> **Example 2:**
>
> ```
> Input:
> s = "ababbc", k = 2
>
> Output:
> 5
>
> The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.
> ```

第一眼看到这道题我是想用动态规划的, 可是凭我的弱鸡DP功底做不出来. 第二眼我又想用双指针, 可是又觉得有超时的危险(暴力双循环必然超时, 我写的双指针复杂度降低不多). 所以我最后采用了分治+递归的方法.

总体思想如下

1. 先遍历一遍字符串, 记录每个字符的出现次数, 在这一步中同时记录出现大于等于k次的字母个数, 如果根本就没有大于等于k次的字母, 那么可以直接返回0.
2. 通过出现次数不足k次的字母来把字符串分割成多个子串, 因为在原字符串中出现次数不足k次的字母必然不会出现在结果串中.
3. 递归的处理每个子串. 递归结束条件为字符串长度不足k.

```cpp
class Solution {
public:
    int longestSubstring(string s, int k) {
        return longestSubstringImpl(s, k, 0, s.length());
    }
    
    int longestSubstringImpl(string &s, int k, int start, int end){
        if(end - start < k) return 0; // 递归结束条件
        vector<int> letters(26, 0);
        int biggerThanK = 0;
        for(int i = start; i < end; i++){ // 记录每个字母出现的次数
            if(++letters[s[i] - 'a'] >= k) biggerThanK++;
        }
        if(biggerThanK == 0) return 0; // 没有出现达到k次的字母
        int l = start, r = l, maxLen = 0;
        while(r < end){
            while(r < end && letters[s[r] - 'a'] >= k){ // 跳过出现次数达到k次的字母
                r++;
            }
            if(r == l){ // r == l说明第一个字母就没有到达k次, 所以处理下一个字母
                l++;
                r++;
            }
            else if(r == end && l == start){
                // 这里比较重要, 如果不单独处理整个字符串都符合
                // 要求的情况的话, 就会出现无穷递归.
                maxLen = max(maxLen, r - l);
            }
            else{
                // 递归处理子串
                maxLen = max(maxLen, longestSubstringImpl(s, k, l, r));
                l = r;
            }
        }
        return maxLen;
    }
};
```

