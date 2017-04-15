---
title: LeetCode 166. Fraction to Recurring Decimal
tags:
  - CPP
  - LeetCode
  - 哈希表
  - 字符串
  - 算法
url: 884.html
id: 884
categories:
  - LeetCode
date: 2016-10-13 19:16:55
---
题目描述:

> Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.
>
> If the fractional part is repeating, enclose the repeating part in parentheses.
>
> For example,
>
> - Given numerator = 1, denominator = 2, return "0.5".
> - Given numerator = 2, denominator = 1, return "2".
> - Given numerator = 2, denominator = 3, return "0.(6)".

模拟手算除法, 难度不大但是非常繁琐.

对于循环小数使用一个hash表来保存出现过的余数的值和它所得的结果在结果字符串中的位置, 当出现重复的余数时就可以确定是循环小数.

还要注意int型的溢出问题.

```cpp
class Solution {
public:
	string fractionToDecimal(int numerator, int denominator) {
		if (numerator == 0) return string("0");
		bool sign = (numerator ^ denominator) & 0x80000000;
		unordered_map<long long, int> remainders;
		long long lldenominator = denominator;
		long long llnumerator = numerator;
		lldenominator = abs(lldenominator);
		llnumerator = abs(llnumerator);
		string dStr = to_string(lldenominator), nStr = to_string(llnumerator);
		int nLen = nStr.length(), dLen = dStr.length();
		long long tmpn = nStr[0] - '0';
		int ni = 1;
		
		bool hasDot = false;
		string ans;

		while (true) {
			int a = tmpn / lldenominator;
			if(!(a == 0 && !hasDot)) ans.push_back(a + '0');
			else if (a == 0 && !ans.empty()) ans.push_back('0');
			tmpn = tmpn % lldenominator;
			if (!tmpn && ni == nLen) break;
			tmpn *= 10;
			if (ni == nLen && !hasDot) {
				if (ans.empty()) ans += "0.";
				else ans += ".";
				hasDot = true;
			}

			if (ni < nLen) {
				tmpn += nStr[ni++] - '0';
			}
			if (!hasDot) continue;
			if (remainders.count(tmpn)) break;
			else remainders[tmpn] = ans.size();
		}
		if (tmpn) {
			int index = remainders[tmpn];
			ans.insert(ans.begin() + index, '(');
			ans.push_back(')');
		}
		if (sign) ans = "-" + ans;
		return ans;
	}
};
```

