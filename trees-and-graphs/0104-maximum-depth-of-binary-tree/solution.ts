/**
 * 題號： 104
 * 標題：Maximum Depth of Binary Tree
 * 連結： https://leetcode.com/problems/maximum-depth-of-binary-tree/description/
 * 時間複雜度： O(n)
 * - n 為binary tree的節點數量
 * - 會遍歷整棵樹一次，計算每個節點的深度
 * 空間複雜度： O(h)
 * - h 為binary tree的高度
 * - 最壞的情況下 樹是skewed tree，空間複雜度為 O(n)，平均情況下為 O(log n)
 * 解題思路：
 * 1. 使用DFS遞迴的方式 計算左子樹和右子樹的深度 取最大值加1
 * 2. 遞迴的終止條件為當節點為null時 返回0
 * 3. 最終返回整棵樹的最大深度
 */

import { TreeNode, createTreeFromArray } from '../../utils/tree/binary-tree.ts';

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

// test case
interface TestCase {
  root: (number | null)[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    root: [3, 9, 20, null, null, 15, 7],
    answer: 3,
  },
  {
    root: [1, null, 2],
    answer: 2,
  },
];

testCases.forEach(({ root, answer }, index) => {
  const result = maxDepth(createTreeFromArray(root));

  console.log(`Case ${index + 1}:`);
  console.log(`Input: root = ${JSON.stringify(root)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
