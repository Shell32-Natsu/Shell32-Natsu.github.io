---
title: LeetCode 575. Distribute Candies
date: 2017-08-04 17:14:57
tags:
 - LeetCode
 - CPP
 - 算法
categories:
 - LeetCode
---

题目描述：

Given an integer array with **even** length, where different numbers in this array represent different **kinds** of candies. Each number means one candy of the corresponding kind. You need to distribute these candies **equally** in number to brother and sister. Return the maximum number of **kinds** of candies the sister could gain.

**Example 1:**

```
Input: candies = [1,1,2,2,3,3]
Output: 3
Explanation:
There are three different kinds of candies (1, 2 and 3), and two candies for each kind.
Optimal distribution: The sister has candies [1,2,3] and the brother has candies [1,2,3], too. 
The sister has three different kinds of candies. 

```

**Example 2:**

```
Input: candies = [1,1,2,3]
Output: 2
Explanation: For example, the sister has candies [2,3] and the brother has candies [1,1]. 
The sister has two different kinds of candies, the brother has only one kind of candies. 

```

**Note:**

1. The length of the given array is in range [2, 10,000], and will be even.
2. The number in given array is in range [-100,000, 100,000].

<!-- more -->

--------------

很简单的数学问题，平均分n颗糖（n为偶数）给两个人，这些糖中有不同的种类，问其中一个人最多能得到多少种糖。

很显然，如果糖的种类m大于等于n/2，那么一方最多能得到n/2种糖；如果糖的种类m小于n/2，那么一方最多能得到m种糖。

```cpp
class Solution {
public:
    int distributeCandies(vector<int>& candies) {
        int size = candies.size();
        unordered_set<int> type;
        for (auto i : candies) {
            if (!type.count(i)) type.insert(i);
        }
        
        if (type.size() > size / 2) return size / 2;
        else return type.size();
    }
};
```

