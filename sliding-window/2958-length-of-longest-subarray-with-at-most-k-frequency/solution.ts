/**
 * 題號：2958
 * 題目：Length of Longest Subarray With at Most K Frequency
 * 連結：https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency/description/
 * 時間複雜度：O(n)
 * - 右指針會在整個陣列中向右掃描一次，最多走到 n，為 O(n)
 * - 每次加入或移出一個數字時，都只會做 Map 的讀寫與常數次操作，為 O(1)
 * - 因為每個元素最多被加入視窗與移出視窗各一次，所以整體仍是 O(n)
 *
 * 空間複雜度：O(n)
 * - 需要用 Map 記錄每個數字在當前視窗中的出現次數，最壞情況下會存入 O(n) 個不同元素
 *
 * 解題思路：
 * 1. 使用滑動視窗維護一個區間，確保窗口內每個數字的出現次數都不超過 k。
 * 2. 右指針持續擴張窗口，將 nums[right] 加入 freqMap，更新其頻率。
 * 3. 當某個數字的頻率超過 k 時，左指針開始往右收縮，直到窗口再次符合條件。
 * 4. 每次窗口修正後，都更新當前最長合法子陣列長度，最後回傳最大值。
 */

// --- LeetCode 提供的程式碼模板 ---
function maxSubarrayLength(nums: number[], k: number): number {
  const n = nums.length;

  let left = 0;
  let maxLength = 0;
  const freqMap = new Map<number, number>();

  for (let right = 0; right < n; right++) {
    const num = nums[right];
    let count = (freqMap.get(num) ?? 0) + 1;
    freqMap.set(num, count);

    while (count > k) {
      const leftNum = nums[left];
      freqMap.set(leftNum, (freqMap.get(leftNum) ?? 0) - 1);
      left++;
      count = freqMap.get(num) ?? 0;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 3, 1, 2, 3, 1, 2],
    k: 2,
    answer: 6,
  },
  {
    nums: [1, 2, 1, 2, 1, 2, 1, 2],
    k: 1,
    answer: 2,
  },
  {
    nums: [5, 5, 5, 5, 5, 5, 5],
    k: 4,
    answer: 4,
  },
];

testCases.forEach(({ nums, k, answer }, index) => {
  const result = maxSubarrayLength(nums, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
