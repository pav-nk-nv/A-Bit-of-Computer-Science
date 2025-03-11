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

  insert(value) {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
      return;
    }

    const iter = (current) => {
      if (value < current.value) {
        if (current.left === null) {
          current.left = node;
          return;
        } else {
          return iter(current.left);
        }
      }
      if (value > current.value) {
        if (current.right === null) {
          current.right = node;
          return;
        } else {
          return iter(current.right);
        }
      }
      return null;
    };

    return iter(this.root);
  }

  deleteItem(value) {
    const iter = (current, value) => {
      if (current === null) return null;

      if (value < current.value) {
        current.left = iter(current.left, value);
      }
      if (value > current.value) {
        current.right = iter(current.right, value);
      } else {
        if (current.left === null && current.right === null) return null;
        if (current.left === null) return current.right;
        if (current.right === null) return current.left;
        let replacement = current.left;
        let replacementParent = current;

        while (replacementParent.right !== null) {
          replacementParent = replacement;
          replacement = replacement.right;
        }
        current.value = replacementParent.value;
        current.left = iter(current.left, replacementParent.value);
      }
      return current;
    };

    this.root = iter(this.root, value);
  }

  buildTree(array) {
    if (this.root) {
      this.root = null;
    }
    const normalizedArray = [...new Set(array)];
    const [firstValue, ...rest] = normalizedArray;
    const node = new Node(firstValue);
    this.root = node;

    rest.forEach((value) => {
      this.insert(value);
    });
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  find(value) {
    const iter = (current) => {
      if (current === null) return null;
      if (value < current.value) return iter(current.left);
      if (value > current.value) return iter(current.right);
      return current;
    };
    return iter(this.root);
  }

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {
    if (!node) {
      return 0;
    }

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}
