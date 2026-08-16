/**
 * 題號：2029
 * 題目：Stone Game IX
 * 連結：https://leetcode.com/problems/stone-game-ix/description/
 * 時間複雜度：O(n)
 * - n 為石頭數量
 * - 只需一次走訪 stones，統計每顆石頭除以 3 的餘數類別（0、1、2）
 * - 後續勝負判斷僅為常數次比較，因此總時間複雜度為 O(n)
 *
 * 空間複雜度：O(1)
 * - 只使用 count0、count1、count2 三個計數器
 *
 * 解題思路：
 * 1. 先把所有石頭依照 stone % 3 分成三類：
 *    - count0：餘數為 0
 *    - count1：餘數為 1
 *    - count2：餘數為 2
 * 2. 關鍵在於總和是否可被 3 整除；遊戲狀態只和這三類數量有關，不需要關心原始數值。
 * 3. 當 count0 為偶數時，0 類石頭不會改變先後手優勢，Alice 要贏必須同時有 count1 與 count2，才能避免被單一路線鎖死。
 * 4. 當 count0 為奇數時，先後手節奏會翻轉，Alice 需要讓 count1 與 count2 的差距夠大（abs(count1 - count2) > 2）才有機會強迫 Bob 先踩到失敗條件。
 */

// --- LeetCode 提供的程式碼模板 ---
function stoneGameIX(stones: number[]): boolean {
  let count0 = 0;
  let count1 = 0;
  let count2 = 0;
  for (const stone of stones) {
    const remainder = stone % 3;
    if (remainder === 0) {
      count0++;
    } else if (remainder === 1) {
      count1++;
    } else {
      count2++;
    }
  }

  // 當 count0 為偶數時 Alice 可以去強迫 Bob 去拿 count1 或 count2，這樣 Alice 可以保證自己不會輸
  // 當 count0 為奇數時，Alice 需要確保自己不會輸，這意味著她需要有足夠的 count1 或 count2 來避免被迫拿到最後一個石頭(abs(count1 - count2) > 2)
  if (count0 % 2 === 0) {
    // 當 count1 或 count2 為 0 時，Alice 無法避免被迫拿到最後一個石頭，因此她會輸
    if (count1 === 0 || count2 === 0) {
      return false;
    }

    return true;
  } else {
    if (Math.abs(count1 - count2) > 2) {
      return true;
    }

    return false;
  }
}

// --- 測試案例 ---
interface TestCase {
  stones: number[];
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    stones: [2, 1],
    answer: true,
  },
  {
    stones: [2],
    answer: false,
  },
  {
    stones: [5, 1, 2, 4, 3],
    answer: false,
  },
];

testCases.forEach(({ stones, answer }, index) => {
  const result = stoneGameIX(stones);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: stones = ${JSON.stringify(stones)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
