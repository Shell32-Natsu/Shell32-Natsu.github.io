---
title: LeetCode 126. Word Ladder II
tags:
  - CPP
  - LeetCode
  - 搜索
  - 算法
url: 778.html
id: 778
categories:
  - LeetCode
date: 2016-09-20 18:16:38
---
题目描述:

> Given two words (*beginWord* and *endWord*), and a dictionary's word list, find all shortest transformation sequence(s) from *beginWord* to*endWord*, such that:
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
> Return
>
> ```
>   [
>     ["hit","hot","dot","dog","cog"],
>     ["hit","hot","lot","log","cog"]
>   ]
>
> ```
>
> **Note:**
>
> - All words have the same length.
> - All words contain only lowercase alphabetic characters.

这道题使用BFS的问题在于BFS无法保存路径, 所以可以用对于路径的BFS, 也就是在队列中保存的是路径而不是节点. 这样的代码虽然可以AC, 但是非常慢.....

```cpp
class Solution {
	vector<vector<string>> ans;
public:
	vector<vector<string>> findLadders(string beginWord, string endWord, unordered_set<string> &wordList) {
		queue<vector<string>> BFS;
		BFS.push(vector<string>({ beginWord }));
		vector<string> visited;
		int curLevel = 1;

		while (!BFS.empty()) {
			vector<string> lastPath = BFS.front();
			if (lastPath.size() > curLevel) { // 每一层遍历过的节点必须在进入下一层时才能删除
				for (auto i : visited) {
					wordList.erase(i);
				}
				visited.clear();
				curLevel = lastPath.size();
			}

			if (!ans.empty() && lastPath.size() > ans[0].size()) break;

			if (lastPath.back() == endWord) {
				ans.push_back(lastPath);
			}
			else {
				string &c = lastPath.back();
				for (int i = 0; i < c.length(); i++) {
					string tmp = c;
					for (char j = 'a'; j <= 'z'; j++) {
						tmp[i] = j;
						if (tmp == c) continue;
						if (tmp == endWord || wordList.count(tmp)) {
							vector<string> newPath = lastPath;
							newPath.push_back(tmp);
							BFS.push(newPath);
							visited.push_back(tmp);
						}						
					}
				}
			}
			BFS.pop();
		}
		return ans;
	}
};
```

