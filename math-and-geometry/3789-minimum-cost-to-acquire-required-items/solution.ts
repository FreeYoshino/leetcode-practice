/**
 * 題號：3789
 * 題目：Minimum Cost to Acquire Required Items
 * 連結：https://leetcode.com/problems/minimum-cost-to-acquire-required-items/description/
 * 時間複雜度：O(1)
 * 空間複雜度：O(1)
 * 解題思路：
 * 1. 若購買一件 type 3 的成本不低於分別購買一件 type 1 與 type 2，
 *    就不需要購買 type 3，直接滿足兩種需求即可。
 * 2. 否則先購買 min(need1, need2) 件 type 3，同時滿足兩種需求中較小的部分。
 * 3. 對剩餘的單一需求，分別比較購買對應類型的物品與 type 3 的成本，
 *    選擇較便宜的方案；即使因此多取得另一種物品也不會增加需求成本。
 * 4. 所有操作都只處理固定數量的變數，因此時間與空間複雜度皆為 O(1)。
 */

// --- LeetCode 提供的程式碼模板 ---
function minimumCost(
  cost1: number,
  cost2: number,
  costBoth: number,
  need1: number,
  need2: number,
): number {
  if (costBoth >= cost1 + cost2) {
    return cost1 * need1 + cost2 * need2;
  }

  const bothCount = Math.min(need1, need2);
  let totalCost = bothCount * costBoth;

  need1 -= bothCount;
  need2 -= bothCount;

  if (need1 > 0) {
    const cost = Math.min(cost1, costBoth);
    totalCost += need1 * cost;
  }
  if (need2 > 0) {
    const cost = Math.min(cost2, costBoth);
    totalCost += need2 * cost;
  }
  return totalCost;
}

// --- 測試案例 ---
interface TestCase {
  cost1: number;
  cost2: number;
  costBoth: number;
  need1: number;
  need2: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    cost1: 3,
    cost2: 2,
    costBoth: 1,
    need1: 3,
    need2: 2,
    answer: 3,
  },
  {
    cost1: 5,
    cost2: 4,
    costBoth: 15,
    need1: 2,
    need2: 3,
    answer: 22,
  },

  {
    cost1: 5,
    cost2: 4,
    costBoth: 15,
    need1: 0,
    need2: 0,
    answer: 0,
  },
];

testCases.forEach(({ cost1, cost2, costBoth, need1, need2, answer }, index) => {
  const result = minimumCost(cost1, cost2, costBoth, need1, need2);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: cost1 = ${cost1}, cost2 = ${cost2}, costBoth = ${costBoth}, need1 = ${need1}, need2 = ${need2}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
