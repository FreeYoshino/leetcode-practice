/**
 * 題號：1190
 * 題目：Reverse Substrings Between Each Pair of Parentheses
 * 連結：https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/description/
 * 時間複雜度：O(n^2)
 * - 逐一掃描字串需要 O(n)
 * - 每遇到右括號就反轉對應子字串；在括號深度很深時，同一字元可能被反轉多次，最壞需要 O(n²)
 *
 * 空間複雜度：O(n)
 * - 使用 stack 儲存每個左括號對應的子字串起始索引
 * - 使用 result 儲存處理中的字元，最多需要 O(n) 空間
 *
 * 解題思路：
 * 1. 使用 stack 儲存每個左括號出現時，result 的目前長度，作為反轉區段的起始索引。
 * 2. 遇到一般字元時，直接加入 result。
 * 3. 遇到右括號時，取出對應的起始索引，將 result 中該區段就地反轉。
 * 4. 掃描完成後，result 內已完成所有巢狀括號的反轉，合併並回傳字串。
 */

// --- LeetCode 提供的程式碼模板 ---
function reverseParentheses(s: string): string {
  const n = s.length;
  const stack: number[] = [];
  const result: string[] = [];

  for (let i = 0; i < n; i++) {
    const char = s[i];
    if (char === '(') {
      // 將當前結果的長度推入堆疊中，作為需要反轉的子字串的起始索引
      stack.push(result.length);
    } else if (char === ')') {
      // 彈出堆疊中的起始索引，表示需要反轉的子字串的範圍
      const start = stack.pop()!;

      // 反轉子字串
      let left = start;
      let right = result.length - 1;
      while (left < right) {
        const temp = result[left];
        result[left] = result[right];
        result[right] = temp;
        left++;
        right--;
      }
    } else {
      // 將字元加入結果中
      result.push(char);
    }
  }

  return result.join('');
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  answer: string;
}

const testCases: TestCase[] = [
  {
    s: '(abcd)',
    answer: 'dcba',
  },
  {
    s: '(u(love)i)',
    answer: 'iloveu',
  },
  {
    s: '(ed(et(oc))el)',
    answer: 'leetcode',
  },
];

testCases.forEach(({ s, answer }, index) => {
  const result = reverseParentheses(s);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: s = ${JSON.stringify(s)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
