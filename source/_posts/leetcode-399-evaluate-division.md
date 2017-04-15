---
title: LeetCode 399. Evaluate Division
tags:
  - CPP
  - LeetCode
  - 图
  - 搜索
  - 算法
url: 759.html
id: 759
categories:
  - LeetCode
date: 2016-09-14 18:35:37
---
题目描述:

> Equations are given in the format `A / B = k`, where `A` and `B` are variables represented as strings, and `k` is a real number (floating point number). Given some queries, return the answers. If the answer does not exist, return `-1.0`.
>
> **Example:**
> Given `a / b = 2.0, b / c = 3.0.` 
> queries are: `a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? .` 
> return `[6.0, 0.5, -1.0, 1.0, -1.0 ].`
>
> The input is: 
>
> ```vector<pair<string, string>> equations, vector<double>& values, vector<pair<string, string>> queries ```
>
> , where `equations.size() == values.size()`, and the values are positive. This represents the equations. Return `vector`.
>
> According to the example above:
>
> ```
> equations = [ ["a", "b"], ["b", "c"] ],
> values = [2.0, 3.0],
> queries = [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ]. 
> ```
>
> The input is always valid. You may assume that evaluating the queries will result in no division by zero and there is no contradiction.

这道题一看起来没啥思路, 但是看到tags里的Graph就一下子豁然开朗了. 其实每一个除法就是定义了有向图的一条边(实际上是来回两条)以及这条边的权值. 这样一来每一个查询就是判断给定的两个节点是否连通, 并且计算出路径上每条边的权值的乘积.

首先构建邻接矩阵或邻接表, 然后对每个查询使用DFS或者BFS来搜索是否有两点之间的通路, 并且计算乘积.

在计算过程中, 如果两个点是间接相连的, 实际上我们就可以直接在两点之间增加一条边, 权值为连接通路的权值乘积. 这样的话在剩下的查询中BFS中就可能更快地抵达目标节点.

```cpp
class Solution {
    // 由于对于string的比较等操作很费时, 所以用一个map把string与int对应起来.
    unordered_map<string, int> nodes; 
public:
    vector<double> calcEquation(vector<pair<string, string>> equations, vector<double>& values, vector<pair<string, string>> queries) {
        for(int i = 0; i < equations.size(); i++){
            // 给每一个string分配一个下标
            // 注意这里有个隐藏bug, 假如map/unordered_map对象m中不包含a, 
            // 那么在使用m[a]时实际上是已经创建一个a的key和对应的value, 导致size加1
            // 所以如果我们想让第n个加入的元素的value为n-1的话, 
            // 需要赋值m.size() - 1而不是m.size()
            if(!nodes.count(equations[i].first)){
                nodes[equations[i].first] = nodes.size() - 1;
            }
            if(!nodes.count(equations[i].second)){
                nodes[equations[i].second] = nodes.size() - 1;
            }
        }
        vector<vector<double>> g(nodes.size(), vector<double>(nodes.size(), -1.0));
        for(int i = 0; i < equations.size(); i++){
            // 构建邻接矩阵
            g[getNode(equations[i].first)][getNode(equations[i].second)] = values[i];
            g[getNode(equations[i].second)][getNode(equations[i].first)] = 1 / values[i];
        }
        vector<double> ret(queries.size());
        for(int i = 0; i < queries.size(); i++){
            string a = queries[i].first, b = queries[i].second;
            if(!nodes.count(a) || !nodes.count(b)){
                // 如果出现了不存在的节点
                ret[i] = -1.0;
            }
            else{
                // 使用BFS来搜索路径
                ret[i] = BFS(g, getNode(a), getNode(b));
            }
        }
        return ret;
    }
    
    int getNode(string s){
        return nodes[s];
    }
    
    double BFS(vector<vector<double>> &g, int a, int b){
        // 如果是同一个节点就直接返回
        if(a == b) return 1.0;
        int n = g.size();
        vector<int> visited(n, 0); // 用于保存是否访问过节点
        queue<int> q; // BFS队列, 保存节点下标
        queue<double> v; // 用于保存从a到BFS队列中相应的节点的路径乘积
        q.push(a);
        visited[a] = 1;
        v.push(1.0);
        while(!q.empty()){
            int node = q.front();
            double value = v.front();
            for(int i = 0; i < n; i++){
                if(visited[i] || g[node][i] == -1.0) continue; // 节点i已经访问过或者没有边到达i
                visited[i] = 1;
                q.push(i);
                double len = value * g[node][i]; // 从a到i的路径权值乘积
                // 添加新的边
                g[a][i] = len;
                g[i][a] = 1 / len;
                if(i == b){ // 抵达b点
                    return len;
                }
                v.push(len);
            }
            q.pop();
            v.pop();
        }
        return -1.0;
    }
};
```

