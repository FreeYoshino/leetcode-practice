/**
 * 題號：2213
 * 題目：Longest Substring of One Repeating Character
 * 連結：https://leetcode.com/problems/longest-substring-of-one-repeating-character/description/
 * 時間複雜度：O((n + q) log n)
 * - 建立線段樹需要走訪整個字串一次，建樹為 O(n)
 * - 每次更新只會沿著樹高往下修改受影響的節點，再往上合併，為 O(log n)
 * - 一共有 k 次查詢，因此總時間複雜度為 O(n + k log n)，也可寫成 O((n + k) log n)
 *
 * 空間複雜度：O(n)
 * - 線段樹陣列會配置約 4n 的空間來儲存每個節點資訊，因此為 O(n)
 *
 * 解題思路：
 * 1. 這題的重點不是單純找最長重複字元子字串，而是要在每次單點修改後，快速重新取得整體答案。
 * 2. 使用線段樹維護每個區間的資訊：區間長度、前綴連續相同字元長度、後綴連續相同字元長度，以及區間內最長連續相同字元長度。
 * 3. 合併左右子區間時，如果左區間的後綴字元和右區間的前綴字元相同，就可以把跨區間的連續長度接起來。
 * 4. 每次更新只影響一條從葉節點到根節點的路徑，因此更新後重新合併即可在 O(log n) 內得到最新答案。
 */

// --- LeetCode 提供的程式碼模板 ---
function longestRepeating(
  s: string,
  queryCharacters: string,
  queryIndices: number[],
): number[] {
  const segmentTree = new SegmentTree(s);
  const result: number[] = [];

  const k = queryCharacters.length;
  for (let i = 0; i < k; i++) {
    const index = queryIndices[i];
    const newChar = queryCharacters[i];
    segmentTree.update(index, newChar);
    result.push(segmentTree.getMaxLength());
  }

  return result;
}

class SegmentTree {
  private n: number;

  // 前綴和後綴重複字元的長度
  private preLength: Int32Array;
  private sufLength: Int32Array;

  // 區間內的最大重複字元長度
  private maxLength: Int32Array;

  private size: Int32Array;

  // 前綴字元與後綴字元
  private preChar: Uint8Array;
  private sufChar: Uint8Array;

  constructor(s: string) {
    this.n = s.length;

    const treeSize = 4 * this.n;

    this.preLength = new Int32Array(treeSize);
    this.sufLength = new Int32Array(treeSize);
    this.maxLength = new Int32Array(treeSize);
    this.size = new Int32Array(treeSize);
    this.preChar = new Uint8Array(treeSize);
    this.sufChar = new Uint8Array(treeSize);

    if (this.n > 0) {
      this.build(s, 1, 0, this.n - 1);
    }
  }

  private build(s: string, node: number, left: number, right: number): void {
    if (left === right) {
      const charCode = s.charCodeAt(left);
      this.size[node] = 1;
      this.preLength[node] = 1;
      this.sufLength[node] = 1;
      this.maxLength[node] = 1;
      this.preChar[node] = charCode;
      this.sufChar[node] = charCode;

      return;
    }

    const mid = Math.floor((left + right) / 2);
    this.build(s, 2 * node, left, mid);
    this.build(s, 2 * node + 1, mid + 1, right);
    this.merge(node, 2 * node, 2 * node + 1);
  }

  // 將左右子節點合併到父節點
  private merge(parrent: number, leftChild: number, rightChild: number): void {
    this.preChar[parrent] = this.preChar[leftChild];
    this.sufChar[parrent] = this.sufChar[rightChild];
    this.size[parrent] = this.size[leftChild] + this.size[rightChild];

    // 計算preLength
    this.preLength[parrent] = this.preLength[leftChild];
    if (
      this.preLength[leftChild] === this.size[leftChild] &&
      this.sufChar[leftChild] === this.preChar[rightChild]
    ) {
      this.preLength[parrent] += this.preLength[rightChild];
    }

    // 計算sufLength
    this.sufLength[parrent] = this.sufLength[rightChild];
    if (
      this.sufLength[rightChild] === this.size[rightChild] &&
      this.sufChar[leftChild] === this.preChar[rightChild]
    ) {
      this.sufLength[parrent] += this.sufLength[leftChild];
    }

    // 計算maxLength
    this.maxLength[parrent] = Math.max(
      this.maxLength[leftChild],
      this.maxLength[rightChild],
    );
    if (this.sufChar[leftChild] === this.preChar[rightChild]) {
      this.maxLength[parrent] = Math.max(
        this.maxLength[parrent],
        this.sufLength[leftChild] + this.preLength[rightChild],
      );
    }
  }

  public getMaxLength(): number {
    return this.maxLength[1];
  }

  // 外部呼叫的更新函式
  public update(index: number, newChar: string): void {
    this._update(1, 0, this.n - 1, index, newChar.charCodeAt(0));
  }

  // 遞迴更新函式
  private _update(
    node: number,
    left: number,
    right: number,
    index: number,
    newCharCode: number,
  ): void {
    // 葉節點
    if (left === right) {
      this.preChar[node] = newCharCode;
      this.sufChar[node] = newCharCode;
      return;
    }

    const mid = Math.floor((left + right) / 2);
    if (index <= mid) {
      this._update(2 * node, left, mid, index, newCharCode);
    } else {
      this._update(2 * node + 1, mid + 1, right, index, newCharCode);
    }

    // 更新父節點
    this.merge(node, 2 * node, 2 * node + 1);
  }
}

// --- 測試案例 ---
interface TestCase {
  s: string;
  queryCharacters: string;
  queryIndices: number[];
  answer: number[];
}

const testCases: TestCase[] = [
  {
    s: 'babacc',
    queryCharacters: 'bcb',
    queryIndices: [1, 3, 3],
    answer: [3, 3, 4],
  },
  {
    s: 'abyzz',
    queryCharacters: 'aa',
    queryIndices: [2, 1],
    answer: [2, 3],
  },
];

testCases.forEach(({ s, queryCharacters, queryIndices, answer }, index) => {
  // TODO: 更改呼叫的函式名稱與上方模板一致
  const result = longestRepeating(s, queryCharacters, queryIndices);
  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: s = ${s}, queryCharacters = ${queryCharacters}, queryIndices = ${JSON.stringify(queryIndices)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
