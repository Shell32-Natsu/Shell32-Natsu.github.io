---
title: LeetCode 131. Palindrome Partitioning
tags:
  - CPP
  - LeetCode
  - 回溯
  - 字符串
  - 算法
url: 792.html
id: 792
categories:
  - LeetCode
date: 2016-09-23 16:54:44
---
问题描述:

> Given a string *s*, partition *s* such that every substring of the partition is a palindrome.
>
> Return all possible palindrome partitioning of *s*.
>
> For example, given *s* = `"aab"`,
> Return
>
> ```
> [
>   ["aa","b"],
>   ["a","a","b"]
> ]
> ```

使用回溯法遍历每一种可能的情况.

```cpp
class Solution {
    vector<vector<string>> ans;
public:
    vector<vector<string>> partition(string s) {
        vector<string> path;
        partitionImpl(s, 0, s.size(), path);
        return ans;
    }
    
    void partitionImpl(string &s, int start, int end, vector<string> &path){
        if(end <= start){
            return;
        }
        if(isPalindrome(s, start, end)){
            path.push_back(s.substr(start, end - start));
            ans.push_back(path);
            path.pop_back();
        }
        for(int i = start + 1; i <= end; i++){
            if(!isPalindrome(s, start, i)) continue;
            path.push_back(s.substr(start, i - start));
            partitionImpl(s, i, end, path);
            path.pop_back();
        }
    }
    
    bool isPalindrome(string &s, int start, int end){
        if(end - start <= 1) return true;
        for(int i = 0; i < (end - start) / 2; i++){
            if(s[start + i] != s[end - i - 1]) return false;
        }
        return true;
    }
};
```

