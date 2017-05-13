---
title: LeetCode 553. Optimal Division
date: 2017-04-19 17:18:35
tags:
 - CPP
 - LeetCode
 - 字符串
 - 算法
categories:
  - LeetCode
---

题目描述：

>   Given a list of **positive integers**, the adjacent integers will perform the float division. For example, [2,3,4] -> 2 / 3 / 4.
>
>   However, you can add any number of parenthesis at any position to change the priority of operations. You should find out how to add parenthesis to get the **maximum** result, and return the corresponding expression in string format. **Your expression should NOT contain redundant parenthesis.**
>
>   **Example:**
>
>
>       Input: [1000,100,10,2]
>       Output: "1000/(100/10/2)"
>       Explanation:
>       1000/(100/10/2) = 1000/((100/10)/2) = 200
>       However, the bold parenthesis in "1000/((100/10)/2)" are redundant, 
>       since they don't influence the operation priority. So you should return "1000/(100/10/2)". 
>       
>       Other cases:
>       1000/(100/10)/2 = 50
>       1000/(100/(10/2)) = 50
>       1000/100/10/2 = 0.5
>       1000/100/(10/2) = 2
>
>
>   **Note:**
>
>   1.  The length of the input array is [1, 10].
>   2.  Elements in the given array will be in range [2, 1000].
>   3.  There is only one optimal division for each test case.
>

这道题对一个连续除法加上括号，使得到的最终结果最大。像这样的算式：`1000/(100/10)/2`，如果去掉括号并且保证值不变的话就是：`1000/100*10/2`，所有的括号都可以打开最终变成一个没有括号的乘除混合的算式。

因此可以用穷举法穷举每一个运算符位置的可能性（`*`或`/`），从中选择结果最大的，然后用括号把乘法括起来，就可以得到结果。左括号的位置应该在前一个符号为`/`后一个符号为`*`的数字前，右括号的位置应该在前一个符号为`*`后一个符号为`/`的数字后（最后一个数字应该认为后面一个符号为`/`）。

```cpp
class Solution {
    vector<int> ops;
    const int MULTIPLY = 0;
    const int DIVIDE = 1;
    double maxResult = 0;
public:
    string optimalDivision(vector<int>& nums) {
        if (nums.size() == 1) return to_string(nums[0]);
        vector<int> tmpOps(nums.size() - 1);
        int maxResult = INT_MIN;
        tmpOps[0] = DIVIDE;
        double tmpResult = (double)nums[0] / nums[1];
        findMaxResult(nums, 1, tmpOps, tmpResult);
        string ans = "";
        for (int i = 1; i < nums.size() - 1; i++) {
            if (ops[i - 1] == DIVIDE && ops[i] == MULTIPLY) {
                ans += ("(" + to_string(nums[i]));
            }
            else if (ops[i - 1] == MULTIPLY && ops[i] == DIVIDE) {
                ans += (to_string(nums[i]) + ")");
            }
            else {
                ans += to_string(nums[i]);
            }
            ans += "/";
        }
        ans = to_string(nums[0]) + "/" + ans;
        if (ops.back() == MULTIPLY) {
            ans += (to_string(nums.back()) + ")");
        }
        else {
            ans += to_string(nums.back());
        }
        
        return ans;
    }
    
    void findMaxResult (vector<int>& nums, int begin, vector<int> &tmpOps, const double &result) {
        if (begin == nums.size() - 1) {
            if (result > maxResult) {
                maxResult = result;
                ops = tmpOps;
                return;
            }
            else {
                return;
            }
        }
        tmpOps[begin] = DIVIDE;
        findMaxResult(nums, begin + 1, tmpOps, result / nums[begin + 1]);
        
        tmpOps[begin] = MULTIPLY;
        findMaxResult(nums, begin + 1, tmpOps, result * nums[begin + 1]);
    }
};
```

