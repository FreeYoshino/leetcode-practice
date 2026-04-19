/**
 * 題號： 25
 * 標題： Reverse Nodes in k-Group
 * 連結： http://leetcode.com/problems/reverse-nodes-in-k-group/description/
 * 時間複雜度： O(N)
 * - N 為鏈結串列的長度
 * - for迴圈會遍歷每個節點一次 reveseGroup 函式內的 while迴圈也會遍歷每個節點一次 每個節點在整個過程中被訪問兩次 因此時間複雜度為 O(N)
 * 空間複雜度： O(1)
 * - 只使用了常數的額外空間來存儲指標和變數
 * 解題思路：
 * 1. 使用 dummy head 節點來簡化邊界條件的處理
 * 2. 使用兩個指標 prevGroupTail 和 currentTail 來追蹤當前組的前一組尾巴和當前組的尾巴
 * 3. 每次迴圈中，先檢查是否有足夠的節點來形成一組 如果不足則直接返回結果
 * 4. 如果有足夠的節點 則呼叫 reverseGroup 函式來反轉當前組的節點
 * 5. 反轉完成後 將前一組的尾巴連接到當前組的頭節點 並更新 prevGroupTail 為當前組的尾巴
 * 6. 重複以上步驟直到處理完整個鏈結串列
 */

import {
  ListNode,
  arrayToList,
  listToArray,
} from '../../utils/linked-list/singly.ts';

function reverseGroup(start: ListNode, end: ListNode): void {
  let prev = end;
  let current = start;
  while(current !== end){
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next!;
  }
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const dummyHead = new ListNode(0, head);
  let prevGroupTail = dummyHead;
  
  while (true) {
    if (prevGroupTail === null) break;
    
    let currentHead = prevGroupTail.next;
    let currentTail = prevGroupTail;
    for (let i = 0; i < k; i++){
      if (!currentTail.next) return dummyHead.next;
      currentTail = currentTail.next;
    }

    // 反轉當前k個節點
    reverseGroup(prevGroupTail.next!, currentTail.next!);

    // 連接前一組和當前組
    prevGroupTail.next = currentTail;  // 將前一組的尾巴連接到當前組的頭節點
    prevGroupTail = currentHead!;      // 更新前一組的尾巴為當前組的尾巴
  }
  return dummyHead.next;
}

// test case
interface TestCase {
  head: number[] | null;
  k: number;
  answer: number[] | null;
}

const testCases: TestCase[] = [
  {
    head: [1, 2, 3, 4, 5],
    k: 2,
    answer: [2, 1, 4, 3, 5],
  },
  {
    head: [1, 2, 3, 4, 5],
    k: 3,
    answer: [3, 2, 1, 4, 5],
  },
];

testCases.forEach(({ head, k, answer }, index) => {
  const result = reverseKGroup(arrayToList(head!), k);

  console.log(`Case ${index + 1}:`);
  console.log(`Input: head = ${JSON.stringify(head)}, k = ${k}`);
  console.log(`Output: ${JSON.stringify(listToArray(result))}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
