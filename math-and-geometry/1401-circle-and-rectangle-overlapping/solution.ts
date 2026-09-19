/**
 * 題號：1401
 * 題目：Circle and Rectangle Overlapping
 * 連結：https://leetcode.com/problems/circle-and-rectangle-overlapping/description/
 * 時間複雜度： O(1)
 * 空間複雜度： O(1)
 * 解題思路：
 * 1. 將圓心的 x 座標限制在矩形的 [x1, x2] 範圍內，得到矩形上距離圓心最近點的 x 座標。
 * 2. 對 y 座標進行相同處理，得到最近點的完整座標。
 * 3. 計算圓心與最近點的平方距離；若小於或等於半徑平方，代表圓形與矩形重疊。
 * 4. 只使用固定數量的變數進行座標與距離計算，因此時間與空間複雜度皆為常數。
 */

// --- LeetCode 提供的程式碼模板 ---
function checkOverlap(
  radius: number,
  xCenter: number,
  yCenter: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): boolean {
  // 找到離圓心最近的矩形邊界點
  const closestX = Math.max(x1, Math.min(xCenter, x2));
  const closestY = Math.max(y1, Math.min(yCenter, y2));

  const dX = closestX - xCenter;
  const dY = closestY - yCenter;

  return dX * dX + dY * dY <= radius * radius;
}

// --- 測試案例 ---
interface TestCase {
  radius: number;
  xCenter: number;
  yCenter: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    radius: 1,
    xCenter: 0,
    yCenter: 0,
    x1: 1,
    y1: -1,
    x2: 3,
    y2: 1,
    answer: true,
  },
  {
    radius: 1,
    xCenter: 1,
    yCenter: 1,
    x1: 1,
    y1: -3,
    x2: 2,
    y2: -1,
    answer: false,
  },
  {
    radius: 1,
    xCenter: 0,
    yCenter: 0,
    x1: -1,
    y1: 0,
    x2: 0,
    y2: 1,
    answer: true,
  },
];

testCases.forEach(
  ({ radius, xCenter, yCenter, x1, y1, x2, y2, answer }, index) => {
    const result = checkOverlap(radius, xCenter, yCenter, x1, y1, x2, y2);
    console.log(`Case ${index + 1}:`);
    console.log(
      `Input: radius: ${radius}, xCenter: ${xCenter}, yCenter: ${yCenter}, x1: ${x1}, y1: ${y1}, x2: ${x2}, y2: ${y2}`,
    );
    console.log(`Output: ${JSON.stringify(result)}`);
    console.log(`Expected: ${JSON.stringify(answer)}`);
    console.log('-----------------------------');
  },
);
