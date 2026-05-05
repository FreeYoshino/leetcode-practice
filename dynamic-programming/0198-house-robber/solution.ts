/**
 * 題號： 198
 * 標題： House Robber
 * 連結： https://leetcode.com/problems/house-robber/description/
 * 時間複雜度： O(n)
 * - n 是房子的數量
 * 空間複雜度： O(1)
 * - 只使用了常數空間來存儲前兩個狀態的最大金額
 * 解題思路：
 * 1. 使用dp 的技巧
 * 2. 偷到i-1的最大金額為prev1，偷到i-2的最大金額為prev2
 * 3. 偷到i的最大金額為偷到i-1的最大金額和偷到i-2的最大金額加上當前房子金額的最大值
 * 4. 最後返回偷到最後一個房子的最大金額
 */

function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev1 = 0; // 偷到i-1的最大金額
  let prev2 = 0; // 偷盜到i-2的最大金額

  for (let i = 0; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// test case
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  { nums: [1, 2, 3, 1], answer: 4 },
  { nums: [2, 7, 9, 3, 1], answer: 12 },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = rob(nums);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(nums)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
