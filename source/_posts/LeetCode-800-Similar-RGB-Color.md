---
title: LeetCode 800. Similar RGB Color
date: 2018-03-18 18:33:27
tags:
 - LeetCode
 - CPP
 - 算法
 - 字符串
categories:
 - LeetCode
---

In the following, every capital letter represents some hexadecimal digit from `0` to `f`.

The red-green-blue color `"#AABBCC"` can be written as `"#ABC"` in shorthand. For example, `"#15c"` is shorthand for the color `"#1155cc"`.

Now, say the similarity between two colors `"#ABCDEF"` and `"#UVWXYZ"` is `-(AB - UV)^2 - (CD - WX)^2 - (EF - YZ)^2`.

Given the color `"#ABCDEF"`, return a 7 character color that is most similar to `#ABCDEF`, and has a shorthand (that is, it can be represented as some `"#XYZ"`

```
Example 1:
Input: color = "#09f166"
Output: "#11ee66"
Explanation:  
The similarity is -(0x09 - 0x11)^2 -(0xf1 - 0xee)^2 - (0x66 - 0x66)^2 = -64 -9 -0 = -73.
This is the highest among any shorthand color.
```

**Note:**

- `color` is a string of length `7`.
- `color` is a valid RGB color: for `i > 0`, `color[i]` is a hexadecimal digit from `0` to `f`
- Any answer which has the same (highest) similarity as the best answer will be accepted.
- All inputs and outputs should use lowercase letters, and the output is 7 characters.

<!-- more -->

暴力穷举。

```cpp
class Solution {
    string shex = "0123456789abcdef";
public:
    string similarRGB(string color) {
        color = color.substr(1);
        string ans = "000";
        string ret;
        int minVal = INT_MIN;
        for (int i = 0; i < shex.length(); i++) {
            ans[0] = shex[i];
            for (int j = 0; j < shex.length(); j++) {
                ans[1] = shex[j];
                for (int k = 0; k < shex.length(); k++) {
                    ans[2] = shex[k];
                    string tmp = "";
                    for (auto ch : ans) {
                        tmp.push_back(ch); tmp.push_back(ch);
                    }
                    int val = calc(color, tmp);
                    if (minVal < val) {
                        minVal = val;
                        ret = tmp;
                    }
                }
            }
        }
        return "#" + ret;
    }

    int calc (string &a, string &b) {
        int ans = 0;
        for (int i = 0; i < a.length(); i += 2) {
            string tmp1 = a.substr(i, 2), tmp2 = b.substr(i, 2);
            int v1 = stoi(tmp1, nullptr, 16), v2 = stoi(tmp2, nullptr, 16);
            ans -= (v1 - v2) * (v1 - v2);
        }
        return ans;
    }
};
```