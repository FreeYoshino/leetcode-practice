/**
 * 題號：3411
 * 題目：Maximum Subarray With Equal Products
 * 連結：https://leetcode.com/problems/maximum-subarray-with-equal-products/description/
 * 時間複雜度：O(n^2)
 * - 固定子陣列左端點後，逐一向右加入元素，只需更新乘積、GCD 與 LCM
 * - 陣列長度為 n，共需檢查不超過 n(n + 1) / 2 個子陣列
 * - 題目限制元素不超過 10，因此 GCD 與 LCM 的常數次數運算可視為 O(1)
 *
 * 空間複雜度：O(1)
 * - 只額外儲存目前子陣列的乘積、GCD、LCM 與最大長度
 *
 * 解題思路：
 * 1. 逐一選定子陣列的左端點 i，並維護從 i 開始、以 j 結尾的子陣列統計值。
 * 2. 每加入一個元素 nums[j]，就同步更新目前子陣列的乘積、GCD 與 LCM。
 * 3. 若目前的 product === g * l，代表這個子陣列符合 product equivalent 定義，更新最長子陣列長度。
 * 4. 最後回傳所有符合條件的子陣列中最大的長度；由於會枚舉所有可能的左右端點組合，因此不會漏解。
 */

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a;
}

function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

// --- LeetCode 提供的程式碼模板 ---
function maxLength(nums: number[]): number {
  const n = nums.length;
  let maxLen = 0;

  for (let i = 0; i < n; i++) {
    let product = 1;
    let g = 0;
    let l = 1;

    for (let j = i; j < n; j++) {
      product *= nums[j];
      g = gcd(g, nums[j]);
      l = lcm(l, nums[j]);

      if (product === g * l) {
        maxLen = Math.max(maxLen, j - i + 1);
      }
    }
  }

  return maxLen;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 1, 2, 1, 1, 1],
    answer: 5,
  },
  {
    nums: [2, 3, 4, 5, 6],
    answer: 3,
  },
  {
    nums: [1, 2, 3, 1, 4, 5, 1],
    answer: 5,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = maxLength(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
