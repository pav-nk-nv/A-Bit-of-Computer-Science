"use strict";

// The Fibonacci sequence

const fibs = (num) => {
  const result = [];
  for (let i = 0; i < num; i++) {
    if (i === 0) {
      result.push(0);
      continue;
    } else if (i === 1) {
      result.push(1);
    } else {
      result.push(result[result.length - 1] + result[result.length - 2]);
    }
  }
  return result;
};

const fibsRec = (num) => {
  const iter = (acc, index) => {
    console.log("This was printed recursively");
    if (index === num) return acc;
    if (index === 0) {
      return iter([0], 1);
    }
    if (index === 1) {
      return iter([...acc, 1], 2);
    }
    return iter([...acc, acc[acc.length - 1] + acc[acc.length - 2]], index + 1);
  };

  return iter([], 0);
};

console.log(fibs(8));
console.log(fibsRec(8));
