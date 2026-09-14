/**
 * 題號：836
 * 題目：Rectangle Overlap
 * 連結：https://leetcode.com/problems/rectangle-overlap/description/
 * 時間複雜度： O(1)
 * 空間複雜度： O(1)
 * 解題思路：
 * 1. 兩個矩形不重疊的情況包括：rec1 在 rec2 的左側、下方、右側或上方。
 * 2. 使用矩形邊界比較，判斷是否存在上述任一種不重疊情況。
 * 3. 若兩個矩形僅邊界相接，也不算重疊，因此比較時使用小於等於或大於等於。
 * 4. 將所有不重疊條件取反，即可得到兩個矩形具有正面積交集的結果。
 */

// --- LeetCode 提供的程式碼模板 ---
function isRectangleOverlap(rec1: number[], rec2: number[]): boolean {
  return !(
    rec1[2] <= rec2[0] || // rec1 is to the left of rec2
    rec1[3] <= rec2[1] || // rec1 is below rec2
    rec1[0] >= rec2[2] || // rec1 is to the right of rec2
    rec1[1] >= rec2[3] // rec1 is above rec2
  );
}

// --- 測試案例 ---
interface TestCase {
  rec1: number[];
  rec2: number[];
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    rec1: [0, 0, 2, 2],
    rec2: [1, 1, 3, 3],
    answer: true,
  },
  {
    rec1: [0, 0, 1, 1],
    rec2: [1, 0, 2, 1],
    answer: false,
  },
  {
    rec1: [0, 0, 1, 1],
    rec2: [2, 2, 3, 3],
    answer: false,
  },
];

testCases.forEach(({ rec1, rec2, answer }, index) => {
  const result = isRectangleOverlap(rec1, rec2);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: rec1 = ${JSON.stringify(rec1)}, rec2 = ${JSON.stringify(rec2)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
