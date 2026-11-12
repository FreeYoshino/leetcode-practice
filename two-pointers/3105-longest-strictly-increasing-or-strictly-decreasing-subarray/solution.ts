/**
 * 題號：3105
 * 題目：Longest Strictly Increasing or Strictly Decreasing Subarray
 * 連結：https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray/description/
 *
 * 時間複雜度：O(n)
 * - 使用 right 指標從左到右遍歷整個陣列，每個元素只會被處理一次
 *
 * 空間複雜度：O(1)
 * - 只有額外使用指標、目前單調狀態與長度等變數，沒有使用依賴於輸入陣列長度的結構
 *
 * 解題思路：
 * - 使用 left、right 指標表示目前正在檢查的連續子陣列範圍
 * - 使用 currentState 記錄目前子陣列的單調方向：1 代表遞增，-1 代表遞減，0 代表尚未確定
 * 1. 若 nums[right] 大於前一個元素，代表目前方向為遞增
 * 2. 若 nums[right] 小於前一個元素，代表目前方向為遞減
 * 3. 若目前方向與前一個方向相反，將 left 移至前一個元素，保留新的單調子陣列
 * 4. 若兩個相鄰元素相等，無法維持嚴格單調，重置目前子陣列並從 right 重新開始
 * 5. 每次方向改變或遍歷結束時更新最長子陣列長度
 */

// --- LeetCode 提供的程式碼模板 ---
function longestMonotonicSubarray(nums: number[]): number {
  const n = nums.length;

  let currentState = 0; // 0: unknown, 1: increasing, -1: decreasing
  let left = 0;
  let maxLength = 1;
  for (let right = 1; right < n; right++) {
    if (nums[right] > nums[right - 1]) {
      if (currentState === -1) {
        maxLength = Math.max(maxLength, right - left);
        left = right - 1;
      }
      currentState = 1;
    } else if (nums[right] < nums[right - 1]) {
      if (currentState === 1) {
        maxLength = Math.max(maxLength, right - left);
        left = right - 1;
      }
      currentState = -1;
    } else {
      // 數字相等，重置狀態
      maxLength = Math.max(maxLength, right - left);
      left = right;
      currentState = 0;
    }
  }

  maxLength = Math.max(maxLength, n - left); // 最後一段子陣列的長度
  return maxLength;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 4, 3, 3, 2],
    answer: 2,
  },
  {
    nums: [3, 3, 3, 3],
    answer: 1,
  },
  {
    nums: [3, 2, 1],
    answer: 3,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = longestMonotonicSubarray(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
