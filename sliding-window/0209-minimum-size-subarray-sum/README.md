# [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/description/)

Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return the **minimal length**  of a <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1n:" data-state="closed" class="">subarray</button> whose sum is greater than or equal to <code>target</code>. If there is no such subarray, return <code>0</code> instead.

**Example 1:** 

```
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
```

**Example 2:** 

```
Input: target = 4, nums = [1,4,4]
Output: 1
```

**Example 3:** 

```
Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
```

**Constraints:** 

- <code>1 <= target <= 10^9</code>
- <code>1 <= nums.length <= 10^5</code>
- <code>1 <= nums[i] <= 10^4</code>

**Follow up:**  If you have figured out the <code>O(n)</code> solution, try coding another solution of which the time complexity is <code>O(n log(n))</code>.