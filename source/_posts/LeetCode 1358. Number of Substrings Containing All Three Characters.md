
---
title: 'LeetCode 1358. Number of Substrings Containing All Three Characters'
tags:
- LeetCode
- 二分搜索
- 字符串
- 算法
categories:
- LeetCode
date: 2024-05-21 21:31:30
---

> Given a string s consisting only of characters a, b and c.
> 
> Return the number of substrings containing at least one occurrence of all these characters a, b and c.
> 
> 
> 
> Example 1:
> 
> Input: s = "abcabc"
> Output: 10
> Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 
> Example 2:
> 
> Input: s = "aaacb"
> Output: 3
> Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 
> Example 3:
> 
> Input: s = "abc"
> Output: 1
> 
> 
> Constraints:
> 
> 3 <= s.length <= 5 x 10^4
> s only consists of a, b or c characters.

基本思路是对于每一个字符，如果想要找到以它为结尾的符合要求的子串，那么我们只要找到距离它最远的另外两个字符的出现位置。这样我们就找到了一个每个字符都至少包含一次的最短子串，以这个子串结尾的所有子串都符合要求。使用前缀表记录字符上一次出现的位置就可以了

```cpp
class Solution {
public:
 int numberOfSubstrings(string s) {
 int n = s.length(), res = 0;
 if (n < 3)
 return 0;

 vector<vector<int>> prefix(n, vector<int>(3, -1));
 prefix[0][s[0] - 'a'] = 0;

 for (int i = 1; i < n; i++) {
 prefix[i] = prefix[i - 1];
 prefix[i][s[i] - 'a'] = i;
 int minIdx = INT_MAX;
 for (int j = 0; j < 3; j++) {
 if (j == s[i] - 'a')
 continue;
 minIdx = min(prefix[i][j], minIdx);
 }
 if (minIdx == -1)
 continue;
 res += (minIdx + 1);
 }
 
 return res;
 }
};
```

另一个野路子算法，不使用前缀表，而是使用二分搜索来找到每个字符都至少包含一次的最短子串。

```cpp
class Solution {
public:
 int numberOfSubstrings(string s) {
 int n = s.length(), res = 0;
 if (n < 3)
 return 0;

 vector<vector<int>> cnt(n + 1, vector<int>(3, 0));

 for (int i = 1; i <= n; i++) {
 cnt[i] = cnt[i - 1];
 cnt[i][s[i - 1] - 'a']++;
 }

 for (int i = 3; i <= n; i++) {
 if (cnt[i][0] && cnt[i][1] && cnt[i][2]) {
 int t = bshelper(cnt, i);
 res += (t + 1);
 }
 }
 return res;
 }

 int bshelper(const vector<vector<int>>& cnt, int end) {
 int left = 0, right = end, mid;
 vector<int> tmp(3, 0);
 while (left < right) {
 mid = (left + right) / 2 + 1;
 for (int i = 0; i < 3; i++) {
 tmp[i] = cnt[end][i] - cnt[mid][i];
 }
 if (tmp[0] && tmp[1] && tmp[2]) {
 left = mid;
 }
 else {
 right = mid - 1;
 }
 }
 return left;
 }
};
```

