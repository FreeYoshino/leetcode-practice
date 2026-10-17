/**
 * 題號：3551
 * 題目：Minimum Swaps to Sort by Digit Sum
 * 連結：https://leetcode.com/problems/minimum-swaps-to-sort-by-digit-sum/description/
 * 時間複雜度：O(n log n)
 * - 計算每個數字的數位和需要 O(n)，在數字位數有上限時可視為 O(n)
 * - 將所有元素依數位和與數值排序需要 O(n log n)
 * - 透過 visited 陣列遍歷所有置換環需要 O(n)
 *
 * 空間複雜度：O(n)
 * - items 儲存每個元素的數位和、數值與原始索引
 * - visited 儲存每個位置是否已經被置換環遍歷
 *
 * 解題思路：
 * 1. 計算每個數字的數位和，並將數位和、數值與原始索引組成 items。
 * 2. 將 items 依數位和由小到大排序；若數位和相同，則依數值由小到大排序，
 *    得到題目要求的目標排列。
 * 3. 將每個元素的原始索引視為一個置換，使用 visited 遍歷其中的每個環。
 * 4. 長度為 cycleLength 的置換環至少需要 cycleLength - 1 次交換，
 *    將所有置換環的交換次數加總後即為最少交換次數。
 */

// --- LeetCode 提供的程式碼模板 ---
function minSwaps(nums: number[]): number {
  const getDigitSum = (num: number): number => {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }

    return sum;
  };

  const n = nums.length;

  const items: Array<[digitSum: number, value: number, originalIndex: number]> =
    nums.map((num, index) => [getDigitSum(num), num, index]);

  items.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });

  let swapCount = 0;
  let visited = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (items[i][2] == i) continue;

    let currentIndex = i;
    let cycleLength = 0;
    while (!visited[currentIndex]) {
      visited[currentIndex] = true;
      currentIndex = items[currentIndex][2];
      cycleLength++;
    }

    if (cycleLength > 0) {
      swapCount += cycleLength - 1;
    }
  }
  return swapCount;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [37, 100],
    answer: 1,
  },
  {
    nums: [22, 14, 33, 7],
    answer: 0,
  },
  {
    nums: [18, 43, 34, 16],
    answer: 2,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = minSwaps(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
