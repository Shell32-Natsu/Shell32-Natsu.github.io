---
title: LeetCode 49. Group Anagrams
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 字符串
  - 算法
url: 526.html
id: 526
categories:
  - LeetCode
date: 2016-07-31 16:07:19
---
题目描述:

> Given an array of strings, group anagrams together.
> 
> For example, given: ["eat", "tea", "tan", "ate", "nat", "bat"], 
> Return:
>
>     [
>       ["ate", "eat","tea"],
>       ["nat","tan"],
>       ["bat"]
>     ]

anagram的意思是"颠倒字母而成的词句", 也就是要把由相同字母组成的但顺序不同的字符串放到一起. 使用hash表, 对每个字符串中的字符排序后得到的新字符串作为hash表的key, value则是对应的原字符串集合.

    class Solution {
    public:
        vector<vector<string>> groupAnagrams(vector<string>& strs) {
            unordered_map<string, vector<string>> m;
            vector<vector<string>> ret;
            for(int i = 0; i < strs.size(); i++){
                string s = strs[i];
                sort(s.begin(), s.end());
                if(m.count(s)){
                    m[s].push_back(strs[i]);
                }
                else{
                    m[s] = vector<string>(1, strs[i]);
                }
            }
            ret.resize(m.size()); //预先扩展ret的大小, 避免在循环中push_back频繁分配新的内存空间
            int cnt = 0;
            for(auto i = m.begin(); i != m.end(); i++){
                ret[cnt++] = (i->second);
            }
            return ret;
        }
    };