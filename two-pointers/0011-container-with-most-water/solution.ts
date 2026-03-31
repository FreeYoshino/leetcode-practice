/**
 * 題號： 11
 * 標題： Container With Most Water
 * 連結： https://leetcode.com/problems/container-with-most-water/description/
 * 時間複雜度： O(n)
 * - 左右兩指標 向內前進 最多會走訪整個陣列 因此時間複雜度為 O(n)
 * 空間複雜度： O(1)
 * - 只額外宣告了幾個變數 來記錄狀態 不需要額外依賴於輸入陣列長度的結構 因此空間複雜度為O(n)
 * 解題思路：在寬度固定的情況下 maxArea 的結果受限於較短的那根柱子
 * 1. 使用雙指標的方式來解題 將一開始的兩指標指向最左、最右 達成寬度最大的情形
 * 2. 判斷兩指標的柱子哪個較短 就向內移動該指標 (因為寬度已經是最大的情況 往內移動寬度會變小 所以此時需移動較短的柱子來找尋更大的面積)
 */

function maxArea(height: number[]): number {
  let result = 0;
  const n = height.length;
  let left = 0,
    right = n - 1;

  while (left !== right) {
    let area = (right - left) * Math.min(height[left], height[right]);
    result = Math.max(result, area);

    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return result;
}

// test case
interface TestCase {
  height: number[];
  answer: number;
}

const testCases: TestCase[] = [
  { height: [1, 8, 6, 2, 5, 4, 8, 3, 7], answer: 49 },
  { height: [1, 1], answer: 1 },
];

testCases.forEach((tc, index) => {
  const result = maxArea(tc.height);

  console.log(`Case ${index + 1}`);
  console.log(`Input: height = ${JSON.stringify(tc.height)}`);
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
