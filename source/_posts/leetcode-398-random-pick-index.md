---
title: LeetCode 398. Random Pick Index
tags:
  - CPP
  - LeetCode
  - 算法
  - 随机数
url: 757.html
id: 757
categories:
  - LeetCode
date: 2016-09-14 15:36:49
---
题目描述:

> Given an array of integers with possible duplicates, randomly output the index of a given target number. You can assume that the given target number must exist in the array.
>
> **Note:**
> The array size can be very large. Solution that uses too much extra space will not pass the judge.
>
> **Example:**
>
> ```
> int[] nums = new int[] {1,2,3,3,3};
> Solution solution = new Solution(nums);
>
> // pick(3) should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
> solution.pick(3);
>
> // pick(1) should return 0. Since in the array only nums[0] is equal to 1.
> solution.pick(1);
> ```

这道题的内存要求相当严, 对我来说比较容易想到的方法都超内存了. 最后还是看tag才知道要用一种叫作*reservoir sampling 水塘抽样*(<https://en.wikipedia.org/wiki/Reservoir_sampling>)的算法来做.

这个算法可以用于从n个数据(n很大且未知)中随机抽取k个样本, 具体思路如下(下标从0开始):

1. 首先取取数组a前k个元素放入结果r中
2. 对于第i个元素(n>i>=k), 取一个随机数j(0<=j<i), 如果j<k, 那么就把r[j]换成a[i].

至于等概率的具体证明可以看wiki. 具体到这道题, 就是k=1的情况, 我们只需要在r中保存一个元素, 并且同时记录已经遍历到第几个target即可..

```cpp
class Solution {
    vector<int> n;
public:
    Solution(vector<int> nums) {
        n = nums;
        srand((unsigned int)time(NULL));
    }
    
    int pick(int target) {
        int retIndex, totalTarget = 1;
        for(int i = 0; i < n.size(); i++){
            if(n[i] != target) continue;
            if(totalTarget == 1){
                retIndex = i;
            }
            else{
                if(rand() % totalTarget == 0){
                    retIndex = i;
                }
            }
            totalTarget++;
        }
        return retIndex;
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(nums);
 * int param_1 = obj.pick(target);
 */
```

