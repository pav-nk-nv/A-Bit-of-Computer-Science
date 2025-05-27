class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  insert(value) {}

  deleteItem(value) {}

  find(value) {}

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}

  buildTree(array) {
    const normalizedArray = Array.from(new Set(array)).sort((a, b) => a - b);

    const generateTree = (arr, startIdx, endIdx) => {
      if (endIdx <= startIdx) return null;
      const midIdx = startIdx + Math.floor((endIdx - startIdx) / 2);

      const root = new Node(arr[midIdx]);

      root.left = generateTree(arr, startIdx, midIdx - 1);

      root.right = generateTree(arr, midIdx + 1, endIdx);

      return root;
    };

    this.root = generateTree(normalizedArray, 0, normalizedArray.length - 1);
    return this.root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
