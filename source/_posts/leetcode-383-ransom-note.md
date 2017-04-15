---
title: LeetCode 383. Ransom Note
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 字符串
  - 算法
url: 606.html
id: 606
categories:
  - LeetCode
date: 2016-08-11 16:28:59
---
题目描述:

> Given an arbitrary ransom note string and another string containing letters from all the magazines, write a function that will return true if the ransom note can be constructed from the magazines ; otherwise, it will return false. 
>
> Each letter in the magazine string can only be used once in your ransom note.
>
> **Note:**
> You may assume that both strings contain only lowercase letters.
>
> ```
> canConstruct("a", "b") -> false
> canConstruct("aa", "ab") -> false
> canConstruct("aa", "aab") -> true
> ```

Ransom note的意思是勒索信或者绑架信, 题目要求判断是不是所有绑架信上的字母都可以用magazines中的字母拼出来. 使用的方法是类似hash表, 不过hash值就是字母在字母表中的位置.

```cpp
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        vector<int> flag(26, 0);
        for(int i = 0; i < magazine.length(); i++){
            flag[magazine[i] - 'a']++;
        }
        for(int i = 0; i < ransomNote.length(); i++){
            if(flag[ransomNote[i] - 'a'] == 0){
                return false;
            }
            else{
                flag[ransomNote[i] - 'a']--;
            }
        }
        return true;
    }
};
```

