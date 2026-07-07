# [127. Word Ladder](https://leetcode.com/problems/word-ladder/description/)

A **transformation sequence** from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence of words <code>beginWord -> s<sub>1</sub> -> s<sub>2</sub> -> ... -> s<sub>k</sub></code> such that:

- Every adjacent pair of words differs by a single letter.
- Every <code>s<sub>i</sub></code> for <code>1 <= i <= k</code> is in <code>wordList</code>. Note that <code>beginWord</code> does not need to be in <code>wordList</code>.
- <code>s<sub>k</sub> == endWord</code>

Given two words, <code>beginWord</code> and <code>endWord</code>, and a dictionary <code>wordList</code>, return the **number of words** in the **shortest transformation sequence** from <code>beginWord</code> to <code>endWord</code>, or <code>0</code> if no such sequence exists.

**Example 1:**

```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
```

**Example 2:**

```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
```

**Constraints:**

- <code>1 <= beginWord.length <= 10</code>
- <code>endWord.length == beginWord.length</code>
- <code>1 <= wordList.length <= 5000</code>
- <code>wordList[i].length == beginWord.length</code>
- <code>beginWord</code>, <code>endWord</code>, and <code>wordList[i]</code> consist of lowercase English letters.
- <code>beginWord != endWord</code>
- All the words in <code>wordList</code> are **unique** .
