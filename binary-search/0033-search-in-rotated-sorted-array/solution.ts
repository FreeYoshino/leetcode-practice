/**
 * 題號： 33
 * 標題： Search in Rotated Sorted Array
 * 連結：https://leetcode.com/problems/search-in-rotated-sorted-array/description/
 * 時間複雜度：
 * 空間複雜度：
* 解題思路：
 * 1. 旋轉後的陣列從中間切開　必定有一半是完美遞增的
 * 2. 每次算出 mid 後先檢查 nums[mid] 是否就是目標值
 * 3. 判斷哪一半是完美遞增的 (nums[left] <= nums[mid])
 * - 若左半邊完美　檢查 target 是否落在這段完美區間內　是的話就縮小右邊界 (right = mid - 1)　否則縮小左邊界 (left = mid + 1)
 * - 若右半邊完美：檢查 target 是否落在這段完美區間內　是的話就縮小左邊界 (left = mid + 1)　否則縮小右邊界 (right = mid - 1)
 */

function search(nums: number[], target: number): number {
  let left = 0,
    right = nums.length -1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      // 左半邊為完美遞增區間 判斷target是否在這範圍
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // 右半邊為完美遞增區間 判斷target是否在這範圍
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

// test case
interface TestCase {
  nums: number[];
  target: number;
  answer: number;
}

const testCases: TestCase[] = [
  { nums: [4, 5, 6, 7, 0, 1, 2], target: 0, answer: 4 },
  { nums: [4, 5, 6, 7, 0, 1, 2], target: 3, answer: -1 },
  { nums: [1], target: 0, answer: -1 },
];

testCases.forEach((tc, index) => {
  const result = search(tc.nums, tc.target);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: nums = ${JSON.stringify(tc.nums)}, target = ${tc.target}`,
  );
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
