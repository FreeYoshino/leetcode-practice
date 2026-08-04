/**
 * 題號：3731
 * 題目：Find Missing Elements
 * 連結：https://leetcode.com/problems/find-missing-elements/description/
 * 時間複雜度：O(n + R)
 * - n 為陣列長度，R = max(nums) - min(nums) + 1
 * - 一次走訪找最小值與最大值為 O(n)
 * - 建立 Set 為 O(n)
 * - 逐一檢查區間 [min, max] 是否缺值為 O(R)
 *
 * 空間複雜度：O(n + k)
 * - 使用 Set 儲存輸入元素需要 O(n)
 * - 輸出陣列 missingElements 需要 O(k)（k 為缺失元素數量）
 *
 * 解題思路：
 * 1. 先線性掃描一次陣列，找出最小值 min 與最大值 max，確定需要檢查的完整整數範圍。
 * 2. 將 nums 放進 Set，讓「某個數字是否存在」查詢可在 O(1) 平均時間完成。
 * 3. 從 min 迭代到 max，若目前數字不在 Set 中，代表該值缺失，加入答案陣列。
 * 4. 迭代結束後回傳答案。
 */

// --- LeetCode 提供的程式碼模板 ---
function findMissingElements(nums: number[]): number[] {
  let maxNums = 0;
  let minNums = Infinity;
  for (const num of nums) {
    maxNums = Math.max(maxNums, num);
    minNums = Math.min(minNums, num);
  }

  const numsSet = new Set(nums);
  const missingElements: number[] = [];
  for (let i = minNums; i <= maxNums; i++) {
    if (!numsSet.has(i)) {
      missingElements.push(i);
    }
  }

  return missingElements;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number[];
}

const testCases: TestCase[] = [
  {
    nums: [1, 4, 2, 5],
    answer: [3],
  },
  {
    nums: [7, 8, 6, 9],
    answer: [],
  },
  {
    nums: [5, 1],
    answer: [2, 3, 4],
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = findMissingElements(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
