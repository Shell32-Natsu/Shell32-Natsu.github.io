---
title: LeetCode 119. Pascal's Triangle II
tags:
  - CPP
  - LeetCode
  - 算法
url: 742.html
id: 742
categories:
  - LeetCode
date: 2016-09-09 16:33:18
---
题目描述:

> Given an index *k*, return the *k*th row of the Pascal's triangle.
>
> For example, given *k* = 3,
> Return `[1,3,3,1]`.
>
> **Note:**
> Could you optimize your algorithm to use only *O*(*k*) extra space?

与[上一题](http://xiadong.info/2016/09/leetcode-118-pascals-triangle/)类似, 只不过现在是要求某一行的结果. 每计算一行只需要上一行的数据, 所以只需要保存一行.

```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> ret = {1};
        vector<int> last = {1};
        for(int i = 1; i <= rowIndex; i++){
            ret.clear();
            ret.push_back(last[0]);
            auto j = last.begin() + 1;
            for(; j != last.end(); j++){
                ret.push_back(*j + *(j - 1));
            }
            ret.push_back(*(j - 1));
            last = ret;
        }
        
        return ret;
    }
};
```

