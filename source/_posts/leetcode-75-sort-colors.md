---
title: LeetCode 75. Sort Colors
tags:
  - CPP
  - LeetCode
  - 双指针
  - 算法
url: 608.html
id: 608
categories:
  - LeetCode
date: 2016-08-11 17:15:56
---
题目描述:

> Given an array with *n* objects colored red, white or blue, sort them so that objects of the same color are adjacent, with the colors in the order red, white and blue.
>
> Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.
>
> **Note:**
> You are not suppose to use the library's sort function for this problem.
>
> **Follow up:**
> A rather straight forward solution is a two-pass algorithm using counting sort.
> First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.
>
> Could you come up with an one-pass algorithm using only constant space?

由于数组中元素的值只有三种, 所以可以先遍历一遍数组, 分别记录下三种值的出现次数, 然后再按照值的大小和数量填充到数组中.

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int colorNum[3] = {0,0,0};
        for(int i = 0; i < nums.size(); i++){
            colorNum[nums[i]]++;
        }
        int k = 0;
        for(int i = 0; i < 3; i++){
            for(int j = 0; j < colorNum[i]; j++){
                nums[k++] = i;
            }
        }
    }
};
```

关于Follow up中的单次遍历, 可以使用两个指针分别指向red(0)和blue(2)的结尾和开头位置, 然后遍历中间的元素, 通过交换把对应的值放到相应的位置.

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int redIndex = 0, blueIndex = nums.size() - 1;
        while(nums[redIndex] == 0) redIndex++;
        while(nums[blueIndex] == 2) blueIndex--;
        int i = redIndex;
        while(i <= blueIndex){
            if(nums[i] == 0){
                swap(nums[redIndex++], nums[i]);
                i = max(redIndex, i); // 由于i有可能落后于redIndex, 所以要选择一个较大的值
            }
            else if(nums[i] == 2){
                swap(nums[blueIndex--], nums[i]);
            }
            else{
                i++;
            }
        }
    }
};
```

