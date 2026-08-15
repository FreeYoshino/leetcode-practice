/**
 * 題號：3702
 * 題目：Longest Subsequence With Non-Zero Bitwise XOR
 * 連結：https://leetcode.com/problems/longest-subsequence-with-non-zero-bitwise-xor/description/
 * 時間複雜度：O(n)
 * - n 為陣列 nums 的長度
 * - 先用一次走訪判斷是否全為 0，再用一次走訪計算整體 XOR
 *
 * 空間複雜度：O(1)
 * - 僅使用常數個變數（n 與 xor）
 *
 * 解題思路：
 * 1. 先判斷 nums 是否全部為 0。若全為 0，任何非空子序列 XOR 仍為 0，因此答案為 0。
 * 2. 否則計算整個 nums 的 XOR 值。
 * 3. 若整體 XOR 不為 0，直接取整個陣列可得到最長長度 n；若整體 XOR 為 0，刪除任一個非零元素後，剩餘 XOR 會變為該元素本身（非 0），因此最長為 n - 1。
 */

// --- LeetCode 提供的程式碼模板 ---
function longestSubsequence(nums: number[]): number {
  // 檢查 nums 是否全部為零
  if (nums.every((num) => num === 0)) {
    return 0;
  }

  const n = nums.length;

  let xor = 0;
  for (const num of nums) {
    xor ^= num;
  }

  // 當 xor 不為零時，整個序列的 XOR 為非零，因此返回 n
  // 當 xor 為零時，整個序列的 XOR 為零，此時可以刪除任意一個元素，使得剩下的序列的 XOR 為非零，因此返回 n - 1
  return xor !== 0 ? n : n - 1;
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
    nums: [2, 3, 4],
    answer: 3,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = longestSubsequence(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
