---
title: LeetCode 751. IP to CIDR
date: 2017-12-24 11:09:27
tags:
 - LeetCode
 - 算法
 - 字符串
 - CPP
categories:
 - LeetCode
---

Given a start IP address `ip` and a number of ips we need to cover `n`, return a representation of the range as a list (of smallest possible length) of CIDR blocks.

A CIDR block is a string consisting of an IP, followed by a slash, and then the prefix length. For example: "123.45.67.89/20". That prefix length "20" represents the number of common prefix bits in the specified range.

**Example 1:**

```
Input: ip = "255.0.0.7", n = 10
Output: ["255.0.0.7/32","255.0.0.8/29","255.0.0.16/32"]
Explanation:
The initial ip address, when converted to binary, looks like this (spaces added for clarity):
255.0.0.7 -> 11111111 00000000 00000000 00000111
The address "255.0.0.7/32" specifies all addresses with a common prefix of 32 bits to the given address,
ie. just this one address.

The address "255.0.0.8/29" specifies all addresses with a common prefix of 29 bits to the given address:
255.0.0.8 -> 11111111 00000000 00000000 00001000
Addresses with common prefix of 29 bits are:
11111111 00000000 00000000 00001000
11111111 00000000 00000000 00001001
11111111 00000000 00000000 00001010
11111111 00000000 00000000 00001011
11111111 00000000 00000000 00001100
11111111 00000000 00000000 00001101
11111111 00000000 00000000 00001110
11111111 00000000 00000000 00001111

The address "255.0.0.16/32" specifies all addresses with a common prefix of 32 bits to the given address,
ie. just 11111111 00000000 00000000 00010000.

In total, the answer specifies the range of 10 ips starting with the address 255.0.0.7 .

There were other representations, such as:
["255.0.0.7/32","255.0.0.8/30", "255.0.0.12/30", "255.0.0.16/32"],
but our answer was the shortest possible.

Also note that a representation beginning with say, "255.0.0.7/30" would be incorrect,
because it includes addresses like 255.0.0.4 = 11111111 00000000 00000000 00000100 
that are outside the specified range.

```

**Note:**

1. `ip` will be a valid IPv4 address.
2. Every implied address `ip + x` (for `x < n`) will be a valid IPv4 address.
3. `n` will be an integer in the range `[1, 1000]`.

<!-- more -->

这道题要把一个IPv4地址段转换为恰好能完全覆盖的CIDR表示，关于IPv4和CIDR之间的转换就同题目中所说的一样，我就不赘述了。问题在于要得到一个正好精确覆盖的CIDR表示，我的思路是对每一个IPv4地址，一位一位地缩小CIDR的范围，知道其中的所有IP地址都落在我们的目标范围内。此外要注意去重。

```cpp
class Solution {
public:
    vector<string> ipToCIDR(string ip, int range) {
        unsigned int ipBegin = stringToInt(ip);
        unsigned int ipEnd = ipBegin + range;

        unordered_set<string> ans;
        for (unsigned int i = ipBegin; i < ipEnd; i++) {
            int j;
            for (j = 31; j >= 0; j--) {
                unsigned int mask = 0xffffffff << j;
                unsigned int tmp = i & mask;
                unsigned minIp = tmp, maxIp = (tmp | ~mask);
                if (minIp >= ipBegin && maxIp < ipEnd) {
                    break;
                }
            }
            unsigned int cidr = i & (0xffffffff << j);
            string str = intToString(cidr);
            ans.insert(str + "/" + to_string(32 - j));
        }
        return vector<string>(ans.begin(), ans.end());
    }

    unsigned int stringToInt (const string &ip) {
        int p1 = 0, p2 = 0;
        unsigned int ans = 0;
        while (p1 < ip.length() && p2 < ip.length()) {
            while (p2 < ip.length() && ip[p2] != '.')
                p2++;
            int tmp = stoi(ip.substr(p1, p2 - p1));
            ans = (ans << 8) + tmp;
            p1 = p2 + 1;
            p2 = p1;
        }
        return ans;
    }

    string intToString (unsigned int ip) {
        string ans;
        ans += to_string((ip & 0xff000000) >> 24);
        ans += ".";
        ans += to_string((ip & 0x00ff0000) >> 16);
        ans += ".";
        ans += to_string((ip & 0x0000ff00) >> 8);
        ans += ".";
        ans += to_string((ip & 0x000000ff));
        return ans;
    }

};
```

