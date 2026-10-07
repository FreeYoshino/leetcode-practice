/**
 * 題號：301
 * 題目：Remove Invalid Parentheses
 * 連結：https://leetcode.com/problems/remove-invalid-parentheses/description/
 * 時間複雜度：O(2^n × n)
 * - 第一次掃描字串以計算最少需要刪除的左、右括號，耗時為 O(n)。
 * - backtrack 對每個字元嘗試刪除或保留，最壞情況會探索 O(2^n) 個分支。
 * - 每個符合條件的結果都需要透過 path.join 組合成長度最多為 n 的字串，
 *   並存入 Set 去除重複結果，因此總時間複雜度為 O(2^n × n)。
 *
 * 空間複雜度：O(2^n × n)
 * - resultSet 最壞情況可能保存 O(2^n) 個不同結果，每個結果長度最多為 n。
 * - path 與遞迴呼叫堆疊的深度最多為 n，額外使用 O(n) 空間。
 * - 若不計算儲存輸出結果所需的空間，回溯本身的額外空間為 O(n)。
 *
 * 解題思路：
 * 1. 先掃描字串，計算至少需要刪除多少個左括號與右括號，確保最後保留的
 *    括號數量能夠形成有效括號字串。
 * 2. 使用回溯逐一處理每個字元；對括號分別嘗試「刪除」與「保留」兩種選擇，
 *    一般字元則直接保留。
 * 3. 使用 openCount 記錄目前尚未配對的左括號數量；遇到右括號時，只有在
 *    openCount 大於零時才能保留，避免產生前綴無效的括號字串。
 * 4. 到達字串結尾時，只有在左右括號刪除數量都用完，且 openCount 為零時，
 *    才將目前路徑加入 resultSet。
 * 5. 透過 Set 去除不同回溯路徑產生的重複字串，最後將集合轉為陣列返回所有
 *    刪除最少括號後的有效結果。
 */

// --- LeetCode 提供的程式碼模板 ---
function removeInvalidParentheses(s: string): string[] {
  let remLeft = 0;
  let remRight = 0;
  for (const char of s) {
    if (char === '(') {
      remLeft++;
    } else if (char === ')') {
      if (remLeft > 0) {
        remLeft--;
      } else {
        remRight++;
      }
    }
  }

  const n = s.length;
  const resultSet = new Set<string>();

  const backtrack = (
    index: number,
    remL: number,
    remR: number,
    openCount: number,
    path: string[],
  ) => {
    if (index === n) {
      if (remL === 0 && remR === 0 && openCount === 0) {
        resultSet.add(path.join(''));
      }

      return;
    }

    const char = s[index];

    // 選擇刪除當前字符
    if (char === '(' && remL > 0) {
      backtrack(index + 1, remL - 1, remR, openCount, path);
    } else if (char === ')' && remR > 0) {
      backtrack(index + 1, remL, remR - 1, openCount, path);
    }

    // 選擇保留當前字符
    path.push(char);
    if (char === '(') {
      backtrack(index + 1, remL, remR, openCount + 1, path);
    } else if (char === ')' && openCount > 0) {
      if (openCount > 0) {
        backtrack(index + 1, remL, remR, openCount - 1, path);
      }
    } else {
      backtrack(index + 1, remL, remR, openCount, path);
    }

    // 回溯，移除最後一個字符
    path.pop();
  };

  backtrack(0, remLeft, remRight, 0, []);
  return [...resultSet];
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: string[];
}

const testCases: TestCase[] = [
  {
    s: '()())()',
    answer: ['(())()', '()()()'],
  },
  {
    s: '(a)())()',
    answer: ['(a())()', '(a)()()'],
  },
  {
    s: ')(',
    answer: [''],
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = removeInvalidParentheses(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
