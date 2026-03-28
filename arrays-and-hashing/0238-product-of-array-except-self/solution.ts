/**
 * 題號： 238
 * 標題： Product of Array Except Self
 * 連結： https://leetcode.com/problems/product-of-array-except-self/description/
 * 時間複雜度: O(n)
 * - n 為 nums陣列的長度
 * - 總共遍歷了nums陣列3次 (左乘積, 右乘積, 組合結果) 3n 所以 時間複雜度為O(n)
 * 空間複雜度: O(n)
 * - n 為 nums陣列的長度
 * - 額外宣告了兩個長度為n的 leftProduct 和 rightProduct 陣列 所以 空間複雜度為O(n)
 * 解題思路:
 * 1. 某個位置 除自身外的乘積 = 該位置左邊數字的乘積 * 該位置右邊數字的乘積
 * 2. leftProduct 從左自右遍歷 nums 計算並存入每個索引 i 左側所有元素的乘積
 * 3. rightProduct 從右自左遍歷 nums 計算並存入每個索引 i 右側所有元素的乘積
 * 4. 遍歷nums 將對應位置的 左乘積 * 右乘積 即為該位置的結果 將其推入result
 */

function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const result: number[] = [];
  const leftProduct: number[] = Array.from({ length: n }, () => 1);
  const rightProduct: number[] = Array.from({ length: n }, () => 1);

  for (let i = 1; i < n; i++) {
    leftProduct[i] = leftProduct[i - 1] * nums[i - 1];
  }
  for (let i = n - 2; i >= 0; i--) {
    rightProduct[i] = rightProduct[i + 1] * nums[i + 1];
  }

  for (let i = 0; i < n; i++){
    result.push(leftProduct[i] * rightProduct[i]);
  }
  return result;
}

// test case
interface TestCase {
  nums: number[];
  answer: number[];
}

const testCases: TestCase[] = [
  { nums: [1, 2, 3, 4], answer: [24, 12, 8, 6] },
  { nums: [-1, 1, 0, -3, 3], answer: [0, 0, 9, 0, 0] },
];

testCases.forEach((tc, index) => {
  const result = productExceptSelf(tc.nums);

  console.log(`Case ${index + 1}`);
  console.log(`Input: nums = ${JSON.stringify(tc.nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Answer: ${JSON.stringify(tc.answer)}`);
});
