---
title: LeetCode 133. Clone Graph
tags:
  - CPP
  - LeetCode
  - 图
  - 算法
url: 797.html
id: 797
categories:
  - LeetCode
date: 2016-09-25 16:17:56
---
题目描述:

> Clone an undirected graph. Each node in the graph contains a `label` and a list of its `neighbors`.
>
> **OJ's undirected graph serialization:**Nodes are labeled uniquely.We use `#` as a separator for each node, and `,` as a separator for node label and each neighbor of the node.As an example, consider the serialized graph `{0,1,2#1,2#2,2}`.The graph has a total of three nodes, and therefore contains three parts as separated by `#`.First node is labeled as `0`. Connect node `0` to both nodes `1` and `2`.Second node is labeled as `1`. Connect node `1` to node `2`.Third node is labeled as `2`. Connect node `2` to node `2` (itself), thus forming a self-cycle.Visually, the graph looks like the following:
>
> ```
>        1
>       / \
>      /   \
>     0 --- 2
>          / \
>          \_/
> ```

使用DFS或者BFS来进行复制就可以了. 有一个要注意的问题就是在新的图中, 连接到已经遍历过的节点的边也要连接到新的图中的节点, 所以不仅要记录原图中节点有没有访问过, 也要记录对应的新的图中的节点. 由于输入数据中节点是用编号来区分的, 因此我用一个map来把节点编号与节点指针对应起来记录访问过的节点, 这样就可以同时记录新的图的节点与原图访问过的节点了(原图用节点编号, 新的图用节点指针).

```cpp
/**
 * Definition for undirected graph.
 * struct UndirectedGraphNode {
 *     int label;
 *     vector<UndirectedGraphNode *> neighbors;
 *     UndirectedGraphNode(int x) : label(x) {};
 * };
 */
class Solution {
public:
    UndirectedGraphNode *cloneGraph(UndirectedGraphNode *node) {
        if(!node) return node;
        UndirectedGraphNode *re = new UndirectedGraphNode(node->label);
        queue<UndirectedGraphNode*> BFS, reBFS;
        unordered_map<int, UndirectedGraphNode*> visited;
        BFS.push(node);
        reBFS.push(re);
        visited[re->label] = re;
        while(!BFS.empty()){
            UndirectedGraphNode *p = BFS.front(), *r = reBFS.front();
            for(int i = 0; i < p->neighbors.size(); i++){
                UndirectedGraphNode *next = p->neighbors[i];
                if(visited.count(next->label)){
                    r->neighbors.push_back(visited[next->label]);
                    continue;
                }
                else{
                    UndirectedGraphNode *reNext = new UndirectedGraphNode(next->label);
                    r->neighbors.push_back(reNext);
                    BFS.push(next);
                    reBFS.push(reNext);
                    visited[reNext->label] = reNext;
                }
            }
            BFS.pop();
            reBFS.pop();
        }
        return re;
    }
};
```

