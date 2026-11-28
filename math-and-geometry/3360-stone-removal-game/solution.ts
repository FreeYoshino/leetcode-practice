/**
 * 題號：3360
 * 題目：Stone Removal Game
 * 連結：https://leetcode.com/problems/stone-removal-game/description/
 * 時間複雜度： O(1)，每次成功移除後需求數量遞減，最多執行 10 次。
 * 空間複雜度： O(1)，只使用固定數量的變數。
 * 解題思路：
 * 1. Alice 從移除 10 顆石頭開始，雙方每回合需比前一回合少移除 1 顆。
 * 2. 若剩餘石頭足夠，就扣除該回合所需數量，並切換目前玩家。
 * 3. 當石頭不足以完成當前回合時，遊戲結束；
 */

// --- LeetCode 提供的程式碼模板 ---
function canAliceWin(n: number): boolean {
  let need = 10;
  let result = false;

  while (n >= need) {
    n -= need;
    need--;
    result = !result;
  }
  return result;
}

// --- 測試案例 ---
interface TestCase {
  n: number;
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    n: 12,
    answer: true,
  },
  {
    n: 1,
    answer: false,
  },
];

testCases.forEach(({ n, answer }, index) => {
  const result = canAliceWin(n);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: n = ${n}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
