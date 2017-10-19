---
title: LeetCode 684. Redundant Connection
date: 2017-09-24 11:57:13
tags:
 - LeetCode
 - CPP
 - 图
 - 并查集
categories:
 - LeetCode
---

We are given a "tree" in the form of a 2D-array, with `distinct` values for each node.

In the given 2D-array, each element pair `[u, v]` represents that `v` is a child of `u` in the tree.

We can remove `exactly` one redundant pair in this "tree" to make the result a tree.

You need to find and output such a pair. If there are multiple answers for this question, output the one appearing last in the 2D-array. There is always at least one answer.

**Example 1:**

```
Input: [[1,2], [1,3], [2,3]]
Output: [2,3]
Explanation: Original tree will be like this:
  1
 / \
2 - 3

```

**Example 2:**

```
Input: [[1,2], [1,3], [3,1]]
Output: [3,1]
Explanation: Original tree will be like this:
  1
 / \\
2   3

```

**Note:**

The size of the input 2D-array will be between 1 and 1000.

Every integer represented in the 2D-array will be between 1 and 2000.

<!-- more -->

这道题的题目描述相当的坑，我被`child`这个词和test case困扰了挺久。而且要再复习一个概念：我们常说的“父子节点”是针对**有根树 Rooted Tree**来说的，而树的定义：无向连通无环图是没有父子节点这种区分的，而这道题的输入数据是就是一个广义上的树，不要被题目误导了。

实际上这道题就是要判断一个无向图是否是一个棵树。主要探测两个条件：

1. 是否有环
2. 是否连通

最直接的办法就是用DFS遍历查找环，但是因为要删去一条下标最大的边，所以从后往前依次删除边，直到剩下的边可以组成一个树。

```cpp
class Solution {
    bool isTree(vector<vector<int>>& edges, int skip) {
        vector<vector<int>> graph(2001);
        unordered_set<int> nodes;
        for (int i = 0; i < edges.size(); i++) {
            if (i == skip) continue;
            graph[edges[i][0]].push_back(edges[i][1]);
            graph[edges[i][1]].push_back(edges[i][0]);
            nodes.insert(edges[i][0]);
            nodes.insert(edges[i][1]);
        }

        unordered_set<int> visited;

        vector<int> path;
        int start = edges[0][0];
        if (!dfs(graph, visited, path, start))
            return false;
        return visited.size() == nodes.size();
    }

    bool dfs(vector<vector<int>>& graph, unordered_set<int> &visited, vector<int> &path, int node) {
        int parent = -1;
        if (!path.empty()) parent = path.back();
        path.push_back(node);
        visited.insert(node);
        for (auto n : graph[node]) {
            if (visited.count(n) && parent != -1 && n != parent) {
                return false;
            }
            else if (!visited.count(n)) {
                if (!dfs(graph, visited, path, n))
                    return false;
            }
        }
        path.pop_back();
        return true;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        vector<int> ans;
        for (int i = edges.size() - 1; i >= 0; i--) {
            if (isTree(edges, i)) {
                ans = edges[i];
                break;
            }
        }
        return ans;
    }
};
```

然而这个办法效率很低。更优的解法是使用并查集。当一条边连接了两个本来就在一个集合中的节点时，这条边就破坏了树的结构，只要返回这条边就好了。

```cpp
class Solution {
    int findHead(vector<int> &u, int node) {
        while(u[node] != node)
            node = u[node];
        return node;
    }
    
    vector<int> uf(vector<vector<int>>& edges) {
        vector<int> u(2001);
        for (int i = 0; i < u.size(); i++) {
            u[i] = i;
        }
        
        for (auto &edge: edges) {
            int h1 = findHead(u, edge[1]);
            int h2 = findHead(u, edge[0]);
            if (h1 == h2) return edge;
            u[h1] = h2;
        }
        return vector<int>();
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        vector<int> ans;
        ans = uf(edges);
        return ans;
    }
};
```

