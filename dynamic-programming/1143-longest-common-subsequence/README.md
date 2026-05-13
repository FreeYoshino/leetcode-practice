# [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/description/)

Given two strings <code>text1</code> and <code>text2</code>, return the length of their longest **common subsequence** . If there is no **common subsequence** , return <code>0</code>.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

- For example, <code>"ace"</code> is a subsequence of <code>"abcde"</code>.

A **common subsequence** of two strings is a subsequence that is common to both strings.

**Example 1:**

```
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" and its length is 3.
```

**Example 2:**

```
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
```

**Example 3:**

```
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
```

**Constraints:**

- <code>1 <= text1.length, text2.length <= 1000</code>
- <code>text1</code> and <code>text2</code> consist of only lowercase English characters.
