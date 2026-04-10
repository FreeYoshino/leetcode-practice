/**
 * 題號： 875
 * 標題： Koko Eating Bananas
 * 連結： https://leetcode.com/problems/koko-eating-bananas/description/
 * 時間複雜度： O(N * log M)
 * - N為piles陣列的長度 M為piles陣列中的最大值
 * - binary search查找的範圍是 1到M 所以需要對半找log M次
 * - 每次對半找到 mid後 都需要呼叫canEat() 來遍歷piles陣列 花費O(N)
 * - 因此時間複雜度為 兩者相乘 O(N * log M)
 * 空間複雜度： O(1)
 * - 指使用了left、right、mid、hours等常數級別的變數 因此空間複雜度為O(1)
 * 解題思路：
 * 1. 答案的範圍: 最慢的速度為1(根/小時) 最快則為piles陣列中的最大值(根/小時) 答案k 落在[1, Math.max(...piles)]這個區間
 * 2. 若k=5 能吃完所有香蕉 那用>5的速度也一定能吃完 若不能吃完所有香蕉 那用<5的速度也一定不能吃完所有香蕉
 * 3. 透過上述的特性 能在答案區間內 透過binary search的方式來找到答案
 * 4. 實作binary search
 *    - 取得區間中間值mid 代表此次嘗試的速度k
 *    - 透過canEat function 來判斷該速度使否可以吃完香蕉
 *    - 如果canEat 回傳true 代表吃的完 mid可能是答案 所以將right = mid 繼續嘗試
 *    - 如果canEat 回傳false 代表吃不完 mid不會是答案 所以將left = mid+1 繼續嘗試
 * 5. 當left、right重合時 即為最小能吃完的速度
 */

function canEat(piles: number[], k: number, h: number) {
  let hours = 0;
  for (let pile of piles) {
    hours += Math.ceil(pile / k);
  }
  if (hours > h) {
    return false;
  } else {
    return true;
  }
}
function minEatingSpeed(piles: number[], h: number): number {
  // 答案區間: [1, Math.max(...piles)]
  let left = 1,
    right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canEat(piles, mid, h)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

// tese case
interface TestCase {
  piles: number[];
  h: number;
  answer: number;
}

const testCases: TestCase[] = [
  { piles: [3, 6, 7, 11], h: 8, answer: 4 },
  { piles: [30, 11, 23, 4, 20], h: 5, answer: 30 },
  { piles: [30, 11, 23, 4, 20], h: 6, answer: 23 },
];

testCases.forEach((tc, index) => {
  const result = minEatingSpeed(tc.piles, tc.h);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: piles = ${JSON.stringify(tc.piles)}, h = ${tc.h}`);
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
