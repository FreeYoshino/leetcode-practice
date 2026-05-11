/**
 * 題號： 213
 * 標題： House Robber II
 * 連結： https://leetcode.com/problems/house-robber-ii/description/
 * 時間複雜度： O(n)
 * - n 是房子的數量
 * 空間複雜度： O(1)
 * - 只使用了常數空間來存儲前兩個狀態的偷取到 的最大金額
 * 解題思路：
 * 1. 由於房子是環狀排列的 不允許同時偷第一間和最後一間
 * 2. 因此可以分成兩種情況：偷第一間但不偷最後一間 或是偷最後一間但不偷第一間
 * 3. 對於每種情況，使用動態規劃來計算最大金額
 * 4. 最後取兩種情況的最大值作為答案
 */

function robRange(nums: number[], start: number, end: number): number {
  let prev1 = 0; // 偷到i-1的最大金額
  let prev2 = 0; // 偷盜到i-2的最大金額

  for (let i = start; i <= end; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 1) return nums[0];

  // 偷第一間但不偷最後一間
  const case1 = robRange(nums, 0, n - 2);
  // 偷最後一間但不偷第一間
  const case2 = robRange(nums, 1, n - 1);

  return Math.max(case1, case2);
}

// test case
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  { nums: [2, 3, 2], answer: 3 },
  { nums: [1, 2, 3, 1], answer: 4 },
  { nums: [1, 2, 3], answer: 3 },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = rob(nums);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(nums)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
