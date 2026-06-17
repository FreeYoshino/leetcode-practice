# [40. Combination Sum II](https://leetcode.com/problems/combination-sum-ii/description/)

Given a collection of candidate numbers (<code>candidates</code>) and a target number (<code>target</code>), find all unique combinations in <code>candidates</code>where the candidate numbers sum to <code>target</code>.

Each number in <code>candidates</code>may only be used **once** in the combination.

**Note:** The solution set must not contain duplicate combinations.

**Example 1:**

```
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

**Example 2:**

```
Input: candidates = [2,5,2,1,2], target = 5
Output:
[
[1,2,2],
[5]
]
```

**Constraints:**

- <code>1 <=candidates.length <= 100</code>
- <code>1 <=candidates[i] <= 50</code>
- <code>1 <= target <= 30</code>
