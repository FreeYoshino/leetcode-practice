/**
 * 題號： 416
 * 題目： Partition Equal Subset Sum
 * 連結： https://leetcode.com/problems/partition-equal-subset-sum/description/
 * 時間複雜度：O(n * target)
 * - n 為陣列長度，target 為 totalSum / 2
 * - 外層迴圈遍歷每個數字，需要 O(n)
 * - 內層迴圈更新 dp 陣列，需要 O(target)
 * - 每次轉移只做常數次邏輯運算，因此總時間為 O(n * target)
 * 空間複雜度：O(target)
 * - 使用一個大小為 target + 1 的一維 dp 陣列來記錄是否能湊出各個總和
 * - 因此額外空間與 target 成正比，為 O(totalSum / 2)
 * 解題思路：
 * - 首先計算陣列總和，若為奇數則無法分割，直接返回 false
 * - 問題轉化為 0/1 背包問題：能否從陣列中選出部分數字，使其總和等於 totalSum / 2
 * - dp[i] 代表是否有一組數字的總和等於 i，初始只有 dp[0] = true（什麼都不選）
 * - 對於每個數字 num，從 target 往下更新 dp 陣列，避免重複使用同一個數字
 * - 轉移公式為 dp[i] = dp[i] || dp[i - num]，表示要麼已能湊出 i，要麼能湊出 i - num 再加 num
 * - 最後 dp[target] 即為答案
 */

class Solution {
  canPartition(nums: number[]): boolean {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);
    if (totalSum % 2 !== 0) {
      return false;
    }

    // 透過dp 來找到是否有一組數字的總和等於 totalSum / 2
    // dp[i] 代表是否有一組數字的總和等於 i
    const target = totalSum / 2;
    const dp: boolean[] = new Array(target + 1).fill(false);
    dp[0] = true;

    /* 
      對於每個數字 num 都去更新 dp 陣列
      要湊出總和i 有兩種情況:
      - 已經可以湊出總和i (dp[i] = true)
      - 可以湊出總和i-num (dp[i-num] = true)，那麼加上num就可以湊出總和i
      因此更新公式為: dp[i] = dp[i] || dp[i - num]
    */
    for (const num of nums) {
      // 從 target 開始往下更新，避免重複使用同一個數字
      for (let i = target; i >= num; i--) {
        dp[i] = dp[i] || dp[i - num];
      }
    }

    return dp[target];
  }
}

interface TestCase {
  nums: number[];
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    nums: [1, 5, 11, 5],
    answer: true,
  },
  {
    nums: [1, 2, 3, 5],
    answer: false,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const solution = new Solution();
  const result = solution.canPartition(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log('-----------------------------');
});
