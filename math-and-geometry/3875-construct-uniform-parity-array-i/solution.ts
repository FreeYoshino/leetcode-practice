/**
 * 題號：3875
 * 題目：Construct Uniform Parity Array I
 * 連結：https://leetcode.com/problems/construct-uniform-parity-array-i/description/
 * 時間複雜度： O(1)
 * 空間複雜度： O(1)
 * 解題思路：
 * 1. 根據奇偶相減的特性:
 *  - 奇數 - 奇數 = 偶數
 *  - 偶數 - 偶數 = 偶數
 *  - 奇數 - 偶數 = 奇數
 * 2. 由於建立nums2的方式可以保留nums[i]，或選取nums[j](j!=i)來建立nums2
 * 3. 因此在任何情況nums2都可以被建立成全奇數或全偶數的陣列
 */

// --- LeetCode 提供的程式碼模板 ---
function uniformArray(nums1: number[]): boolean {
  return true;
}

// --- 測試案例 ---
interface TestCase {
  nums1: number[];
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    nums1: [2, 3],
    answer: true,
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
