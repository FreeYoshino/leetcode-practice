/**
 * 題號： 128
 * 標題： Longest Consecutive Sequence
 * 連結： https://leetcode.com/problems/longest-consecutive-sequence/description/
 * 時間複雜度: O(n)
 * - 將 nums數組轉換成 Set 需要O(n)的時間
 * - 遍歷 Set 雖然在內部包含了 while迴圈 但進行了連續數的起點判斷 因此該迴圈只會從每組連續數的起點開始計算 陣列中的每個數字最多只會被造訪到2次(for迴圈走訪 + while迴圈中作為連續元素被找到
 * - 總和時間複雜度為 O(n)
 * 空間複雜度: O(n)
 * - 使用了一個 額外的 Set結構去儲存陣列中不同的數字 最差的情況每個數字都不重複 空間複雜度為O(n)
 * 解題思路:
 * 1. 為了符合題目要求的 O(n) 時間複雜度 不使用排序演算法
 * 2. 使用 Set 儲存不同的數字 利用其 O(1) 的查詢特性來判斷數字是否存在
 * 3. 避免 O(n^2) 的關鍵為判斷該數字是否為 連續數的起點
 * 4. 只有當 該數字的前一個數不存在 該數字才為這個連續數的起點 利用while迴圈往後來計算該連續數的長度
 * 5. 比較並更新目前找到的最長連續數長度 result
 */

function longestConsecutive(nums: number[]): number {
  let result: number = 0;
  const numSet: Set<number> = new Set<number>(nums);

  for (let num of numSet) {
    // 判斷是否為 連續數的起點
    if (numSet.has(num - 1)) continue;

    let count = 1;
    while (numSet.has(num + count)) {
      count++;
    }

    // 檢查是否為更長的結果
    result = Math.max(result, count);
  }

  return result;
}

// test case
interface TestCase {
  nums: number[];
  answer: number;
}

const testCase: TestCase[] = [
  { nums: [100, 4, 200, 1, 3, 2], answer: 4 },
  { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1], answer: 9 },
  { nums: [1, 0, 1, 2], answer: 3 },
];

testCase.forEach((tc, index) => {
  const result = longestConsecutive(tc.nums);

  console.log(`Case ${index + 1}`);
  console.log(`Input: nums = ${JSON.stringify(tc.nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Answer: ${JSON.stringify(tc.answer)}`);
});
