---
title: LeetCode 207. Course Schedule
tags:
  - CPP
  - LeetCode
  - 图
  - 搜索
  - 算法
url: 1049.html
id: 1049
categories:
  - LeetCode
date: 2017-01-02 17:47:08
---
题目描述：

> There are a total of *n* courses you have to take, labeled from `0` to `n - 1`.
>
> Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: `[0,1]`
>
> Given the total number of courses and a list of prerequisite **pairs**, is it possible for you to finish all courses?
>
> For example:
>
> ```
> 2, [[1,0]]
> ```
>
> There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.
>
> ```
> 2, [[1,0],[0,1]]
> ```
>
> There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
>
> **Note:**
> The input prerequisites is a graph represented by **a list of edges**, not adjacency matrices. Read more about [how a graph is represented](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs).
>
> **Hints:**
>
> - This problem is equivalent to finding if a cycle exists in a directed graph. If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.
> - [Topological Sort via DFS](https://class.coursera.org/algo-003/lecture/52) - A great video tutorial (21 minutes) on Coursera explaining the basic concepts of Topological Sort.
> - Topological sort could also be done via [BFS](http://en.wikipedia.org/wiki/Topological_sorting#Algorithms).

Hint中已经说的很明确了，就是判断一个图中有没有环。我用DFS来遍历每个节点，有两个出现环的情况：

1. 出现了路径中已经出现的节点
2. 有的节点没有被遍历到过，说明它们没有起始的端点

```cpp
class Solution {
public:
	bool canFinish(int numCourses, vector<pair<int, int>>& prerequisites) {
		vector<vector<int>> gg(numCourses);
		vector<int> prerequested(numCourses, false), allVisited(numCourses, false);
		for (int i = 0; i < prerequisites.size(); i++) {
			gg[prerequisites[i].first].push_back(prerequisites[i].second);
			prerequested[prerequisites[i].second] = true;
		}
		int prerequestedNum = 0;
		for (int i = 0; i < numCourses; i++) {
			if (!prerequested[i]) {
				vector<int> thisTimeVisited(numCourses, false);
				thisTimeVisited[i] = true;
				allVisited[i] = true;
				if (!DFS(gg, i, allVisited, thisTimeVisited)){
					return false;
				}
				thisTimeVisited[i] = false;
			}
			else {
				prerequestedNum++;
			}
		}
		if (prerequestedNum == numCourses) {
			//no start node
			return false;
		}
		for (int i = 0; i < numCourses; i++) {
			if (!allVisited[i]) {
				//some nodes cannot be visited
				return false;
			}
		}
		return true;
	}

	bool DFS(vector<vector<int>> &gg, int node, vector<int> &allVisited, vector<int> &thisTimeVisited) {
		vector<int> nextNodes = gg[node];
		for (int i = 0; i < nextNodes.size(); i++) {
			if (thisTimeVisited[nextNodes[i]]) {
				//find cycle
				return false;
			}
			allVisited[nextNodes[i]] = true;
			thisTimeVisited[nextNodes[i]] = true;
			if (!DFS(gg, nextNodes[i], allVisited, thisTimeVisited))
				return false;
			thisTimeVisited[nextNodes[i]] = false;
		}
		return true;
	}
};

```

