---
title: LeetCode 168. Excel Sheet Column Title
tags:
  - CPP
  - LeetCode
  - 算法
url: 892.html
id: 892
categories:
  - LeetCode
date: 2016-10-17 17:27:22
---
题目描述:

> Given a positive integer, return its corresponding column title as appear in an Excel sheet.
>
> For example:
>
> ```
>     1 -> A
>     2 -> B
>     3 -> C
>     ...
>     26 -> Z
>     27 -> AA
>     28 -> AB 
> ```

按照26进制来处理, 不过由于是从1而不是0开始的, 所以要对Z单独处理.

```cpp
class Solution {
public:
    string convertToTitle(int n) {
        string ret;
        while(n > 0){
            if(n % 26 == 0) {
                ret.push_back('Z');
                n = n / 26 - 1;
            }
            else {
                ret.push_back((n % 26) + 'A' - 1);
                n /= 26;
            }
        }
        reverse(ret.begin(), ret.end());
        return ret;
    }
};
```

