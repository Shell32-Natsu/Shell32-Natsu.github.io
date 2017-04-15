---
title: LeetCode 488. Zuma Game
tags:
  - CPP
  - LeetCode
  - 搜索
  - 算法
  - 递归
url: 1097.html
id: 1097
categories:
  - LeetCode
date: 2017-01-15 14:11:45
---
题目描述：

> Think about Zuma Game. You have a row of balls on the table, colored red(R), yellow(Y), blue(B), green(G), and white(W). You also have several balls in your hand.
>
> Each time, you may choose a ball in your hand, and insert it into the row (including the leftmost place and rightmost place). Then, if there is a group of 3 or more balls in the same color touching, remove these balls. Keep doing this until no more balls can be removed.
>
> Find the minimal balls you have to insert to remove all the balls on the table. If you cannot remove all the balls, output -1.
>
> ```
> Examples:
>
> Input: "WRRBBW", "RB"
> Output: -1
> Explanation: WRRBBW -> WRR[R]BBW -> WBBW -> WBB[B]W -> WW
>
> Input: "WWRRBBWW", "WRBRW"
> Output: 2
> Explanation: WWRRBBWW -> WWRR[R]BBWW -> WWBBWW -> WWBB[B]WW -> WWWW -> empty
>
> Input:"G", "GGGGG"
> Output: 2
> Explanation: G -> G[G] -> GG[G] -> empty 
>
> Input: "RBYYBBRRB", "YRBGB"
> Output: 3
> Explanation: RBYYBBRRB -> RBYY[Y]BBRRB -> RBBBRRB -> RRRB -> B -> B[B] -> BB[B] -> empty 
>
> ```
>
> **Note:**
>
> 1. You may assume that the initial row of balls on the table won’t have any 3 or more consecutive balls with the same color.
> 2. The number of balls on the table won't exceed 20, and the string represents these balls is called "board" in the input.
> 3. The number of balls in your hand won't exceed 5, and the string represents these balls is called "hand" in the input.
> 4. Both input strings will be non-empty and only contain characters 'R','Y','B','G','W'.

这次Contest中最难的题。Zuma游戏的规则，从`hand`中抽取ball插入到`board`中，有大于等于三个相同颜色的ball连着就可以消去，问最少几步可以消去，或者无法消去。

初看这道题我以为是图的连通性和最短路径问题（其实也差不多），然后发现构建图的过程中就已经完成了遍历可以得到结果了。使用回溯法，时间上可能效率不高，但好在方法比较容易想到。

对输入的`board`尝试消去每一个可能的位置，然后对每一个得到的结果递归地进行处理（DFS）。因为`board`长度不超过20，所以不会因为解空间太大而超时。

代码是Contest的时候写的，可能比较乱……

```cpp
class Solution {
public:
    int findMinStep(string board, string hand){
        return findMinStepImpl(board, hand);
    }
    
    int findMinStepImpl(string board, string hand) {
        if(board.empty()) return 0;
        int minStep = INT_MAX;
        for(int i = 0; i < board.size() - 1; i++){
            if(board[i] == board[i + 1]){
                if(findBall(board[i], hand) != -1){
                    string tb = board, th = hand;
                    char ball = board[i];
                    removeBall(ball, th);
                    tb.insert(tb.begin() + i, ball);
                    removeThree(tb);
                    int ans = findMinStepImpl(tb, th);
                    if(ans != -1) minStep = min(minStep, ans + 1);
                }
            }
        }
        
        if(minStep != INT_MAX)
            return minStep;
        
        for(int i = 0; i < board.size(); i++){
            if(findBall(board[i], hand) != -1){
                string tb = board, th = hand;
                char ball = board[i];
                removeBall(ball, th);
                tb.insert(tb.begin() + i, ball);
                int ans = findMinStepImpl(tb, th);
                if(ans != -1) minStep = min(minStep, ans + 1);
            }
        }
        if(minStep != INT_MAX)
            return minStep;
        else
            return -1;
    }
    
    int findBall(char ball, string &hand){
        auto iter = find(hand.begin(), hand.end(), ball);
        if(iter == hand.end()) return -1;
        else return iter - hand.begin();
    }
    
    void removeBall(char ball, string &hand){
        auto iter = find(hand.begin(), hand.end(), ball);
        if(iter != hand.end()){
            hand.erase(iter);
        }
    }
    
    void removeThree(string &b){
        if(b.size() < 3) return ;
        for(int i = 1; i < b.size(); i++){
            if(b[i] == b[i - 1]){
                int j;
                for(j = i; j < b.size() && b[j] == b[i]; j++);
                if(j - i + 1 >= 3) {
                    b.erase(i - 1, j - i + 1);
                    return removeThree(b);
                }
            }
        }
    }
};
```

