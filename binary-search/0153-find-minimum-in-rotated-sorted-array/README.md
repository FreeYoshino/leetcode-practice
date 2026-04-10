# [153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/)

Suppose an array of length <code>n</code> sorted in ascending order is **rotated**  between <code>1</code> and <code>n</code> times. For example, the array <code>nums = [0,1,2,4,5,6,7]</code> might become:

- <code>[4,5,6,7,0,1,2]</code> if it was rotated <code>4</code> times.
- <code>[0,1,2,4,5,6,7]</code> if it was rotated <code>7</code> times.

Notice that **rotating**  an array <code>[a[0], a[1], a[2], ..., a[n-1]]</code> 1 time results in the array <code>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code>.

Given the sorted rotated array <code>nums</code> of **unique**  elements, return the minimum element of this array.

You must write an algorithm that runs in<code>O(log n) time</code>.

**Example 1:** 

```
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```

**Example 2:** 

```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
```

**Example 3:** 

```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
```

**Constraints:** 

- <code>n == nums.length</code>
- <code>1 <= n <= 5000</code>
- <code>-5000 <= nums[i] <= 5000</code>
- All the integers of <code>nums</code> are **unique** .
- <code>nums</code> is sorted and rotated between <code>1</code> and <code>n</code> times.