/**
 * 題號：3693
 * 題目：Climbing Stairs II
 * 連結：https://leetcode.com/problems/climbing-stairs-ii/description/
 * 時間複雜度：O(n)
 * - 需要依序計算每一階樓梯的最小花費。
 * - 每一階最多檢查從前 1、2、3 階跳上來的 3 種方式，
 *   因此每階的處理時間為常數。
 *
 * 空間複雜度：O(n)
 * - dp[i] 儲存到達第 i 階樓梯的最小花費。
 * - 一共需要 n + 1 個位置，包含起點第 0 階。
 *
 * 解題思路：
 * 1. 建立 DP 陣列，其中 dp[i] 代表到達第 i 階樓梯所需的最小花費，
 *    並設定 dp[0] = 0，表示尚未踏上任何階梯時不需花費。
 * 2. 到達第 i 階時，最後一步可以從第 i - 1、i - 2 或 i - 3 階跳上來。
 * 3. 從第 i - j 階跳到第 i 階的總花費為：
 *    dp[i - j] + costs[i - 1] + j^2，
 *    其中 j 為跳躍的階數，costs[i - 1] 是第 i 階的花費。
 * 4. 取這 3 種跳法中的最小值作為 dp[i]，最後回傳 dp[n]。
 */

// --- LeetCode 提供的程式碼模板 ---
function climbStairs(n: number, costs: number[]): number {
  // dp[i]: 代表到達第 i 階樓梯的最小花費
  const dp: number[] = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    const currentCost = costs[i - 1]; // 第 i 階樓梯的花費

    // 最多3種方法可以到達第 i 階樓梯，分別是從第 i-1、i-2、i-3 階樓梯跳上來
    for (let j = 1; j <= 3; j++) {
      const jumpCost = dp[i - j] + currentCost + Math.pow(j, 2);

      if (i - j >= 0) {
        dp[i] = Math.min(dp[i], jumpCost);
      }
    }
  }

  return dp[n];
}

// --- 測試案例 ---
interface TestCase {
  n: number;
  costs: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    n: 4,
    costs: [1, 2, 3, 4],
    answer: 13,
  },
  {
    n: 4,
    costs: [5, 1, 6, 2],
    answer: 11,
  },
  {
    n: 3,
    costs: [9, 8, 3],
    answer: 12,
  },
];

testCases.forEach(({ n, costs, answer }, index) => {
  const result = climbStairs(n, costs);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: n = ${n}, costs = ${JSON.stringify(costs)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
