/**
 * 題號：3904
 * 題目：Smallest Stable Index II
 * 連結：https://leetcode.com/problems/smallest-stable-index-ii/description/
 * 時間複雜度：O(n)
 * - 建立前綴最大值與後綴最小值陣列需要 O(n)
 * - 逐一檢查每個索引的 score 需要 O(n)
 *
 * 空間複雜度：O(n)
 * - 使用 maxArray 與 minArray 儲存每個位置的前綴最大值與後綴最小值
 *
 * 解題思路：
 * 1. 建立 maxArray，讓 maxArray[i] 記錄 nums[0..i] 的最大值。
 * 2. 建立 minArray，讓 minArray[i] 記錄 nums[i..n-1] 的最小值。
 * 3. 依序計算每個索引 i 的 score = maxArray[i] - minArray[i]。
 * 4. 回傳第一個 score <= k 的索引；若不存在符合條件的索引則回傳 -1。
 */

// --- LeetCode 提供的程式碼模板 ---
function firstStableIndex(nums: number[], k: number): number {
  const n = nums.length;

  const maxArray: number[] = new Array(n).fill(0);
  const minArray: number[] = new Array(n).fill(0);
  maxArray[0] = nums[0];
  minArray[n - 1] = nums[n - 1];

  for (let i = 1; i < n; i++) {
    maxArray[i] = Math.max(maxArray[i - 1], nums[i]);

    const j = n - 1 - i;
    minArray[j] = Math.min(minArray[j + 1], nums[j]);
  }

  for (let i = 0; i < n; i++) {
    if (maxArray[i] - minArray[i] <= k) {
      return i;
    }
  }
  return -1;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [5, 0, 1, 4],
    k: 3,
    answer: 3,
  },
  {
    nums: [3, 2, 1],
    k: 1,
    answer: -1,
  },
  {
    nums: [0],
    k: 0,
    answer: 0,
  },
];

testCases.forEach(({ nums, k, answer }, index) => {
  const result = firstStableIndex(nums, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
