/**
 * 題號：494
 * 題目：Target Sum
 * 連結：https://leetcode.com/problems/target-sum/description/
 * 時間複雜度：O(n × P)
 * - n 為 nums 陣列長度
 * - P 為目標子集和，等於 (sum(nums) - target) / 2
 * - 需要對每個數字遍歷一次 dp，且每次都可能更新到 P 的範圍
 * - 因此總時間為 O(n × P)
 * 空間複雜度：O(P)
 * - 只使用一個長度為 P + 1 的 dp 陣列來記錄不同子集和的組合數
 * - 額外空間與 P 成正比，因此為 O(P)
 * 解題思路：
 * - 這題可以轉換為「在 nums 中找到一個子集，其和為 P」，其中 P = (sum(nums) - target) / 2
 * - 原問題中，假設所有數字分成兩組，一組加上符號 +，另一組加上符號 -，則有：
 * - sum(+) - sum(-) = target
 * - sum(+) + sum(-) = sum(nums)
 * - 由上兩式可推得 sum(-) = (sum(nums) - target) / 2
 * - 也就是說，我們只要找出一個和為 P 的子集，這個子集就代表被加上負號的數字集合
 * - 接著用 0/1 背包的思路來計算方法數：
 * - dp[i] 表示在目前處理到某些數字後，能組成和為 i 的方法數
 * - 初始時 dp[0] = 1，表示空集合可以形成和為 0 的方法有 1 種
 * - 對每個數字 num，從後往前更新 dp，避免重複使用同一個數字
 * - 轉移式為 dp[i] += dp[i - num]
 * - 最後答案就是 dp[P]
 */

// --- LeetCode 提供的程式碼模板 ---
function findTargetSumWays(nums: number[], target: number): number {
  const sum = nums.reduce((acc, num) => acc + num, 0);
  const diff = sum - target;
  const P = diff / 2;

  // 如果差值為負數或不是偶數，會找不到符合條件的子集，直接回傳 0
  if (diff < 0 || diff % 2 !== 0) {
    return 0;
  }

  // dp[i]: 表示在 nums 中選擇一些數字，使得它們的和為 i 的方法數量
  // dp[i] = dp[i] + dp[i - num]
  const dp: number[] = new Array(P + 1).fill(0);
  dp[0] = 1;

  for (const num of nums) {
    // 從後往前更新 dp 陣列，避免重複使用同一個數字
    for (let i = P; i >= num; i--) {
      dp[i] += dp[i - num];
    }
  }

  return dp[P];
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  target: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 1, 1, 1, 1],
    target: 3,
    answer: 5,
  },
  {
    nums: [1],
    target: 1,
    answer: 1,
  },
];

testCases.forEach(({ nums, target, answer }, index) => {
  const result = findTargetSumWays(nums, target);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, target = ${target}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
