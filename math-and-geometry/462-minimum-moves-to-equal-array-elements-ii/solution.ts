/**
 * 題號：462
 * 題目：Minimum Moves to Equal Array Elements II
 * 連結：https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/description/
 * 時間複雜度：O(n log n)
 * 空間複雜度：O(n)
 * 解題思路：
 * 1. 將 nums 複製並排序，取中位數作為所有元素要移動到的目標值。
 * 2. 對於絕對差總和而言，中位數能使總移動次數最小。
 * 3. 逐一計算每個元素與中位數的絕對差，並將差值加總。
 * 4. 排序需要 O(n log n) 時間；複製排序後的陣列需要 O(n) 額外空間。
 */

// --- LeetCode 提供的程式碼模板 ---
function minMoves2(nums: number[]): number {
  const sortedNums = [...nums].sort((a, b) => a - b);
  const median = sortedNums[Math.floor(sortedNums.length / 2)];

  let moves = 0;
  for (const num of nums) {
    moves += Math.abs(num - median);
  }
  return moves;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 3],
    answer: 2,
  },
  {
    nums: [1, 10, 2, 9],
    answer: 16,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = minMoves2(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: num = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
