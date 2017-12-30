---
title: LeetCode 744. Network Delay Time
date: 2017-12-30 17:04:10
tags:
 - LeetCode
 - 算法
 - CPP
 - 图
categories:
 - LeetCode
---

There are `N` network nodes, labelled `1` to `N`.

Given `times`, a list of travel times as **directed** edges `times[i] = (u, v, w)`, where `u` is the source node, `v` is the target node, and `w` is the time it takes for a signal to travel from source to target.

Now, we send a signal from a certain node `K`. How long will it take for all nodes to receive the signal? If it is impossible, return `-1`.

**Note:**

1. `N` will be in the range `[1, 100]`.
2. `K` will be in the range `[1, N]`.
3. The length of `times` will be in the range `[1, 6000]`.
4. All edges `times[i] = (u, v, w)` will have `1 <= u, v <= N` and `1 <= w <= 100`.

<!-- more -->

要求出所有图中所有节点到某一个节点的最短距离。使用Dijkstra算法遍历所有节点一次就可以得到所有节点到某一节点的最短距离。

注意，题目中给的条件`1 <= w <= 100`不对，实际测试数据包含`w == 0`的情况，我被这个坑了一次。

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int N, int K) {
        vector<vector<int>> matrix(N + 1, vector<int>(N + 1, -1));
        for (auto &v : times) {
            matrix[v[0]][v[1]] = v[2];
        }
        
        vector<int> distance(N + 1, INT_MAX);
        vector<int> visited(N + 1, 0);
        distance[K] = 0;
        visited[K] = 1;
        int currNode = K;
        while (true) {
            int min_dis = INT_MAX, min_index;
            auto& tmp = matrix[currNode];
            for (int i = 1; i < tmp.size(); i++) {
                if (tmp[i] == -1 || visited[i]) 
                    continue;
                distance[i] = min(distance[i], distance[currNode] + tmp[i]);
            }
            
            for (int i = 1; i < N + 1; i++) {
                if (visited[i]) 
                    continue;
                if (distance[i] < min_dis) {
                    min_dis = distance[i];
                    min_index = i;
                }
            }
            
            if (min_dis == INT_MAX)
                break;
            
            currNode = min_index;
            visited[currNode] = 1;
        }
        
        int ans = INT_MIN;
        for (int i = 1; i < N + 1; i++) {
            if (distance[i] == INT_MAX)
                return -1;
            ans = max(ans, distance[i]);
        }
        return ans;
    }
};
```

