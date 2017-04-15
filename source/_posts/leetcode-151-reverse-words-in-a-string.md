---
title: LeetCode 151. Reverse Words in a String
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 865.html
id: 865
categories:
  - LeetCode
date: 2016-10-10 16:09:28
---
题目描述:

> Given an input string, reverse the string word by word.
>
> For example,
> Given s = "`the sky is blue`",
> return "`blue is sky the`".
>
> **Clarification:**
>
> - What constitutes a word?
>   A sequence of non-space characters constitutes a word.
> - Could the input string contain leading or trailing spaces?
>   Yes. However, your reversed string should not contain leading or trailing spaces.
> - How about multiple spaces between two words?
>   Reduce them to a single space in the reversed string.

翻转一个字符串中的单词, 先翻转整个字符串然后再把每一个单词都翻转一次即可. 但是要考虑输入字符串前后的空格和单词间多余空格.

```cpp
class Solution {
public:
    void reverseWords(string &s) {
        trimString(s);
        reverse(s.begin(), s.end());
        for(int i = 0; i < s.size(); i++){
            int j;
            for(j = i + 1; j < s.size() && s[j] != ' '; j++);
            reverse(s.begin() + i, s.begin() + j);
            if(j == s.size()){
                break;
            }
            else{
                while(j + 1 < s.size() && s[j + 1] == ' ') s.erase(j + 1, 1);
                i = j;
            }
        }
    }
    
    void trimString(string &s){
        while(s.front() == ' ') s.erase(s.begin());
        while(s.back() == ' ') s.pop_back();
    }
};
```

