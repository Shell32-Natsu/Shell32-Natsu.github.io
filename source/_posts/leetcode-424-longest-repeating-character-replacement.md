---
title: LeetCode 424. Longest Repeating Character Replacement
tags:
  - CPP
  - LeetCode
  - 双指针
  - 字符串
  - 算法
url: 888.html
id: 888
categories:
  - LeetCode
date: 2016-10-16 17:54:36
---
题目描述:

> Given a string that consists of only uppercase English letters, you can replace any letter in the string with another letter at most *k* times. Find the length of a longest substring containing all repeating letters you can get after performing the above operations.
>
> **Note:**
> Both the string's length and *k* will not exceed 104.
>
> **Example 1:**
>
> ```
> Input:
> s = "ABAB", k = 2
>
> Output:
> 4
>
> Explanation:
> Replace the two 'A's with two 'B's or vice versa.
>
> ```
>
> **Example 2:**
>
> ```
> Input:
> s = "AABABBA", k = 1
>
> Output:
> 4
>
> Explanation:
> Replace the one 'A' in the middle with 'B' and form "AABBBBA".
> The substring "BBBB" has the longest repeating letters, which is 4.
> ```

这道题我采用双指针的方法. p指向最长连续重复字符的结尾, q指向开头. 首先看一个例子: 字符串`"ABBBAAABBAAB"`, k=2, 先查找`A`. 用r记录已经替换了多少个字母.

```
ABBBAAABBAAB
p=0, q=0, r=0
```

一开始p和q都指向开头, 第一个字符为`A`, 因此不用替换, 此时长度为1.

```
ABBBAAABBAAB
p=1, q=0, r=1
```

第二个字符需要替换, r变为1, 此时长度为2.

```
ABBBAAABBAAB
p=2, q=0, r=2
```

第三个字符也要替换, r变为2, 长度为3.

```
ABBBAAABBAAB
p=3, q=2, r=2
```

第四个字符仍然需要替换, 但是所有的替换次数已经用完, 因此q要向前移, 直到跳过第一个不是`A`的字符.

```
ABBBAAABBAAB
p=4, q=2, r=2
```

第五个字符不需要替换, q不变

```
ABBBAAABBAAB
p=5, q=2, r=2

ABBBAAABBAAB
p=6, q=2, r=2

ABBBAAABBAAB
p=7, q=3, r=2
```

p=7的时候, 又指向了`B`, 此时q也指向`B`, 因此只要q前移一格.

```
ABBBAAABBAAB
p=8, q=4, r=2

ABBBAAABBAAB
p=9, q=4, r=2

ABBBAAABBAAB
p=10, q=4, r=2

ABBBAAABBAAB
p=11, q=8, r=2
```

最后一个字符不是`A`, 因此q要前移, 先跳过三个`A`, 再继续跳过一个`B`以腾出一个替换次数.

最长连续重复字符的长度为`max(p-q+1)`, 而因为输入只有26个大写字母, 因此对每一个出现的字母计算一次最长长度就可以得到总的最长长度.

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        int maxLen = 0;
        vector<bool> letters(26, false);
        for(auto c : s){
            letters[c - 'A'] = true;
        }
        for(int i = 0; i < 26; i++){
            if(!letters[i]) continue;
            int p, q = 0, r = 0;
            for(p = 0; p < s.length(); p++){
                if(s[p] == i + 'A'){
                    maxLen = max(maxLen, p - q + 1);
                }
                else{
                    if(r < k){
                        maxLen = max(maxLen, p - q + 1);
                        r++;
                    }
                    else{
                        while(s[q] == i + 'A') q++;
                        q++;
                        maxLen = max(maxLen, p - q + 1);
                    }
                }
            }
        }
        return maxLen;
    }
};
```

