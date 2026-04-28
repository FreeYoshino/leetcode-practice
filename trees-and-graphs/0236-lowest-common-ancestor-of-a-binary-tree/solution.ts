/**
 * 題號： 236
 * 標題： Lowest Common Ancestor of a Binary Tree
 * 連結： https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/
 * 時間複雜度： O(n)
 * - n為binary tree的節點數量
 * - 最壞的情況需要遍歷整棵樹一次
 * 空間複雜度： O(h)
 * - h為binary tree的高度
 * - 空間的消耗來自於遞迴呼叫堆疊的深度
 * - 最壞的情況 tree為skewed tree 時高度為n 空間複雜度為O(n)
 * - 最佳的情況 tree為balanced tree 時高度為logn 空間複雜度為O(logn)
 * 解題思路：
 * 1. 使用DFS的技巧來遍歷binary tree
 * 2. 在每個節點處檢查是否為p或q
 *    - 如果是p或q 就返回當前節點
 *    - 否則繼續遞迴呼叫左右子樹尋找p和q
 * 3. 如果左右子樹都找到了p和q 那麼當前節點就是LCA
 * 4. 否則返回找到的節點
 */

import {
  TreeNode,
  createTreeFromArray,
  treeToArray,
} from '../../utils/tree/binary-tree.ts';

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (!root) return null;
  if (root.val === p?.val || root.val === q?.val) return root;

  // 遞迴呼叫左右子樹 尋找p和q
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 如果左右子樹都找到了p和q 那麼當前節點就是LCA
  if (left && right) return root;

  // 否則返回找到的節點
  return left || right;
}

// test case
interface TestCase {
  root: (number | null)[];
  p: number;
  q: number;
  answer: number | null;
}

const testCases: TestCase[] = [
  { root: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p: 5, q: 1, answer: 3 },
  { root: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p: 5, q: 4, answer: 5 },
  { root: [1, 2], p: 1, q: 2, answer: 1 },
];

testCases.forEach(({ root, p, q, answer }, index) => {
  const result = lowestCommonAncestor(
    createTreeFromArray(root),
    new TreeNode(p),
    new TreeNode(q),
  );

  console.log(`Case ${index + 1}:`);
  console.log(`Input: root = ${JSON.stringify(root)}, p = ${p}, q = ${q}`);
  console.log(`Output: ${result?.val ?? null}`);
  console.log(`Expected: ${answer}`);
  console.log('-----------------------------');
});
