---
title: LeetCode 210. Course Schedule II
tags:
  - CPP
  - LeetCode
  - 图
  - 拓扑排序
  - 算法
url: 1100.html
id: 1100
categories:
  - LeetCode
date: 2017-01-17 18:06:41
---
题目描述：

> There are a total of *n* courses you have to take, labeled from `0` to `n - 1`.
>
> Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: `[0,1]`
>
> Given the total number of courses and a list of prerequisite **pairs**, return the ordering of courses you should take to finish all courses.
>
> There may be multiple correct orders, you just need to return one of them. If it is impossible to finish all courses, return an empty array.
>
> For example:
>
> ```
> 2, [[1,0]]
> ```
>
> There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is `[0,1]`
>
> ```
> 4, [[1,0],[2,0],[3,1],[3,2]]
> ```
>
> There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0. So one correct course order is `[0,1,2,3]`. Another correct ordering is`[0,2,1,3]`.
>
> **Note:**
> The input prerequisites is a graph represented by **a list of edges**, not adjacency matrices. Read more about [how a graph is represented](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs).

要求返回一个图的拓扑排序结果，在有向图存在环路的时候返回空集。拓扑排序可以用点度和队列结合的办法，也可以用DFS的办法。因为输入数据是邻接表，对边的处理比较慢，所以我用DFS来实现拓扑排序，同时判断是否有环存在。

这个题有个条件就是节点编号是在`0`-`n-1`之间的，所以记录一个节点的状态可以用数组，没有查询的开销。

```cpp
class Solution {
    vector<int> visited;
    vector<int> inPath;
public:
    vector<int> findOrder(int numCourses, vector<pair<int, int>>& prerequisites) {
        vector<vector<int>> nextCourses(numCourses), preReq(numCourses);
        for(auto i : prerequisites){
            preReq[i.first].push_back(i.second);
            nextCourses[i.second].push_back(i.first);
        }
        visited = vector<int>(numCourses, 0);
        inPath = vector<int>(numCourses, 0);
        vector<int> ans;
        for(int i = 0; i < numCourses; i++){
            if(!visited[i] && preReq[i].empty()){
                // Begin node
                vector<int> t, path;
                if(DFS(nextCourses, preReq, i, path, t))
                    ans.insert(ans.end(), t.begin(), t.end());
                else
                    return vector<int>();
            }
        }
        if(ans.size() != numCourses)
            return vector<int>();
        else
            return ans;
    }
    
    bool DFS(vector<vector<int>> &nextCourses, vector<vector<int>> &preReq, int node, vector<int> &path, vector<int> &ans){
        if(inPath[node]) {
            ans.clear();
            return false;
        }
        if(visited[node]) return true;
        for(auto i : preReq[node]){
            if(!visited[i])
                return true;
        }
        
        path.push_back(node);
        ans.push_back(node);
        inPath[node] = visited[node] = 1;
        
        for(auto i : nextCourses[node]){
            if(!DFS(nextCourses, preReq, i, path, ans)) 
                return false;
        }
        path.pop_back();
        inPath[node] = 0;
        return true;
    }
};
```

