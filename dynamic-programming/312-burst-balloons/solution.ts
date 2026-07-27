/**
 * 題號：312
 * 題目：Burst Balloons
 * 連結：https://leetcode.com/problems/burst-balloons/description/
 * 時間複雜度：O(n^3)
 * - n 為加入邊界 1 後的氣球數量
 * - 共有 O(n^2) 個區間需要計算
 * - 每個區間再枚舉最後被戳破的氣球 k，時間為 O(n)
 * - 因此總時間複雜度為 O(n^3)
 * 空間複雜度：O(n^2)
 * - 需要使用二維 dp 表來記錄每個區間的最大硬幣數
 * - 共 O(n^2) 個狀態，因此空間為 O(n^2)
 * 解題思路：
 * - 重點在於找出最後一個被戳破的氣球
 * - 先在 nums 的前後各補一個 1，讓邊界氣球也能被視為可被戳破的節點，方便計算
 * - dp[i][j] 表示在區間 (i, j) 中，只有 i 和 j 兩端的氣球保留時，能獲得的最大硬幣數
 * - 若某個氣球 k 是這個區間中最後一個被戳破的，則它會獲得 nums[i] × nums[k] × nums[j] 的硬幣
 * - 此時區間會先被拆成兩個子區間，分別為 dp[i][k] 和 dp[k][j]
 * - 轉移式為 dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + nums[i] × nums[k] × nums[j])
 * - 由於子問題都依賴更短的區間，依序從短區間往長區間推進，就能得到最終答案
 */

// --- LeetCode 提供的程式碼模板 ---
function maxCoins(nums: number[]): number {
  // 在 nums 的前後各加一個 1，方便計算
  nums = [1, ...nums, 1];
  const n = nums.length;

  // dp[i][j]: 代表在區間 (i, j) 之間能夠獲得的最大硬幣數量
  // dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + nums[i] * nums[k] * nums[j])，其中 i < k < j
  const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  // 最外層遍歷區間長度
  for (let length = 2; length < n; length++) {
    for (let left = 0; left < n - length; left++) {
      let right = left + length;

      // 遍歷區間所有可能的最後一個被戳破的氣球
      for (let k = left + 1; k < right; k++) {
        let coins = nums[left] * nums[k] * nums[right];
        dp[left][right] = Math.max(
          dp[left][right],
          dp[left][k] + coins + dp[k][right],
        );
      }
    }
  }

  return dp[0][n - 1];
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [3, 1, 5, 8],
    answer: 167,
  },
  {
    nums: [1, 5],
    answer: 10,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  // TODO: 更改呼叫的函式名稱與上方模板一致
  const result = maxCoins(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
