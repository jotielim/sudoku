export const getRow = (board, rowIndex) => board[rowIndex];

export const getCol = (board, colIndex) => board.map(row => row[colIndex]);

export const getBoxCoord = (rowIndex, colIndex, boxSize = 3) => {
  let startRow = Math.floor(rowIndex / boxSize) * boxSize;
  let startCol = Math.floor(colIndex / boxSize) * boxSize;

  const endRow = boxSize + startRow;
  const endCol = boxSize + startCol;

  return {
    startRow,
    endRow,
    startCol,
    endCol
  };
};

export const getBox = (board, rowIndex, colIndex, boxSize = 3) => {
  const { startRow, endRow, startCol, endCol } = getBoxCoord(rowIndex, colIndex, boxSize);

  const box = [];
  for (let i = startRow; i < endRow; i++) {
    Array.prototype.push.apply(box, board[i].slice(startCol, endCol));
  }

  return box;
};

export const hasDuplicate = list => {
  const set = new Set(list);
  return set.size !== list.length;
};
