---
title: LeetCode 165. Compare Version Numbers
tags:
  - CPP
  - LeetCode
  - 字符串
  - 算法
url: 882.html
id: 882
categories:
  - LeetCode
date: 2016-10-13 16:38:50
---
题目描述:

> Compare two version numbers *version1* and *version2*.
> If *version1* > *version2* return 1, if *version1* < *version2* return -1, otherwise return 0.
>
> You may assume that the version strings are non-empty and contain only digits and the `.` character.
> The `.` character does not represent a decimal point and is used to separate number sequences.
> For instance, `2.5` is not "two and a half" or "half way to version three", it is the fifth second-level revision of the second first-level revision.
>
> Here is an example of version numbers ordering:
>
> ```
> 0.1 < 1.1 < 1.2 < 13.37
> ```

使用`.`把字符串分割为数组, 然后再依次比较大小.

```cpp
class Solution {
public:
    int compareVersion(string version1, string version2) {
        vector<int> v1 = versionVector(version1), v2 = versionVector(version2);
        for(int i = 0; i < v1.size() && i < v2.size(); i++){
            if(v1[i] > v2[i]) return 1;
            else if(v1[i] < v2[i]) return -1;
        }
        if(v1.size() > v2.size()){
            for(int i = v2.size(); i < v1.size(); i++){
                if(v1[i] != 0) return 1;
            }
        }
        else if(v1.size() < v2.size()){
            for(int i = v1.size(); i < v2.size(); i++){
                if(v2[i] != 0) return -1;
            }
        }
        return 0;
    }
    
    vector<int> versionVector(string &s){
        vector<int> version;
        int pos = 0, next = 0;
        while(next = s.find('.', pos)){
            version.push_back(stoi(s.substr(pos, next - pos)));
            if(next == string::npos) break;
            pos = next + 1;
        }
        return version;
    }
};
```

