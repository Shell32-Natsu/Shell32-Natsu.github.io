---
title: LeetCode 374. Guess Number Higher or Lower
url: 387.html
id: 387
categories:
  - LeetCode
date: 2016-07-13 17:58:50
tags:
---
问题描述:

> We are playing the Guess Game. The game is as follows:
> 
> I pick a number from 1 to n. You have to guess which number I picked.
> 
> Every time you guess wrong, I'll tell you whether the number is higher or lower.
> 
> You call a pre-defined API guess(int num) which returns 3 possible results (-1, 1, or 0):
> 
>     -1 : My number is lower
>      1 : My number is higher
>      0 : Congrats! You got it!
> 
> Example:
> 
>     n = 10, I pick 6.
> 
>     Return 6.

二分搜索问题.

    // Forward declaration of guess API.
    // @param num, your guess
    // @return -1 if my number is lower, 1 if my number is higher, otherwise return 0
    int guess(int num);

    class Solution {
    public:
        int guessNumber(int n) {
            int mid = n / 2, left = 1, right = n, tmpResult;
            while((tmpResult = guess(mid)) != 0){
                if(tmpResult == -1){
                    right = mid;
                }
                else if(tmpResult == 1){
                    left = mid + 1;
                }
                mid = (right - left) / 2 + left;
            }
            return mid;
        }
    };