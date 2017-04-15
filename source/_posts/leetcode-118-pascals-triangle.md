---
title: LeetCode 118. Pascal's Triangle
tags:
  - CPP
  - LeetCode
  - 算法
url: 740.html
id: 740
categories:
  - LeetCode
date: 2016-09-09 16:01:26
---
题目描述:

> Given *numRows*, generate the first *numRows* of Pascal's triangle.
>
> For example, given *numRows* = 5,
> Return
>
> ```
> [
>      [1],
>     [1,1],
>    [1,2,1],
>   [1,3,3,1],
>  [1,4,6,4,1]
> ]
> ```

Pascal三角形就是每一行除了开头和结尾的数是1, 其他数都等于它的左上方与右上方的数之和.

```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> result(numRows, vector<int>());

        for(int i = 0; i < numRows; i++){
            for(int j = 0; j <= i; j++){
                if(j == 0 || j == i) result[i].push_back(1);
                else{
                    result[i].push_back(result[i - 1][j - 1] + result[i - 1][j]);
                }
            }
        }
        return result;
    }
};
```

