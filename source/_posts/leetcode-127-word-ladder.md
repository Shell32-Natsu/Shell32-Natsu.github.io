---
title: LeetCode 127. Word Ladder
tags:
  - CPP
  - LeetCode
  - 搜索
  - 算法
url: 776.html
id: 776
categories:
  - LeetCode
date: 2016-09-20 18:00:13
---
题目描述:

> Given two words (*beginWord* and *endWord*), and a dictionary's word list, find the length of shortest transformation sequence from*beginWord* to *endWord*, such that:
>
> 1. Only one letter can be changed at a time
> 2. Each intermediate word must exist in the word list
>
> For example,
>
> Given:
> *beginWord* = `"hit"`
> *endWord* = `"cog"`
> *wordList* = `["hot","dot","dog","lot","log"]`
>
> As one shortest transformation is `"hit" -> "hot" -> "dot" -> "dog" -> "cog"`,
> return its length `5`.
>
> **Note:**
>
> - Return 0 if there is no such transformation sequence.
> - All words have the same length.
> - All words contain only lowercase alphabetic characters.

使用广度优先搜索, 判断是否连接是通过穷举一个单词的所有可能变化来完成的.

```cpp
class Solution {
public:
	int ladderLength(string beginWord, string endWord, unordered_set<string>& wordList) {
		queue<string> BFS;
		queue<int> length;
		BFS.push(beginWord);
		length.push(1);
		int maxLen = INT_MIN;
		while (!BFS.empty()) {
			string &c = BFS.front();
			int l = length.front();
			if (maxLen < l) maxLen = l;

			if(c == endWord) return maxLen;
			for(int i = 0; i < c.length(); i++){
			    string tmp = c;
			    for(char j = 'a'; j <= 'z'; j++){
			        tmp[i] = j;
			        if(wordList.count(tmp)){
			            BFS.push(tmp);
			            length.push(l + 1);
			            wordList.erase(tmp);
			        }
			    }
			}
			BFS.pop();
			length.pop();
		}
		return 0;
	}

};
```

