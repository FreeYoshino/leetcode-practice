/**
 * 題號： 84
 * 標題： Largest Rectangle in Histogram
 * 連結： https://leetcode.com/problems/largest-rectangle-in-histogram/description/
 * 時間複雜度： O(N)
 * - N 為高度陣列的長度 每個元素最多被推入和彈出stack一次
 * 空間複雜度： O(N)
 * - 最壞的情況下 stack中會包含所有的元素
 * 解題思路：
 * 1. 使用Monotonic Stack 的技巧來解題
 * 2. 核心概念是去找到每個矩形的左右邊界 從而計算出每個矩形可形成的最大面積
 * 3. 在高度陣列的兩端添加0 以確保所有矩形都能被處理
 * 4. 遍歷新的高度陣列
 * - 當前高度小於stack頂高度 代表找到了stack頂元素右邊界
 * - 彈出stack頂元素 作為矩形的高度
 * - 新的stack頂元素作為左邊界 (因為它一定比當前高度小)
 * - 計算矩形面積 並更新最大面積
 * 5. 最後返回最大面積
 */

function largestRectangleArea(heights: number[]): number {
  const newHeights = [0, ...heights, 0]; // 在高度陣列的兩端添加0 以確保所有矩形都能被處理
  const stack: number[] = [];
  let maxArea = 0;
  for (let i = 0; i < newHeights.length; i++) {
    const currentHeight = newHeights[i];

    // 當前高度小於stack頂高度 表示找到stack頂的右邊界
    while (
      stack.length > 0 &&
      newHeights[stack[stack.length - 1]] > currentHeight
    ) {
      const height = newHeights[stack.pop()!]; // 彈出stack頂元素 作為矩形的高度
      const leftBoundary = stack[stack.length - 1]; // 新的stack頂元素作為左邊界 (因為它一定比當前高度小)
      const width = i - leftBoundary - 1;
      const area = height * width;
      maxArea = Math.max(maxArea, area);
    }

    stack.push(i); // 將當前index推入stack中
  }
  return maxArea;
}

// test case
interface TestCase {
  heights: number[];
  answer: number;
}

const testCases: TestCase[] = [
  { heights: [2, 1, 5, 6, 2, 3], answer: 10 },
  { heights: [2, 4], answer: 4 },
];

testCases.forEach(({ heights, answer }, index) => {
  const result = largestRectangleArea(heights);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: heights = ${JSON.stringify(heights)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log('------------------------------');
});
