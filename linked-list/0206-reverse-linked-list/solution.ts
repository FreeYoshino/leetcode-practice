/**
 * 題號： 206
 * 標題： Reverse Linked List
 * 連結： https://leetcode.com/problems/reverse-linked-list/description/
 * 時間複雜度(iteratively)： O(n)
 * - n 為 linked list 的總長度
 * - 使用while迴圈將整個 linked list 剛好走訪了一次 因此時間複雜度為O(n)
 * 空間複雜度(iteratively)： O(1)
 * - 只宣告了3個 node 的變數 沒有使用額外的陣列與輸入長度相關的結構 因此空間複雜度為O(1)
 * 解題思路(iteratively):
 *  1. 使用3個 node 指標 分別為 preNode(上一個) currNode(目前的) nextNode(下一個)
 *  2. 初始化時須將preNode設為 null 因為反轉list 後第一個node 會變成最後一個 且指向null
 *  3. 使用while 迴圈走訪list 每一步執行以下操作
 *    - 暫存下一個 node 避免反轉後遺失下一個node
 *    - 將 currNode.next 指向 preNode(上一個) 達成局部反轉
 *    - 將 preNode 移動到 currNode 的位置
 *    - 將 currNode 移動到 剛剛暫存 nextNode位置
 *  4. 迴圈結束時 preNode 會剛好停留在 反轉後list 的 頭節點
 * 
 * 時間複雜度(recursively): O(n)
 * - n 為 linked list 的總長度
 * - 會將每個節點都走訪一次 因此時間複雜度為O(n)
 * 空間複雜度(recursively): O(n)
 * - n 為 linked list 的總長度
 * - 因為會遞迴n次 call stack會疊加n層 所以空間複雜度為O(n)
 * 解題思路(recursive):
 *  1. 使用遞迴的方式走訪整個linked list
 *  2. 在每層的操作跟iterative一樣的操作 將指向反轉 並將下一層所需的preNode currNode 更新上去
 */

import { resolve } from 'node:dns';
import {
  ListNode,
  arrayToList,
  listToArray,
} from '../../utils/linked-list/singly.ts';

// iteratively
function reverseListIterative(head: ListNode | null): ListNode | null {
  let preNode = null;
  let currNode = head;

  while (currNode !== null) {
    const nextNode = currNode.next;
    currNode.next = preNode; // 將當前節點往回指
    preNode = currNode;
    currNode = nextNode;
  }

  return preNode;
}

// recursively
function reverseListRecursive(head: ListNode | null): ListNode | null {
  return recursive(null, head);
}

function recursive(
  preNode: ListNode | null,
  currNode: ListNode | null,
): ListNode | null {
  if (currNode === null) return preNode; // 終止遞迴
  const nextNode = currNode.next;
  currNode.next = preNode; // 轉向
  return recursive(currNode, nextNode); // 將新的preNode(目前的currNode) 和 新的currNode(目前的nextNode) 傳遞到下一層
}

// test case
interface TestCase {
  arr: number[];
  answer: number[];
}

const testCases: TestCase[] = [
  { arr: [1, 2, 3, 4, 5], answer: [5, 4, 3, 2, 1] },
  { arr: [1, 2], answer: [2, 1] },
  { arr: [], answer: [] },
];

testCases.forEach((tc, index) => {
  const head = arrayToList(tc.arr);
  // const resultHead = reverseListIterative(head);
  const resultHead = reverseListRecursive(head);
  const resultArr = listToArray(resultHead);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: head = ${JSON.stringify(tc.arr)}`);
  console.log(`Output: ${JSON.stringify(resultArr)}`);
  console.log(`Answer: ${JSON.stringify(tc.answer)}`);
});
