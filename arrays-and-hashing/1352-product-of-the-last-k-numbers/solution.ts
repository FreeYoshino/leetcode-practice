/**
 * 題號：1352
 * 題目：Product of the Last K Numbers
 * 連結：https://leetcode.com/problems/product-of-the-last-k-numbers/description/
 * 時間複雜度：O(1)，`add` 與 `getProduct` 都是常數時間
 * 空間複雜度：O(n)，需保存前綴乘積
 * 解題思路：保存自上一次零之後的連續乘積。遇到零時記錄零的位置；
 * 查詢時若零落在最近 k 個數字中直接回傳 0，否則使用前綴乘積相除。
 */

// --- LeetCode 提供的程式碼模板 ---
class ProductOfNumbers {
  private prefixProducts: number[];
  private lastZeroIndex: number;
  private streamLength: number;

  constructor() {
    this.prefixProducts = [1];
    this.lastZeroIndex = -1;
    this.streamLength = 0;
  }

  add(num: number): void {
    this.streamLength++;

    if (num === 0) {
      this.prefixProducts = [1];
      this.lastZeroIndex = this.streamLength - 1;
      return;
    }

    const previous = this.prefixProducts[this.prefixProducts.length - 1];
    this.prefixProducts.push(previous * num);
  }

  getProduct(k: number): number {
    const startIndex = this.streamLength - k;
    if (this.lastZeroIndex >= startIndex) {
      return 0;
    }

    const n = this.prefixProducts.length - 1;
    return this.prefixProducts[n] / this.prefixProducts[n - k];
  }
}

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * var obj = new ProductOfNumbers()
 * obj.add(num)
 * var param_2 = obj.getProduct(k)
 */

// --- 測試案例 ---
type Operation =
  | { method: 'ProductOfNumbers'; params: [] }
  | { method: 'add'; params: [number] }
  | { method: 'getProduct'; params: [number] };

interface TestCase {
  operations: Operation[];
  answer: Array<number | null>;
}

function runTestCase(testCase: TestCase): Array<number | null> {
  let productOfNumbers: ProductOfNumbers | null = null;
  const result: Array<number | null> = [];

  testCase.operations.forEach((operation) => {
    switch (operation.method) {
      case 'ProductOfNumbers':
        productOfNumbers = new ProductOfNumbers();
        result.push(null);
        break;
      case 'add':
        if (productOfNumbers === null) {
          throw new Error('add 前必須先呼叫 ProductOfNumbers');
        }
        productOfNumbers.add(operation.params[0]);
        result.push(null);
        break;
      case 'getProduct':
        if (productOfNumbers === null) {
          throw new Error('getProduct 前必須先呼叫 ProductOfNumbers');
        }
        result.push(productOfNumbers.getProduct(operation.params[0]));
        break;
    }
  });

  return result;
}

const testCases: TestCase[] = [
  {
    operations: [
      { method: 'ProductOfNumbers', params: [] },
      { method: 'add', params: [3] },
      { method: 'add', params: [0] },
      { method: 'add', params: [2] },
      { method: 'add', params: [5] },
      { method: 'add', params: [4] },
      { method: 'getProduct', params: [2] },
      { method: 'getProduct', params: [3] },
      { method: 'getProduct', params: [4] },
      { method: 'add', params: [8] },
      { method: 'getProduct', params: [2] },
    ],
    answer: [null, null, null, null, null, null, 20, 40, 0, null, 32],
  },
];

testCases.forEach((testCase, index) => {
  const result = runTestCase(testCase);
  const passed = JSON.stringify(result) === JSON.stringify(testCase.answer);

  console.log(`Case ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
  console.log(`Operations: ${JSON.stringify(testCase.operations)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(testCase.answer)}`);
  console.log('-----------------------------');
});
