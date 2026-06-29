/**
 * 題號： 1004
 * 標題： Max Consecutive Ones III
 * 連結：https://leetcode.com/problems/max-consecutive-ones-iii/description/
 * 時間複雜度：O(n)
 * 空間複雜度：O(1)
 * 解題思路：
 * 使用滑動視窗維護一段目前合法的區間，並記錄其中 0 的數量。
 * 右指標逐步向右擴張時，若遇到 0 就累加 zeroCount；當 zeroCount
 * 超過 k，代表目前區間已不合法，這時就移動左指標縮小視窗，直到
 * zeroCount 重新回到 k 以內。
 * 在每次視窗維持合法時，更新目前區間長度的最大值。因為每個元素
 * 最多只會被左、右指標各經過一次，所以整體是線性時間。
 */

function longestOnes(nums: number[], k: number): number {
  let left = 0;
  let zeroCount = 0;
  let maxLength = 0;
  for (let right = 0; right < nums.length; right++) {
    const currentNum = nums[right];
    if (currentNum === 0) {
      zeroCount++;
    }

    // 如果零的數量超過 k 則需要縮小窗口
    while (zeroCount > k) {
      const leftNum = nums[left];
      if (leftNum === 0) {
        zeroCount--;
      }
      left++;
    }

    // 更新最大長度
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

interface TestCase {
  nums: number[];
  k: number;
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    k: 2,
    answer: 6,
  },
  {
    nums: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    k: 3,
    answer: 10,
  },
];

testCases.forEach(({ nums, k, answer }, index) => {
  const result = longestOnes(nums, k);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log('------------------------------');
});
