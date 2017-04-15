---
title: LeetCode 187. Repeated DNA Sequences
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 字符串
  - 算法
url: 945.html
id: 945
categories:
  - LeetCode
date: 2016-11-04 17:39:46
---
题目描述:

> All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: "ACGAATTCCG". When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.
>
> Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.
>
> For example,
>
> ```
> Given s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT",
>
> Return:
> ["AAAAACCCCC", "CCCCCAAAAA"].
> ```

因为序列长度是固定的十位, 所以如果把A, C, G, T对应到1, 2, 3, 4的数字的话, 十位的字符串可以映射到一个整数. 然后就可以用hash表来记录是否出现过相同的字符串.

```cpp
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        vector<string> re;
        if(s.size() <= 10) return re;
        unordered_map<unsigned int, int> tSet;
        for(int i = 0; i <= s.size() - 10; i++){
            string str = s.substr(i, 10);
            unsigned int t = strToInt(str);
            if(tSet.count(t)){
                if(tSet[t] == 1) re.push_back(str);
            }
            tSet[t]++;
        }
        return re;
    }
    
    unsigned int strToInt(string s){
        unsigned int re = 0;
        for(int i = 0; i < 10; i++){
            re *= 5;
            re += charToNum(s[i]);
        }
        return re;
    }
    
    unsigned int charToNum(char c){
        if(c == 'A') return 1;
        else if(c == 'C') return 2;
        else if(c == 'G') return 3;
        else return 4;
    }
};
```

