/**
 * 題號：2996
 * 題目：Smallest Missing Integer Greater Than Sequential Prefix Sum
 * 連結：https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum/description/
 * 時間複雜度：O(n)
 * - 先將 nums 放入 Set 需要 O(n)
 * - 再掃描一次陣列找出最長連續遞增的前綴，最壞情況下也是 O(n)
 * - 最後從 prefixSum 開始往上找缺失值，因為每次都會往前跳一個數字，所以總共仍是 O(n)
 *
 * 空間複雜度：O(n)
 * - 使用 Set 儲存 nums 中所有數字，最壞情況下需要 O(n) 空間
 *
 * 解題思路：
 * 1. 先找出陣列開頭最長的連續遞增前綴，並把這段前綴的總和記為 prefixSum。
 * 2. 題目要找的是「大於等於這個前綴和」的最小缺失整數，因此先從 prefixSum 開始當作候選答案。
 * 3. 接著用 Set 檢查候選值是否已經出現在 nums 中；如果出現就持續加一，直到找到沒有出現的整數。
 * 4. 由於前綴掃描與 Set 查找都很直接，所以可以在 O(n) 時間內完成。
 */

// --- LeetCode 提供的程式碼模板 ---
function missingInteger(nums: number[]): number {
  const n = nums.length;

  const hashSet = new Set<number>(nums);

  let prefixSum = 0;
  prefixSum += nums[0];

  for (let i = 1; i < n; i++) {
    if (nums[i] === nums[i - 1] + 1) {
      prefixSum += nums[i];
    } else {
      break;
    }
  }

  // 找出最小的缺失整數
  let missingInteger = prefixSum;
  while (hashSet.has(missingInteger)) {
    missingInteger++;
  }

  return missingInteger;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 3, 2, 5],
    answer: 6,
  },
  {
    nums: [3, 4, 5, 1, 12, 14, 13],
    answer: 15,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  // TODO: 更改呼叫的函式名稱與上方模板一致
  const result = missingInteger(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
