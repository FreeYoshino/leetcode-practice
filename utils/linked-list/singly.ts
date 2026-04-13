export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function arrayToList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

export function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

export function createListWithCycle(
  arr: number[],
  pos: number,
): ListNode | null {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let curr = head;
  let cycleNode: ListNode | null = null;

  if (pos === 0) cycleNode = head;

  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;

    if (i === pos) {
      cycleNode = curr;
    }
  }

  curr.next = cycleNode;

  return head;
}
