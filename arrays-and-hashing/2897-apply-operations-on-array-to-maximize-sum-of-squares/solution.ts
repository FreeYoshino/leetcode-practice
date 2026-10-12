/**
 * 題號：2897
 * 題目：Apply Operations on Array to Maximize Sum of Squares
 * 連結：https://leetcode.com/problems/apply-operations-on-array-to-maximize-sum-of-squares/description/
 * 時間複雜度：O((n + k) * B)
 * - n 為 nums 的長度，B 為 nums 中最大數字的二進位位數
 * - 計算所有數字的位元出現次數需要 O(n * B)
 * - 建構 k 個數字時，每次最多檢查 B 個位元，需要 O(k * B)
 *
 * 空間複雜度：O(B)
 * - 使用 Map 儲存每個位元位置剩餘的出現次數
 *
 * 解題思路：
 * 1. 將所有 nums 的每個位元位置統計出現次數，記錄每個位元還可以被使用幾次。
 * 2. 平方和在數字越集中時越大，因此每次建構數字時，
 *    將所有仍有剩餘次數的位元都放入目前的數字中。
 * 3. 重複建構 k 個數字；每使用一個位元，就將該位元的剩餘次數減一。
 * 4. 將每個建構出的數字平方後累加，並在每次累加時對 MOD 取餘數。
 */

// --- LeetCode 提供的程式碼模板 ---
function maxSum(nums: number[], k: number): number {
  const countMap: Map<number, number> = new Map();
  for (const num of nums) {
    const bit = num.toString(2);
    for (let i = bit.length - 1; i >= 0; i--) {
      const digit = bit[i];
      if (digit === '1') {
        const bitPosition = bit.length - 1 - i;
        countMap.set(bitPosition, (countMap.get(bitPosition) || 0) + 1);
      }
    }
  }

  const MOD = 1000000007n;
  let result = 0n;

  // 用現有的位元 構建前k個最大的數字
  for (let i = 0; i < k; i++) {
    let currentNum = 0n;

    for (const [bitIndex, count] of countMap.entries()) {
      if (count > 0) {
        currentNum |= 1n << BigInt(bitIndex);
        countMap.set(bitIndex, count - 1);
      }
    }

    result = (result + currentNum * currentNum) % MOD;
  }

  return Number(result);
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [2, 6, 5, 8],
    k: 2,
    answer: 261,
  },
  {
    nums: [4, 5, 4, 7],
    k: 3,
    answer: 99,
  },
];

testCases.forEach(({ nums, k, answer }, index) => {
  const result = maxSum(nums, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
