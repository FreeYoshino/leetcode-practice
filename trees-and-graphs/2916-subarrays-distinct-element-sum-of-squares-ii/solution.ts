/**
 * 題號：2916
 * 題目：Subarrays Distinct Element Sum of Squares II
 * 連結：https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii/description/
 * 時間複雜度：O(n log n)
 * - n 為 nums 的長度
 * - 建立線段樹需要 O(n)
 * - 每個右端點 i 都會進行一次區間更新，線段樹的區間更新需要 O(log n)
 * - 依序處理所有元素，因此總時間複雜度為 O(n log n)
 *
 * 空間複雜度：O(n)
 * - 線段樹最多建立 O(n) 個節點
 * - lastPos 最多儲存 n 個不同元素的最後出現位置
 *
 * 解題思路：
 * 1. 固定子陣列的右端點 i，將所有可能的左端點視為線段樹上的位置。
 *    每個位置 l 儲存子陣列 nums[l..i] 的相異元素個數，以及這些個數的總和與平方和。
 * 2. 令 x = nums[i]，並找出 x 上一次出現的位置 prev。對所有 l ∈ [prev + 1, i]，
 *    nums[l..i] 會因為加入新的 x 而多出一個相異元素，因此將這個區間的值全部加一。
 * 3. 線段樹以 lazy propagation 支援區間加一，並在每個節點維護 sum1 與 sum2。
 *    區間中的每個值由 v 變成 v + 1 時，平方和可由
 *    (v + 1)^2 = v^2 + 2v + 1 快速更新。
 * 4. 更新完成後，根節點的 sum2 就是所有以 i 為右端點的子陣列平方和，
 *    將它累加至答案，最後對 MOD 取餘數。
 */

// --- LeetCode 提供的程式碼模板 ---
const MOD = 1_000_000_007n;

class SegmentTreeNode {
  l: number;
  r: number;
  sum1: bigint = 0n;
  sum2: bigint = 0n;
  lazy: bigint = 0n;
  left: SegmentTreeNode | null = null;
  right: SegmentTreeNode | null = null;

  constructor(l: number, r: number) {
    this.l = l;
    this.r = r;
  }
}

class SegmentTree {
  private root: SegmentTreeNode;

  constructor(n: number) {
    this.root = this.build(0, n - 1);
  }

  // 建立整棵樹的結構
  private build(l: number, r: number): SegmentTreeNode {
    const node = new SegmentTreeNode(l, r);
    if (l === r) return node;

    const mid = (l + r) >> 1;
    node.left = this.build(l, mid);
    node.right = this.build(mid + 1, r);
    return node;
  }

  // 對特定節點套用區間 +val
  private apply(node: SegmentTreeNode, val: bigint): void {
    const len = BigInt(node.r - node.l + 1);
    val = val % MOD;

    // sum2 = sum2 + 2 * val * sum1 + val^2 * len
    const term2 = (((2n * val) % MOD) * node.sum1) % MOD;
    const term3 = (((val * val) % MOD) * len) % MOD;
    node.sum2 = (node.sum2 + term2 + term3) % MOD;

    // sum1 = sum1 + val * len
    node.sum1 = (node.sum1 + val * len) % MOD;

    // 累積 lazy tag
    node.lazy = (node.lazy + val) % MOD;
  }

  // 將懶標記下傳至子節點
  private pushDown(node: SegmentTreeNode): void {
    if (node.lazy === 0n) return;
    if (node.left) this.apply(node.left, node.lazy);
    if (node.right) this.apply(node.right, node.lazy);
    node.lazy = 0n;
  }

  // 子節點數值向上合併
  private pushUp(node: SegmentTreeNode): void {
    const leftSum1 = node.left ? node.left.sum1 : 0n;
    const rightSum1 = node.right ? node.right.sum1 : 0n;
    node.sum1 = (leftSum1 + rightSum1) % MOD;

    const leftSum2 = node.left ? node.left.sum2 : 0n;
    const rightSum2 = node.right ? node.right.sum2 : 0n;
    node.sum2 = (leftSum2 + rightSum2) % MOD;
  }

  // 區間更新公開方法：將 [ql, qr] 區間加上 val
  public updateRange(ql: number, qr: number, val: bigint): void {
    this._update(this.root, ql, qr, val);
  }

  private _update(
    node: SegmentTreeNode,
    ql: number,
    qr: number,
    val: bigint,
  ): void {
    // 當前節點完全被包含在目標區間內：直接在此停下並打上 Lazy Tag
    if (ql <= node.l && node.r <= qr) {
      this.apply(node, val);
      return;
    }

    this.pushDown(node);

    const mid = (node.l + node.r) >> 1;
    if (ql <= mid && node.left) {
      this._update(node.left, ql, qr, val);
    }
    if (qr > mid && node.right) {
      this._update(node.right, ql, qr, val);
    }

    this.pushUp(node);
  }

  // 取得當前所有已插入左端點的平方和總值
  public getTotalSum2(): bigint {
    return this.root.sum2;
  }
}

function sumCounts(nums: number[]): number {
  const n = nums.length;
  const tree = new SegmentTree(n);
  const lastPos = new Map<number, number>();
  let totalAns = 0n;

  for (let i = 0; i < n; i++) {
    const x = nums[i];
    const prev = lastPos.has(x) ? lastPos.get(x)! : -1;

    // 區間 [prev + 1, i] 的相異元素個數全部 +1
    tree.updateRange(prev + 1, i, 1n);

    // 根節點的 sum2 即為以當前 i 結尾的所有子陣列平方和
    totalAns = (totalAns + tree.getTotalSum2()) % MOD;

    lastPos.set(x, i);
  }

  return Number(totalAns);
}

// --- 測試案例 ---
interface TestCase {
  nums: number[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    nums: [1, 2, 1],
    answer: 15,
  },
  {
    nums: [2, 2],
    answer: 3,
  },
];

testCases.forEach(({ nums, answer }, index) => {
  const result = sumCounts(nums);
  console.log(`Case ${index + 1}:`);
  console.log(`Input: nums = ${JSON.stringify(nums)}`);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
