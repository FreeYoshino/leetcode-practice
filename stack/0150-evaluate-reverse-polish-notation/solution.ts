/**
 * 題號： 150
 * 標題： Evaluate Reverse Polish Notation
 * 連結： https://leetcode.com/problems/evaluate-reverse-polish-notation/description/
 * 時間複雜度： O(n)
 * - 只需將tokens陣列遍歷1次就能得到運算結果 時間複雜度為O(n)
 * 空間複雜度： O(n)
 * - stack 所需的空間會根據輸入的tokens陣列所包含的數字數量影響 所以空金複雜度為O(n)
 * 解題思路：
 * 1. 使用 Stack 的方式暫存數字
 * 2. 建立一個 operators 物件 映射運算的邏輯 (除法使用Math.trunc() 來達成題目向0截斷的要求)
 * 3. 遍歷 tokens:
 * - 遇到運算符 將stack 最上方的兩個數字 pop出來 (後進先出: 第一格彈出的為右運算元 b 其後為 a)
 * - 將兩數 使運對應的邏輯運算後將結果push 進stack中
 * - 遇到數字 則將數字push進stack中
 * 4. 遍歷結束將運算結果從stack中pop出來
 */ 

function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  const operators: Record<string, (a: number, b: number) => number> = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
  };

  for (let token of tokens) {
    if (token  in operators) {
      // 後進先出
      const b = stack.pop()!;
      const a = stack.pop()!;

      stack.push(operators[token](a, b));
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop()!;
}

// test case
interface TestCase {
  tokens: string[];
  answer: number;
}

const testCases: TestCase[] = [
  { tokens: ['2', '1', '+', '3', '*'], answer: 9 },
  { tokens: ['4', '13', '5', '/', '+'], answer: 6 },
  {
    tokens: [
      '10',
      '6',
      '9',
      '3',
      '+',
      '-11',
      '*',
      '/',
      '*',
      '17',
      '+',
      '5',
      '+',
    ],
    answer: 22,
  },
];

testCases.forEach((tc, index) => {
  const result = evalRPN(tc.tokens);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: tokens = ${JSON.stringify(tc.tokens)}`);
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
