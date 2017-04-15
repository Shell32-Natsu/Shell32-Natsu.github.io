---
title: LeetCode 423. Reconstruct Original Digits from English
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 886.html
id: 886
categories:
  - LeetCode
date: 2016-10-16 16:22:14
---
题目描述:

> Given a **non-empty** string containing an out-of-order English representation of digits `0-9`, output the digits in ascending order.
>
> **Note:**
>
> 1. Input contains only lowercase English letters.
> 2. Input is guaranteed to be valid and can be transformed to its original digits. That means invalid inputs such as "abc" or "zerone" are not permitted.
> 3. Input length is less than 50,000.
>
> **Example 1:**
>
> ```
> Input: "owoztneoer"
>
> Output: "012"
>
> ```
>
> **Example 2:**
>
> ```
> Input: "fviefuro"
>
> Output: "45"
> ```

这道题关键在于找出所有的数字, 至于顺序问题采用排序或者先用数组保存最后再拼接都可以. 

先遍历一次输入字符串, 记录每个字母的出现次数, 然后用贪心法逐个找出每个单词的出现次数, 只要组成这个单词的所有字母的剩余个数都不为0, 那么就可以组成这个单词. 但是如果采用`0-9`的顺序来依次搜索单词的话, `one`这个单词中的`o`, `n`和`e`可能都不是`one`中的, 可能是从其他单词中"拿来的", 这就会导致结果错误. 所以要以特定的顺序来遍历`0-9`. 如果一个单词中有"独特的"字母, 也就是只在这个单词中出现的字母, 那么它就不可能从其他的单词中"拿来"组成这个单词的所有字母, `zero`中的`z`, `two`中的`w`, `four`中的`u`, `six`中的`x`, `eight`中的`g`都是唯一的, 因此要把它们放在前面来搜索, 在剩下的单词中继续寻找"唯一的"字母. 这样就可以得到一个`0-9`的序列, 比如`0246875319`, 按照这个顺序来搜索单词就可以得到正确答案.

```cpp
class Solution {
    vector<string> digits = {"zero", "two", "four", "six", "eight", "seven", "five", "three", "one", "nine"};
    string digitStr = "0246875319";
public:
    string originalDigits(string s) {
        vector<int> letters(26, 0);
        for(auto c : s){
            letters[c - 'a']++;
        }
        vector<string> ansVector(10);
        for(int i = 0; i < digits.size(); i++){
            while(true){
                bool cont = true;
                for(int j = 0 ; j < digits[i].length(); j++){
                    if(letters[digits[i][j] - 'a'] == 0){
                        cont = false;
                        break;
                    }
                }
                if(!cont) break;
                for(int j = 0 ; j < digits[i].length(); j++){
                    letters[digits[i][j] - 'a']--;
                }
                ansVector[digitStr[i] - '0'].push_back(digitStr[i]);
            }
        }
        string ans;
        for(auto i : ansVector){
            ans += i;
        }
        return ans;
    }
};
```

