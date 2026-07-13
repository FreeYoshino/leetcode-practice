/**
 * 題號： 47
 * 題目： Permutations II
 * 連結： https://leetcode.com/problems/permutations-ii/description/
 * 時間複雜度：O(n * n!)
 * - 回溯樹在最壞情況下會產生 n! 個排列葉節點
 * - 每次形成完整排列時，需要複製一份長度 n 的 path 到結果中，成本為 O(n)
 * - 因此整體時間為 O(n * n!)
 * 空間複雜度：O(n)
 * - 遞迴深度最多 n 層，另外 used 與 path 也各為長度 n，所以工作空間為 O(n)
 * 解題思路：
 * - 先將 nums 排序，讓相同元素相鄰，方便在同一層遞迴做去重判斷
 * - 使用回溯逐步建立排列：
 *   1. path：目前正在組合的排列
 *   2. used[i]：索引 i 的元素是否已被放入 path
 * - 每層嘗試每個尚未使用的元素 nums[i]，但加入前先做剪枝：
 *   若 i > 0、nums[i] === nums[i - 1]，且 used[i - 1] 為 false，則跳過
 *   這代表「同值的前一個元素在本層還沒被選」，若現在選 nums[i] 會產生重複排列
 * - 當 path 長度達到 nums.length，就得到一組不重複的完整排列，加入結果
 * - 回傳前透過 path.push / path.pop 與 used 標記切換完成標準回溯
 */

class Solution {
  permuteUnique(nums: number[]): number[][] {
    nums.sort((a, b) => a - b); // 先排序 方便後續去重
    const result: number[][] = [];
    const used: boolean[] = Array.from({ length: nums.length }, () => false);
    const path: number[] = [];

    const backtrack = () => {
      // 當前路徑長度等於輸入數組長度時，表示找到一個完整的排列組合
      if (path.length === nums.length) {
        result.push([...path]);
        return;
      }

      for (let i = 0; i < nums.length; i++) {
        if (used[i]) continue;

        // 如果當前數字與前一個數字相同 且前一個數字還未被使用過，則跳過這個數字，避免重複排列
        if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

        path.push(nums[i]);
        used[i] = true;

        backtrack();

        // 回溯 撤銷選擇
        path.pop();
        used[i] = false;
      }
    };

    backtrack();
    return result;
  }
}

interface TestCase {
  nums: number[];
  answer: number[][];
}

const testCases: TestCase[] = [
  {
    nums: [1, 1, 2],
    answer: [
      [1, 1, 2],
      [1, 2, 1],
      [2, 1, 1],
    ],
  },
  {
    nums: [1, 2, 3],
    answer: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ],
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const solution = new Solution();
  const result = solution.permuteUnique(nums);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
