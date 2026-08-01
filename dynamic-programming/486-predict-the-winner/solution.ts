/**
 * 題號：486
 * 題目：Predict the Winner
 * 連結：https://leetcode.com/problems/predict-the-winner/description/
 * 時間複雜度：O(n^2)
 * - 需要計算所有區間 [i, j] 的分數差值，共有 O(n^2) 個狀態
 * - 每個狀態只需要透過左右兩端轉移做一次比較，因此每個狀態都是 O(1)
 *
 * 空間複雜度：O(n^2)
 * - 使用二維 dp 陣列儲存所有區間的結果，大小為 n x n
 *
 * 解題思路：
 * 1. 定義 dp[i][j] 為在區間 [i, j] 中，先手玩家能對後手玩家取得的最大分數差值。
 * 2. 當只剩一個數字時，dp[i][i] = nums[i]，因為先手一定會拿走它。
 * 3. 對於更大的區間，先手可以選擇拿左端 nums[i] 或右端 nums[j]：
 *    - 若拿左端，後手會在區間 [i + 1, j] 中取得最佳結果，所以當前差值是 nums[i] - dp[i + 1][j]
 *    - 若拿右端，後手會在區間 [i, j - 1] 中取得最佳結果，所以當前差值是 nums[j] - dp[i][j - 1]
 * 4. 取兩種選擇中的最大值，填表時由小區間推到大區間，最後檢查 dp[0][n - 1] 是否大於等於 0。
 */

// --- LeetCode 提供的程式碼模板 ---
function predictTheWinner(nums: number[]): boolean {
  const n = nums.length;

  // dp[i][j]: 代表在區間 [i, j]中, 先手玩家與後手玩家的分數差值
  // dp[i][j] = max(nums[i] - dp[i +1][j], nums[j] - dp[i][j - 1])
  const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  // 初始化區間長度為 1 的情況
  for (let i = 0; i < n; i++) {
    dp[i][i] = nums[i];
  }

  // 從區間長度由小到大，i從下往上，j從左往右
  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      const pickedLeft = nums[i] - dp[i + 1][j];
      const pickedRight = nums[j] - dp[i][j - 1];
      dp[i][j] = Math.max(pickedLeft, pickedRight);
    }
  }

  // 當 [0, n - 1] 的分數差值大於等於 0，表示先手玩家可以贏得比賽
  return dp[0][n - 1] >= 0;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    nums: [1, 5, 2],
    answer: false,
  },
  {
    nums: [1, 5, 233, 7],
    answer: true,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  // TODO: 更改呼叫的函式名稱與上方模板一致
  const result = predictTheWinner(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
