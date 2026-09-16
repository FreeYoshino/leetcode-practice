/**
 * 題號：1621
 * 題目：Number of Sets of K Non-Overlapping Line Segments
 * 連結：https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments/description/
 * 時間複雜度：O(n * k)
 * - 狀態可以視為 (i, remainK, isDrawing)，其中 i 是目前處理到的點，
 *   remainK 是尚未完成的線段數，isDrawing 表示目前是否正在畫線段。
 * - 狀態總數為 (n + 1) × (k + 1) × 2，因此可簡化為 O(n * k)。
 * - 每個狀態最多進行兩次遞迴轉移，且使用記憶化避免重複計算。
 *
 * 空間複雜度：O(n * k)
 * - dp 陣列儲存所有 (i, remainK, isDrawing) 狀態，大小為 O(n * k)。
 * - 遞迴呼叫堆疊深度最多為 O(n + k)，不超過 dp 陣列的漸進空間複雜度。
 *
 * 解題思路：
 * 1. 使用 dfs(i, remainK, isDrawing) 定義狀態，表示目前處理到第 i 個點、
 *    還需要畫 remainK 條線段，且 isDrawing 表示是否正在畫線段。
 * 2. 當 remainK === 0 時，代表已經完成所有線段，返回 1；
 *    當 i === n 但仍有線段未完成時，返回 0。
 * 3. 如果目前正在畫線段，可以選擇繼續延伸到下一個點，
 *    或在目前點結束線段並開始計算剩餘的線段。
 * 4. 如果目前沒有畫線段，可以跳過目前的點，或從下一個點開始畫線段。
 * 5. 將每個狀態的結果儲存在 dp 中，避免相同狀態被重複計算，
 *    最後返回 dfs(0, k, 0) 並對 MOD 取餘數。
 */

// --- LeetCode 提供的程式碼模板 ---
function numberOfSets(n: number, k: number): number {
  const MOD = 1e9 + 7;

  // dp[i][k][isDrawing]: 前 i 個點，畫了 k 條線段的方法數，isDrawing 表示是否正在畫線段
  //    i: 0~i
  //    k: 0~k
  //    isDrawing: 0 or 1
  const dp: number[][][] = Array.from({ length: n + 1 }, () =>
    Array.from({ length: k + 1 }, () => [-1, -1]),
  );

  const dfs = (i: number, remainK: number, isDrawing: number): number => {
    if (remainK === 0) return 1;
    if (i === n) return 0;

    // 如果已經計算過，直接返回結果
    if (dp[i][remainK][isDrawing] !== -1) {
      return dp[i][remainK][isDrawing];
    }

    let result = 0;

    if (isDrawing === 1) {
      // 當前點正在畫線段，可以選擇結束線段或繼續畫線段
      result = (dfs(i + 1, remainK, isDrawing) + dfs(i, remainK - 1, 0)) % MOD;
    } else {
      // 當前點沒有畫線段，可以選擇開始畫線段或跳過當前點
      result = (dfs(i + 1, remainK, 0) + dfs(i + 1, remainK, 1)) % MOD;
    }

    dp[i][remainK][isDrawing] = result;
    return result;
  };

  return dfs(0, k, 0);
}

// --- 測試案例 ---
interface TestCase {
  n: number;
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    n: 4,
    k: 2,
    answer: 5,
  },
  {
    n: 3,
    k: 1,
    answer: 3,
  },
  {
    n: 30,
    k: 7,
    answer: 796297179,
  },
];

testCases.forEach(({ n, k, answer }, index) => {
  const result = numberOfSets(n, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: n = ${n}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
