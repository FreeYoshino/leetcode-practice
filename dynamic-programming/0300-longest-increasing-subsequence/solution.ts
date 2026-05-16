/**
 * 題號： 300
 * 標題： Longest Increasing Subsequence
 * 連結： https://leetcode.com/problems/longest-increasing-subsequence/description/
 * 時間複雜度： O(n^2)
 * - n 是 nums 陣列的長度
 * - 使用雙層迴圈來計算 dp 陣列的值 每次迴圈的時間複雜度為 O(n) 總共 n 個元素 所以總時間複雜度為 O(n^2)
 * 空間複雜度： O(n)
 * - dp 陣列的長度為 nums 的長度 所以空間複雜度為 O(n)
 * 解題思路：
 * 1. 維護一個 dp 陣列 dp[i] 代表以 nums[i] 結尾的最長遞增子序列的長度
 * 2. 初始化 dp 陣列 長度為 nums 的長度 初始值為 1(每個元素本身都可以是一個遞增子序列)
 * 3. 遍歷 nums 陣列 並對每個元素(nums[i]) 遍歷之前的元素(nums[j]) 如果 nums[i] > nums[j] 則更新 dp[i] = max(dp[i], dp[j] + 1)
 * 4. 最後返回 dp 陣列中的最大值 即為最長遞增子序列的長度
 */

function lengthOfLIS(nums: number[]): number {
  const dp: number[] = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // nums[i] > nums[j] 代表 nums[i] 可以接在 nums[j] 後面形成一個遞增子序列
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}

// test cases
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  { nums: [10, 9, 2, 5, 3, 7, 101, 18], answer: 4 },
  { nums: [0, 1, 0, 3, 2, 3], answer: 4 },
  { nums: [7, 7, 7, 7, 7, 7, 7], answer: 1 },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = lengthOfLIS(nums);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
