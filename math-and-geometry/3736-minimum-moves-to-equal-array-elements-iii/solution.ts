/**
 * 題號：3736
 * 題目：Minimum Moves to Equal Array Elements III
 * 連結：https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii/description/
 * 時間複雜度：O(n)
 * 空間複雜度：O(1)
 * 解題思路：
 * 1. 每次移動只能將某個元素「加一」，因此陣列中的元素只會變大、不會變小。
 * 2. 若要把所有元素變成同一個值，目標值不可能超過原本的最大值，否則其他元素
 *    永遠追不上；而取最大值作為目標值時，每個元素需要的加一次數正好最少。
 * 3. 先找出 nums 中的最大值 max。
 * 4. 逐一走訪每個元素，將 max - num 加總，即為該元素需要被加一的次數，
 *    全部加總後就是最小移動次數。
 * 5. 只需走訪陣列一次找最大值、再一次加總差值，額外使用的空間為常數。
 */

// --- LeetCode 提供的程式碼模板 ---
function minMoves(nums: number[]): number {
  const max = Math.max(...nums);

  let moves = 0;
  for (const num of nums) {
    moves += max - num;
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
    nums: [2, 1, 3],
    answer: 3,
  },
  {
    nums: [4, 4, 5],
    answer: 2,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = minMoves(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
