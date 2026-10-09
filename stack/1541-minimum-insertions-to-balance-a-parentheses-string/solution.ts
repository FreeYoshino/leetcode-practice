/**
 * 題號：1541
 * 題目：Minimum Insertions to Balance a Parentheses String
 * 連結：https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string/description/
 * 時間複雜度：O(n)
 * - 逐一掃描字串中的每個字元一次，需要 O(n)
 * - 每個字元只進行固定次數的計算，整體複雜度維持為 O(n)
 *
 * 空間複雜度：O(1)
 * - 只使用 result 與 neededClosing 等固定數量的變數
 * - 不會隨輸入字串長度增加額外的資料結構
 *
 * 解題思路：
 * 1. 使用 neededClosing 記錄目前還需要幾個右括號，才能平衡已讀取的左括號。
 * 2. 遇到左括號時，若目前需要的右括號數量為奇數，先補上一個右括號平衡前一個左括號，再為當前左括號增加兩個需求。
 * 3. 遇到右括號時，先將 neededClosing 減一；若結果小於零，表示右括號過多，插入一個左括號並將需求修正為一個右括號。
 * 4. 掃描完成後，將尚未補足的右括號數量加入結果，回傳最少插入次數。
 */

// --- LeetCode 提供的程式碼模板 ---
function minInsertions(s: string): number {
  let result = 0;
  let neededClosing = 0;
  for (const char of s) {
    if (char === '(') {
      if (neededClosing % 2 === 1) {
        // 差一個右括號來平衡前一個左括號
        result++;
        neededClosing--;
      }

      // 當前左括號需要兩個右括號來平衡
      neededClosing += 2;
    } else if (char === ')') {
      neededClosing--;

      if (neededClosing < 0) {
        // 右括號多了，插入一個左括號
        result++;
        neededClosing = 1;
      }
    }
  }

  return result + neededClosing;
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: number;
}

const testCases: TestCase[] = [
  {
    s: '(()))',
    answer: 1,
  },
  {
    s: '())',
    answer: 0,
  },
  {
    s: '))())(',
    answer: 3,
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = minInsertions(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
