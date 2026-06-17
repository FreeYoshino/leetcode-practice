/**
 * 題號： 40
 * 標題： Combination Sum II
 * 連結： https://leetcode.com/problems/combination-sum-ii/description/
 * 時間複雜度： O(2^N * N)
 *   - 排序需要 O(N log N)
 *   - 回溯過程中，每個元素都有「選或不選」的分支，整體為指數級搜尋
 *   - 每次找到合法組合時，都會複製 path 到結果中，最長可能需要 O(N)
 *   - 因此整體時間複雜度可寫為 O(2^N * N)
 * 空間複雜度： O(N)
 *   - path 與遞迴呼叫堆疊的最大深度都不會超過 N
 *   - 不計算輸出結果本身所佔用的空間
 * 解題思路：
 * 1. 先將 candidates 由小到大排序，方便後續去重與剪枝
 * 2. 使用回溯法從左到右挑選數字，每個數字最多只能使用一次
 * 3. 在遞迴中維護當前索引 startIndex 與目前累積和 currentSum
 * 4. 當 currentSum 等於 target 時，表示找到一組合法解，將 path 加入結果
 * 5. 如果 currentSum 加上目前數字已經大於 target，由於陣列已排序，後面只會更大，因此可以直接剪枝
 * 6. 如果同一層遞迴中遇到相鄰且相同的數字，代表會產生重複組合，直接略過
 * 7. 遞迴結束後回溯，繼續嘗試其他可能的組合
 */

function combinationSum2(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  candidates.sort((a, b) => a - b); // 排序陣列 方便去重
  const backtracking = (startIndex: number, currentSum: number) => {
    if (currentSum === target) {
      result.push([...path]);
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      const candidate = candidates[i];
      const newSum = currentSum + candidate;

      // 剪枝
      if (newSum > target) {
        break;
      }

      // 去重
      if (i > startIndex && candidates[i] === candidates[i - 1]) {
        continue;
      }

      path.push(candidate);
      backtracking(i + 1, newSum);
      path.pop();
    }
  };

  backtracking(0, 0);
  return result;
}

interface TestCase {
  candidates: number[];
  target: number;
  answer: number[][];
}

const testCases: TestCase[] = [
  {
    candidates: [10, 1, 2, 7, 6, 1, 5],
    target: 8,
    answer: [
      [1, 1, 6],
      [1, 2, 5],
      [1, 7],
      [2, 6],
    ],
  },
  {
    candidates: [2, 5, 2, 1, 2],
    target: 5,
    answer: [[1, 2, 2], [5]],
  },
];

testCases.forEach(({ candidates, target, answer }, index) => {
  const result = combinationSum2(candidates, target);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: candidates = ${JSON.stringify(candidates)}, target = ${target}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
