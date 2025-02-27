"use strict";

class Node {
  constructor(value) {
    this.value = value || null;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  append(value) {
    if (this.length === 0) {
      this.head = new Node(value);
    } else {
      let current = this.head;

      while (current.nextNode) {
        current = current.nextNode;
      }

      current.nextNode = new Node(value);
    }

    this.length++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (this.head) {
      let currentHead = this.head;
      this.head = newNode;
      this.head.nextNode = currentHead;
    } else {
      this.head = newNode;
    }
    this.length++;
  }

  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  tail() {
    if (this.length === 0) return null;

    let lastNode = this.head;

    while (lastNode.nextNode) {
      lastNode = lastNode.nextNode;
    }

    return lastNode;
  }

  pop() {
    if (this.length === 0) return null;
    let prev = null;
    let current = this.head;

    while (current.nextNode) {
      prev = current;
      current = current.nextNode;
    }
    prev.nextNode = null;
    this.length--;
  }

  toString() {
    let resultStr = "";
    if (this.length === 0) return "";

    let current = this.head;

    while (current.nextNode) {
      current = current.nextNode;
      resultStr += `( ${current.value} ) -> `;
    }

    return `( ${this.head.value} ) -> ${resultStr}null`;
  }

  at(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex <= index) {
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    return currentNode;
  }

  contains(value) {
    let currentNode = this.head;
    while (currentNode.nextNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  find(value) {
    let currentIndex = 0;
    let currentNode = this.head;
    if (currentNode.value === value) return 0;
    while (currentNode.nextNode) {
      if (currentNode.value === value) {
        return currentIndex;
      }
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
    return null;
  }

  insertAt(value, index) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let node = new Node(value);

    if (index === 0) {
      node.nextNode = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let prev = null;

      let currentIndex = 0;

      while (currentIndex < index) {
        prev = current;
        current = current.nextNode;
        currentIndex++;
      }

      prev.nextNode = node;
      node.nextNode = current;
    }

    this.length++;
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let current = this.head;

    if (index === 0) {
      this.head = current.nextNode;
    } else {
      let prev = null;
      let currentIndex = 0;

      while (currentIndex < index) {
        prev = current;
        current = current.nextNode;
        currentIndex++;
      }

      prev.nextNode = current.nextNode;
    }

    this.length--;
  }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());

list.prepend("lion");

console.log(list.size());

console.log(list.toString());

list.pop();

console.log(list.size());

console.log(list.toString());

console.log(list.contains("cat"));

list.insertAt("man", 2);

console.log(list.toString());

list.removeAt(1);

console.log(list.toString());
