---
title: LeetCode 378. Kth Smallest Element in a Sorted Matrix
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 堆
  - 算法
url: 534.html
id: 534
categories:
  - LeetCode
date: 2016-08-01 18:01:53
---
题目描述:

>Given a n x n matrix where each of the rows and columns are sorted in ascending order, find the kth smallest element in the matrix.
>
>Note that it is the kth smallest element in the sorted order, not the kth distinct element.
>
>Example:
>
>     matrix = [
>        [ 1,  5,  9],
>        [10, 11, 13],
>        [12, 13, 15]
>     ],
>     k = 8,
>
>     return 13.
>Note: 
>
>You may assume k is always valid, 1 ≤ k ≤ n<sup>2</sup>.

首先的想法是每次从n行中取最前端的n个值中的最小值, 然后这个值从该行删除, 重复k次. 时间复杂度O(nk). 实际运行时间280ms.

    class Solution {
    public:
        int kthSmallest(vector<vector<int>>& matrix, int k) {
            int n = matrix.size();
            vector<int> matrixPos(n, 0);
            int ret;
            for(int i = 0; i < k; i++){
                int minNum = INT_MAX, minPos = 0;
                for(int j = 0; j < n; j++){
                    if(matrixPos[j] == n) continue;
                    if(matrix[j][matrixPos[j]] < minNum){
                        minNum = matrix[j][matrixPos[j]];
                        minPos = j;
                    }
                }
                matrixPos[minPos]++;
                ret = minNum;
            }
            return ret;
        }
    };

使用二分搜索, 不过搜算范围是`int`类型的整个表示范围, 为避免溢出, 使用long long来保存左右边界. Runtime: 80ms.

    class Solution {
    public:
        int kthSmallest(vector<vector<int>>& matrix, int k) {
            int n = matrix.size();
            long long l = INT_MIN, r = INT_MAX, mid;
            while(l < r){
                mid = (l + r) >> 1;
                int kth = 0;
                for(int i = 0; i < n; i++){
                    for(int j = 0; j < n && matrix[i][j] <= mid; j++){
                        kth++;
                    }
                }
                if(kth < k) l = mid + 1;
                else r = mid;
            }
            return l;
        }
    };

另一种使用堆的方法, 先按从上往下, 从左往右的顺序将k个元素放入堆中. 对于剩下的元素, 每一行从头开始与堆顶比较, 如果小于堆顶, 就把它放入堆中, 把原堆顶弹出. 改行中出现>=堆顶的元素时即可停止对这一行的处理. 运行时间112ms.

    class Solution {
    public:
        int kthSmallest(vector<vector<int>>& matrix, int k) {
            int n = matrix.size();
            priority_queue<int> heap;
            for(int i = 0; i < n; i++){
                if(heap.size() < k){
                    int j;
                    for(j = 0; j < n && heap.size() < k; j++){
                        heap.push(matrix[i][j]);
                    }
                    for(; j < n && heap.top() > matrix[i][j]; j++){
                        heap.pop();
                        heap.push(matrix[i][j]);
                    }
                }
                else{
                    for(int j = 0; j < n && heap.top() > matrix[i][j]; j++){
                        heap.pop();
                        heap.push(matrix[i][j]);
                    }
                }
            }
            return heap.top();
        }
    };