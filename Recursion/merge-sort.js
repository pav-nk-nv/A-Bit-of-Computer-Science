"use strict";

// Merge sorting

const merge = (arr1, arr2) => {
  const sortedArr = [];

  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      sortedArr.push(arr1.shift());
    } else {
      sortedArr.push(arr2.shift());
    }
  }

  return [...sortedArr, ...arr1, ...arr2];
};

const mergeSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);

  const leftHalf = mergeSort(arr.slice(0, mid));
  const rightHalf = mergeSort(arr.slice(mid));

  return merge(leftHalf, rightHalf);
};

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));
