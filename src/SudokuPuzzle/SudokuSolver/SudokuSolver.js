import { getRow, getCol, getBox, hasDuplicate } from './utils';

class Cell {
  constructor(board, rowIndex, colIndex, value, boxSize = 3) {
    this.board = board;
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.value = value;
    this.stateIndex = 0;
    this.boxSize = boxSize;

    this.solved = value > 0;
    this.editable = value === 0;
    this.possibleSolutions = this.editable
        ? this.getPossibleSolutions(rowIndex, colIndex)
        : [];

    // Freebie. Only have 1 possible solution
    if (this.possibleSolutions.length === 1) {
      this.solved = true;
      this.value = this.possibleSolutions[this.stateIndex];
    }
  }

  getPossibleSolutions = (rowIndex, colIndex) => {
    const { board, boxSize } = this;
    const possibilities = Array.from({ length: boxSize * boxSize }, (_, i) => i + 1);
    const set = new Set([
      ...getRow(board, rowIndex),
      ...getCol(board, colIndex),
      ...getBox(board, rowIndex, colIndex, boxSize)
    ]);

    return possibilities.reduce((result, item) => {
      if (!set.has(item)) {
        result.push(item);
      }
      return result;
    }, []);
  };

  _getCollections = () => {
    const { board, rowIndex, colIndex, boxSize } = this;
    return [
      getRow(board, rowIndex),
      getCol(board, colIndex),
      getBox(board, rowIndex, colIndex, boxSize)
    ];
  }

  isValid = () => {
    const { board, rowIndex, colIndex, boxSize } = this;
    const collections = [
      [...getRow(board, rowIndex), this.value],
      [...getCol(board, colIndex), this.value],
      [...getBox(board, rowIndex, colIndex, boxSize), this.value]
    ];

    return this._isValid(collections);
  };

  _isValid = (collections) => {
    for (let list of collections) {
      var filteredList = list.filter(item => item !== 0);
      if (hasDuplicate(filteredList)) {
        return false;
      }
    }

    return true;
  }

  hasNext = () => {
    return this.stateIndex < this.possibleSolutions.length - 1;
  };

  getValidCellValue = () => {
    const collections = this._getCollections();
    this.value = this.possibleSolutions[this.stateIndex];

    while (!this._isValid(collections.map(list => [...list, this.value]))) {
      if (!this.hasNext()) {
        return null;
      }
      this.stateIndex += 1;
      this.value = this.possibleSolutions[this.stateIndex];
    }

    return this.value;
  };

  reset = () => {
    this.stateIndex = 0;
    this.value = 0;
  };
}

/**
 * Sudoku solver using brute force approach
 * Using DFS to try to find solution and backtrack when there are no more possibilities
 */
export default class SudokuSolver {
  constructor(board, boxSize = 3) {
    this.board = board;
    this.boxSize = boxSize;

    const { solved, unsolved } = this.getCells(board, boxSize);
    // Update the board with the freebies
    solved.forEach(cell => {
      this.board[cell.rowIndex][cell.colIndex] = cell.value;
    });
    // unsolved cells to find solutions
    this.cells = unsolved;
  }

  getCells = (board, boxSize) => {
    const solved = [];
    const unsolved = [];
    for (const [rowIndex, row] of board.entries()) {
      for (const [colIndex, value] of row.entries()) {
        if (value === 0) {
          const cell = new Cell(board, rowIndex, colIndex, value, boxSize);
          if (cell.solved) {
            solved.push(cell);
          } else {
            unsolved.push(cell);
          }
        }
      }
    }
    return {
      solved,
      unsolved
    };
  };

  backtrack = (cell, pos) => {
    // reset this cell and board value
    cell.reset();
    this.board[cell.rowIndex][cell.colIndex] = cell.value;

    // we already backtracked to the first cell
    if (pos === 0) {
      return -1;
    }

    // get previous cell and check if there is any more possibilities we can try
    const prevCell = this.cells[pos - 1];
    if (prevCell.hasNext()) {
      prevCell.stateIndex += 1;
      return pos - 1;
    } else {
      return this.backtrack(prevCell, pos - 1);
    }
  };

  getNext = (cell, pos) => {
    // check if current cell is solved
    // if solved, then increment
    // if not solved, find if there is a valid value to increment. Otherwise, backtrack
    if (cell.solved) {
      return pos + 1;
    } else {
      const value = cell.getValidCellValue();
      if (value === null) {
        return this.backtrack(cell, pos);
      } else {
        this.board[cell.rowIndex][cell.colIndex] = cell.value;
        return pos + 1;
      }
    }
  };

  solve = () => {
    let pos = 0;
    let cell = this.cells[pos];
    while (cell !== undefined && pos >= 0) {
      pos = this.getNext(cell, pos);
      cell = this.cells[pos];
    }

    if (pos < 0) {
      throw new Error('Unable to find solution');
    }

    return this.board;
  };
}
