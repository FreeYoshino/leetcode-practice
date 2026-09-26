/**
 * 題號：1807
 * 題目：Evaluate the Bracket Pairs of a String
 * 連結：https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string/description/
 * 時間複雜度：O(n + k)
 * - 建立 knowledgeMap 需要 O(k)，其中 k 為 knowledge 的長度
 * - 逐一掃描字串並查找每個 key 需要 O(n)
 *
 * 空間複雜度：O(n + k)
 * - 使用 knowledgeMap 儲存 k 組 key-value
 * - 使用 result 與 key 陣列儲存最多 O(n) 的字串內容
 *
 * 解題思路：
 * 1. 建立 knowledgeMap，將每個 key 對應到 value，方便後續查找。
 * 2. 逐一掃描字串；遇到一般字元便直接加入 result。
 * 3. 遇到左括號時，找出下一個右括號前的 key，並從 knowledgeMap
 *    取得對應的 value；若 key 不存在則加入 '?'。
 * 4. 跳過已處理的括號內容，最後將 result 陣列合併成字串並回傳。
 */

// --- LeetCode 提供的程式碼模板 ---
function evaluate(s: string, knowledge: string[][]): string {
  const n = s.length;

  const knowledgeMap = new Map<string, string>();
  for (const [key, value] of knowledge) {
    knowledgeMap.set(key, value);
  }

  const result: string[] = [];
  for (let i = 0; i < n; i++) {
    let char = s[i];

    if (s[i] === '(') {
      const key: string[] = [];
      for (let j = i + 1; j < n; j++) {
        if (s[j] === ')') {
          break;
        } else {
          key.push(s[j]);
        }
      }

      const value = knowledgeMap.get(key.join('')) || '?';
      char = value;
      i += key.length + 1; // 跳過括號內的內容和右括號
    }

    result.push(char);
  }

  return result.join('');
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  knowledge: string[][];
  answer: string;
}

const testCases: TestCase[] = [
  {
    s: '(name)is(age)yearsold',
    knowledge: [
      ['name', 'bob'],
      ['age', 'two'],
    ],
    answer: 'bobistwoyearsold',
  },
  {
    s: 'hi(name)',
    knowledge: [['a', 'b']],
    answer: 'hi?',
  },
  {
    s: '(a)(a)(a)aaa',
    knowledge: [['a', 'yes']],
    answer: 'yesyesyesaaa',
  },
];

testCases.forEach(({ s, knowledge, answer }, index) => {
  const result = evaluate(s, knowledge);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: s = ${JSON.stringify(s)}, knowledge = ${JSON.stringify(knowledge)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
