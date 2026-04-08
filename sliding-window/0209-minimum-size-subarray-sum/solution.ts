/**
 * 題號： 209
 * 標題： Minimum Size Subarray Sum
 * 連結： https://leetcode.com/problems/minimum-size-subarray-sum/description/
 * 時間複雜度： O(n)
 * - 雖然使用了巢狀迴圈 但left、right指標都是向前的不回回頭計算先前的
 * - 陣列中的每個數字最多被right指標加入1次也最多被left指標踢出1次 總操作次數約為O(2n) 因此時間複雜度為O(n)
 * 空間複雜度：O(1)
 * - 指使用了幾個常數級別的變數 無論輸入的陣列多大 占用的記憶體接固定 因此空間複雜度為O(n)
 * 解題思路：
 * 1. 使用sliding window 的技巧 尋找符合題目條件的最小window
 * 2. result 變數初始化為Infinity 方便在後續使用Math.min找尋最小值
 * 3. for迴圈使right指標不斷地向前將數字加入currSum
 * 4. 當currSum大於target時(找到符合條件的window了)
 *    - 紀錄並比較當前視窗大小與歷史最小視窗大小result
 *    - 將left指標所指向的數字踢出currSum 並往前移動
 * 5. 迴圈結束若result依舊等於Infinity 代表沒有找到任何符合條件的window 回傳0 否則直接回傳result 
 */

function minSubArrayLen(target: number, nums: number[]): number {
  let result = Infinity;
  let currSum = 0;
  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    currSum += nums[right];
    while (currSum >= target) {
      result = Math.min(result, right - left + 1);
      currSum -= nums[left];
      left++;
    }
  }
  return result === Infinity ? 0 : result;
}

// test case
interface TestCase {
  target: number;
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  { target: 7, nums: [2, 3, 1, 2, 4, 3], answer: 2 },
  { target: 4, nums: [1, 4, 4], answer: 1 },
  { target: 11, nums: [1, 1, 1, 1, 1, 1, 1, 1], answer: 0 },
];

testCases.forEach((tc, index) => {
  const result = minSubArrayLen(tc.target, tc.nums);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: target = ${tc.target}, nums = ${JSON.stringify(tc.nums)}`,
  );
  console.log(`Output: ${result}`);
  console.log(`Answer: ${tc.answer}`);
});
