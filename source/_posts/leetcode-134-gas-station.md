---
title: LeetCode 134. Gas Station
tags:
  - CPP
  - LeetCode
  - 算法
url: 800.html
id: 800
categories:
  - LeetCode
date: 2016-09-25 16:40:18
---
 题目描述:

> There are *N* gas stations along a circular route, where the amount of gas at station *i* is `gas[i]`.
>
> You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from station *i* to its next station (*i*+1). You begin the journey with an empty tank at one of the gas stations.
>
> Return the starting gas station's index if you can travel around the circuit once, otherwise return -1.
>
> **Note:**
> The solution is guaranteed to be unique.

环路上分布着n个加油站, 输入数据是每个加油站可以加多少油和到下一个加油站耗费多少油, 要求找出能不能走完这个环. 

首先要证明一个情况: 如果从a点出发无法抵达c点(c之前的一点可以到达), 那么从a到c之间的任何一点b出发都是无法到达c点的. 这是因为从a出发到b的时候最坏的情况是正好没有油, 所以从b点继续的时候油是>=在b点加的油的, 而如果一开始就从b出发, 油就等于在b加的油, 是不可能比从a出发开的远的.

因此可以在O(n)的时间复杂度内解决. 从第一个点开始, 搜索能到达的最远的点, 如果不能走完一圈, 那么这之间的点就不用再试了, 可以直接从最远点的下一个点开始尝试.

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int newStart, i = 0;
        while(true){
            if(impl(gas, cost, i, newStart)){
                return i;
            }
            else if(newStart >= gas.size()){
                break;
            }
            else{
                i = newStart;
            }
        }
        return -1;
    }
    
    bool impl(vector<int> &gas, vector<int> &cost, int start, int &newStart){
        int carGas = 0;
        for(int i = start; i < start + gas.size(); i++){
            int index = i % gas.size();
            carGas += gas[index];
            carGas -= cost[index];
            if(carGas < 0) {
                newStart = i + 1;
                return false;
            }
        }
        return true;
    }
};
```

