---
title: LeetCode 174. Dungeon Game
tags:
  - CPP
  - LeetCode
  - 二分搜索
  - 动态规划
  - 算法
url: 934.html
id: 934
categories:
  - LeetCode
date: 2016-11-01 18:40:03
---
  题目描述:

> The demons had captured the princess (**P**) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (**K**) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.
>
> The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.
>
> Some of the rooms are guarded by demons, so the knight loses health (*negative* integers) upon entering these rooms; other rooms are either empty (*0's*) or contain magic orbs that increase the knight's health (*positive* integers).
>
> In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.
>
> **Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.**
>
> For example, given the dungeon below, the initial health of the knight must be at least **7** if he follows the optimal path `RIGHT-> RIGHT -> DOWN -> DOWN`.
>
> ![img](data:image/png;base64,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)
>
> 
>
> **Notes:**
>
> - The knight's health has no upper bound.
> - Any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.

使用二分搜索+DP. 单纯的二维DP是不行的, 因为这道题要求从起点到终点的路径中每个格子的值都不能小于1. 有可能出现终点时生命值大于0但是每一条路径实际上都无法抵达. 

但是我们可以使用DP来判断一个特定初始生命值的knight能否救到princess. 然后在外层使用二分搜索来找到最小的初始生命值. 虽然可以用`0~INT_MAX`作为搜索范围, 但是先找出初始生命值为0时每一条路径中出现的最小的生命值可以大大缩小这个范围, 实际上如果初始生命值为0时, 所有的格子中生命值都是大于1的, 可以直接返回1; 否则搜索范围的最大值就是最小生命值的绝对值加1.

```cpp
class Solution {
public:
	int calculateMinimumHP(vector<vector<int>>& dungeon) {
		if (dungeon.empty()) return 0;
		if (dungeon[0].empty()) return 0;
		int tmp = minInPath(dungeon);
		if(tmp > 0) return 1;
		int left = 0, right = -tmp + 1, mid = (right + left) / 2;
		while (left < right) {
			int h = canArrive(dungeon, mid);
			if(h == 1){
			    break;
			}
		    else if (h < 1) {
				left = mid + 1;
			}
			else {
				right = mid;
			}
			mid = (right + left) / 2;
		}
		return mid ? mid : 1;
	}

	int canArrive(vector<vector<int>>& dungeon, int target) {
		int row = dungeon.size(), col = dungeon[0].size();
		vector<vector<int>> dp(row, vector<int>(col, 0));
		dp[0][0] = target + dungeon[0][0];
		for (int i = 1; i < col; i++) {
			if (dp[0][i - 1] > 0) dp[0][i] = dp[0][i - 1] + dungeon[0][i];
		}
		for (int i = 1; i < row; i++) {
			if (dp[i - 1][0] > 0) dp[i][0] = dp[i - 1][0] + dungeon[i][0];
		}
		for (int i = 1; i < row; i++) {
			for (int j = 1; j < col; j++) {
				if(dp[i - 1][j] > 0 || dp[i][j - 1] > 0)
					dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + dungeon[i][j];
			}
		}
		return dp[row - 1][col - 1];
	}
	
	int minInPath(vector<vector<int>>& dungeon){
	    int row = dungeon.size(), col = dungeon[0].size(), minInPath = INT_MAX;
		vector<vector<int>> dp(row, vector<int>(col, 0));
		dp[0][0] = dungeon[0][0];
		minInPath = min(minInPath, dp[0][0]);
		for (int i = 1; i < col; i++) {
			dp[0][i] = dp[0][i - 1] + dungeon[0][i];
			minInPath = min(minInPath, dp[0][i]);
		}
		for (int i = 1; i < row; i++) {
			dp[i][0] = dp[i - 1][0] + dungeon[i][0];
			minInPath = min(minInPath, dp[i][0]);
		}
		for (int i = 1; i < row; i++) {
			for (int j = 1; j < col; j++) {
				dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + dungeon[i][j];
				minInPath = min(minInPath, dp[i][j]);
			}
		}
		return minInPath;
	}
};
```

