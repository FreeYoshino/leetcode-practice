/**
 * 題號： 208
 * 標題： Implement Trie (Prefix Tree)
 * 連結： https://leetcode.com/problems/implement-trie-prefix-tree/description/
 * 時間複雜度： O(m)
 * - m 為操作字串的長度
 * - insert、search、startsWith 都只需要沿著 Trie 逐字元往下走一次
 * - 每個字元只會做一次 Map 查找與必要的節點建立，所以時間複雜度都是 O(m)
 * 空間複雜度： O(n)
 * - n 為所有插入字串的總字元數
 * - Trie 會為每個不同的前綴建立節點，最壞情況下需要儲存所有字元形成的節點
 * 解題思路：
 * 1. 使用 TrieNode 作為每個節點，節點內用 Map 儲存下一層字元對應的子節點
 * 2. insert 時從 root 開始依序走訪字串字元，若子節點不存在就建立新節點，最後把目前節點標記為字尾
 * 3. search 時同樣依序走訪字元，若中途找不到子節點就直接回傳 false，走完後再確認是否為字尾
 * 4. startsWith 的流程和 search 相同，但只要前綴能完整走完就回傳 true
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

  search(word: string): boolean {
    let curr = this.root;
    for (const char of word) {
      if (!curr.children.has(char)) {
        return false;
      }
      curr = curr.children.get(char)!;
    }

    return curr.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let curr = this.root;
    for (const char of prefix) {
      if (!curr.children.has(char)) {
        return false;
      }
      curr = curr.children.get(char)!;
    }

    return true;
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
