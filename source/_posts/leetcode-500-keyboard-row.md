---
title: LeetCode 500. Keyboard Row
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 算法
url: 1127.html
id: 1127
categories:
  - LeetCode
date: 2017-02-13 17:34:30
---
题目描述：

> Given a List of words, return the words that can be typed using letters of **alphabet** on only one row's of American keyboard like the image below.
>
> ![American keyboard](https://leetcode.com/static/images/problemset/keyboard.png)
>
> **Example 1:**
>
> ```
> Input: ["Hello", "Alaska", "Dad", "Peace"]
> Output: ["Alaska", "Dad"]
>
> ```
>
> **Note:**
>
> 1. You may use one character in the keyboard more than once.
> 2. You may assume the input string will only contain letters of alphabet.

判断每个字母在键盘上位于哪一行，可以用Hash表来保存每个字母所对应的行，也可以每次都搜索一次，因为数据量都很小所以性能差距很小。

Hash表：

```cpp
class Solution {
    vector<int> keymap = {2,3,3,2,1,2,2,2,1,2,2,2,3,3,1,1,1,1,2,1,1,3,1,3,1,3};
public:
    vector<string> findWords(vector<string>& words) {
        vector<string> ans;
        for (auto str : words) {
            int row = keymap[tolower(str[0]) - 'a'], i;
            for (i = 1; i < str.length(); i++) {
                if (keymap[tolower(str[i]) - 'a'] != row) break;
            }
            if (i == str.length()) ans.push_back(str);
        }
        return ans;
    }
};
```



搜索：

```cpp
class Solution {
    vector<string> keyboard = {"qwertyuiop", "asdfghjkl", "zxcvbnm"};
public:
    vector<string> findWords(vector<string>& words) {
        vector<string> ans;
        for (auto str : words) {
            int row = findRow(str[0]), i;
            for (i = 1; i < str.length(); i++) {
                if (findRow(str[i]) != row) break;
            }
            if (i == str.length()) ans.push_back(str);
        }
        return ans;
    }
    
    int findRow(char c) {
        c = tolower(c);
        for (int i = 0; i < keyboard.size(); i++) {
            if (keyboard[i].find(c) != string::npos) 
                return i;
        }
        return -1;
    }
};
```

