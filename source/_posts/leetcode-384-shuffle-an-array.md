---
title: LeetCode 384. Shuffle an Array
tags:
  - CPP
  - LeetCode
  - 排列组合
  - 算法
url: 611.html
id: 611
categories:
  - LeetCode
date: 2016-08-12 17:26:39
---
题目描述:

> Shuffle a set of numbers without duplicates.
>
> **Example:**
>
> ```
> // Init an array with set 1, 2, and 3.
> int[] nums = {1,2,3};
> Solution solution = new Solution(nums);
>
> // Shuffle the array [1,2,3] and return its result. Any permutation of [1,2,3] must equally likely to be returned.
> solution.shuffle();
>
> // Resets the array back to its original configuration [1,2,3].
> solution.reset();
>
> // Returns the random shuffling of array [1,2,3].
> solution.shuffle();
> ```

实现一个洗牌类, 实际的要求是生成1到n个不重复的随机数, 范围在[1,n]之间. 

其实我不太明白为什么要有一个reset方法, 因为这种随机的排列中这个一开始的原始序列并没有什么特殊性, 也不会影响下一次调用shuffle时的概率.

在LeetCode的Discuss中有貌似题目作者的回复<https://discuss.leetcode.com/topic/53984/reset-makes-no-sense/2>:

> The reason I designed it that way is to increase the likelihood that when `shuffle` is called it is shuffling based on the original array, not the previously shuffled array. This will increase the chance of detecting bugs in the main algorithm in `shuffle`.
>

关于生成随机排列, 我的方法是下标从低到高一次确定每个位置的函数, 假设下标范围为[0,n), 当前下标为i, 那么从[i,n)中取得一个随机数r, 交换下标i与r中的元素, 然后i增加1.

运行时间300多ms. 这个算法实际上叫做[Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle?oldformat=true), Knuth在*TAOCP*中也介绍过.

```cpp
class Solution {
    vector<int> orignalNums, ret;
public:
    Solution(vector<int> nums) {
        srand((unsigned)time(NULL));
        ret = orignalNums = nums;
    }
    
    /** Resets the array to its original configuration and return it. */
    vector<int> reset() {
        ret = orignalNums; // 这条语句其实没什么影响
        return orignalNums;
    }
    
    /** Returns a random shuffling of the array. */
    vector<int> shuffle() {
        for(int i = 0; i < ret.size(); i++){
            int index = rand() % (ret.size() - i);
            swap(ret[i], ret[i + index]);
        }
        return ret;
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(nums);
 * vector<int> param_1 = obj.reset();
 * vector<int> param_2 = obj.shuffle();
 */
```

