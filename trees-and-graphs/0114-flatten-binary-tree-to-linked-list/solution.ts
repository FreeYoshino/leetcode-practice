/**
 * 題號： 114
 * 標題： Flatten Binary Tree to Linked List
 * 連結： https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/
 * 時間複雜度：O(n)
 * 空間複雜度：O(1)
 * 解題思路：
 * 由 root 開始一路往右走，若目前節點有左子樹，就先找到左子樹最右邊的節點，
 * 再把目前節點的右子樹接到這個最右節點後面，接著把左子樹搬到右邊，並將 left 設為 null。
 * 如此一來，每個節點最多只會被處理一次，而尋找左子樹最右節點的過程，配合整體往右前進，
 * 最終仍是線性時間。因為整個過程只使用少量指標變數，所以額外空間是 O(1)。
 */

import {
  TreeNode,
  createTreeFromArray,
  treeToArray,
} from '../../utils/tree/binary-tree.ts';

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  let curr = root;
  while (curr) {
    // 當前節點有左子樹時 將右子樹接到左子樹的最右節點上，然後將左子樹移到右子樹的位置，最後將左子樹設為 null
    if (curr.left) {
      // 將右子樹接到左子樹的最右節點上
      let tail = curr.left;
      while (tail.right) {
        tail = tail.right;
      }
      tail.right = curr.right;

      // 將左子樹移到右子樹的位置
      curr.right = curr.left;
      curr.left = null;
    }

    // 移動到下一個節點
    curr = curr.right;
  }
}

interface TestCase {
  root: (number | null)[];
  answer: (number | null)[];
}

const testCases: TestCase[] = [
  {
    root: [1, 2, 5, 3, 4, null, 6],
    answer: [1, null, 2, null, 3, null, 4, null, 5, null, 6],
  },
  {
    root: [],
    answer: [],
  },
  {
    root: [0],
    answer: [0],
  },
];

testCases.forEach(({ root, answer }, index) => {
  const rootNode = createTreeFromArray(root);
  flatten(rootNode);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(root)}`);
  console.log(`Output: ${JSON.stringify(treeToArray(rootNode))}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
