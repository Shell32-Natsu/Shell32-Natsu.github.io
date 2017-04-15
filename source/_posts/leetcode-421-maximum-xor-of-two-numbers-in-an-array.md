---
title: LeetCode 421. Maximum XOR of Two Numbers in an Array
tags:
  - CPP
  - LeetCode
  - 位运算
  - 算法
  - 递归
url: 947.html
id: 947
categories:
  - LeetCode
date: 2016-11-05 18:05:20
---
题目描述:

> Given a **non-empty** array of numbers, a0, a1, a2, … , an-1, where 0 ≤ ai < 231.
>
> Find the maximum result of ai XOR aj, where 0 ≤ *i*, *j* < *n*.
>
> Could you do this in O(*n*) runtime?
>
> **Example:**
>
> ```
> Input: [3, 10, 5, 25, 2, 8]
>
> Output: 28
>
> Explanation: The maximum result is 5 ^ 25 = 28.
> ```

这道题是使用递归的方法. 先找到出现不同的最高位, 然后按照该位是0还是1分为两类, 接下来处理下一位, 这时可以把数字分为4类, 分别以`00`, `01`, `10`和`11`开头, 最大的异或值会出现在`00`与`11`, `01`与`10`两种组合中, 递归地处理接下来的位数.

有可能出现`00`与`11`, `01`与`10`两种组合中每个组合都至少有一种分类是空的, 这个时候说明该位不可能为1, 只能为0, 可以用循环跳过这些位.

```cpp
class Solution {
public:
    int findMaximumXOR(vector<int>& nums) {
        list<int> one, zero;
        int pos;
        for(pos = 31; pos >= 0; pos--){
            // 找到有不同的最高位
            one.clear();
            zero.clear();
            for(auto i : nums){
                if(i & (1 << pos)) one.push_back(i);
                else zero.push_back(i);
            }
            if(!one.empty() && !zero.empty()) break;
        }
        if(one.empty() || zero.empty()) return 0;
        
        return (1 << pos) + findXORHelper(zero, one, pos - 1);
    }
    
    int findXORHelper(list<int> &zero, list<int> &one, int pos){
        if(pos < 0) return 0;
        list<int> zeroZero, zeroOne, oneZero, oneOne;
        
        for(; pos >= 0; pos--){
            // 跳过只能为0的位
            zeroZero.clear();
            zeroOne.clear();
            oneZero.clear();
            oneOne.clear();
            
            for(auto i : zero){
                if(i & (1 << pos)) zeroOne.push_back(i);
                else zeroZero.push_back(i);
            }
            for(auto i : one){
                if(i & (1 << pos)) oneOne.push_back(i);
                else oneZero.push_back(i);
            }
            // 该位可以为1
            if(!((zeroZero.empty() || oneOne.empty()) && (oneZero.empty() || zeroOne.empty()))) break;
        }
        // 所有位数都处理完毕
        if(pos < 0) return 0;
        
        return (1 << pos) + max(findXORHelper(zeroZero, oneOne, pos - 1), findXORHelper(oneZero, zeroOne, pos - 1));
    }
};
```

