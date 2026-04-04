/**
 * 題號： 853
 * 標題： Car Fleet
 * 連結： https://leetcode.com/problems/car-fleet/description/
 * 時間複雜度： O(n log n)
 * - 陣列打包、遍歷耗時O(n) 根據距離排序耗時 O(n log n) 整體時間複雜度取 O(n log n)
 * 空間複雜度： O(n)
 * - 額外建立了長度為n的cars 陣列 與最差情況長度為n 的stack陣列 因此空間複雜度為O(n)
 * 解題思路：
 * 1. 在前方的車輛可能會卡住後方車輛的車速 所以先將車輛以初始位置排序(從靠近終點最近到最遠)
 * 2. 計算車輛到達時間的方式 到達時間 = (target - position) / speed
 * 3. 從最靠近終點的車輛開始計算到達時間並將結果push進stack中
 * - 接這計算後續車輛的到達時間 若後續車輛的到達時間小於等於 stack最上方車隊的到達時間 代表該車輛會追上stack最上方的那隊車隊 並加入它們變成同一隊車隊 所以不須將這輛車的到達時間push進stack中
 * - 如果後續車輛的到達時間 大於stack最上方車隊的到達時間 代表這個車輛會自己形成一個全新的車隊 將到達時間push進stack中
 * 4. 將stack的長度回傳 就是總共有多少車隊
 */

function carFleet(target: number, position: number[], speed: number[]): number {
  // 將position 、 speed 打包再一起 並排序(從靠近終點最近到最遠)
  const cars = position.map((pos, index) => [pos, speed[index]]);
  cars.sort((a, b) => b[0] - a[0]);
  const stack: number[] = []; // stack 存放每對車隊的到達時間

  for (const [pos, spd] of cars) {
    const arrivalTime = (target - pos) / spd;
    if (stack.length === 0 || arrivalTime > stack.at(-1)!) {
      stack.push(arrivalTime);
    }
  }

  return stack.length;
}

// test case
interface TestCase {
  target: number;
  position: number[];
  speed: number[];
  answer: number;
}

const testCases: TestCase[] = [
  { target: 12, position: [10, 8, 0, 5, 3], speed: [2, 4, 1, 1, 3], answer: 3 },
  { target: 10, position: [3], speed: [3], answer: 1 },
  { target: 100, position: [0, 2, 4], speed: [4, 2, 1], answer: 1 },
];

testCases.forEach((tc, index) => {
  const result = carFleet(tc.target, tc.position, tc.speed);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: target = ${tc.target}, position = ${JSON.stringify(tc.position)}, speed = ${JSON.stringify(tc.speed)}`,
  );
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
