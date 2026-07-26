/**
 * 題號： 309
 * 題目： Best Time to Buy and Sell Stock with Cooldown
 * 連結： https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/
 * 時間複雜度：O(n)
 * - n 為 prices 陣列長度
 * - 只需要線性遍歷一次 prices，並在每一天做常數次狀態轉移
 * - 因此總時間為 O(n)
 * 空間複雜度：O(n)
 * - 使用 hold、sold、rest 三個長度為 n 的陣列來記錄每天的狀態
 * - 額外空間與天數成正比，因此為 O(n)
 * 解題思路：
 * - 這題的關鍵在於把每一天的狀態拆成三種：持有股票、今天賣出、今天休息
 * - hold[i] 代表第 i 天結束後，手上持有股票時的最大利潤
 * - sold[i] 代表第 i 天結束後，今天剛賣出股票時的最大利潤
 * - rest[i] 代表第 i 天結束後，手上沒有股票且沒有賣出時的最大利潤
 * - 狀態轉移如下：
 * - hold[i] = max(hold[i - 1], rest[i - 1] - prices[i])，表示可以延續持有，或從休息狀態買入
 * - sold[i] = hold[i - 1] + prices[i]，表示今天把昨天持有的股票賣掉
 * - rest[i] = max(rest[i - 1], sold[i - 1])，表示今天維持休息，或由昨天賣出後進入冷卻結束的休息狀態
 * - 最後答案是 max(sold[n - 1], rest[n - 1])，因為結束時不能還在持有股票
 */

// --- LeetCode 提供的程式碼模板 ---
function maxProfit(prices: number[]): number {
  const n: number = prices.length;
  const hold: number[] = new Array(n).fill(0); // hold[i] 表示在第 i 天持有股票的最大利潤
  const sold: number[] = new Array(n).fill(0); // sold[i] 表示在第 i 天賣出股票的最大利潤
  const rest: number[] = new Array(n).fill(0); // rest[i] 表示在第 i 天休息的最大利潤

  for (let i = 0; i < n; i++) {
    if (i === 0) {
      hold[i] = -prices[i];
      sold[i] = 0;
      rest[i] = 0;
    } else {
      hold[i] = Math.max(hold[i - 1], rest[i - 1] - prices[i]);
      sold[i] = hold[i - 1] + prices[i];
      rest[i] = Math.max(rest[i - 1], sold[i - 1]);
    }
  }
  return Math.max(sold[n - 1], rest[n - 1]);
}

// --- 測試案例 ---
interface TestCase {
  prices: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    prices: [1, 2, 3, 0, 2],
    answer: 3,
  },
  {
    prices: [1],
    answer: 0,
  },
];

testCases.forEach(({ prices, answer }, index) => {
  const result = maxProfit(prices);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: prices = ${JSON.stringify(prices)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
