---
title: LeetCode 434. Number of Segments in a String
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 1060.html
id: 1060
categories:
  - LeetCode
date: 2017-01-09 18:28:06
---
题目描述：

> Count the number of segments in a string, where a segment is defined to be a contiguous sequence of non-space characters.
>
> Please note that the string does not contain any **non-printable** characters.
>
> **Example:**
>
> ```
> Input: "Hello, my name is John"
> Output: 5
> ```

比较简单，注意处理连续的空格和结尾。还有有符号数与无符号数的隐式转换问题。

```cpp
class Solution {
public:
    int countSegments(string s) {
        int prevIndex = -1, ans = 0;
        for(int i = 0; i < s.length(); i++){
            if(s[i] == ' '){
                if(prevIndex != i - 1){
                    ans++;
                }
                prevIndex = i;
            }
        }
        if(prevIndex < (int)s.length() - 1) ans++;
        return ans;
    }
};
```

