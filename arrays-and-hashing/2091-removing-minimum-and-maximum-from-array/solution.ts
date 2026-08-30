/**
 * 題號：2091
 * 題目：Removing Minimum and Maximum From Array
 * 連結：https://leetcode.com/problems/removing-minimum-and-maximum-from-array/description/
 * 時間複雜度：O(n)
 * - 只需要掃描一次陣列，找出最小值與最大值各自的位置，整個過程為 O(n)。
 * - 之後只做幾個常數次計算。
 *
 * 空間複雜度：O(1)
 * - 只用到幾個指標變數，例如 minIndex、maxIndex、min、max，均為常數級空間。
 * - 沒有建立額外陣列或使用額外資料結構，因此空間複雜度為 O(1)。
 *
 * 解題思路：
 * 1. 先遍歷整個陣列，分別記錄最小值與最大值的索引位置。
 * 2. 由於最小值與最大值可能出現在陣列的左右兩側，刪除方式只有三種：
 *    - 從左邊全部刪除：需要刪除 maxIndex + 1 個元素。
 *    - 從右邊全部刪除：需要刪除 n - minIndex 個元素。
 *    - 從兩邊同時刪除：需要刪除 minIndex + 1 + n - maxIndex 個元素。
 * 3. 取三種情況的最小值即可得到最少刪除次數，因為只要同時涵蓋到最小值與最大值即可。
 */

// --- LeetCode 提供的程式碼模板 ---
function minimumDeletions(nums: number[]): number {
  const n = nums.length;
  if (n === 1) return 1;

  let minIndex = 0;
  let maxIndex = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] < nums[minIndex]) {
      minIndex = i;
    }
    if (nums[i] > nums[maxIndex]) {
      maxIndex = i;
    }
  }

  // 3種刪除方式:
  // - 全部從左邊刪除
  // - 全部從右邊刪除
  // - 兩邊各刪除一部分
  const min = Math.min(minIndex, maxIndex);
  const max = Math.max(minIndex, maxIndex);
  const result = Math.min(
    max + 1, // 從左邊刪除
    n - min, // 從右邊刪除
    min + 1 + n - max, // 兩邊各刪除一部分
  );
  return result;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [2, 10, 7, 5, 4, 1, 8, 6],
    answer: 5,
  },
  {
    nums: [0, -4, 19, 1, 8, -2, -3, 5],
    answer: 3,
  },
  {
    nums: [101],
    answer: 1,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = minimumDeletions(nums as any);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
