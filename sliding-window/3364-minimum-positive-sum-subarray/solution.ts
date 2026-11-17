/**
 * 題號：3364
 * 題目：Minimum Positive Sum Subarray
 * 連結：https://leetcode.com/problems/minimum-positive-sum-subarray/description/
 * 時間複雜度：O(n * (r - l + 1))
 * - 依序枚舉 l 到 r 的每一種視窗長度，共有 r - l + 1 種
 * - 對每種視窗長度，先建立初始視窗，再以滑動視窗掃描陣列，耗時 O(n)
 * - 因此整體時間複雜度為 O(n * (r - l + 1))
 *
 * 空間複雜度：O(1)
 * - 只需要使用左右指針、目前視窗總和與最小總和等固定數量的變數
 * - 不需要額外配置與輸入陣列大小相關的空間，因此為 O(1)
 *
 * 解題思路：
 * 1. 依序枚舉 l 到 r 的每一種固定視窗長度。
 * 2. 計算該長度的第一個視窗總和，並檢查是否為正數。
 * 3. 將視窗向右滑動：加入右側新元素，並移除左側離開視窗的元素。
 * 4. 每次得到正數總和時，更新目前找到的最小正總和。
 * 5. 所有合法視窗長度掃描完成後，若沒有符合條件的子陣列則回傳 -1，
 *    否則回傳最小正總和。
 */

// --- LeetCode 提供的程式碼模板 ---
function minimumSumSubarray(nums: number[], l: number, r: number): number {
  const n = nums.length;

  let minSum = Infinity;

  for (let windowSize = l; windowSize <= r; windowSize++) {
    let currentSum = 0;

    for (let i = 0; i < windowSize; i++) {
      currentSum += nums[i];
    }

    if (currentSum > 0) {
      minSum = Math.min(minSum, currentSum);
    }

    for (let i = windowSize; i < n; i++) {
      currentSum += nums[i] - nums[i - windowSize];

      if (currentSum > 0) {
        minSum = Math.min(minSum, currentSum);
      }
    }
  }
  return minSum === Infinity ? -1 : minSum;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  l: number;
  r: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [3, -2, 1, 4],
    l: 2,
    r: 3,
    answer: 1,
  },
  {
    nums: [-2, 2, -3, 1],
    l: 2,
    r: 3,
    answer: -1,
  },
  {
    nums: [1, 2, 3, 4],
    l: 2,
    r: 4,
    answer: 3,
  },
];

testCases.forEach(({ nums, l, r, answer }, index) => {
  const result = minimumSumSubarray(nums, l, r);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, l = ${l}, r = ${r}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
