---
title: LeetCode 599. Minimum Index Sum of Two Lists
date: 2017-08-09 17:42:22
tags:
 - LeetCode
 - CPP
 - 算法
 - 哈希表
categories:
 - LeetCode
---

Suppose Andy and Doris want to choose a restaurant for dinner, and they both have a list of favorite restaurants represented by strings.

You need to help them find out their **common interest** with the **least list index sum**. If there is a choice tie between answers, output all of them with no order requirement. You could assume there always exists an answer.

**Example 1:**

```
Input:
["Shogun", "Tapioca Express", "Burger King", "KFC"]
["Piatti", "The Grill at Torrey Pines", "Hungry Hunter Steakhouse", "Shogun"]
Output: ["Shogun"]
Explanation: The only restaurant they both like is "Shogun".

```

**Example 2:**

```
Input:
["Shogun", "Tapioca Express", "Burger King", "KFC"]
["KFC", "Shogun", "Burger King"]
Output: ["Shogun"]
Explanation: The restaurant they both like and have the least index sum is "Shogun" with index sum 1 (0+1).

```

**Note:**

1. The length of both lists will be in the range of [1, 1000].
2. The length of strings in both lists will be in the range of [1, 30].
3. The index is starting from 0 to the list length minus 1.
4. No duplicates in both lists.

<!-- more -->

----------------

使用哈希表保存第一个列表中每个字符串对应的下标。接着遍历第二个列表，对每个字符串查找它在第一个列表中出现的位置（不存在则跳过），求出下标和。在这个过程中记录最小的下表和和对应的字符串。

```cpp
class Solution {
public:
    vector<string> findRestaurant(vector<string>& list1, vector<string>& list2) {
        unordered_map<string, int> m;
        for (int i = 0; i < list1.size(); i++) {
            m[list1[i]] = i;
        }
        
        int minSum = INT_MAX;
        vector<string> ansStr;
        for (int i = 0; i < list2.size(); i++) {
            if (!m.count(list2[i])) continue;
            int tSum = i + m[list2[i]];
            if (tSum < minSum) {
                minSum = tSum;
                ansStr.clear();
                ansStr.push_back(list2[i]);
            }
            else if (tSum == minSum) {
                ansStr.push_back(list2[i]);
            }
        }
        return ansStr;
    }
};
```

