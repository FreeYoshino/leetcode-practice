/**
 * 題號： 153
 * 標題： Find Minimum in Rotated Sorted Array
 * 連結： https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/
 * 時間複雜度： O(log N)
 * - 使用binary search 的技巧 每次回圈都將搜尋區域減半 因此時間複雜度為O(log N)
 * 空間複雜度： O(1)
 * - 只使用了left right mid 三個常數級別的變數 因此空間複雜度為O(1)
 * 解題思路：
 * 1. 被rotated的陣列 會被分為兩段遞增區段 左邊>右邊
 * 2. 使用binary search的技巧 
 *    - 當mid位置的元素 大於 right位置的元素時 代表mid處在更大的區段 將left指標移動到mid+1(因為mid本身處在更大的那段所以+1)
 *    - 當mid位置的元素 小於 right位置的元素時 代表mid處在更小的區段 將right指標移動到mid(因為mid本身就有可能是答案)
 * 3. 當left與right指標相遇時 該位置的元素就是整個陣列的最小值
 */

function findMin(nums: number[]): number {
  let left = 0, right = nums.length - 1;
  
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}

// test case
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  { nums: [3, 4, 5, 1, 2], answer: 1 },
  { nums: [4, 5, 6, 7, 0, 1, 2], answer: 0 },
];

testCases.forEach((tc, index) => {
  const result = findMin(tc.nums);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(tc.nums)}`);
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
