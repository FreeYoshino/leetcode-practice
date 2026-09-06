/**
 * 題號：115
 * 題目：Distinct Subsequences
 * 連結：https://leetcode.com/problems/distinct-subsequences/description/
 * 時間複雜度：O(m * n)
 * - m 是字串 s 的長度，n 是字串 t 的長度。
 * - 需要逐一計算 (m + 1) × (n + 1) 個 dp 狀態，每個狀態只需 O(1) 的轉移。
 *
 * 空間複雜度：O(m * n)
 * - dp 陣列儲存 s 的前 i 個字元組成 t 的前 j 個字元的方法數，大小為
 *   (m + 1) × (n + 1)。
 *
 * 解題思路：
 * 1. 定義 dp[i][j] 為 s 的前 i 個字元，組成 t 的前 j 個字元的不同子序列數量。
 * 2. 初始化 dp[i][0] = 1，因為不選取任何字元即可組成空字串；
 *    而 dp[0][j] = 0（j > 0），因為空字串無法組成非空字串。
 * 3. 當 s[i - 1] === t[j - 1] 時，最後一個字元有兩種選擇：
 *    - 選取 s[i - 1]：方法數為 dp[i - 1][j - 1]；
 *    - 不選取 s[i - 1]：方法數為 dp[i - 1][j]。
 *    因此 dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]。
 * 4. 當 s[i - 1] !== t[j - 1] 時，s[i - 1] 無法作為 t[j - 1]，只能跳過它，
 *    因此 dp[i][j] = dp[i - 1][j]。
 * 5. 最後返回 dp[m][n]，即使用完整的 s 組成完整的 t 的方法數。
 */

// --- LeetCode 提供的程式碼模板 ---
function numDistinct(s: string, t: string): number {
  const m = s.length;
  const n = t.length;

  // dp[i][j]: 代表 s的前 i個字元能組成 t的前 j個字元的方法數
  // dp[i][j] =
  //          當 s[i-1] === t[j-1] 時，dp[i-1][j-1] + dp[i-1][j]
  //          當 s[i-1] !== t[j-1] 時，dp[i-1][j]
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0),
  );

  // 初始化 dp[0][j] = 0
  for (let j = 0; j <= n; j++) {
    dp[0][j] = 0;
  }
  // 初始化 dp[i][0] = 1
  for (let i = 0; i <= m; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[m][n];
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  t: string;
  answer: number;
}

const testCases: TestCase[] = [
  {
    s: 'rabbbit',
    t: 'rabbit',
    answer: 3,
  },
  {
    s: 'babgbag',
    t: 'bag',
    answer: 5,
  },
];

testCases.forEach(({ s, t, answer }, index) => {
  const result = numDistinct(s, t);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s= ${JSON.stringify(s)}, t = ${JSON.stringify(t)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
