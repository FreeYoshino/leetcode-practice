/**
 * 題號： 347
 * 標題： Top K Frequent Elements
 * 連結： https://leetcode.com/problems/top-k-frequent-elements/description/
 * 時間複雜度: O(n)
 * - 遍歷 nums 建立freqMap 為 O(n)
 * - 遍歷 freqMap 將元素 放入 bucket內 為O(n)
 * - 從 bucket 中取出前 k 個元素 為O(n)
 * - 總合為 O(n) n 為nums陣列的長度
 * 空間複雜度: O(n)
 * - freqMap 儲存出現頻率 最差情況所有數字個出現1次 為O(n)
 * - bucket 陣列長度為 n + 1 最差情況出現次數非常分散 O(n)
 * - 總合為 O(n) n 為nums陣列的長度
 * 解題思路:
 * 1. 利用Map 儲存數字出現的頻率
 * 2. 利用Bucket sort 的方式 以數字出現頻率分堆 再從中提出元素
 */

function topKFrequent(nums: number[], k: number): number[] {
  const result: number[] = [];
  const freqMap = new Map<number, number>();

  // 計算數字出現的頻率
  for (let num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // bucket sort
  const bucket: number[][] = Array.from({ length: nums.length + 1 }, () => []);

  // 以出現頻率分堆
  for (let [num, freq] of freqMap) {
    bucket[freq].push(num);
  }

  // 從頻率高的開始取出 放進result內
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i].length > 0) {
      result.push(...bucket[i]); // 將該出現頻率的所有元素放進result內
    }
    if (result.length >= k) {
      break;
    }
  }
  return result;
}

// test case
interface TestCase {
  arr: number[];
  k: number;
  answer: number[];
}

const testCase: TestCase[] = [
  { arr: [1, 1, 1, 2, 2, 3], k: 2, answer: [1, 2] },
  { arr: [1], k: 1, answer: [1] },
  { arr: [1, 2, 1, 2, 1, 2, 3, 1, 3, 2], k: 2, answer: [1, 2] },
];
testCase.forEach((tc, index) => {
  const result = topKFrequent(tc.arr, tc.k);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(tc.arr)}, k = ${tc.k}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Answer: ${JSON.stringify(tc.answer)}`);
});
