export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) { 
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

export function createTreeFromArray(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null;  
  
  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];

  let i = 1;
  while (i < arr.length) {
    const currentNode = queue.shift()!;

    // 左子結點
    if (i < arr.length && arr[i] !== null) {
      const leftNode = new TreeNode(arr[i]!);
      currentNode.left = leftNode;
      queue.push(leftNode);
    }
    i++;

    // 右子結點
    if (i < arr.length && arr[i] !== null) { 
      const rightNode = new TreeNode(arr[i]!);
      currentNode.right = rightNode;
      queue.push(rightNode);
    }
    i++;
  }

  return root;
}

export function treeToArray(root: TreeNode | null): (number | null)[] { 
  if (!root) return [];

  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    if (currentNode) {
      result.push(currentNode.val);
      queue.push(currentNode.left);
      queue.push(currentNode.right);
    } else {
      result.push(null);
    }
  }

  // 移除尾部的 null 值
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }
  
  return result;
}