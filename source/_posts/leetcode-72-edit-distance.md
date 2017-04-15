---
title: LeetCode 72. Edit Distance
tags:
  - CPP
  - LeetCode
  - 动态规划
  - 算法
url: 597.html
id: 597
categories:
  - LeetCode
date: 2016-08-09 18:15:46
---
题目描述:

> Given two words *word1* and *word2*, find the minimum number of steps required to convert *word1* to *word2*. (each operation is counted as 1 step.)
>
> You have the following 3 operations permitted on a word:
>
> a) Insert a character
> b) Delete a character
> c) Replace a character

题目要求计算两个单词(word1, word2)的"距离", 就是说最少经过多少步可以从word1变幻到word2. 可以使用的操作有三种:

1. 插入一个字符
2. 删除一个字符
3. 替换一个字符

这道题目使用动态规划来解决. 

数组`dp[i][j]`表示`word1[0:i-1]`(包括i-1)与`word2[0:j-1]`之间的距离.

根据最后一次操作的类型分为三类:

1. word1插入字符, 此时`dp[i][j] = dp[i][j - 1] + 1`, 因为这是在`word1[0:i-1]=>word2[0:j-2]`需要`dp[i][j - 1]`的基础上, word2最后又增加了一个字符, 因此`word1[0:i-1]=>word2[0:j-2]`之后再增加一步插入字符的操作(也可以看作word2=>word1最后多删除了一个字符)
2. word2插入字符, 此时`dp[i][j] = dp[i - 1][j] + 1`, 因为这是在`word2[0:j-1]=>word1[0:i-2]`需要`dp[i - 1][j]`的基础上, word1最后又增加了一个字符, 因此`word2[0:j-1]=>word1[0:i-2]`之后再增加一步插入字符的操作(也可以看作word1=>word2最后多删除了一个字符)
3. 替换操作, 如果`word1[i - 1] == word2[j - 1]`, 那么`dp[i][j] = dp[i - 1][j - 1]`, 否则`dp[i][j] = dp[i - 1][j - 1] + 1`

因此递推方程为

`dp[i][j] = min(dp[i-1][j-1] + (word1[i-1] == word2[j-1] ? 0 : 1), dp[i][j - 1] + 1, dp[i - 1][j] + 1)`

初始条件为`dp[i][0] = i; dp[0][j] = j;`(全部为插入操作)



    class Solution {
    public:
        int minDistance(string word1, string word2) {
            int len1 = word1.length(), len2 = word2.length();
            int arr[len1 + 1][len2 + 1];
            arr[0][0] = 0;
            for(int i = 1; i <= len2; i++){
                arr[0][i] = i;
            }
            for(int i = 1; i <= len1; i++){
                arr[i][0] = i;
            }
            for(int i = 1; i <= len1; i++){
                for(int j = 1; j <= len2; j++){
                    int tmp1 = arr[i - 1][j] + 1, tmp2 = arr[i][j - 1] + 1, tmp3;
                    if(word1[i - 1] == word2[j - 1]) tmp3 = arr[i - 1][j - 1];
                    else tmp3 = arr[i - 1][j - 1] + 1;
                    arr[i][j] = min(tmp1, min(tmp2, tmp3));
                }
            }
            return arr[len1][len2];
        }
    };