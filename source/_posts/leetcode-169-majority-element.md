---
title: LeetCode 169. Majority Element
tags:
  - CPP
  - LeetCode
  - 算法
url: 894.html
id: 894
categories:
  - LeetCode
date: 2016-10-17 18:54:37
---
题目描述:

> Given an array of size *n*, find the majority element. The majority element is the element that appears **more than** `⌊ n/2 ⌋` times.
>
> You may assume that the array is non-empty and the majority element always exist in the array.

这道题方法很多, 排序, 哈希表, 位运算等等都可以.

排序:

```cpp
class Solution {
public:
    int majorityElement(vector<int> &nums) {
        sort(nums.begin(), nums.end());
        return nums[nums.size() / 2];
    }
};
```

位运算:

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int n = nums.size();
        vector<int> bits(32);
        for(auto j : nums){
            for(int i = 0; i < 32; i++){
                if(j & (1 << i)) bits[i]++;
            }
        }
        int ans = 0;
        for(int i = 0; i < 32; i++){
            if(bits[i] > n / 2){
                ans |= (1 << i);
            }
        }
        return ans;
    }
};
```

哈希表:

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int n = nums.size() / 2;
        unordered_map<int, int> m;
        for(auto i : nums){
            if(++m[i] > n) return i;
        }
        
        return 0;
    }
};
```

还有一种O(n)的算法

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int n, cnt = 0;
        for(auto i : nums){
            if(cnt == 0){
                cnt++;
                n = i;
            }
            else if(n == i){
                cnt++;
            }
            else{
                cnt--;
            }
            
            if(cnt > nums.size() / 2) break;
        }
        return n;
    }
};
```

