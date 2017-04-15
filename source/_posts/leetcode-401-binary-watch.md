---
title: LeetCode 401. Binary Watch
tags:
  - CPP
  - LeetCode
  - 排列组合
  - 算法
  - 递归
url: 770.html
id: 770
categories:
  - LeetCode
date: 2016-09-18 17:21:26
---
题目描述:

> A binary watch has 4 LEDs on the top which represent the hours (0-11), and the 6 LEDs on the bottom represent the minutes (0-59).
>
> Each LED represents a zero or one, with the least significant bit on the right.
>
> ![](https://upload.wikimedia.org/wikipedia/commons/8/8b/Binary_clock_samui_moon.jpg)
>
> For example, the above binary watch reads "3:25".
>
> Given a non-negative integer *n* which represents the number of LEDs that are currently on, return all possible times the watch could represent.
>
> **Example:**
>
> ```
> Input: n = 1
> Return: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
> ```
>
> **Note:**
>
> - The order of output does not matter.
> - The hour must not contain a leading zero, for example "01:00" is not valid, it should be "1:00".
> - The minute must be consist of two digits and may contain a leading zero, for example "10:2" is not valid, it should be "10:02".

由于数据量相当的小, 所以这道题最简单粗暴的方法就是把每种小时和分钟的可能都列出来, 正常一点的思路就是从n个数中选择k个不同的数出来, 对于这道题来说还要加上一个对于是否是合法地时间数据的判断.

我对于小时采用写出所有可能的办法, 对于分钟采用正常的方法. 至于为啥分钟不写, 大概是因为手算有点烦= =.

这道题我还遇到了[无符号数-有符号数=无符号数]的坑, 就是第64行的`i <= v.size() - n`, 在n>6的情况下是会溢出的. 所以要么把n移到不等式的左边, 要么在第8行就规避n>6的情况.

```cpp
class Solution {
    vector<int> hourNum = {1,2,4,8};
    vector<int> minuteNum = {1,2,4,8,16,32};
    vector<string> hours, minutes;
public:
    vector<string> readBinaryWatch(int num) {
        vector<string> ans;
        for(int i = num - 6; i <= num; i++){
            possibleHour(i);
            possibleMinute(num - i);
            for(auto i : hours){
                for(auto j : minutes){
                    ans.push_back(i + ":" + j);
                }
            }
        }
        return ans;
    }
    
    void possibleHour(int n){
        hours.clear();
        switch(n){
            case 0:
                hours = vector<string>({"0"});
                return;
            case 1:
                hours = vector<string>({"1", "2", "4", "8"});
                return;
            case 2:
                hours = vector<string>({"3", "5", "9", "6", "10"});
                return;
            case 3:
                hours = vector<string>({"7", "11"});
                return;
            default:
                hours = vector<string>();
                return;
        }
    }
    
    void possibleMinute(int n){
        minutes.clear();
        if(n == 0){
            minutes.push_back("00");
            return;
        }
        vector<vector<int>> ret;
        vector<int> path;
        selectNFromVector(minuteNum, 0, n, path, ret);
        for(int i = 0; i < ret.size(); i++){
            int sum = 0;
            for(int j = 0; j < n; j++){
                sum += ret[i][j];
            }
            if(sum < 60){
                string str = to_string(sum);
                if(sum < 10) str.insert(str.begin(), '0');
                minutes.push_back(str);
            }
        }
    }
    
    void selectNFromVector(vector<int> &v, int start, int n, vector<int> &path, vector<vector<int>> &ret){
        for(int i = start; i <= v.size() - n; i++){
            path.push_back(v[i]);
            if(n == 1){
                ret.push_back(path);
                path.pop_back();
                continue;
            }
            selectNFromVector(v, i + 1, n - 1, path, ret);
            path.pop_back();
        }
    }
};
```

