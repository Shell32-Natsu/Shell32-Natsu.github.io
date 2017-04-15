---
title: LeetCode 30. Substring with Concatenation of All Words
url: 467.html
id: 467
categories:
  - LeetCode
date: 2016-07-23 22:41:48
tags:
---
题目描述:

> You are given a string, s, and a list of words, words, that are all of the same length. Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.
> 
> For example, given:
> 
> s: "barfoothefoobarman"
> 
> words: ["foo", "bar"]
> 
> You should return the indices: [0,9].
> 
> (order does not matter).

首先使用暴力法, 将words中的词放入一个哈希表中, 这样可以在常数时间内找到它. 然后用一个双重循环来遍历字符串s.

    class Solution {
    public:
        vector<int> findSubstring(string s, vector<string>& words) {
            vector<int> ret;
            int wordsLen = words.size();
            if(wordsLen == 0)
                return ret;
            int wordLen = words[0].length(), sLen = s.length(), totalLen = wordsLen * wordLen;
            
            unordered_map<string, int> wordExistOrig;
            
            for(int i = 0; i < wordsLen; i++){
                if(wordExistOrig.count(words[i])){
                    wordExistOrig[words[i]]++;
                }
                else{
                    wordExistOrig[words[i]] = 1;
                }
            }
            
            for(int i = 0; i <= sLen - totalLen; i++){
                unordered_map<string, int> wordExist = wordExistOrig;
                bool valid = true;
                for(int j = i; j < totalLen + i; j += wordLen){
                    string str = s.substr(j, wordLen);
                    if(wordExist.count(str) == 0) {
                        valid = false;
                        break;
                    }
                    else{
                        wordExist[str]--;
                        if(wordExist[str] < 0){
                            valid = false;
                            break;
                        }
                    }
                }
                if(valid) ret.push_back(i);
            }
            
            return ret;
        }
    };

还可以使用一种"滑动窗口"方法, 或者是双指针方法, 思路参考这里: <http://www.2cto.com/kf/201406/311648.html>. 举例来说比如题目中的例子: `"barfoothefoobarman"`和数组`["foo", "bar"]`, 首先窗口长度为0, 起始位置为0, 窗口长度和起始位置都是以单词长度的整数倍变化的, 这里是3, 首先把第一个单词放进窗口(用`{}`来表示窗口): `{bar}foothefoobarman`, 由于`foo`和`bar`每个都只出现一次, 所以把`bar`的剩余次数(这个次数保存在hash表中)减1变为0, 接下来把下一个单词放入窗口: `{barfoo}thefoobarman`, 同样把`foo`的次数减1变为0, 这时窗口中已经有两个单词, 与words数组的大小相同, 就可以把当前的窗口起始位置放入结果集中. 接下来是单词`the`, 这个单词在words数组中没有, 所以窗口可以直接跳过它, 将窗口起始位置越过的`bar`和`foo`的允许出现次数加1, 此时窗口位置位于`barfoothe{}foobarman`, 然后重复这个步骤. 为了不忽略类似`abarfoo`这种字符串中的结果, 所以要将窗口起始位置从0到单词长度3遍历一次. 

代码如下, 运行时间36ms:

    class Solution {
    public:
        vector<int> findSubstring(string s, vector<string>& words) {
            vector<int> ret;
            int wordsLen = words.size();
            if (wordsLen == 0)
                return ret;
            int wordLen = words[0].length(), sLen = s.length(), totalLen = wordsLen * wordLen;

            unordered_map<string, int> wordExist;

            for (int i = 0; i < wordsLen; i++) {
                if (wordExist.count(words[i])) {
                    wordExist[words[i]]++;
                }
                else {
                    wordExist[words[i]] = 1;
                }
            }
            for (int i = 0; i < wordLen; i++) {
                int slideLeft = i, j = i, wordFound = 0;

                while (slideLeft <= sLen - totalLen && j < sLen) {
                    string str = s.substr(j, wordLen);
                    if (wordExist.count(str) == 0) {
                        //下一个单词不再words中时将窗口初始位置移到当前之后的位置
                        j += wordLen;
                        for (; slideLeft < j; slideLeft += wordLen) {
                            string toDropStr = s.substr(slideLeft, wordLen);
                            if(wordExist.count(toDropStr))wordExist[toDropStr]++;
                        }
                        //slideLeft = j;
                        wordFound = 0;
                        continue;
                    }
                    if (wordFound == wordsLen) {
                        //当窗口满的时候丢弃最前端的字符串
                        string toDropStr = s.substr(slideLeft, wordLen);
                        wordExist[toDropStr]++;
                        slideLeft += wordLen;
                        wordFound--;
                    }
                    wordExist[str]--;
                    if (wordExist[str] < 0) {
                        //当前字符串出现次数已满, 要不停的丢弃窗口最前端的字符串直到出现次数为0为止
                        while (wordExist[str] < 0) {
                            string toDropStr = s.substr(slideLeft, wordLen);
                            wordExist[toDropStr]++;
                            slideLeft += wordLen;
                            wordFound--;
                        }
                    }
                    wordFound++;
                    if (wordFound == wordsLen) {//找到一个要求的位置
                        ret.push_back(slideLeft);
                    }
                    j += wordLen;
                }
                for (; slideLeft < j; slideLeft += wordLen) {
                    //恢复每个单词出现的次数
                    string toDropStr = s.substr(slideLeft, wordLen);
                    if (wordExist.count(toDropStr)) wordExist[toDropStr]++;
                }
            }

            return ret;
        }
    };