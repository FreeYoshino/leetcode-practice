/**
 * 題號：2778
 * 題目：Sum of Squares of Special Elements
 * 連結：https://leetcode.com/problems/sum-of-squares-of-special-elements/description/
 * 時間複雜度：O(n)
 * - 逐一檢查每個索引是否為 n 的因數需要 O(n)
 *
 * 空間複雜度：O(1)
 * - 只使用固定數量的變數儲存長度、總和與迴圈狀態
 *
 * 解題思路：
 * 1. 陣列長度為 n，若索引 i（從 1 開始計算）可以整除 n，
 *    代表該索引是特殊元素的索引。
 * 2. 逐一檢查 i = 1 到 n，若 n % i === 0，就將 nums[i - 1] 的平方加入總和。
 * 3. 回傳所有特殊元素平方的總和。
 */

// --- LeetCode 提供的程式碼模板 ---
function sumOfSquares(nums: number[]): number {
  const n = nums.length;

  let result = 0;
  for (let i = 0; i < n; i++) {
    if (n % (i + 1) === 0) {
      result += nums[i] * nums[i];
    }
  }
  return result;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 3, 4],
    answer: 21,
  },
  {
    nums: [2, 7, 1, 19, 18, 3],
    answer: 63,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = sumOfSquares(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
