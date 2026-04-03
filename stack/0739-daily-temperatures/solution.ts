/**
 * 題號： 739
 * 標題： Daily Temperatures
 * 連結： https://leetcode.com/problems/daily-temperatures/description/
 * 時間複雜度： O(n)
 * - 雖然code 的寫法是巢狀迴圈 但每個元素最多只會被push、pop進stack 1次 所以 時間複雜度為O(n)
 * 空間複雜度： O(n)
 * - 最差的情況下 temperatures中的溫度是持續遞減的 stack需要存放所有天數索引 因此空間複雜度為 O(n)
 * 解題思路：
 * 1. 建立 stack 來存放尚未找到更高溫的天數索引
 * 2. 遍歷 temperatures 陣列 當發現當天的溫度高於 存放在stack頂部的溫度時
 * - 代表在stack中存放的天數索引 等到了更高溫的一天
 * - 將索引pop 出來 計算天數差 放入 result 陣列中
 * - 持續上述步驟直到 當天的溫度不再高於 stack 頂部溫度 or stack 為空時
 */

function dailyTemperatures(temperatures: number[]): number[] {
  const result: number[] = Array.from({ length: temperatures.length }, () => 0);
  const stack: number[] = [];

  for (let i = 0; i < temperatures.length; i++) {
    // 當stack 中有元素 且 當天溫度高於stack中紀錄的先前溫度時 將對應天數差放入result中
    while (
      stack.length > 0 &&
      temperatures[stack[stack.length - 1]] < temperatures[i]
    ) {
      const index = stack.pop()!;
      result[index] = i - index;
    }

    stack.push(i);
  }
  return result;
}

// test case
interface TestCase {
  temperatures: number[];
  answer: number[];
}

const testCases: TestCase[] = [
  {
    temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    answer: [1, 1, 4, 2, 1, 1, 0, 0],
  },
  { temperatures: [30, 40, 50, 60], answer: [1, 1, 1, 0] },
  { temperatures: [30, 60, 90], answer: [1, 1, 0] },
];

testCases.forEach((tc, index) => {
  const result = dailyTemperatures(tc.temperatures);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: temperatures = ${JSON.stringify(tc.temperatures)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Answer: ${JSON.stringify(tc.answer)}`);
});
