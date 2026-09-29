/**
 * 題號：2267
 * 題目： Check if There Is a Valid Parentheses String Path
 * 連結：https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path/description/
 * 時間複雜度：O(m * n * (m + n))
 * - m × n 是網格中的格子數量，k 是目前尚未匹配的左括號數量。
 * - 每個格子的 k 範圍最多為 O(m + n)，因此總狀態數為 O(m * n * (m + n))。
 * - 每個狀態只需檢查上方與左方兩個前置狀態，轉移時間為 O(1)。
 *
 * 空間複雜度：O(m * n * (m + n))
 * - dp[i][j][k] 儲存每個格子與未匹配左括號數量的可行性。
 * - dp 陣列共有 m × n × O(m + n) 個狀態。
 *
 * 解題思路：
 * 1. 一條從左上角走到右下角的路徑會經過 m + n - 1 個格子。
 *    若路徑長度為奇數，不可能由數量相等的左右括號組成，因此直接返回 false。
 * 2. 檢查起點與終點的括號：起點必須是 '('，終點必須是 ')'，否則不可能形成有效括號字串。
 * 3. 將狀態定義為 dp[i][j][k]，表示走到格子 (i, j) 時，仍未匹配的左括號數量為 k 的路徑是否存在。
 * 4. 初始化起點：若起點是 '('，則 dp[0][0][1] = true。
 * 5. 依序處理每個格子。若當前格子是 '('，未匹配的左括號數量增加 1；
 *    若是 ')'，則減少 1。當數量變成負數時，代表前綴已無法匹配，直接忽略該狀態。
 * 6. 當前狀態只能由上方或左方轉移而來，只要其中一個前置狀態可行，當前狀態就可行。
 *    同時限制 k 不超過路徑剩餘長度，避免無法在剩餘格子中匹配完所有左括號的狀態。
 * 7. 最後檢查 dp[m - 1][n - 1][0]。若到達右下角時沒有未匹配的左括號，
 *    即代表存在一條有效的括號路徑。
 */

// --- LeetCode 提供的程式碼模板 ---
function hasValidPath(grid: string[][]): boolean {
  const m = grid.length;
  const n = grid[0].length;
  const pathLength = m + n - 1;

  if (pathLength % 2 !== 0) {
    return false;
  }

  if (grid[0][0] === ')' || grid[m - 1][n - 1] === '(') {
    return false;
  }

  // 左括號的最大數量不能超過總長度的一半
  const maxK = Math.floor((m + n) / 2);

  // dp[i][j][k]: 表示從 (0, 0) 到 (i, j) 的路徑中，當前未被匹配的左括號數量為 k 的情況是否存在
  const dp: boolean[][][] = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => new Array(maxK + 1).fill(false)),
  );

  // 初始化起點
  dp[0][0][1] = true;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 跳過起點
      if (i === 0 && j === 0) continue;

      const delta = grid[i][j] === '(' ? 1 : -1;
      const remainingStep = pathLength - (i + j);

      for (let k = 0; k <= maxK; k++) {
        // 當前k大於剩餘步數時，無法匹配，直接跳過
        if (k > remainingStep) continue;

        // 當前K = 前一格的K + delta
        const prevK = k - delta;
        if (prevK < 0 || prevK > maxK) continue;

        const fromTop = i > 0 && dp[i - 1][j][prevK];
        const fromLeft = j > 0 && dp[i][j - 1][prevK];
        dp[i][j][k] = fromTop || fromLeft;
      }
    }
  }

  return dp[m - 1][n - 1][0];
}

// --- 測試案例 ---
interface TestCase {
  grid: string[][];
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    grid: [
      ['(', '(', '('],
      [')', '(', ')'],
      ['(', '(', ')'],
      ['(', '(', ')'],
    ],
    answer: true,
  },
  {
    grid: [
      [')', ')'],
      ['(', '('],
    ],
    answer: false,
  },
];

testCases.forEach(({ grid, answer }, index) => {
  const result = hasValidPath(grid);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: grid = ${JSON.stringify(grid)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
