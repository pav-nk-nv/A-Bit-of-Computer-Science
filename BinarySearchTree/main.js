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

  rebalance = () => {
    if (this.root === null) return null;
    const nodes = [];

    const iter = (root) => {
      if (root !== null) {
        iter(root.left, nodes);
        nodes.push(root.value);
        iter(root.right, nodes);
      }
    };

    iter(this.root);

    this.buildTree(nodes);
  };

  isBalanced = () => {
    if (this.root === null) return null;

    const height = (node) => {
      if (node === null) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    };

    const iter = (root) => {
      if (root === null) return true;

      let lHeight, rHeight;
      lHeight = height(root.left);
      rHeight = height(root.right);
      if (Math.abs(lHeight - rHeight) > 1) return false;
      return iter(root.left) && iter(root.right);
    };

    return iter(this.root);
  };

  depth = (value) => {
    if (!this.root) return null;

    const queue = [{ node: this.root, currentDepth: 0 }];

    while (queue.length) {
      const { node, currentDepth } = queue.shift();

      if (node.value === value) {
        return currentDepth;
      }

      if (node.left) {
        queue.push({ node: node.left, currentDepth: currentDepth + 1 });
      }
      if (node.right) {
        queue.push({ node: node.right, currentDepth: currentDepth + 1 });
      }
    }

    return null;
  };

  height = (value) => {
    if (this.root === null) return this.root;

    const curr = this.find(value);
    if (!curr) return null;

    const calculateHeight = (node) => {
      if (!node) return -1;
      const leftHeight = calculateHeight(node.left);
      const rightHeight = calculateHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };

    return calculateHeight(curr);
  };

  postOrder = (callback) => {
    if (!this.root) return this.root;
    if (!callback) throw new Error("Callback is required");

    const iter = (root) => {
      if (root !== null) {
        iter(root.left);
        iter(root.right);
        callback(root);
      }
    };
    iter(this.root);
  };

  inOrder = (callback) => {
    if (!this.root) return this.root;
    if (!callback) throw new Error("Callback is required");

    const iter = (root) => {
      if (root !== null) {
        iter(root.left);
        callback(root);
        iter(root.right);
      }
    };
    iter(this.root);
  };

  preOrder = (callback) => {
    if (!this.root) return this.root;
    if (!callback) throw new Error("Callback is required");

    const iter = (root) => {
      if (root !== null) {
        callback(root);
        iter(root.left);
        iter(root.right);
      }
    };
    iter(this.root);
  };

  levelOrder = (callback, level) => {
    if (this.root === null) return this.root;
    if (!callback) throw new Error("Callback is required");

    const queue = [this.root];

    let currentLevel = 0;

    while (queue.length) {
      const currentNode = queue.shift();
      if (currentLevel <= level) {
        if (currentNode.left !== null) queue.push(currentNode.left);
        if (currentNode.right !== null) queue.push(currentNode.right);
        currentLevel++;
      }
      callback(currentNode);
    }
  };

  find = (value) => {
    if (this.root === null) return this.root;

    const searchNode = (root, value) => {
      if (root === null) return null;

      if (root.value === value) return root;

      if (value < root.value) {
        return searchNode(root.left, value);
      }
      if (value > root.value) {
        return searchNode(root.right, value);
      }
    };

    return searchNode(this.root, value);
  };

  deleteItem = (value) => {
    const getSuccessor = (current) => {
      current = current.right;
      while (current !== null && current.left !== null) {
        current = current.left;
      }
      return current;
    };

    if (this.root === null) return this.root;

    const delNode = (root, value) => {
      if (root === null) {
        return root;
      }

      if (value < root.value) {
        root.left = delNode(root.left, value);
      } else if (value > root.value) {
        root.right = delNode(root.right, value);
      } else {
        if (root.left === null) {
          return root.right;
        }

        if (root.right === null) {
          return root.left;
        }

        const succ = getSuccessor(root);
        root.value = succ.value;
        root.right = delNode(root.right, succ.value);
      }
      return root;
    };

    this.root = delNode(this.root, value);
  };

  insert = (value) => {
    if (!this.root) {
      const root = new Node(value);
      this.root = root;
    }

    const insertNode = (root, value) => {
      if (root === null) return new Node(value);

      if (root.value === value) return root;

      if (value < root.value) {
        root.left = insertNode(root.left, value);
      } else if (value > root.value) {
        root.right = insertNode(root.right, value);
      }
      return root;
    };

    this.root = insertNode(this.root, value);
  };

  buildTree = (array) => {
    const normalizedArray = Array.from(new Set(array)).sort((a, b) => a - b);

    const generateTree = (arr, startIdx, endIdx) => {
      if (endIdx < startIdx) return null;
      const midIdx = startIdx + Math.floor((endIdx - startIdx) / 2);

      const root = new Node(arr[midIdx]);

      root.left = generateTree(arr, startIdx, midIdx - 1);

      root.right = generateTree(arr, midIdx + 1, endIdx);

      return root;
    };

    this.root = generateTree(normalizedArray, 0, normalizedArray.length - 1);
  };

  prettyPrint = (prefix = "", isLeft = true) => {
    const iter = (node, prefix = "", isLeft = true) => {
      if (!node) {
        return;
      }
      if (node.right !== null) {
        iter(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
      if (node.left !== null) {
        iter(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };

    return iter(this.root, prefix, isLeft);
  };
}

// tests

const test = new Tree();

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 44, 55];

test.buildTree(testArr);

console.log(test.isBalanced());

test.prettyPrint();

test.insert(203);
test.insert(102);
test.insert(340);
test.insert(500);

console.log(test.isBalanced());

test.prettyPrint();

test.deleteItem(102);
test.deleteItem(5);
test.deleteItem(7);
test.deleteItem(340);

test.prettyPrint();

const node_203 = test.find(203);
const node_9 = test.find(9);

console.log(node_203);
console.log(node_9);

test.levelOrder((node) => {
  node.value = node.value * 2;
}, 1);

test.prettyPrint();

test.preOrder((node) => {
  node.value = node.value * 3;
}, 1);

test.prettyPrint();

test.inOrder((node) => {
  node.value = node.value * 4;
}, 1);

test.prettyPrint();

test.postOrder((node) => {
  node.value = node.value * 5;
}, 1);

test.prettyPrint();

console.log(test.isBalanced());

test.rebalance();

test.prettyPrint();
