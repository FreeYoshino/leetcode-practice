/**
 * 題號：3414
 * 題目：Maximum Score of Non-overlapping Intervals
 * 連結：https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals/description/
 * 時間複雜度：O(n log n)
 * - n 是區間的數量。先依照區間的右端點排序，需花費 O(n log n) 時間。
 * - 對每個區間使用二分搜尋找出最後一個不重疊的區間，總共花費 O(n log n)。
 * - DP 只需要考慮最多 4 個區間，因此狀態數為 O(4n)，每個狀態的比較成本為常數，
 *   總時間仍為 O(n log n)。
 *
 * 空間複雜度：O(n)
 * - sorted 陣列儲存排序後的區間，大小為 O(n)。
 * - dp 陣列有 (n + 1) × 5 個狀態；每個狀態最多儲存 4 個索引，因此空間為 O(n)。
 *
 * 解題思路：
 * 1. 先將每個區間附加原始索引，並依照右端點由小到大排序，方便使用區間 DP。
 * 2. 定義 dp[i][j] 表示前 i 個排序後的區間中，選取 j 個不重疊區間時的最佳狀態，
 *    狀態包含目前的總分 weight，以及依原始索引排序後的 indices。
 * 3. 對排序後的每個區間，使用二分搜尋找到最後一個滿足右端點小於目前左端點的區間。
 *    若該區間在排序後的位置為 k，則選取目前區間時，可以從 dp[k][j - 1] 轉移而來。
 * 4. 對每個 j 比較兩種選擇：
 *    - 不選目前區間：直接繼承 dp[i - 1][j]；
 *    - 選取目前區間：將目前區間的分數加入 dp[k][j - 1]。
 * 5. 比較兩個狀態時，優先選擇總分較大的狀態；若總分相同，則選擇索引陣列字典序較小的狀態。
 * 6. 最後比較 dp[n][1] 到 dp[n][4]，回傳總分最高的結果；若總分相同，仍依索引陣列字典序決定答案。
 */

type DpState = {
  weight: number;
  indices: number[];
};

// 比較兩個狀態的分數以及索引陣列字典序
function compareStates(state1: DpState, state2: DpState): boolean {
  if (state1.weight !== state2.weight) {
    return state1.weight > state2.weight;
  }

  // 如果分數相同，則比較索引陣列的字典序
  const len = Math.min(state1.indices.length, state2.indices.length);
  for (let i = 0; i < len; i++) {
    if (state1.indices[i] !== state2.indices[i]) {
      return state1.indices[i] < state2.indices[i];
    }
  }

  return state1.indices.length < state2.indices.length;
}

// --- LeetCode 提供的程式碼模板 ---
function maximumWeight(intervals: number[][]): number[] {
  const n = intervals.length;
  const MAX_INTERVALS = 4;

  const sorted = intervals.map((item, idx) => [...item, idx]);
  sorted.sort((a, b) => a[1] - b[1]);

  // dp[i][j]: 代表前i個區間中，選取j個區間的最大分數以及索引陣列的狀態
  const dp: DpState[][] = Array.from({ length: n + 1 }, () =>
    Array.from({ length: MAX_INTERVALS + 1 }, (_, j) => {
      if (j === 0) return { weight: 0, indices: [] };
      return { weight: -Infinity, indices: [] };
    }),
  );

  const findLastNonOverlapping = (index: number): number => {
    const currentL = sorted[index][0];

    // 二分法查找最後一個不重疊的區間
    let left = 0;
    let right = index - 1;
    let lastValidIndex = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (sorted[mid][1] < currentL) {
        left = mid + 1;
        lastValidIndex = mid;
      } else {
        right = mid - 1;
      }
    }

    // 回傳1-based索引 對應到dp陣列的索引
    return lastValidIndex + 1;
  };

  // dp[i][j] = max(dp[i-1][j], dp[k][j-1] + intervals[i][2])，其中k是最後一個不重疊的區間的索引
  for (let i = 1; i <= n; i++) {
    const k = findLastNonOverlapping(i - 1);

    for (let j = 1; j <= MAX_INTERVALS; j++) {
      // 不選擇當前區間(繼承前一個狀態)
      const prevState = dp[i - 1][j];
      dp[i][j] = { ...prevState };

      // 選擇當前區間(dp[k][j-1] 得是valid的狀態)
      if (dp[k][j - 1].weight !== -Infinity) {
        const newState: DpState = {
          weight: dp[k][j - 1].weight + sorted[i - 1][2],
          indices: [...dp[k][j - 1].indices, sorted[i - 1][3]].sort(
            (a, b) => a - b,
          ),
        };

        // 比較兩個狀態的分數以及索引陣列字典序
        if (compareStates(newState, dp[i][j])) {
          dp[i][j] = newState;
        }
      }
    }
  }

  let result: DpState = { weight: -Infinity, indices: [] };
  for (let j = 1; j <= MAX_INTERVALS; j++) {
    if (compareStates(dp[n][j], result)) {
      result = dp[n][j];
    }
  }
  return result.indices;
}

// --- 測試案例 ---
interface TestCase {
  intervals: number[][];
  answer: number[];
}

const testCases: TestCase[] = [
  {
    intervals: [
      [1, 3, 2],
      [4, 5, 2],
      [1, 5, 5],
      [6, 9, 3],
      [6, 7, 1],
      [8, 9, 1],
    ],
    answer: [2, 3],
  },
  {
    intervals: [
      [5, 8, 1],
      [6, 7, 7],
      [4, 7, 3],
      [9, 10, 6],
      [7, 8, 2],
      [11, 14, 3],
      [3, 5, 5],
    ],
    answer: [1, 3, 5, 6],
  },
];

testCases.forEach(({ intervals, answer }, index) => {
  const result = maximumWeight(intervals);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: intervals = ${JSON.stringify(intervals)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
