/**
 * 題號： 124
 * 標題： Binary Tree Maximum Path Sum
 * 連結： https://leetcode.com/problems/binary-tree-maximum-path-sum/description/
 * 時間複雜度： O(n)
 * 空間複雜度： O(h)
 * - h 為樹的高度，call stack的最大深度為樹的高度
 * 解題思路：
 * - 一個節點的最大路徑和可以分為兩種情況：
 *  1. 當前節點作為路徑的最高點，最大路徑和為當前節點的值加上左右子樹的最大單向路徑和。
 *  2. 當前節點作為路徑的一部分，最大單向路徑和為當前節點的值加上左右子樹的最大單向路徑和中的較大者。
 * - 因此透過遞迴計算每個節點的最大單向路徑和，並在過程中更新全局最大路徑和，即可得到最終結果。
 */

import { TreeNode, createTreeFromArray } from '../../utils/tree/binary-tree.ts';

function maxPathSum(root: TreeNode | null): number {
  let maxSum = -Infinity;

  // 計算當前節點的最大單向路徑和，並更新全局最大路徑和
  function helper(node: TreeNode | null): number {
    if (!node) return 0;

    // 計算左右子樹的最大單向路徑和，若為負數則取 0
    const leftMax = Math.max(helper(node.left), 0);
    const rightMax = Math.max(helper(node.right), 0);

    // 更新全局最大路徑和
    maxSum = Math.max(maxSum, node.val + leftMax + rightMax);
    // 返回當前節點的最大單向路徑和
    return node.val + Math.max(leftMax, rightMax);
  }

  helper(root);
  return maxSum;
}

interface TestCase {
  root: (number | null)[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    root: [1, 2, 3],
    answer: 6,
  },
  {
    root: [-10, 9, 20, null, null, 15, 7],
    answer: 42,
  },
];

testCases.forEach(({ root, answer }, index) => {
  const treeRoot = createTreeFromArray(root);
  const result = maxPathSum(treeRoot);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(root)}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
