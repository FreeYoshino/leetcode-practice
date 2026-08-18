/**
 * 題號：3471
 * 題目：Find the Largest Almost Missing Integer
 * 連結：https://leetcode.com/problems/find-the-largest-almost-missing-integer/description/
 * 時間複雜度：O(n)
 * - 建立出現次數表：O(n)
 * - `k === 1` 時走訪雜湊表找最大唯一值：O(n)
 * - `2 <= k <= n - 1` 時只檢查頭尾兩個元素：O(1)
 * - `k === n` 時取整個陣列最大值：O(n)
 *
 * 空間複雜度：O(n)
 * - 使用 `Map` 統計每個數字的出現次數，最差情況下需要儲存 n 個不同元素
 *
 * 解題思路：
 * 1. 題目要找的是「剛好只出現在 1 個長度為 k 的子陣列」中的最大整數。
 * 2. 先處理 `k === n`：整個陣列只會有一個長度為 n 的子陣列，因此任一出現過的數都符合條件，直接回傳陣列最大值。
 * 3. 建立 `freqMap` 統計每個數字在整個陣列中的出現次數。
 * 4. 若 `k === 1`，每個子陣列只含單一元素，某個數字要「剛好只在 1 個子陣列出現」等價於它在整個陣列只出現一次；走訪 `freqMap` 取最大的 `freq === 1`。
 * 5. 若 `2 <= k <= n - 1`，只有陣列最左端與最右端的位置會各自只屬於 1 個長度為 k 的子陣列，因此只需檢查 `nums[0]` 與 `nums[n - 1]` 是否為全域唯一（`freq === 1`），取兩者可行值中的最大值即可。
 */

// --- LeetCode 提供的程式碼模板 ---
function largestInteger(nums: number[], k: number): number {
  const n = nums.length;
  if (k === n) return Math.max(...nums);

  const freqMap = new Map<number, number>();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  if (k === 1) {
    // 當子陣列長度為1的情況下 要回傳整個陣列中出現次數為1的最大值
    let maxNum = -1;
    for (const [num, freq] of freqMap.entries()) {
      if (freq === 1) {
        maxNum = Math.max(maxNum, num);
      }
    }

    return maxNum;
  } else {
    // 當子陣列長度在2到n-1的情況下 要回傳頭尾兩個元素的最大值
    let maxNum = -1;

    if (freqMap.get(nums[0]) === 1) {
      maxNum = Math.max(maxNum, nums[0]);
    }
    if (freqMap.get(nums[n - 1]) === 1) {
      maxNum = Math.max(maxNum, nums[n - 1]);
    }

    return maxNum;
  }
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [3, 9, 2, 1, 7],
    k: 3,
    answer: 7,
  },
  {
    nums: [3, 9, 7, 2, 1, 7],
    k: 4,
    answer: 3,
  },
  {
    nums: [0, 0],
    k: 1,
    answer: -1,
  },
];

testCases.forEach(({ nums, k, answer }, index) => {
  const result = largestInteger(nums, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
