/**
 * 題號： 127
 * 題目： Word Ladder
 * 連結： https://leetcode.com/problems/word-ladder/description/
 * 時間複雜度：O(N * L^2)
 * - BFS 最多會把字典中的每個單字都走訪一次，N 是 wordList 的長度。
 * - 對每個單字都要嘗試 L 個位置、每個位置替換 26 個字母；每次切字串與組合新單字都要 O(L)，因此總共是 O(N * L^2)。
 * 空間複雜度：O(N * L)
 * - wordSet 與 queue 最多都會儲存字典中的單字，單字長度為 L，因此額外空間是 O(N * L)。
 * 解題思路：
 * - 先把 wordList 轉成 Set，讓我們能用 O(1) 檢查某個候選單字是否存在。
 * - 使用 BFS 從 beginWord 一層一層往外擴展，因為題目要找的是最短轉換步數，BFS 可以保證第一次到達 endWord 時就是答案。
 * - 對目前單字的每個字元位置，依序替換成 a 到 z 的所有字母，產生所有可能的下一步單字。
 * - 只要候選單字存在於 wordSet，就加入 queue，並立刻從 wordSet 刪除，避免重複走訪與重複入隊。
 * - 當 BFS 掃到 endWord 時，回傳目前層數；如果整個搜尋結束都沒找到，就回傳 0。
 */

class Solution {
  ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) {
      return 0;
    }

    // BFS 層序遍歷
    const queue: string[] = [beginWord];
    let level = 1;
    wordSet.delete(beginWord); // 避免重複訪問
    while (queue.length > 0) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const currentWord = queue.shift()!;
        if (currentWord === endWord) {
          return level;
        }

        for (let j = 0; j < currentWord.length; j++) {
          for (let c = 97; c <= 122; c++) {
            // ASCII 'a' to 'z'
            const newWord =
              currentWord.slice(0, j) +
              String.fromCharCode(c) +
              currentWord.slice(j + 1);
            if (wordSet.has(newWord)) {
              queue.push(newWord);
              wordSet.delete(newWord); // 避免重複訪問
            }
          }
        }
      }

      // 進入下一層
      level++;
    }

    return 0;
  }
}

interface TestCase {
  beginWord: string;
  endWord: string;
  wordList: string[];
  answer: number;
}

const testCases: TestCase[] = [
  {
    beginWord: 'hit',
    endWord: 'cog',
    wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'],
    answer: 5,
  },
  {
    beginWord: 'hit',
    endWord: 'cog',
    wordList: ['hot', 'dot', 'dog', 'lot', 'log'],
    answer: 0,
  },
];

testCases.forEach(({ beginWord, endWord, wordList, answer }, index) => {
  const sol = new Solution();
  const result = sol.ladderLength(beginWord, endWord, wordList);

  console.log(`Case ${index + 1}:`);
  console.log(
    `Input: beginWord = ${beginWord}, endWord = ${endWord}, wordList = ${JSON.stringify(wordList)}`,
  );
  console.log(`Output: ${result}`);
  console.log(`Expected: ${answer}`);
  console.log(`------------------------------`);
});
