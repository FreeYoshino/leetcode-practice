/**
 * 題號：2913
 * 題目：Subarrays Distinct Element Sum of Squares I
 * 連結：https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-i/description/
 * 時間複雜度：O(n^2)
 * - 以每個索引作為子陣列的起點，逐一檢查後續元素需要 O(n^2)
 *
 * 空間複雜度：O(n)
 * - 使用 Set 儲存目前子陣列中的不同元素，最多包含 n 個元素
 *
 * 解題思路：
 * 1. 依序將每個索引 i 作為子陣列的起點。
 * 2. 從 i 開始向右擴展子陣列，使用 Set 記錄已出現的元素。
 * 3. 每遇到尚未出現的元素，就將不同元素數量加一。
 * 4. 將目前不同元素數量的平方加入結果，最後回傳累加總和。
 */

// --- LeetCode 提供的程式碼模板 ---
function sumCounts(nums: number[]): number {
  const n = nums.length;
  let result = 0;

  for (let i = 0; i < n; i++) {
    const distinctElements = new Set<number>();
    let distinctCount = 0;
    for (let j = i; j < n; j++) {
      if (!distinctElements.has(nums[j])) {
        distinctElements.add(nums[j]);
        distinctCount++;
      }

      result += distinctCount * distinctCount;
    }
  }

  return result;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 1],
    answer: 15,
  },
  {
    nums: [1, 1],
    answer: 3,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = sumCounts(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
