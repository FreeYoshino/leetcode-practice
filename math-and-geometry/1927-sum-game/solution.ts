/**
 * 題號：1927
 * 題目：Sum Game
 * 連結：https://leetcode.com/problems/sum-game/description/
 * 時間複雜度：O(n)
 * - 令 n 為字串 num 的長度
 * - for 迴圈會走訪 num 的每個字元一次：O(n)
 * - 其餘判斷與計算皆為常數時間
 *
 * 空間複雜度：O(1)
 * - 只使用 leftSum、rightSum、leftCount、rightCount 等固定數量的變數
 * - 沒有依輸入大小成長的額外資料結構
 *
 * 解題思路：
 * 1. 走訪 num，分別計算左右兩半的已知數字總和，以及 '?' 的數量。
 * 2. 若 '?' 的總數為奇數，最後一個 '?' 的操作者可以選擇數字，
 *    因此 Alice 可以保證讓兩邊總和不同，直接回傳 true。
 * 3. 若 '?' 的總數為偶數，Bob 可以在每一對回合中配對處理 '?'。
 *    左右兩半的 '?' 數量差為 questionDiff 時，配對後能造成的最大
 *    可控差值為 (questionDiff / 2) * 9。
 * 4. 將已知數字差值 diff 與 '?' 可造成的差值相加：若結果不為 0，
 *    Alice 可以保證兩邊總和不同；只有結果為 0 時 Alice 無法獲勝。
 */

// --- LeetCode 提供的程式碼模板 ---
function sumGame(num: string): boolean {
  const n = num.length;

  let leftSum = 0;
  let rightSum = 0;
  let leftCount = 0; // 左半邊 '?' 的數量
  let rightCount = 0; // 右半邊 '?' 的數量
  for (let i = 0; i < n; i++) {
    if (i < n / 2) {
      if (num[i] === '?') {
        leftCount++;
      } else {
        leftSum += parseInt(num[i]);
      }
    } else {
      if (num[i] === '?') {
        rightCount++;
      } else {
        rightSum += parseInt(num[i]);
      }
    }
  }

  // 當 '?' 總數為奇數時，Alice 可以保證獲勝
  if ((leftCount + rightCount) % 2 === 1) {
    return true;
  }

  // 當 '?' 總數為偶數時
  // (S1 - S2) + (C1 - C2) / 2 * 9 != 0，則 Alice 可以保證獲勝
  const diff = leftSum - rightSum;
  const questionDiff = leftCount - rightCount;

  return diff + (questionDiff / 2) * 9 !== 0;
}

// --- 測試案例 ---
interface TestCase {
  num: string;
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    num: '5023',
    answer: false,
  },
  {
    num: '25??',
    answer: true,
  },
  {
    num: '?3295???',
    answer: false,
  },
];

testCases.forEach(({ num, answer }, index) => {
  const result = sumGame(num);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: num = ${JSON.stringify(num)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
