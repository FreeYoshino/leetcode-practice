/**
 * 題號：2089
 * 題目：Find Target Indices After Sorting Array
 * 連結：https://leetcode.com/problems/find-target-indices-after-sorting-array/description/
 * 時間複雜度：O(n)
 * - 第一次遍歷 nums 統計小於 target 與等於 target 的元素數量需要 O(n)
 * - 建立結果陣列最多需要加入 n 個索引，因此需要 O(n)
 *
 * 空間複雜度：O(1)
 * - 僅使用固定數量的變數，額外空間為 O(1)
 *
 * 解題思路：
 * 1. 遍歷 nums，統計小於 target 的元素數量 countSmaller，以及等於 target 的元素數量 countTarget。
 * 2. 排序後，所有等於 target 的元素會連續出現在索引 countSmaller 開始的位置。
 * 3. 依序將 countSmaller 到 countSmaller + countTarget - 1 的索引加入結果陣列。
 * 4. 回傳結果陣列，藉此避免實際排序 nums。
 */

// --- LeetCode 提供的程式碼模板 ---
function targetIndices(nums: number[], target: number): number[] {
  let countTarget = 0;
  let countSmaller = 0;
  for (const num of nums) {
    if (num === target) countTarget++;
    else if (num < target) countSmaller++;
  }

  let indices: number[] = [];
  for (let i = 0; i < countTarget; i++) {
    indices.push(countSmaller + i);
  }

  return indices;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  target: number;
  answer: number[];
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 5, 2, 3],
    target: 2,
    answer: [1, 2],
  },
  {
    nums: [1, 2, 5, 2, 3],
    target: 3,
    answer: [3],
  },
  {
    nums: [1, 2, 5, 2, 3],
    target: 5,
    answer: [4],
  },
];

testCases.forEach(({ nums, target, answer }, index) => {
  const result = targetIndices(nums, target);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, target = ${target}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
