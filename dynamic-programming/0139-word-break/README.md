# [139. Word Break](https://leetcode.com/problems/word-break/description/)

Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.

**Example 1:**

```
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
```

**Example 2:**

```
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
```

**Example 3:**

```
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```

**Constraints:**

- <code>1 <= s.length <= 300</code>
- <code>1 <= wordDict.length <= 1000</code>
- <code>1 <= wordDict[i].length <= 20</code>
- <code>s</code> and <code>wordDict[i]</code> consist of only lowercase English letters.
- All the strings of <code>wordDict</code> are **unique** .
