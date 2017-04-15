---
title: LeetCode 140. Word Break II
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 搜索
  - 算法
  - 递归
url: 828.html
id: 828
categories:
  - LeetCode
date: 2016-10-02 19:30:54
---
题目描述:

> Given a string *s* and a dictionary of words *dict*, add spaces in *s* to construct a sentence where each word is a valid dictionary word.
>
> Return all such possible sentences.
>
> For example, given
> *s* = `"catsanddog"`,
> *dict* = `["cat", "cats", "and", "sand", "dog"]`.
>
> A solution is `["cats and dog", "cat sand dog"]`.

这道题是上一题的升级版. 这道题的主要问题在于在特定情况下解空间很大, 呈指数增长但是最后却无法到达字符串结尾, 这种情况下会超时. 所以可以先用类似上一道题的办法来先确定以第i-1个字符为结尾的子串是否能被分割, 保存在dp[i]中. 这一步之后就可以知道有没有解. 然后再通过从后向前DFS的方法搜索每一个解. 之所以不采用从前向后是因为从前向后搜索的话有可能在最后一步无法正好到达结尾, 而从后往前可以保证这一点.

```cpp
class Solution {
    vector<string> ans;
    int sLen, maxWordLen;
public:
    vector<string> wordBreak(string s, unordered_set<string>& wordDict) {
        sLen = s.length();
        
        for(auto i : wordDict){
            maxWordLen = max(maxWordLen, (int)i.length());
        }
        
        vector<int> dp(sLen + 1, 0);
        dp[0] = 1;
        for(int i = 0; i <= s.size(); i++){
            for(int j = i - 1; j >= 0 && i - j <= maxWordLen; j--){
                string str = s.substr(j, i - j);
                if(dp[j] && wordDict.count(str)){
                    dp[i] = 1;
                    break;
                }
            }
        }

        if(!dp[sLen]) return ans;
        vector<int> path;
        DFS(dp, path, sLen, s, wordDict);
        return ans;
    }
    
    void DFS(vector<int> &dp, vector<int> &path, int index, string &s, unordered_set<string>& wordDict){
        if(index == 0){
            string str;
            int lastIndex = 0;
            for(auto i = path.rbegin(); i != path.rend(); i++){
                str += s.substr(lastIndex, (*i) - lastIndex);
                str += " ";
                lastIndex = *i;
            }
            if(!str.empty())str.pop_back();
            ans.push_back(str);
            return;
        }
        path.push_back(index);
        for(int j = index - 1; j >= 0 && index - j <= maxWordLen; j--){
            if(dp[j] && wordDict.count(s.substr(j, index - j))){
                DFS(dp, path, j, s, wordDict);
            }
        }
        path.pop_back();
    }
};
```

