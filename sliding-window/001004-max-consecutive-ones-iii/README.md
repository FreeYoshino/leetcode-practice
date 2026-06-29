# [1004. Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/description/)

Given a binary array <code>nums</code> and an integer <code>k</code>, return the maximum number of consecutive <code>1</code>'s in the array if you can flip at most <code>k</code> <code>0</code>'s.

**Example 1:**

```text
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,**1** ,1,1,1,1,**1** ]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
```

**Example 2:**

```text
Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,**1** ,**1** ,1,1,1,**1** ,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
```

**Constraints:**

- <code>1 <= nums.length <= 10^5</code>
- <code>nums[i]</code> is either <code>0</code> or <code>1</code>.
- <code>0 <= k <= nums.length</code>
