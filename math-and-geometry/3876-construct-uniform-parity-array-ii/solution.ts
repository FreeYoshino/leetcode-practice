/**
 * 題號：3876
 * 題目：Construct Uniform Parity Array II
 * 連結：https://leetcode.com/problems/construct-uniform-parity-array-ii/description/
 * 時間複雜度： O(n)
 * 空間複雜度： O(1)
 * 解題思路：
 * 1. 對於每個 nums1[i]，可以保留原值，或將其減去陣列中的最小值。
 * 2. 若最小值為奇數，將偶數減去最小值後會變成奇數，因此所有元素都能調整為奇數。
 * 3. 若最小值為偶數，減去最小值不會改變奇偶性；此時只有 nums1
 *    全部為偶數時，才能直接保留所有元素並形成全偶數陣列。
 * 4. 掃描陣列時同時記錄最小值與是否存在奇數，即可判斷是否能建立符合條件的陣列。
 */

// --- LeetCode 提供的程式碼模板 ---
function uniformArray(nums1: number[]): boolean {
  let minNum = Infinity;
  let hasOdd = false;

  // all odd: minNum 必須為 odd
  // all even: nums1 中的所有元素都必須為 even

  for (const num of nums1) {
    minNum = Math.min(minNum, num);
    if (num % 2 !== 0) {
      hasOdd = true;
    }
  }

  if (minNum % 2 === 1) return true;
  return !hasOdd;
}

// --- 測試案例 ---
interface TestCase {
  nums1: number[];
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    nums1: [1, 4, 7],
    answer: true,
  },
  {
    nums1: [2, 3],
    answer: false,
  },
  {
    nums1: [4, 6],
    answer: true,
  },
];

testCases.forEach(({ nums1, answer }, index) => {
  const result = uniformArray(nums1);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums1 = ${JSON.stringify(nums1)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
