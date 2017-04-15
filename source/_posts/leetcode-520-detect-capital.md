---
title: LeetCode 520. Detect Capital
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 1142.html
id: 1142
categories:
  - LeetCode
date: 2017-03-01 17:47:19
---
题目描述：

> Given a word, you need to judge whether the usage of capitals in it is right or not.
>
> We define the usage of capitals in a word to be right when one of the following cases holds:
>
> 1. All letters in this word are capitals, like "USA".
> 2. All letters in this word are not capitals, like "leetcode".
> 3. Only the first letter in this word is capital if it has more than one letter, like "Google".
>
> Otherwise, we define that this word doesn't use capitals in a right way.
>
> **Example 1:**
>
> ```
> Input: "USA"
> Output: True
>
> ```
>
> **Example 2:**
>
> ```
> Input: "FlaG"
> Output: False
>
> ```
>
> **Note:** The input will be a non-empty word consisting of uppercase and lowercase latin letters.

遍历一遍字符串，记录大写字母的出现次数与首字母是否大写，然后根据题目要求返回结果就可以了。

```cpp
class Solution {
public:
    bool detectCapitalUse(string word) {
        if (word.empty()) return true;
        int capitalNum = 0;
        int firstCapital = isupper(word[0]);
        
        for (auto c : word) {
            if (isupper(c)) capitalNum++;
        }
        
        return (capitalNum == 0 || capitalNum == word.length() || (firstCapital && capitalNum == 1));
    }
};
```

