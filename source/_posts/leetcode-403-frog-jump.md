---
title: LeetCode 403. Frog Jump
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 图
  - 搜索
  - 算法
url: 774.html
id: 774
categories:
  - LeetCode
date: 2016-09-19 18:13:02
---
题目描述:

> A frog is crossing a river. The river is divided into x units and at each unit there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water.
>
> Given a list of stones' positions (in units) in sorted ascending order, determine if the frog is able to cross the river by landing on the last stone. Initially, the frog is on the first stone and assume the first jump must be 1 unit.
>
> If the frog's last jump was *k* units, then its next jump must be either *k* - 1, *k*, or *k* + 1 units. Note that the frog can only jump in the forward direction.
>
> **Note:**
>
> - The number of stones is ≥ 2 and is < 1,100.
> - Each stone's position will be a non-negative integer < 231.
> - The first stone's position is always 0.
>
> **Example 1:**
>
> ```
> [0,1,3,5,6,8,12,17]
>
> There are a total of 8 stones.
> The first stone at the 0th unit, second stone at the 1st unit,
> third stone at the 3rd unit, and so on...
> The last stone at the 17th unit.
>
> Return true. The frog can jump to the last stone by jumping 
> 1 unit to the 2nd stone, then 2 units to the 3rd stone, then 
> 2 units to the 4th stone, then 3 units to the 6th stone, 
> 4 units to the 7th stone, and 5 units to the 8th stone.
>
> ```
>
> **Example 2:**
>
> ```
> [0,1,2,3,4,8,9,11]
>
> Return false. There is no way to jump to the last stone as 
> the gap between the 5th and 6th stone is too large.
> ```

虽然tag里说这是个DP题, 但是我觉得更像个图论题. 每个stone是一个node, 根据能否到达来判断有没有边相连, 最终要判断第一个节点与最后一个节点是否连通.

那么既然是这样, 就有DFS和BFS两派了. 用BFS的话要记录抵达每个node的上一跳可能有多远, 同时要记录一个node有没有访问过, 所以比较复杂.

```cpp
class Solution {
public:
    bool canCross(vector<int>& stones) {
        int n = stones.size();
        unordered_map<int, unordered_set<int>> dp;
        unordered_map<int, int> visited;
        for(int i = 0; i < n; i++){
            dp[stones[i]] = unordered_set<int>();
            visited[stones[i]] = 0;
        }
        if(!dp.count(1)) return false;
        if(stones.size() == 2) return true;
        dp[1] = unordered_set<int>({1});
        visited[0] = visited[1] = 1;
        queue<int> BFS;
        BFS.push(1);
        while(!BFS.empty()){
            int stn = BFS.front();
            unordered_set<int> &v = dp[stn];
            for(auto i : v){
                for(int j = i - 1; j <= i + 1; j++){
                    if(j == 0) continue;
                    if(dp.count(stn + j)){
                        if(!visited[stn + j]) {
                            visited[stn + j] = 1;
                            BFS.push(stn + j);
                        }
                        if(stn + j == stones.back() && visited[stn + j]) return true;
                        dp[stn + j].insert(j);
                    }
                }
            }
            
            BFS.pop();
        }
        return false;
    }
};
```

这个解法的Runtime有近500ms. DFS就不用保存维护这些数据. 在目前的测试数据上DFS只需要6ms.

```cpp
class Solution {
public:
    bool canCross(vector<int>& stones) {
        return canCrossImpl(stones, 0, 0);
    }
    
    bool canCrossImpl(vector<int>& stones, int index, int lastStep){
        for(int i = index + 1; i < stones.size(); i++){
            if(stones[i] - stones[index] < lastStep - 1) continue;
            if(stones[i] - stones[index] > lastStep + 1) return false;
            if(canCrossImpl(stones, i, stones[i] - stones[index])) return true;
        }
        return index == stones.size() - 1;
    }
};
```

**Update: LeetCode已经更新了测试数据**, 所以像上面那样单纯的DFS已经会超时了, 要使用一些DP的方法. 用一个二维数组来保存第i个节点的前一步为s步时能否到达. 因为步数s和节点编号i都未知且可能很大, 所以用unordered_map来实现二维数组.

```cpp
class Solution {
    unordered_map<int, unordered_map<int, bool>> m;
public:
    bool canCross(vector<int>& stones) {
        return canCrossImpl(stones, 0, 0);
    }
    
    bool canCrossImpl(vector<int>& stones, int index, int lastStep){
        if(m.count(index) && m[index].count(lastStep)){
            return m[index][lastStep];
        }
        for(int i = index + 1; i < stones.size(); i++){
            if(stones[i] - stones[index] < lastStep - 1) continue;
            if(stones[i] - stones[index] > lastStep + 1) {
                m[index][lastStep] = false;
                return false;
            }
            if(canCrossImpl(stones, i, stones[i] - stones[index])) {
                return true;
            }
        }
        return index == stones.size() - 1;
    }
};
```

由于节点最多有1099个, 在步长每次都+1的情况下步数是一个从1开始的公差为1的等差数列, 所以虽然stone的编号是<2<sup>31</sup>的, 但是大于0+1+2+...+1099=604450的stone是肯定抵达不了的. 而604450占20个二进制位, 一个32位数剩下的12位正好可以存储步数, 所以上面的二维数组可以变为一维.

```cpp
class Solution {
    unordered_map<int, bool> m;
public:
    bool canCross(vector<int>& stones) {
        return canCrossImpl(stones, 0, 0);
    }
    
    bool canCrossImpl(vector<int>& stones, int index, int lastStep){
        if(index > 604450) return false;
        int mi = index << 12 | lastStep;
        if(m.count(mi)){
            return m[mi];
        }
        for(int i = index + 1; i < stones.size(); i++){
            if(stones[i] - stones[index] < lastStep - 1) continue;
            if(stones[i] - stones[index] > lastStep + 1) {
                m[mi] = false;
                return false;
            }
            if(canCrossImpl(stones, i, stones[i] - stones[index])) {
                return true;
            }
        }
        return index == stones.size() - 1;
    }
};
```

