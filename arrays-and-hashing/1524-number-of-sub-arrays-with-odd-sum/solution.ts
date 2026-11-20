/**
 * 題號：1524
 * 題目：Number of Sub-arrays With Odd Sum
 * 連結：https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/description/
 * 時間複雜度：O(n)
 * - 每個元素只需計算一次前綴和的奇偶性，並更新對應計數，
 *   總共需要 O(n) 時間
 *
 * 空間複雜度：O(1)
 * - 只使用了奇數前綴和數量、偶數前綴和數量、當前前綴和與答案等常數個變數
 *
 * 解題思路：
 * 1. 設目前前綴和為 prefixSum，子陣列 (i, j] 的和等於 prefixSum[j] - prefixSum[i]。
 * 2. 若相差為奇數，代表兩個前綴和的奇偶性不同：
 *    - 當目前前綴和為奇數時，之前的偶數前綴和可以各形成一個和為奇數的子陣列
 *    - 當目前前綴和為偶數時，之前的奇數前綴和可以各形成一個和為奇數的子陣列
 * 3. 使用 evenCount 與 oddCount 分別記錄奇偶前綴和出現的次數，初始時 evenCount 為 1，代表空的前綴和為偶數。
 * 4. 每走過一個元素，就累加可形成的奇數和子陣列數量，並對 10^9 + 7 取餘數。
 */

// --- LeetCode 提供的程式碼模板 ---
function numOfSubarrays(arr: number[]): number {
  const MOD = 1e9 + 7;
  const n = arr.length;

  let oddCount = 0;
  let evenCount = 1;
  let prefixSum = 0;
  let result = 0;

  for (let i = 0; i < n; i++) {
    prefixSum += arr[i];

    if (prefixSum % 2 === 1) {
      result += evenCount;
      oddCount++;
    } else {
      result += oddCount;
      evenCount++;
    }

    result %= MOD;
  }

  return result;
}

// --- 測試案例 ---
interface TestCase {
  arr: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    arr: [1, 3, 5],
    answer: 4,
  },
  {
    arr: [2, 4, 6],
    answer: 0,
  },
  {
    arr: [1, 2, 3, 4, 5, 6, 7],
    answer: 16,
  },
];

testCases.forEach(({ arr, answer }, index) => {
  const result = numOfSubarrays(arr);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: arr = ${JSON.stringify(arr)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
