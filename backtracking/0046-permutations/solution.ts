/**
 * 題號： 46
 * 標題： Permutations
 * 連結： https://leetcode.com/problems/permutations/description/
 * 時間複雜度： O(n * n!)
 * - n 是輸入陣列的長度
 * - n! 是排列組合的總數 每個排列組合需要 O(n) 的時間來複製到結果中
 * 空間複雜度： O(n)
 * - 使用了path陣列來存放當前的排列組合 以及 used陣列來標記哪些元素已經被使用過
 * - call stack的深度最大為 n 因此空間複雜度為 O(n)
 * 解題思路：
 * 1. 使用回溯法來生成所有的排列組合
 * 2. 定義一個遞迴函數 backtrack() 用來生成排列組合
 * 3. 在 backtrack() 中 如果當前的排列組合長度等於輸入陣列的長度 就將其加入結果中
 * 4. 否則 遍歷輸入陣列 將未使用過的元素加入當前的排列組合中 並標記為已使用
 * 5. 遞迴繼續尋找下一個元素 回退到上一個狀態 並將元素標記為未使用
 * 6. 最後返回結果
 */

function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = []; // 用來存放當前的排列組合
  const used: boolean[] = new Array(nums.length).fill(false); // 用來標記哪些元素已經被使用過

  const backtrack = () => {
    // 找到一個完整的排列組合 將其加入結果中
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    // 遍歷所有元素 將未使用過的元素加入當前的排列組合中
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // 如果元素已經被使用過 就跳過

      // 將元素加入當前的排列組合中 並標記為已使用
      path.push(nums[i]);
      used[i] = true;

      // 遞迴繼續尋找下一個元素
      backtrack();

      path.pop(); // 回退到上一個狀態
      used[i] = false; // 將元素標記為未使用
    }
  };

  // 開始回溯
  backtrack();
  return result;
}

// test case
interface TestCase {
  nums: number[];
  answer: number[][];
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 3],
    answer: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ],
  },
  {
    nums: [0, 1],
    answer: [
      [0, 1],
      [1, 0],
    ],
  },
  {
    nums: [1],
    answer: [[1]],
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = permute(nums);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
