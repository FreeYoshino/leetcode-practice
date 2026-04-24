/**
 * 題號：112
 * 標題：Path Sum
 * 連結：https://leetcode.com/problems/path-sum/description/
 * 時間複雜度： O(n)
 * - n為二元樹的節點數量
 * - 會遍歷整棵樹一次
 * 空間複雜度： O(h)
 * - h為二元樹的高度
 * - 最差情況下為O(n)（當樹退化成鏈表時）平均情況下為O(log n)（當樹平衡時）
 * 解題思路：
 * 1. 使用DFS的技巧  
 * 2. 從根結點開始 往下遞迴 將當前結點的值從targetSum中扣除
 * 3. 當遞迴到葉子結點時 如果當前結點的值等於剩餘的targetSum 就代表有一條路徑的和等於targetSum 回傳true 否則回傳false
 * 4. 如果當前結點不是葉子結點 就繼續往下遞迴檢查左右子樹是否有符合條件的路徑
 * 5. 如果左右子樹都沒有符合條件的路徑 就回傳false
 */

import { TreeNode, createTreeFromArray } from '../../utils/tree/binary-tree.ts';

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) {
    return false;
  }
  
  // leaf node
  if (!root.left && !root.right) { 
    return root.val === targetSum;
  }

  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}

// test case
interface TestCase {
  root: (number | null)[];
  targetSum: number;
  answer: boolean;
}

const testCases: TestCase[] = [
  {
    root: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1],
    targetSum: 22,
    answer: true,
  },
  { root: [1, 2, 3], targetSum: 5, answer: false },
  { root: [], targetSum: 0, answer: false },
];

testCases.forEach(({ root, targetSum, answer }, index) => {
  const result = hasPathSum(createTreeFromArray(root), targetSum);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: root = ${JSON.stringify(root)}, targetSum = ${targetSum}`,
  );
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
