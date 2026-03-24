# [71. Simplify Path](https://leetcode.com/problems/simplify-path/description/)

You are given an absolute path for a Unix-style file system, which always begins with a slash <code>'/'</code>. Your task is to transform this absolute path into its **simplified canonical path** .

The rules of a Unix-style file system are as follows:

- A single period <code>'.'</code> represents the current directory.
- A double period <code>'..'</code> represents the previous/parent directory.
- Multiple consecutive slashes such as <code>'//'</code> and <code>'///'</code> are treated as a single slash <code>'/'</code>.
- Any sequence of periods that does **not match**  the rules above should be treated as a **valid directory or**  **file ** **name** . For example, <code>'...' </code>and <code>'....'</code> are valid directory or file names.

The simplified canonical path should follow these rules:

- The path must start with a single slash <code>'/'</code>.
- Directories within the path must be separated by exactly one slash <code>'/'</code>.
- The path must not end with a slash <code>'/'</code>, unless it is the root directory.
- The path must not have any single or double periods (<code>'.'</code> and <code>'..'</code>) used to denote current or parent directories.

Return the **simplified canonical path** .

**Example 1:** 

<div class="example-block">
Input: path = "/home/"

Output: "/home"

Explanation:

The trailing slash should be removed.

**Example 2:** 

<div class="example-block">
Input: path = "/home//foo/"

Output: "/home/foo"

Explanation:

Multiple consecutive slashes are replaced by a single one.

**Example 3:** 

<div class="example-block">
Input: path = "/home/user/Documents/../Pictures"

Output: "/home/user/Pictures"

Explanation:

A double period <code>".."</code> refers to the directory up a level (the parent directory).

**Example 4:** 

<div class="example-block">
Input: path = "/../"

Output: "/"

Explanation:

Going one level up from the root directory is not possible.

**Example 5:** 

<div class="example-block">
Input: path = "/.../a/../b/c/../d/./"

Output: "/.../b/d"

Explanation:

<code>"..."</code> is a valid name for a directory in this problem.

**Constraints:** 

- <code>1 <= path.length <= 3000</code>
- <code>path</code> consists of English letters, digits, period <code>'.'</code>, slash <code>'/'</code> or <code>'_'</code>.
- <code>path</code> is a valid absolute Unix path.