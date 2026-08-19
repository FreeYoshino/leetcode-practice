/**
 * 題號：1386
 * 題目：Cinema Seat Allocation
 * 連結：https://leetcode.com/problems/cinema-seat-allocation/description/
 * 時間複雜度：O(r)
 * - 建立 rowMap（逐筆處理保留座位）：O(r)
 * - 逐列檢查可安排的家庭數（僅檢查有保留座位的列）：O(m)，且 m <= r
 * - 合併可得整體為 O(r)
 *
 * 空間複雜度：O(m)
 * - 使用 Map<number, number> 記錄有保留座位的列，m 為有被預訂的列數
 * - 最差情況下每筆保留都落在不同列，故 m = r
 *
 * 解題思路：
 * 1. 每列最多可安排 2 組四人家庭（區間固定為 2-5、4-7、6-9），可先假設全部列都能安排 2 組，答案初始為 2 * n。
 * 2. 用位元遮罩壓縮每一列的預訂狀態：第 seat 個座位對應 bit (seat - 1)，被預訂就設為 1。
 * 3. 只需要關注三個可放四人家庭的區塊，預先建立三個 mask：
 *    - leftMask：座位 2,3,4,5
 *    - middleMask：座位 4,5,6,7
 *    - rightMask：座位 6,7,8,9
 * 4. 對每一個有預訂的列做判斷：
 *    - 若 left 與 right 兩塊都沒被占用，可放 2 組。
 *    - 否則只要 left、middle、right 任一塊可用，就可放 1 組。
 *    - 否則該列放 0 組。
 * 5. 因為一開始把每列都算成 2 組，遇到有預訂的列時先扣回 2，再加上該列實際可放組數，最後即為最大可安排家庭數。
 */

// --- LeetCode 提供的程式碼模板 ---
function maxNumberOfFamilies(n: number, reservedSeats: number[][]): number {
  // rowMap 用來存放每一列的座位狀態，key 為列號，value 為該列的座位狀態(使用二進位表示 1 表示已被預訂，0 表示未被預訂)
  const rowMap: Map<number, number> = new Map();
  for (const [row, seat] of reservedSeats) {
    // currentRow 取得該列的座位狀態，如果該列尚未有任何座位被預訂，則初始化為 0
    let currentRow = rowMap.get(row) || 0;

    // 利用位元運算來表示1~10號座位的預訂狀態，將已被預訂的座位對應的位元設為1(or運算)
    currentRow |= 1 << (seat - 1);
    rowMap.set(row, currentRow);
  }

  // 定義3種座位組合的二進位表示，分別對應於左邊、中間、右邊的4個座位
  const leftMask = (1 << 1) | (1 << 2) | (1 << 3) | (1 << 4); // 座位 2,3,4,5
  const middleMask = (1 << 3) | (1 << 4) | (1 << 5) | (1 << 6); // 座位 4,5,6,7
  const rightMask = (1 << 5) | (1 << 6) | (1 << 7) | (1 << 8); // 座位 6,7,8,9

  // 計算每一列最多可以安排的家庭數量
  let totalFamilies = 2 * n; // 初始假設每一列都可以安排2個家庭
  for (const [row, seatState] of rowMap) {
    let familiesInRow = 0;

    // 優先檢查左邊和右邊的座位組合是否可用，如果都不可用，則檢查中間的座位組合
    if ((seatState & leftMask) === 0 && (seatState & rightMask) === 0) {
      // 左邊和右邊都可用，最多可以安排2個家庭
      familiesInRow += 2;
    } else if (
      (seatState & leftMask) === 0 ||
      (seatState & rightMask) === 0 ||
      (seatState & middleMask) === 0
    ) {
      // 3個座位組合中有一個可用，最多可以安排1個家庭
      familiesInRow += 1;
    }

    totalFamilies -= 2; // 減去該列的初始假設
    totalFamilies += familiesInRow; // 加上實際可安排的家庭數量
  }

  return totalFamilies;
}

// --- 測試案例 ---
interface TestCase {
  n: number;
  reservedSeats: number[][];
  answer: number;
}

const testCases: TestCase[] = [
  {
    n: 3,
    reservedSeats: [
      [1, 2],
      [1, 3],
      [1, 8],
      [2, 6],
      [3, 1],
      [3, 10],
    ],
    answer: 4,
  },
  {
    n: 2,
    reservedSeats: [
      [2, 1],
      [1, 8],
      [2, 6],
    ],
    answer: 2,
  },
  {
    n: 4,
    reservedSeats: [
      [4, 3],
      [1, 4],
      [4, 6],
      [1, 7],
    ],
    answer: 4,
  },
];

testCases.forEach(({ n, reservedSeats, answer }, index) => {
  const result = maxNumberOfFamilies(n, reservedSeats);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: n = ${n}, reservedSeats = ${JSON.stringify(reservedSeats)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
