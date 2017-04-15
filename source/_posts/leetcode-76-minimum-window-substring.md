---
title: LeetCode 76. Minimum Window Substring
tags:
  - CPP
  - LeetCode
  - 双指针
  - 算法
url: 613.html
id: 613
categories:
  - LeetCode
date: 2016-08-12 18:28:24
---
题目描述:

> Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).
>
> For example,
> **S** = `"ADOBECODEBANC"`
> **T** = `"ABC"`
>
> Minimum window is `"BANC"`.
>
> **Note:**
> If there is no such window in S that covers all characters in T, return the empty string `""`.
>
> If there are multiple such windows, you are guaranteed that there will always be only one unique minimum window in S.

这道题叫做*MInimum Window Substring*, 很容易想到使用滑动窗口. 使用一个ASCII码做索引的数组来保存每个字符出现的次数, 然后先找到以S的第一个字符为开头的满足条件的子串, 然后跳过子串的前部字符直到子串不满足条件, 此时得到的便是第一个最小值. 显然一个子串如果包含T中的所有元素并且尽量短, 那么它的两端字符肯定都在T中(因为如果不在, 那么删掉它们可得到更短的子串), 

从刚才得到的第一个子串开始, 去掉开头的字符, 把子串向后延伸, 直到再次出现该字符为止, 然后不断去掉开头的字符, 直到子串尽可能短, 便可以得到下一个子串. 窗口以"伸-缩-伸-缩..."的方式前进, 算法是线性的(不考虑判断是否符合条件). 记录整个过程中最短的子串开始位置与长度.

另一个重要问题是如何判断一个子串是否符合条件, 即是否包含T中的所有字符. 最直接的方法是循环比较每个字符出现的次数(子串首尾移动时同时更新子串中字符的出现次数), 这样的话复杂度大约为`O(CHAR_MAX*s.length())`. 一般来说CHAR_MAX = 127, 这个系数还是比较大的.

因为除了第一个子串外, 后续的子串都以前一个子串为基础变化而来, 子串开头的下标start在前进时子串始终是处于符合要求的状态, 当不符合要求时start才停下, 所以每当start扫过一个字符, 就把它在子串中的出现次数减1, 然后只比较该字符与T中该字符的出现次数, 当小于时则子串不符合要求. 对于子串结尾end, 则只要找到上一个符合条件的子串的第一个元素就可以了.

说起来还是比较混乱, 其实代码写起来也比较混乱, 双指针start与end的++, --操作很多, 很容易出错...

```cpp
class Solution {
public:
    vector<int> tFlag = vector<int>(CHAR_MAX + 1, 0);
	string minWindow(string s, string t) {
		if (t.empty() || s.empty() || s.length() < t.length()) return "";

		for (int i = 0; i < t.length(); i++) {
			tFlag[t[i]]++;
		}
		vector<int> flag(CHAR_MAX + 1, 0);

		int start = 0, end = start;
		int minLen = INT_MAX, minStart;

		for (; end <= s.length() && !matchEnd(flag, s[end - 1]); end++) {
			flag[s[end]]++;
		}
		if (end > s.length()) return "";
		while (matchStart(flag, s[start - 1])) {
			flag[s[start]]--;
			start++;
		}
		start--;
		flag[s[start]]++;
		
		minLen = end - start;
		minStart = start;
		end--;
		
		while (true) {
			char ch = s[start];
			flag[ch]--;
			
			end++;
			while (end < s.length() && s[end] != ch) {
				flag[s[end]]++;
				end++;
			}
			if (end == s.length()) break;
			flag[ch]++;

			start++;
			while (matchStart(flag, s[start - 1])) {
				flag[s[start]]--;
				start++;
			}
			start--;
			flag[s[start]]++;
			if (minLen > end - start + 1) {
				minLen = end - start + 1;
				minStart = start;
			}
		}

		if (minLen == INT_MAX) return "";
		return s.substr(minStart, minLen);
	}

	bool matchEnd(vector<int> &flag, int index) {
	    if(flag[index] < tFlag[index]){
	        return false;
	    }
		for (int i = 0; i < CHAR_MAX + 1; i++) {
			if (flag[i] < tFlag[i]) return false;
		}
		return true;
	}
	
	bool matchStart(vector<int> &flag, int index) {
		return flag[index] >= tFlag[index];
	}
};
```

