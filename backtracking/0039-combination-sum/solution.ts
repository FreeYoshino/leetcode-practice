/**
 * 題號： 39
 * 標題： Combination Sum
 * 連結： https://leetcode.com/problems/combination-sum/description/
 * 時間複雜度： O(N^(T/min(candidates)))
 *   - 在最壞的情況下，當最小候選數為 1 時，遞迴樹的深度為 T（目標值）
 *   - 每層有 N 個分支（N 為候選數個數），因此時間複雜度為 O(N^T)
 *   - 實際上會受到最小候選數影響，深度為 T/min(candidates)
 * 空間複雜度： O(T/min(candidates))
 *   - 遞迴棧的最大深度取決於最深的遞迴層級
 *   - 最壞情況下需要堆疊 T/min(candidates) 層（當重複使用最小的候選數時）
 *   - 不計算輸出結果本身所佔用的空間
 * 解題思路：
 * 1. 使用回溯法來尋找所有可能的組合
 * 2. 定義一個遞迴函數 backtracking 接受當前的起始索引(防止找到重複組合) 和當前的和作為參數
 * 3. 在 backtracking 函數中，當前的和等於目標值時 將當前組合加入結果中
 * 4. 否則 遍歷候選數 將當前數字加入組合中 並遞迴呼叫 backtracking 函數 允許重複使用同一個元素
 * 5. 回退到上一個狀態 繼續尋找其他組合
 * 6. 最後返回結果
 */

function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  // 遞迴函數：從 startIndex 開始搜索 currentSum 為當前累積和
  const backtracking = (startIndex: number, currentSum: number) => {
    // 當累積和等於目標值時 找到一個有效組合
    if (currentSum === target) {
      result.push([...path]);
      return;
    }

    // 從 startIndex 開始遍歷候選數，允許重複使用同一個數
    for (let i = startIndex; i < candidates.length; i++) {
      const candidate = candidates[i];
      const newSum = currentSum + candidate;

      // 剪枝：當累積和已超過目標值時，後續元素不會改善結果
      if (newSum <= target) {
        path.push(candidate);
        // 傳入 i（而非 i+1）允許重複使用當前數
        backtracking(i, newSum);
        // 回退：移除當前數，準備嘗試下一個數
        path.pop();
      }
    }
  };

  backtracking(0, 0);
  return result;
}

// test case
interface TestCase {
  candidates: number[];
  target: number;
  answer: number[][];
}

const testCases: TestCase[] = [
  {
    candidates: [2, 3, 6, 7],
    target: 7,
    answer: [[2, 2, 3], [7]],
  },
  {
    candidates: [2, 3, 5],
    target: 8,
    answer: [
      [2, 2, 2, 2],
      [2, 3, 3],
      [3, 5],
    ],
  },
  { candidates: [2], target: 1, answer: [] },
];

testCases.forEach(({ candidates, target, answer }, index) => {
  const result = combinationSum(candidates, target);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: candidates: ${JSON.stringify(candidates)}, target: ${target}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Answer: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
