/**
 * 題號： 230
 * 標題： Kth Smallest Element in a BST
 * 連結： https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/
 * 時間複雜度：O(n)
 * - 最壞情況下需要走訪整棵樹一次；雖然找到第 k 小時可以提前結束，但最壞仍是 O(n)
 * 空間複雜度：O(h)
 * - 其中 h 是 BST 的高度，迭代中序遍歷需要一個堆疊保存路徑節點，最壞情況為 O(n)
 * 解題思路：
 * BST 的中序遍歷結果會是遞增序列，所以只要用迭代版中序遍歷依序取出節點並計數，
 * 當計數到第 k 個節點時，該節點值就是答案。這樣可以避免先把整棵樹轉成陣列再查找。
 */

import { TreeNode, createTreeFromArray } from '../../utils/tree/binary-tree.ts';

function kthSmallest(root: TreeNode | null, k: number): number {
  // 中序遍歷 BST 會得到一個遞增的數列 因此可以透過中序遍歷來找到第 k 小的元素
  const stack: TreeNode[] = [];
  let curr: TreeNode | null = root;
  let count = 0;
  let result = -1;
  while (curr || stack.length > 0) {
    if (curr) {
      stack.push(curr);
      curr = curr.left;
    } else {
      curr = stack.pop()!;
      count++;
      if (count === k) {
        result = curr.val;
        break;
      }
      curr = curr.right;
    }
  }

  return result;
}

interface TestCase {
  root: (number | null)[];
  k: number;
  answer: number;
}
const testCases: TestCase[] = [
  {
    root: [3, 1, 4, null, 2],
    k: 1,
    answer: 1,
  },
  {
    root: [5, 3, 6, 2, 4, null, null, 1],
    k: 3,
    answer: 3,
  },
];

testCases.forEach(({ root, k, answer }, index) => {
  const rootNode = createTreeFromArray(root);
  const result = kthSmallest(rootNode, k);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: root = ${JSON.stringify(root)}, k = ${k}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`----------------------------`);
});
