/**
 * 題號：3116
 * 題目：Kth Smallest Amount With Single Denomination Combination
 * 連結：https://leetcode.com/problems/kth-smallest-amount-with-single-denomination-combination/description/
 * 時間複雜度：O(2^n * (n + log U))
 * - 列舉所有非空子集合共有 2^n - 1 個，每個子集合最多掃描 n 個 bit：O(2^n * n)
 * - Binary Search 進行 O(log U) 輪，每輪用容斥統計所有組合：O(2^n)
 * - 合併可得 O(2^n * n + 2^n * log U) = O(2^n * (n + log U))
 * - 其中 U = k * min(coins) 為二分搜尋上界
 *
 * 空間複雜度：O(2^n)
 * - preCombinations 會儲存所有非空子集合對應的 {lcm, sign}，總數為 2^n - 1
 * - 其餘僅使用常數額外變數
 *
 * 解題思路：
 * 1. 把問題轉成「找最小的 x，使得 <= x 的可表示金額數量至少有 k 個」，可用 Binary Search。
 * 2. 對任一 x，需要快速算出有多少數是任一 coin 倍數。用容斥原理：
 *    - 單一 coin 的倍數數量相加
 *    - 兩兩交集（LCM 倍數）扣掉
 *    - 三個交集再加回...依子集合大小奇加偶減
 * 3. 先用 bitmask 預處理所有非空子集合，為每個子集合記錄：
 *    - 該子集合 coin 的 LCM
 *    - 容斥符號 sign（奇數個元素 +1，偶數個元素 -1）
 * 4. 二分每個 mid 時，累加 sum(sign * floor(mid / lcm)) 得到 <= mid 的可表示金額數量 count。
 * 5. 若 count < k，代表答案在右側；否則在左側（含 mid）。最後收斂的 left 即第 k 小金額。
 */

// --- LeetCode 提供的程式碼模板 ---
function findKthSmallest(coins: number[], k: number): number {
  const n = coins.length;

  // 預先計算所有可能的組合數量，使用位元遮罩 (bitmask) 來表示每個組合
  const maxMask = 1 << n; // 2^n 種組合
  const preCombinations: { lcm: number; sign: number }[] = [];
  for (let mask = 1; mask < maxMask; mask++) {
    let currentLcm = 1; // 計算當前組合的最小公倍數 (LCM)
    let bitCount = 0;

    for (let i = 0; i < n; i++) {
      // 檢查第 i 個硬幣是否在當前組合中
      if ((mask & (1 << i)) !== 0) {
        bitCount++;
        currentLcm = lcm(currentLcm, coins[i]);
      }
    }

    const sign = bitCount % 2 === 1 ? 1 : -1; // 奇數個硬幣為正，偶數個硬幣為負
    preCombinations.push({ lcm: currentLcm, sign });
  }

  // 答案的可能範圍: [1, k * min(coins)], k*min(coins)是最差情況
  let left = 1;
  let right = k * Math.min(...coins);

  // Binary search 去找第 k 小的金額
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // 計算能夠組成 mid 金額的組合數量
    let count = 0;
    for (const { lcm, sign } of preCombinations) {
      count += sign * Math.floor(mid / lcm);
    }

    if (count < k) {
      left = mid + 1; // 第 k 小的金額在右半邊
    } else {
      right = mid; // 第 k 小的金額在左半邊或就是 mid
    }
  }

  return left;
}

// 1. 計算最大公因數 (GCD) - 輾轉相除法
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// 2. 計算最小公倍數 (LCM)
function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

// --- 測試案例 ---
interface TestCase {
  coins: number[];
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    coins: [3, 6, 9],
    k: 3,
    answer: 9,
  },
  {
    coins: [5, 2],
    k: 7,
    answer: 12,
  },
];

testCases.forEach(({ coins, k, answer }, index) => {
  const result = findKthSmallest(coins, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: coins = ${JSON.stringify(coins)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
