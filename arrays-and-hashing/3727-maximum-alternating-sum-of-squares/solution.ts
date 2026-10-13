/**
 * 題號：3727
 * 題目：Maximum Alternating Sum of Squares
 * 連結：https://leetcode.com/problems/maximum-alternating-sum-of-squares/description/
 * 時間複雜度：O(n log n)
 * - 依照元素絕對值排序需要 O(n log n)
 * - 逐一計算交替平方和需要 O(n)
 *
 * 空間複雜度：O(log n)
 * - 使用內建排序所需的額外堆疊空間
 *
 * 解題思路：
 * 1. 由於每個元素平方後只與絕對值有關，因此依照元素的絕對值降冪排序。
 * 2. 為了讓總和最大，將絕對值較大的前 ceil(n / 2) 個元素平方後加總。
 * 3. 將剩餘元素平方後扣除，形成最大的交替平方和。
 */

// --- LeetCode 提供的程式碼模板 ---
function maxAlternatingSum(nums: number[]): number {
  const n = nums.length;

  nums.sort((a, b) => Math.abs(b) - Math.abs(a));

  let result = 0;
  for (let i = 0; i < n; i++) {
    if (i < Math.floor((n + 1) / 2)) {
      result += nums[i] * nums[i];
    } else {
      result -= nums[i] * nums[i];
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
    nums: [1, 2, 3],
    answer: 12,
  },
  {
    nums: [1, -1, 2, -2, 3, -3],
    answer: 16,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = maxAlternatingSum(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
