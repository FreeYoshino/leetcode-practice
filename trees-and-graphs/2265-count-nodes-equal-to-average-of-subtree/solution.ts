/**
 * 題號：2265
 * 題目：Count Nodes Equal to Average of Subtree
 * 連結：https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/description/
 * 時間複雜度：O(n)
 * - n 為二元樹的節點數量
 * - DFS 會走訪每個節點一次，每個節點只進行固定次數的運算，為 O(n)
 *
 * 空間複雜度：O(h)
 * - h 為二元樹的高度
 * - 每次遞迴只保留目前路徑上的呼叫堆疊，為 O(h)，最壞情況為 O(n)
 *
 * 解題思路：
 * 1. 使用後序 DFS 走訪二元樹，先取得左、右子樹的節點總和與節點數量。
 * 2. 將左右子樹的資訊加上目前節點，計算目前子樹的總和與節點數量。
 * 3. 如果目前節點的值等於目前子樹平均值的向下取整結果，就將答案加一。
 * 4. 將目前子樹的總和與節點數量回傳給父節點，最後回傳符合條件的節點數量。
 */

// --- LeetCode 提供的程式碼模板 ---
/* *
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import { TreeNode, createTreeFromArray } from '../../utils/tree/binary-tree.ts';

function averageOfSubtree(root: TreeNode | null): number {
  let count = 0;

  // dfs遍歷整棵樹 每個節點回傳 [子樹總和, 子樹節點數量]
  const dfs = (node: TreeNode | null): [number, number] => {
    if (node === null) return [0, 0];

    const left = dfs(node.left);
    const right = dfs(node.right);

    const sum = left[0] + right[0] + node.val;
    const totalNodes = left[1] + right[1] + 1;

    if (Math.floor(sum / totalNodes) === node.val) count++;

    return [sum, totalNodes];
  };

  dfs(root);
  return count;
}

// --- 測試案例 ---
interface TestCase {
  root: (number | null)[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    root: [4, 8, 5, 0, 1, null, 6],
    answer: 5,
  },
  {
    root: [1],
    answer: 1,
  },
];

testCases.forEach(({ root, answer }, index) => {
  const input = createTreeFromArray(root);
  const result = averageOfSubtree(input);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: rooot = ${JSON.stringify(root)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
