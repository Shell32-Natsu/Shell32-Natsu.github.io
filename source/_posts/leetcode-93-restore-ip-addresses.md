---
title: LeetCode 93. Restore IP Addresses
tags:
  - CPP
  - LeetCode
  - 回溯
  - 算法
url: 660.html
id: 660
categories:
  - LeetCode
date: 2016-08-21 18:27:34
---
题目描述:

> Given a string containing only digits, restore it by returning all possible valid IP address combinations.
>
> For example:
> Given `"25525511135"`,
>
> return `["255.255.11.135", "255.255.111.35"]`. (Order does not matter)

返回从一个字符串中可以得到多少个合法的IP地址, 使用回溯法遍历所有可能的组合. 由于最多只能有四个数字组成IP地址, 所以可以用四重循环来实现.

```cpp
class Solution {
public:
    vector<string> restoreIpAddresses(string s) {
        int p = 0;
        vector<string> re;
        if(s.length() > 12 || s.length() < 4) return re;
        string a, b, c, d;
        for(int i = 1; i <= 3 && i <= s.size() - 3; i++){
            a = s.substr(0, i);
            if(!checkValid(a)) continue;
            for(int j = 1; j <= 3 && i + j <= s.size() - 2; j++){
                b = s.substr(i, j);
                if(!checkValid(b)) continue;
                for(int k = 1; k <= 3 && i + j + k <= s.size() - 1; k++){
                    c = s.substr(i + j, k);
                    if(!checkValid(c)) continue;
                    for(int l = 1; l <= 3 && i + j + k + l <= s.size(); l++){
                        if(i + j + k + l != s.size())
                            continue;
                        d = s.substr(i + j + k, l);
                        if(checkValid(d)){
                            string t;
                            t = a + "." + b + "." + c + "." + d;
                            re.push_back(t);
                        }
                    }
                }
            }
        }
        return re;
    }
    
    bool checkValid(string s){
        if(s[0] == '0' && s.size() != 1)
            return false;
        int n = std::stoi(s);
        return n > 255 ? false : true;
    }
};
```

