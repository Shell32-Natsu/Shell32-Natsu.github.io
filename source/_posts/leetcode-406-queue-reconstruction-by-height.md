---
title: LeetCode 406. Queue Reconstruction by Height
tags:
  - CPP
  - LeetCode
  - 算法
url: 806.html
id: 806
categories:
  - LeetCode
date: 2016-09-26 17:11:40
---
题目描述:

> Suppose you have a random list of people standing in a queue. Each person is described by a pair of integers `(h, k)`, where `h` is the height of the person and `k` is the number of people in front of this person who have a height greater than or equal to `h`. Write an algorithm to reconstruct the queue.
>
> **Note:**
> The number of people is less than 1,100.
>
> **Example**
>
> ```
> Input:
> [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
>
> Output:
> [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
> ```

输入数据中的k表示这个人之前有几个大于等于自己的h的人. 比较容易想到对于h最小的人来说, 他的k值就是他在最终队列中的位置, 因为排在他前面的所有人都是大于等于他的h的. 如果去掉h最小的人, 此时h次小的人就成为了最小的, 他在队列中的位置就是从开头数起, 跳过已经确定位置的h更小的人的第k个位置. 这样不断重复就可以确定最终的序列.

但是*从开头数起, 跳过已经确定位置的h更小的人的第k个位置*是需要遍历数组的, 效率不高, 所以我用一个deque来保存还没有被占用的位置, 当一个位置确定之后就从其中删除, 这样对于之后的人来说, 用k作为索引从deque中取得的位置就是最终的位置. 但是这会造成一个问题, 就是h相同的人如果排在前面的已经确定了位置, 那么排在后面的人会由于已经删除一个位置而偏后一位, 解决方法是排序的时候就把h相同的人中k较大的排在前面.

```cpp
class Solution {
public:
    vector<pair<int, int>> reconstructQueue(vector<pair<int, int>>& people) {
        sort(people.begin(), people.end(), [&](pair<int, int> &a, pair<int, int> &b){
            if(a.first == b.first){
                return a.second > b.second;
            }
            return a.first < b.first;
        });
        int sz = people.size();
        vector<pair<int, int>> ans(sz);
        deque<int> indexes(sz);
        for(int i = 0; i < sz; i++) indexes[i] = i;
        for(int i = 0; i < sz; i++){
            int index = people[i].second;
            ans[indexes[index]] = people[i];
            indexes.erase(indexes.begin() + index);
        }
        return ans;
    }
};
```

