/**
 * 題號：105
 * 標題：Construct Binary Tree from Preorder and Inorder Traversal
 * 連結：https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 * 時間複雜度：O(n)
 * - 先用一次遍歷建立 inorderMap，之後每個節點都只會被遞迴處理一次，查找根節點在 inorder 中的位置也是 O(1)，所以整體是 O(n)。
 * 空間複雜度：O(n)
 * - inorderMap 需要 O(n) 空間，遞迴呼叫最壞深度也可能到 O(n)，因此總空間複雜度為 O(n)。
 * 解題思路：
 * preorder 的第一個元素一定是目前子樹的根節點，所以可以用一個 preOrderIndex 依序取出根節點，不需要每次切陣列。
 * 先把 inorder 的值與索引建立成 Map，這樣就能在 O(1) 找到根節點在 inorder 中的位置。根節點左邊的區段就是左子樹，右邊的區段就是右子樹。
 * 因為 preorder 的順序是「根、左、右」，當知道根在 inorder 中切出的左子樹節點數量後，preorder 中根後面的那些節點就會先屬於左子樹，再往後才是右子樹。
 * 所以遞迴時只需要傳入 inorder 的左右邊界：左子樹用 [inleft, mid - 1]，右子樹用 [mid + 1, inright]，並持續推進 preorder 指標即可。
 */

import { TreeNode, treeToArray } from '../../utils/tree/binary-tree.ts';

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const inorderMap = new Map<number, number>();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  let preOrderIndex = 0; // 用來追蹤 preorder 的索引位置
  // 內部遞迴函式 傳遞inorder的左右邊界
  function helper(inleft: number, inright: number): TreeNode | null {
    if (inleft > inright) {
      return null;
    }

    const rootVal = preorder[preOrderIndex++];
    const root = new TreeNode(rootVal);

    // 找到根節點在 inorder 中的位置
    const mid = inorderMap.get(rootVal)!;

    // 遞迴建立左右子樹
    root.left = helper(inleft, mid - 1);
    root.right = helper(mid + 1, inright);
    return root;
  }

  return helper(0, inorder.length - 1);
}

interface TestCase {
  preorder: number[];
  inorder: number[];
  answer: (number | null)[];
}

const testCases: TestCase[] = [
  {
    preorder: [3, 9, 20, 15, 7],
    inorder: [9, 3, 15, 20, 7],
    answer: [3, 9, 20, null, null, 15, 7],
  },
  {
    preorder: [-1],
    inorder: [-1],
    answer: [-1],
  },
];

testCases.forEach(({ preorder, inorder, answer }, index) => {
  const result = buildTree(preorder, inorder);
  const resultArray = treeToArray(result);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: preorder = ${JSON.stringify(preorder)}, inorder = ${JSON.stringify(inorder)}`,
  );
  console.log(`Output: ${JSON.stringify(resultArray)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log(`------------------------------`);
});
