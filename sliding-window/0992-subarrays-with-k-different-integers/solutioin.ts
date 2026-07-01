/**
 * 題號： 992
 * 標題： Subarrays with K Different Integers
 * 連結： https://leetcode.com/problems/subarrays-with-k-different-integers/description/
 * 時間複雜度： O(n)
 * 空間複雜度： O(k)
 * 解題思路：
 *   使用滑動窗口 + Map 統計技巧：
 *   1. 恰好K個不同整數的子陣列數 = 最多K個不同整數的子陣列數 - 最多(K-1)個不同整數的子陣列數
 *   2. 對於「最多K個不同整數」的計算，使用雙指針滑動窗口
 *   3. 用 Map 記錄當前窗口中各元素的出現次數
 *   4. 當不同元素數量超過 k 時，收縮左邊界直到滿足條件
 *   5. 對每個右邊界位置，以該位置為結尾的子陣列數量為 (right - left + 1)
 */

function subarraysWithKDistinct(nums: number[], k: number): number {
  // 子陣列恰好K個不同整數的數量 = 子陣列最多K個不同整數的數量 - 子陣列最多(K-1)個不同整數的數量
  return atMostKDistinct(nums, k) - atMostKDistinct(nums, k - 1);
}

function atMostKDistinct(nums: number[], k: number): number {
  let result = 0;
  let left = 0;
  const map = new Map<number, number>(); // 用於記錄當前窗口中每個元素的出現次數
  for (let right = 0; right < nums.length; right++) {
    const num = nums[right];
    map.set(num, (map.get(num) || 0) + 1); // 更新當前元素的出現次數

    // 當窗口中不同元素的數量大於 k 時，收縮左邊界
    while (map.size > k) {
      const leftNum = nums[left];
      map.set(leftNum, map.get(leftNum)! - 1); // 減少左邊界元素的出現次數
      if (map.get(leftNum) === 0) {
        map.delete(leftNum); // 如果出現次數為 0，從地圖中刪除該元素
      }
      left++; // 移動左邊界
    }

    // 計算以當前右邊界為結尾的子陣列數量，這些子陣列的不同元素數量不超過 k
    result += right - left + 1;
  }
  return result;
}

interface TestCase {
  nums: number[];
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 1, 2, 3],
    k: 2,
    answer: 7,
  },
  {
    nums: [1, 2, 1, 3, 4],
    k: 3,
    answer: 3,
  },
];

testCases.forEach(({ nums, k, answer }, index) => {
  const result = subarraysWithKDistinct(nums, k);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
