/**
 * 題號：1385
 * 題目：Find the Distance Value Between Two Arrays
 * 連結：https://leetcode.com/problems/find-the-distance-value-between-two-arrays/description/
 * 時間複雜度：O(mn)
 * - 對 arr1 的每個元素（共 m 個），都要逐一比對 arr2 的每個元素
 *   （共 n 個），因此總共需要 O(mn)
 *
 * 空間複雜度：O(1)
 * - 只使用常數個變數來記錄結果與比對狀態，不隨輸入大小成長
 *
 * 解題思路：
 * 1. 題目要求找出 arr1 中「與 arr2 所有元素的距離都大於 d」的元素個數。
 * 2. 逐一走訪 arr1 的每個元素，並假設它一開始是符合條件的（isValid = true）。
 * 3. 針對該元素，再走訪 arr2 的每個元素計算絕對差，若存在任一差值的
 *    距離小於等於 d，就將 isValid 設為 false 並提前跳出內層迴圈。
 * 4. 內層走完後若 isValid 仍為 true，代表沒有元素落在距離 d 以內，
 *    將結果計數加一。
 * 5. 全部比對完畢後回傳結果計數。
 */

// --- LeetCode 提供的程式碼模板 ---
function findTheDistanceValue(
  arr1: number[],
  arr2: number[],
  d: number,
): number {
  let result = 0;
  for (const num1 of arr1) {
    let isValid = true;
    for (const num2 of arr2) {
      const distance = Math.abs(num1 - num2);
      if (distance <= d) {
        isValid = false;
        break;
      }
    }

    if (isValid) result++;
  }
  return result;
}

// --- 測試案例 ---
interface TestCase {
  arr1: number[];
  arr2: number[];
  d: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    arr1: [4, 5, 8],
    arr2: [10, 9, 1, 8],
    d: 2,
    answer: 2,
  },
  {
    arr1: [1, 4, 2, 3],
    arr2: [-4, -3, 6, 10, 20, 30],
    d: 3,
    answer: 2,
  },
  {
    arr1: [2, 1, 100, 3],
    arr2: [-5, -2, 10, -3, 7],
    d: 6,
    answer: 1,
  },
];

testCases.forEach(({ arr1, arr2, d, answer }, index) => {
  const result = findTheDistanceValue(arr1, arr2, d);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: arr1 = ${JSON.stringify(arr1)}, arr2 = ${JSON.stringify(arr2)}, d = ${JSON.stringify(d)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
