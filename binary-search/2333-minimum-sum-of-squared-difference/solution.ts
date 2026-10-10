/**
 * 題號：2333
 * 題目：Minimum Sum of Squared Difference
 * 連結：https://leetcode.com/problems/minimum-sum-of-squared-difference/description/
 * 時間複雜度：O(n * log D)
 * - 建立差值陣列、計算差值總和，以及最後計算平方和各需 O(n)
 * - Binary Search 共有 O(log D) 輪，每輪需掃描 n 個差值計算操作成本：O(n * log D)
 * - 合併後為 O(n + n * log D) = O(n * log D)
 * - 其中 n 為陣列長度，D 為 nums1 與 nums2 的最大元素差值
 *
 * 空間複雜度：O(n)
 * - diff 會儲存 n 個元素的絕對差值
 * - 其餘僅使用常數額外變數
 *
 * 解題思路：
 * 1. 將兩個陣列在相同位置的元素差值取絕對值，轉換成「最多能將各差值降低多少」的問題。
 * 2. 若所有差值總和不超過可用操作次數 k，代表能將所有差值降為 0，答案直接為 0。
 * 3. 使用 Binary Search 找出最小的差值上限 limit，使得將所有大於 limit 的差值降至 limit
 *    所需的操作次數不超過 k。
 * 4. 將大於 limit 的差值全部降至 limit 後，若仍有剩餘操作次數，優先將差值等於 limit
 *    的元素再降低 1，讓最終平方和最小。
 * 5. 計算每個調整後差值的平方總和，得到最小平方差總和。
 */

// --- LeetCode 提供的程式碼模板 ---
function minSumSquareDiff(
  nums1: number[],
  nums2: number[],
  k1: number,
  k2: number,
): number {
  const n = nums1.length;

  const k = k1 + k2;
  const diff: number[] = new Array(n);

  let maxDiff = 0;
  for (let i = 0; i < n; i++) {
    diff[i] = Math.abs(nums1[i] - nums2[i]);
    maxDiff = Math.max(maxDiff, diff[i]);
  }

  // 如果所有元素差值的總和小於或等於 k，則不需要進行任何操作
  if (diff.reduce((acc, val) => acc + val, 0) <= k) {
    return 0;
  }

  let left = 0;
  let right = maxDiff;

  // Binary Search 查找所有元素差值的上限
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // 計算將所有元素差值限制在 mid 時所需的操作次數
    let cost = 0;
    for (let i = 0; i < n; i++) {
      cost += Math.max(0, diff[i] - mid);
    }

    if (cost <= k) {
      // 當前上限 mid 可以滿足操作次數限制，嘗試降低上限
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  const limit = left;

  // 將所有 >limt的元素 降至 limit
  let usedK = 0;
  for (let i = 0; i < n; i++) {
    if (diff[i] > limit) {
      usedK += diff[i] - limit;
    }
  }

  let remainingK = k - usedK;
  let result = 0;
  for (let i = 0; i < n; i++) {
    let diffValue = Math.min(diff[i], limit);

    // 將剩餘操作次數 優先分配給差值為limit的元素
    if (diffValue === limit && remainingK > 0) {
      diffValue--;
      remainingK--;
    }

    result += diffValue * diffValue;
  }

  return result;
}

// --- 測試案例 ---
interface TestCase {
  nums1: number[];
  nums2: number[];
  k1: number;
  k2: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums1: [1, 2, 3, 4],
    nums2: [2, 10, 20, 19],
    k1: 0,
    k2: 0,
    answer: 579,
  },
  {
    nums1: [1, 4, 10, 12],
    nums2: [5, 8, 6, 9],
    k1: 1,
    k2: 1,
    answer: 43,
  },
];

testCases.forEach(({ nums1, nums2, k1, k2, answer }, index) => {
  const result = minSumSquareDiff(nums1, nums2, k1, k2);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: nums1 = ${JSON.stringify(nums1)}, nums2 = ${JSON.stringify(nums2)}, k1 = ${k1}, k2 = ${k2}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
