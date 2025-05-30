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

  rebalance() {
    if (!this.root) return this.root;
    const nodes = [];

    const iter = (root) => {
      if (root) {
        iter(root.left, nodes);
        nodes.push(root.value);
        iter(root.right, nodes);
      }
    };

    iter(this.root);

    return this.buildTree(nodes);
  }

  isBalanced() {
    if (!this.root) return this.root;

    const height = (node) => {
      if (!node) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    };

    let lHeight = height(root.left);
    let rHeight = height(root.right);
    if (Math.abs(lHeight - rHeight) > 1) return false;
    return isBalanced(root.left) && isBalanced(root.right);
  }

  depth(node) {
    if (!this.root) return this.root;
    if (!callback) throw new Error("Current node is required");

    const queue = [this.root];

    let currentLevel = 0;

    while (!queue.length) {
      const currNode = queue.shift();
      if (currNode.value === node.value) {
        return currentLevel;
      }
      if (currNode.left !== null) queue.push(currNode.left);
      if (currNode.right !== null) queue.push(currNode.right);
      currentLevel++;
    }

    return null;
  }

  height(node) {
    if (!this.root) return this.root;
    if (!callback) throw new Error("Current node is required");

    let nodeIndex = null;

    const queue = [this.root];

    let currentLevel = 0;

    while (!queue.length) {
      const currNode = queue.shift();
      if (currNode.value === node.value) {
        nodeIndex = currentLevel;
      }
      if (currNode.left !== null) queue.push(currNode.left);
      if (currNode.right !== null) queue.push(currNode.right);
      currentLevel++;
    }

    if (nodeIndex === null) return null;
    const height = currentLevel - nodeIndex;
    return height;
  }

  postOrder(callback) {
    if (!this.root) return this.root;
    if (!callback) throw new Error("Callback is required");

    const iter = (root) => {
      if (root) {
        iter(root.left);
        iter(root.right);
        callback(root);
      }
    };
    iter(this.root);
  }

  inOrder(callback) {
    if (!this.root) return this.root;
    if (!callback) throw new Error("Callback is required");

    const iter = (root) => {
      if (root) {
        iter(root.left);
        callback(root);
        iter(root.right);
      }
    };
    iter(this.root);
  }

  preOrder(callback) {
    if (!this.root) return this.root;
    if (!callback) throw new Error("Callback is required");

    const iter = (root) => {
      if (root) {
        callback(root);
        iter(root.left);
        iter(root.right);
      }
    };
    iter(this.root);
  }

  levelOrder(callback) {
    if (!this.root) return this.root;
    if (!callback) throw new Error("Callback is required");

    const queue = [this.root];

    let level = 1;
    let currentLevel = 0;

    while (!queue.length || currentLevel <= level) {
      const currentNode = queue.shift();
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
      callback(currentNode);
      currentLevel++;
    }
  }

  find(value) {
    if (this.root === null) return this.root;

    const searchNode = (root, value) => {
      if (!root) return null;

      if (root.value === value) return root;

      if (value < root.value) {
        return iter(root.left, value);
      }
      if (value > root.value) {
        return iter(root.right, value);
      }
    };

    return searchNode(this.root, value);
  }

  deleteItem(value) {
    const getSuccessor = (current) => {
      current = current.right;
      while (current !== null && current.left !== null) {
        current = current.left;
      }
      return current;
    };

    if (this.root === null) return this.root;

    const delNode = (root, value) => {
      if (!root) {
        return root;
      }

      if (value < root.value) {
        root.left = delNode(root.left, value);
      }
      if (value > root.value) {
        root.right = delNode(root.right, value);
      } else {
        if (!root.left && !root.right) {
          root = null;
          return root;
        }
        if (!root.left) {
          return root.right;
        }

        if (!root.right) return root.left;

        const succ = getSuccessor(root);
        root.value = succ.value;
        root.right = delNode(root.right, succ.value);
      }
      return root;
    };

    this.root = delNode(this.root, value);
    return this.root;
  }

  insert(value) {
    if (!this.root) {
      const root = new Node(value);
      this.root = root;
    }

    const insertNode = (root, value) => {
      if (root.value === value) return root;

      if (value < root.value) {
        root.left = insertNode(root.left, value);
      }
      if (value > root.value) {
        root.right = insertNode(root.right, value);
      }

      return root;
    };

    this.root = insertNode(this.root, value);
    return this.root;
  }

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
    if (!node) {
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

const newTree = new Tree();
