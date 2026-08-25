/**
 * 題號：3718
 * 題目：Smallest Missing Multiple of K
 * 連結：https://leetcode.com/problems/smallest-missing-multiple-of-k/description/
 * 時間複雜度：O(n)
 * - 將 nums 的所有元素加入 Set：O(n)。
 * - 依序檢查 k 的倍數。最多檢查 n + 1 個倍數，因此為 O(n)；Set 的查詢平均為 O(1)。
 *
 * 空間複雜度：O(n)
 * - 使用 Set 儲存 nums 中的元素，最多包含 n 個元素。
 *
 * 解題思路：
 * 1. 先將 nums 中的所有元素加入 Set，方便以平均 O(1) 的時間查詢某個數字是否存在。
 * 2. 從 k 開始，依序檢查 k、2k、3k 等正整數倍數。
 * 3. 第一個不在 Set 中的倍數，就是最小缺失倍數，直接回傳該數值。
 */

// --- LeetCode 提供的程式碼模板 ---
function missingMultiple(nums: number[], k: number): number {
  const numSet = new Set(nums);

  for (let multiple = k; ; multiple += k) {
    if (!numSet.has(multiple)) {
      return multiple;
    }
  }
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [8, 2, 3, 4, 6],
    k: 2,
    answer: 10,
  },
  {
    nums: [1, 4, 7, 10, 15],
    k: 5,
    answer: 5,
  },
];

testCases.forEach(({ nums, k, answer }, index) => {
  const result = missingMultiple(nums, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
