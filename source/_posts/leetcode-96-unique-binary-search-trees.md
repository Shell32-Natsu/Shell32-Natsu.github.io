---
title: LeetCode 96. Unique Binary Search Trees
tags:
  - CPP
  - LeetCode
  - 二叉树
  - 算法
  - 递归
url: 671.html
id: 671
categories:
  - LeetCode
date: 2016-08-24 16:22:28
---
题目描述:

> Given *n*, how many structurally unique **BST's** (binary search trees) that store values 1...*n*?
>
> For example,
> Given *n* = 3, there are a total of 5 unique BST's.
>
> ```
>    1         3     3      2      1
>     \       /     /      / \      \
>      3     2     1      1   3      2
>     /     /       \                 \
>    2     1         2                 3
> ```

采用递归+动态规划来解决.

首先一颗n个节点的BST, 假设它的根节点值为r(1<=r<=n), 那么它的不同形态数量等于所有左子树的形态数量(r-1个节点)×所有右子树的形态数量(n-r个节点), 而因为一颗BST的形态数量只与节点数量有关而与节点的具体值无关, 所以可以用一个数组来记录已经计算过数量的n来减少计算.

```cpp
class Solution {
public:
    int numTrees(int n) {
        vector<int> nums(n + 1, -1);
        return numsTrees(n, nums);
    }
    
    int numsTrees(int n, vector<int> &nums){
        int num = 0;
        if(n == 0 || n == 1){
            return 1;
        }
        for(int i = 1; i <= n; i++){
            num += ((nums[i - 1] == -1 ? numsTrees(i - 1, nums) : nums[i - 1]) * (nums[n - i] == -1 ? numsTrees(n - i, nums) : nums[n - i]));
        }
        nums[n] = num;
        return num;
    }
};
```

