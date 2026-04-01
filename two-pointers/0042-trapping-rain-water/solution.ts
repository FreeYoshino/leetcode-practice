/**
 * 題號： 42
 * 標題： Trapping Rain Water
 * 連結： https://leetcode.com/problems/trapping-rain-water/description/
 * 時間複雜度： O(n)
 * - 左右指標向內遍歷整個陣列 因此時間複雜度為O(n)
 * 空間複雜度： O(1)
 * - 只有額外添加 左右指標等變數 沒有使用依賴於輸入陣列長度的結構 所以空間複雜度為O(n)
 * 解題思路： 每個index柱子上的存水量 取決於左右兩側最高的柱子
 * - 積水量 = Math.min(leftMax, rightMax)  - height[i]
 * - 若積水量得出負數 代表該柱子太高了 裝不到水 積水量應設為0
 * - 使用雙指標的做法 指向陣列兩端的位置 並分配初始leftMax 、 rightMax 的值為兩指標位置的柱子高度
 * 1. 比較 leftMax 、 rightMax
 * 2. 若leftMax <= rightMax 可以確定left指標位置的積水量 因為左側的短版已被確定
 * 3. 反之同理 可以確定right指標位置的積水量 因為右側短版已被確定
 */

function trap(height: number[]): number {
  const n = height.length;
  let result = 0;
  let left = 0,
    right = n - 1;
  let leftMax = height[left],
    rightMax = height[right];

  // 兩指標向內遍歷完所有位置
  while (left <= right) {
    if (leftMax <= rightMax) {
      // 若 leftMax <= rightMax時 可以確定在left 指標位置的積水量 因為不可能有更矮的左牆了
      if (height[left] < leftMax) {
        result += leftMax - height[left];
      } else {
        leftMax = height[left];
      }

      left++;
    } else {
      // 與上方同理 不可能有更矮的右牆了 所以可以直接確定right 位置的積水量
      if (height[right] < rightMax) {
        result += rightMax - height[right];
      } else {
        rightMax = height[right];
      }

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
  { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], answer: 6 },
  { height: [4, 2, 0, 3, 2, 5], answer: 9 },
  { height: [5, 5, 1, 7, 1, 1, 5, 2, 7, 6], answer: 23 },
];

testCases.forEach((tc, index) => {
  const result = trap(tc.height);

  console.log(`Case: ${index + 1}`);
  console.log(`Input: height = ${JSON.stringify(tc.height)}`);
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
