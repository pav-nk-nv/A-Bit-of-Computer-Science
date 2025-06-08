const pack = (row, column) => `${row}:${column}`;

const unpack = (cell) => cell.split(":").map((x) => Number(x));

const printPath = (path) => {
  const result = path.map((coordinate) => pack(...coordinate));
  return `=> You made it in ${
    result.length - 1
  } moves! Here's your path:\n${result.join("\n")}`;
};

const knightMoves = (start, end) => {
  const visited = new Set();

  const isValidNeighbour = (row, column) => {
    if (row < 0 || row > 7) return false;
    if (column < 0 || column > 7) return false;
    const cell = pack(row, column);
    if (visited.has(cell)) return false;
    return true;
  };

  let queue = new Map();
  const [x, y] = start;
  const initialCell = pack(x, y);
  queue.set(initialCell, [initialCell]);
  visited.add(initialCell);

  while (queue.size > 0) {
    const newQueue = new Map();

    const tryAddCell = (x, y, path) => {
      if (isValidNeighbour(x, y)) {
        const cell = pack(x, y);
        const newPath = [...path, cell];
        newQueue.set(cell, newPath);
        visited.add(cell);
      }
    };

    for (const [cell, path] of queue) {
      const [x, y] = unpack(cell);
      const [endX, endY] = end;
      if (x === endX && y === endY) {
        return path.map((coordinate) => unpack(coordinate));
      }

      const steps = [
        [x + 1, y + 2],
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x + 1, y - 2],
        [x - 1, y - 2],
        [x - 2, y - 1],
        [x - 2, y + 1],
        [x - 1, y + 2],
      ];

      steps.forEach((coordinate) => {
        const [x, y] = coordinate;
        tryAddCell(x, y, path);
      });
    }

    queue = newQueue;
  }

  return null;
};

console.log(printPath(knightMoves([0, 0], [3, 3])));
console.log(printPath(knightMoves([3, 3], [0, 0])));
console.log(printPath(knightMoves([0, 0], [7, 7])));
console.log(printPath(knightMoves([3, 3], [4, 3])));
