---
title: LeetCode 125. Valid Palindrome
tags:
  - CPP
  - LeetCode
  - 双指针
  - 字符串
  - 算法
url: 766.html
id: 766
categories:
  - LeetCode
date: 2016-09-17 16:19:27
---
题目描述:

> Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
>
> For example,
> `"A man, a plan, a canal: Panama"` is a palindrome.
> `"race a car"` is *not* a palindrome.
>
> **Note:**
> Have you consider that the string might be empty? This is a good question to ask during an interview.
>
> For the purpose of this problem, we define empty string as valid palindrome.

双指针从两端向中间遍历即可.

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int i = 0, j = s.length() - 1;
        while(i < j){
            if(!isValid(s[i])){
                i++;
            }
            else if(!isValid(s[j])){
                j--;
            }
            else{
                if(s[i] >= 'A' && s[i] <= 'Z') s[i] -= ('A' - 'a');
                if(s[j] >= 'A' && s[j] <= 'Z') s[j] -= ('A' - 'a');
                if(s[i] != s[j]) return false;
                i++;
                j--;
            }
        }
        return true;
    }
    
    bool isValid(char ch){
        return (ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9') || (ch >= 'A' && ch <= 'Z');
    }
};
```

