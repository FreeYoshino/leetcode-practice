# [93. Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/description/)

A **valid IP address** consists of exactly four integers separated by single dots. Each integer is between <code>0</code> and <code>255</code> (**inclusive** ) and cannot have leading zeros.

- For example, <code>"0.1.2.201"</code> and <code>"192.168.1.1"</code> are **valid** IP addresses, but <code>"0.011.255.245"</code>, <code>"192.168.1.312"</code> and <code>"192.168@1.1"</code> are **invalid** IP addresses.

Given a string <code>s</code> containing only digits, return all possible valid IP addresses that can be formed by inserting dots into <code>s</code>. You are **not** allowed to reorder or remove any digits in <code>s</code>. You may return the valid IP addresses in **any** order.

**Example 1:**

```
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
```

**Example 2:**

```
Input: s = "0000"
Output: ["0.0.0.0"]
```

**Example 3:**

```
Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
```

**Constraints:**

- <code>1 <= s.length <= 20</code>
- <code>s</code> consists of digits only.
