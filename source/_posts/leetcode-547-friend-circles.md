---
title: LeetCode 547. Friend Circles
tags:
  - CPP
  - LeetCode
  - 图
  - 并查集
  - 搜索
  - 算法
url: 1196.html
id: 1196
categories:
  - LeetCode
date: 2017-04-09 17:15:42
---
题目描述：

> There are **N** students in a class. Some of them are friends, while some are not. Their friendship is transitive in nature. For example, if A is a **direct** friend of B, and B is a **direct** friend of C, then A is an **indirect** friend of C. And we defined a friend circle is a group of students who are direct or indirect friends.
>
> Given a **N\*N** matrix **M** representing the friend relationship between students in the class. If M[i][j] = 1, then the ith and jth students are **direct** friends with each other, otherwise not. And you have to output the total number of friend circles among all the students.
>
> **Example 1:**
>
> ```
> Input: 
> [[1,1,0],
>  [1,1,0],
>  [0,0,1]]
> Output: 2
> Explanation:The 0th and 1st students are direct friends, so they are in a friend circle. 
> The 2nd student himself is in a friend circle. So return 2.
>
> ```
>
> **Example 2:**
>
> ```
> Input: 
> [[1,1,0],
>  [1,1,1],
>  [0,1,1]]
> Output: 1
> Explanation:The 0th and 1st students are direct friends, the 1st and 2nd students are direct friends, 
> so the 0th and 2nd students are indirect friends. All of them are in the same friend circle, so return 1.
>
> ```
>
> **Note:**
>
> 1. N is in range [1,200].
> 2. M[i][i] = 1 for all students.
> 3. If M[i][j] = 1, then M[j][i] = 1.

比较典型的并查集题目，也可以使用广度优先搜索来解决。

*话说朋友圈就直接翻译成Friend Circle?*

并查集：

```cpp
class Solution {
public:
    int findCircleNum(vector<vector<int>>& M) {
        int num = M.size();
        vector<int> uf(num);
        for (int i = 0; i < num; i++) uf[i] = i;
        for (int i = 0; i < num; i++) {
            for (int j = i + 1; j < num; j++) {
                if (!M[i][j]) continue;
                if (uf[i] == i && uf[j] == j) {
                    uf[j] = i;
                }
                else if (uf[i] == i) {
                    int h = j;
                    while (uf[h] != h) h = uf[h];
                    uf[i] = h;
                }
                else if (uf[j] == j) {
                    int h = i;
                    while (uf[h] != h) h = uf[h];
                    uf[j] = h;
                }
                else {
                    int h1 = j, h2 = i;
                    while (uf[h1] != h1) h1 = uf[h1];
                    while (uf[h2] != h2) h2 = uf[h2];
                    uf[h2] = h1;
                }
            }
        }
        int circleNum = 0;
        for (int i = 0; i < num; i++) {
            if (uf[i] == i) circleNum++;
        }
        return circleNum;
    }
};
```

BFS：每发现一个未标记的人，则通过广度优先搜索找出他所在的朋友圈的所有人并全部标记为访问过，朋友圈数量+1~~s~~。

```cpp
class Solution {
public:
    int findCircleNum(vector<vector<int>>& M) {
        vector<int> visited(M.size(), 0);
        int friendCircleNum = 0;
        for (int i = 0; i < M.size(); i++) {
            if (!visited[i]) {
                setMatrix(M, visited, i);
                ++friendCircleNum;
            }
        }
        return friendCircleNum;
    }
    
    void setMatrix(vector<vector<int>>& M, vector<int>& visited, int x) {
        queue<int> q;
        q.push(x);
        visited[x] = 1;
        while(!q.empty()) {
            int p = q.front();
            q.pop();
            for (int i = 0; i < M.size(); i++) {
                if (M[p][i] && !visited[i]) {
                    visited[i] = 1;
                    q.push(i);
                }
            }
        }
    }
};
```

