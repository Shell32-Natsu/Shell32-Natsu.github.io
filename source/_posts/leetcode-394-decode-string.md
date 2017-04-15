---
title: LeetCode 394. Decode String
tags:
  - CPP
  - LeetCode
  - 字符串
  - 栈
  - 算法
  - 递归
url: 712.html
id: 712
categories:
  - LeetCode
date: 2016-09-05 19:42:47
---
题目描述:

> Given an encoded string, return it's decoded string.
>
> The encoding rule is: `k[encoded_string]`, where the *encoded_string* inside the square brackets is being repeated exactly *k* times. Note that *k*is guaranteed to be a positive integer.
>
> You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.
>
> Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, *k*. For example, there won't be input like `3a` or`2[4]`.
>
> **Examples:**
>
> ```
> s = "3[a]2[bc]", return "aaabcbc".
> s = "3[a2[c]]", return "accaccacc".
> s = "2[abc]3[cd]ef", return "abcabccdcdcdef".
> ```

对一个字符串进行解码, 该字符串的编码规则是这样的`重复次数[重复内容]`, 由于有可能出现嵌套, 所以我使用递归来处理这个字符串.

对于括号匹配来说, 使用栈来确定与相应左括号匹配的右括号. 要注意可能会出现不重复的串, 这时要直接把它加到返回串的后面而不处理重复次数.

```cpp
class Solution {
	string s;
public:
	string decodeString(string str) {
		s = str;
		return decodeStringImpl(0, s.length());
	}

	string decodeStringImpl(int start, int end) {
		string ret;
		int index = start;
		while(index < end && !isDigit(s[index]) && s[index] != ']'){
		    index++;
		}
		ret += s.substr(start, index - start);
		while (index < end) {
		    if(!isDigit(s[index])){
		        int j = index;
		        while(j < end && !isDigit(s[j])) j++;
		        ret += s.substr(index, j - index);
		        index = j;
		    }
		    else{
    			int leftBracket = getInt(index);
    			int repeat = stoi(s.substr(index, leftBracket - index));
    			int rightBracket = findRightBracket(leftBracket);
    			string s = decodeStringImpl(leftBracket + 1, rightBracket);
    			for (int i = 0; i < repeat; i++) {
    				ret += s;
    			}
    			index = rightBracket + 1;
		    }
		}
		return ret;
	}

	int findRightBracket(int index) {
		vector<int> st;
		st.push_back(index);
		int i = index;
		while (!st.empty() && i < s.length() - 1) {
			i++;
			if (s[i] == '[') st.push_back(i);
			else if (s[i] == ']') st.pop_back();
		}
		return i;
	}

	int getInt(int index) {
		while (index < s.length() && isDigit(s[index])) {
			index++;
		}
		return index;
	}
	
	bool isDigit(char ch){
	    return ch <= '9' && ch >= '0';
	}
};
```

