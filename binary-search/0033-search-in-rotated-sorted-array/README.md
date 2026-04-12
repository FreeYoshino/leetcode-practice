# [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/description/)

There is an integer array <code>nums</code> sorted in ascending order (with **distinct**  values).

Prior to being passed to your function, <code>nums</code> is **possibly left rotated**  at an unknown index <code>k</code> (<code>1 <= k < nums.length</code>) such that the resulting array is <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code> (**0-indexed** ). For example, <code>[0,1,2,4,5,6,7]</code> might be left rotated by<code>3</code>indices and become <code>[4,5,6,7,0,1,2]</code>.

Given the array <code>nums</code> **after**  the possible rotation and an integer <code>target</code>, return the index of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not in <code>nums</code>.

You must write an algorithm with <code>O(log n)</code> runtime complexity.

**Example 1:** 

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

**Example 2:** 

```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

**Example 3:** 

```
Input: nums = [1], target = 0
Output: -1
```

**Constraints:** 

- <code>1 <= nums.length <= 5000</code>
- <code>-10^4 <= nums[i] <= 10^4</code>
- All values of <code>nums</code> are **unique** .
- <code>nums</code> is an ascending array that is possibly rotated.
- <code>-10^4 <= target <= 10^4</code>