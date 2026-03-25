/**
 * 題號： 19
 * 標題： Remove Nth Node From End of List
 * 連結： https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/
 * 時間複雜度： O(N)
 * - N為輸入的linked-list 的長度
 * - 因為fast 指標最多會將整個linked-list 走訪一次 所以時間複雜度剛好是線性的
 * 空間複雜度： O(1)
 * - 只使用了 dummyHead 、 fast 、  slow 這幾個固定的變數
 * - 沒有額外宣告陣列與輸入長度相關的資料結構 因此只消耗常數級的記憶體空間
 * 解題思路
 *  1. 使用雙指標的方式 來確定要刪除的節點
 *  2. 設定 fast 、 slow 兩指標 fast 指標先往前 n個節點
 *  3. 當fast 指標的next指向 null 的時候代表 slow指標next就是要刪除的節點
 *  4. 設立虛擬頭節點 防止要刪除的節點為頭節點 且開始時都先將fast 、 slow 指向虛擬頭節點
 */

import { json } from 'node:stream/consumers';
import { ListNode } from '../../utils/ListNode.ts';

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let dummyHead = new ListNode(0, head); // 指向頭節點

  let fast = dummyHead;
  let slow = dummyHead;

  // 將fast 領先 n 個節點
  for (let i = 0; i < n; i++) {
    fast = fast.next!;
  }

  // 雙指標同時向前
  while (fast.next !== null) {
    fast = fast.next!;
    slow = slow.next!;
  }

  // 刪除目標節點(slow.next)
  slow.next = slow.next!.next;

  return dummyHead.next;
}

// 輔助函式
function creationLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// test case
interface TestCase {
  arr: number[];
  n: number;
  answer: number[];
}
const testCases: TestCase[] = [
  { arr: [1, 2, 3, 4, 5], n: 2, answer: [1, 2, 3, 5] },
  { arr: [1], n: 1, answer: [] },
  { arr: [1, 2], n: 1, answer: [1] },
];

testCases.forEach((tc, index) => {
  const head = creationLinkedList(tc.arr);
  const resultHead = removeNthFromEnd(head, tc.n);
  const resultArr = linkedListToArray(resultHead);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: head = ${JSON.stringify(tc.arr)}, n = ${tc.n}`);
  console.log(`Output: ${JSON.stringify(resultArr)}`);
  console.log(`Answer: ${JSON.stringify(tc.answer)}`);
});
