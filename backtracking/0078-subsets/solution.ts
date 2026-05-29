/**
 * 題號： 78
 * 標題： Subsets
 * 連結： https://leetcode.com/problems/subsets/description/)
 * 時間複雜度： O(2^n)
 * - n 為 nums 的長度 對於每個元素 有兩種選擇：選擇它或不選擇它 因此總共有 2^n 種可能的子集合
 * 空間複雜度： O(n)
 * - 回溯過程中 path 的最大長度為 n 因此空間複雜度為 O(n)
 * 解題思路：
 * 1. 使用回溯法來生成所有可能的子集合
 * 2. 在回溯過程中 對於每個元素 有兩種選擇：選擇它或不選擇它(放入子集合或不放入子集合)
 * 3. 當索引超過輸入數組的長度時 將當前的子集合加入結果中
 * 4. 最終返回結果
 */

function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = []; // 存放當前的子集合

  // 回溯函式
  const backtracking = (index: number) => {
    // 當 index 超過 nums 的長度時 將當前的子集合加入結果
    if (index === nums.length) {
      result.push([...path]);
      return;
    }

    // 選擇當前元素
    path.push(nums[index]);
    backtracking(index + 1);
    path.pop(); // 回退到上一狀態 保持 path 的正確性

    // 不選擇當前元素
    backtracking(index + 1);
  };

  // 從索引 0 開始回溯
  backtracking(0);
  return result;
}

// test cases
interface TestCase {
  nums: number[];
  answer: number[][];
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 3],
    answer: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
  },
  { nums: [0], answer: [[], [0]] },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = subsets(nums);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
