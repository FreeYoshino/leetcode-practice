/**
 * 題號： 212
 * 題目： Word Search II
 * 連結： https://leetcode.com/problems/word-search-ii/description/
 * 時間複雜度：O(所有單字長度總和 + m * n * 3^L)
 * - 先將所有單字插入 Trie，成本為所有單字長度總和
 * - 接著從每個格子出發做 DFS，最壞情況下每一步都可能往四個方向擴展，因此可用 O(m * n * 3^L) 表示
 * - 其中 L 代表字典中最長單字長度；實際上 Trie 會大量剪枝，所以平均情況通常遠小於最壞情況
 * 空間複雜度：O(所有單字長度總和 + L)
 * - Trie 需要儲存所有單字的字元節點，空間為所有單字長度總和
 * - 遞迴深度最多為最長單字長度 L，額外呼叫堆疊為 O(L)
 * - 使用原地標記 board 來避免走回頭路，因此不需要額外的 visited 陣列
 * 解題思路：
 * - 先把 words 全部建成 Trie，讓搜尋過程可以快速判斷目前路徑是否還有機會形成某個單字
 * - 再從 board 的每個格子出發做回溯搜尋，沿著上下左右四個方向延伸字串
 * - 每次走到一個字元時，就檢查 Trie 中是否存在對應節點；如果不存在，代表這條路徑可以直接剪枝
 * - 當某個 Trie 節點是單字結尾時，就把目前路徑加入答案，並把 isEndOfWord 設成 false，避免重複加入相同單字
 * - 為了避免重複走訪同一格，先將 board[row][col] 暫時標記為 #，回溯後再恢復原值
 */

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let curr = this.root;
    for (const char of word) {
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
      }
      curr = curr.children.get(char)!;
    }

    curr.isEndOfWord = true;
  }
}

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}

class Solution {
  findWords(board: string[][], words: string[]): string[] {
    const result: string[] = [];

    // 初始化: 將所有單詞插入 Trie
    const trie = new Trie();
    for (const word of words) {
      trie.insert(word);
    }

    const m = board.length;
    const n = board[0].length;

    const backtrack = (
      row: number,
      col: number,
      node: TrieNode,
      path: string,
    ) => {
      // 檢查邊界條件
      if (
        row < 0 ||
        row >= m ||
        col < 0 ||
        col >= n ||
        board[row][col] === '#'
      ) {
        return;
      }

      const char = board[row][col];
      const currNode = node.children.get(char);
      if (!currNode) {
        return;
      }

      path += char;
      if (currNode.isEndOfWord) {
        result.push(path);
        currNode.isEndOfWord = false; // 避免重複添加
      }

      // 標記當前格子為已訪問
      board[row][col] = '#';

      // 探索四個方向
      const directions = [
        [0, 1], // 右
        [1, 0], // 下
        [0, -1], // 左
        [-1, 0], // 上
      ];

      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        backtrack(newRow, newCol, currNode, path);
      }

      // 回溯：恢復當前格子的原始值
      board[row][col] = char;

      // 如果當前節點沒有子節點 代表這個路徑已經沒有其他單詞可以形成了，可以刪除這個節點以節省空間
      if (currNode.children.size === 0) {
        node.children.delete(char);
      }
    };

    // 從每個格子開始進行回溯
    const root: TrieNode = trie.root;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        backtrack(i, j, root, '');
      }
    }

    return result;
  }
}

interface TestCase {
  board: string[][];
  words: string[];
  answer: string[];
}

const testCases: TestCase[] = [
  {
    board: [
      ['o', 'a', 'a', 'n'],
      ['e', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v'],
    ],
    words: ['oath', 'pea', 'eat', 'rain'],
    answer: ['eat', 'oath'],
  },
  {
    board: [
      ['a', 'b'],
      ['c', 'd'],
    ],
    words: ['abcb'],
    answer: [],
  },
];

testCases.forEach(({ board, words, answer }, index) => {
  const solution = new Solution();
  const result = solution.findWords(board, words);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: board = ${JSON.stringify(board)}, words = ${JSON.stringify(words)}`,
  );
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(answer)}`);
  console.log('-----------------------------');
});
