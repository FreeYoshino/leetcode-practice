export class _Node {
  val: number;
  neighbors: _Node[];

  constructor(val?: number, neighbors?: _Node[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

// 將 Graph 轉化成 Adjacency List
export function graphToArray(node: _Node | null): number[][] {
  if (!node) return [];

  // BFS 遍歷圖 找出所有節點
  const visited = new Map<number, _Node>();
  const queue: _Node[] = [];

  // 初始化起點
  visited.set(node.val, node);
  queue.push(node);
  while (queue.length > 0) {
    const current = queue.shift()!;

    for (const neighbor of current.neighbors) {
      if (!visited.has(neighbor.val)) {
        visited.set(neighbor.val, neighbor);
        queue.push(neighbor);
      }
    }
  }

  const maxVal = Math.max(...visited.keys());
  const result: number[][] = Array.from({ length: maxVal }, () => []);

  for (const [val, node] of visited) {
    result[val - 1] = node.neighbors.map((neighbor) => neighbor.val);
  }

  return result;
}

// 將 Adjacency List 轉化成 Graph
export function arrayToGraph(arr: number[][]): _Node | null {
  if (arr.length === 0) return null;

  // 儲存已建立的節點
  const nodes = new Map<number, _Node>();

  // 初始化所有節點
  for (let i = 0; i < arr.length; i++) {
    const val = i + 1; // 節點的值從 1 開始
    nodes.set(val, new _Node(val));
  }

  // 建立鄰居關係
  for (let i = 0; i < arr.length; i++) {
    const val = i + 1;
    const node = nodes.get(val)!;

    for (const neighborVal of arr[i]) {
      const neighborNode = nodes.get(neighborVal);
      node.neighbors.push(neighborNode!);
    }
  }

  return nodes.get(1)!; // 返回圖的起始節點
}
