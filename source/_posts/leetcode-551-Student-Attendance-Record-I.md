---
title: LeeetCode 551. Student Attendance Record I
date: 2017-04-16 16:16:33
tags:
 - 字符串
 - LeetCode
 - CPP
categories:
 - LeetCode
---

题目描述：

>   You are given a string representing an attendance record for a student. The record only contains the following three characters:
>
>   1.  **'A'** : Absent.
>   2.  **'L'** : Late.
>   3.  **'P'** : Present.
>
>   A student could be rewarded if his attendance record doesn't contain **more than one 'A' (absent)** or **more than two continuous 'L' (late)**.
>
>   You need to return whether the student could be rewarded according to his attendance record.
>
>   **Example 1:**
>
>
>   	Input: "PPALLP"
>   	Output: True
>
>   **Example 2:**
>
>
>   	Input: "PPALLL"
>   	Output: False
>

题目很简单，就是扫一遍字符串就可以了，但是要注意一些边界情况。

<!--more-->

```cpp
class Solution {
public:
    bool checkRecord(string s) {
        int acnt = 0;
        for (int i = 0; i + 2 < s.length(); i++) {
            if (s[i] == 'A') {
                acnt++;
                if (acnt > 1) return false;
            }
            else if (s[i] == 'L' && s[i + 1] == 'L' && s[i + 2] == 'L') {
                return false;
            } 
        }
        
        for (int i = max(0, (int)s.length() - 2); i < s.length(); i++) {
            if (s[i] == 'A') {
                acnt++;
                if (acnt > 1) return false;
            }
        }
        return true;
        
    }
};
```

