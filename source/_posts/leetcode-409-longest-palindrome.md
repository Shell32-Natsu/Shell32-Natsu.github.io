---
title: LeetCode 409. Longest Palindrome
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 838.html
id: 838
categories:
  - LeetCode
date: 2016-10-04 15:53:36
---
题目描述:

> Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.
>
> This is case sensitive, for example `"Aa"` is not considered a palindrome here.
>
> **Note:**
> Assume the length of given string will not exceed 1,010.
>
> **Example:**
>
> ```
> Input:
> "abccccdd"
>
> Output:
> 7
>
> Explanation:
> One longest palindrome that can be built is "dccaccd", whose length is 7.
> ```

给出一个字符数组, 问从中取出字符拼成的回文串最长是多少. 这道题比较简单, 回文串中的字符都是成对出现的, 因此如果一个字母的数量超过了2, 那么它就一定可以放在回文串中, 数量则是必须是偶数奇数的话则减1. 最后看是否还有剩下的字母, 如果有就可以选一个放在中间.

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        vector<int> letters(52, 0);
        for(auto i : s){
            if(i >= 'a' && i <= 'z'){
                letters[i - 'a']++;
            }
            else{
                letters[i - 'A' + 26]++;
            }
        }
        int ans = 0;
        for(auto i : letters){
            if(i > 1){
                ans += i % 2 ? i - 1 : i;
            }
        }
        if(ans < s.length()) ans++;
        return ans;
    }
};
```

