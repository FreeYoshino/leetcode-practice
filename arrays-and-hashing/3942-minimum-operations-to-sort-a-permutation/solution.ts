/**
 * 題號：3942
 * 題目：Minimum Operations to Sort a Permutation
 * 連結：https://leetcode.com/problems/minimum-operations-to-sort-a-permutation/description/
 * 時間複雜度：O(n)
 * - 使用 indexOf 找到數字 0 的位置需要 O(n)
 * - 從 0 的位置開始檢查循環順序需要 O(n)
 *
 * 空間複雜度：O(1)
 * - 只使用固定數量的變數，沒有隨輸入大小增加的額外資料結構
 *
 * 解題思路：
 * 1. 找到數字 0 的位置，因為後續操作都可以視為以 0 為基準進行循環位移。
 * 2. 從 0 的下一個位置開始，逐一檢查數字是否符合升序排列
 *    `1, 2, ..., n - 1`，或降序排列 `n - 1, n - 2, ..., 1`。
 * 3. 若某個位置同時不符合升序與降序的預期，代表無法透過允許的操作完成排序，
 *    直接回傳 -1。
 * 4. 若符合升序，所需操作次數是將 0 移至開頭，或先反轉後將0 移至末尾再反轉；
 *    若符合降序則以相反方向計算，取兩種方式中的較小值。
 */

// --- LeetCode 提供的程式碼模板 ---
function minOperations(nums: number[]): number {
  const n = nums.length;
  if (n === 1) return 0;

  const zeroIndex = nums.indexOf(0);
  let isAscending = true;
  let isDescending = true;

  // 以數字0 的位置為基準判斷是否為升序或降序排列
  for (let i = 1; i < n; i++) {
    const value = nums[(zeroIndex + i) % n];

    if (value !== i) isAscending = false;
    if (value !== n - i) isDescending = false;

    // 當兩者都不是時 代表無法透過旋轉、左移來使其排序
    if (!isAscending && !isDescending) return -1;
  }

  if (isAscending) {
    return Math.min(zeroIndex, n - zeroIndex + 2);
  }

  return Math.min(n - zeroIndex, zeroIndex + 2);
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [0, 2, 1],
    answer: 2,
  },
  {
    nums: [1, 0, 2],
    answer: 2,
  },
  {
    nums: [2, 0, 1, 3],
    answer: -1,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = minOperations(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
