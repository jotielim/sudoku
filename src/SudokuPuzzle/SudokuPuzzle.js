import { getSingleBoard } from './board';

export default class SudokuPuzzle {
  // assumption that sudoku board is 9x9
  BOX_SIZE = 3;
  ROW_SIZE = 9
  COL_SIZE = 9

  /**
   * a means of populating the game board
   */
  setupBoard = () => {
    this.board = getSingleBoard();
  };

  /**
   * a means of checking the board to see if the puzzle has been successfully completed
   */
  checkBoard = () => {
    return this.check() && this.unsolved === 0;
  };

  /**
   * a player should be able to submit the puzzle at any time to have their progress checked
   */
  check = () => {
    this.unsolved = 0;

    for (let i = 0; i < this.BOX_SIZE; i++) {
      for (let j = 0; j < this.BOX_SIZE; j++) {
        const collections = [
          this.getRow(i * this.BOX_SIZE + j),
          this.getCol(i * this.BOX_SIZE + j),
          this.getBox(i * this.BOX_SIZE, j * this.BOX_SIZE)
        ];

        for (let list of collections) {
          const filteredList = list.filter(item => item !== 0);
          this.unsolved += list.length - filteredList.length;

          if (this.hasDuplicate(filteredList)) {
            return false;
          }
        }
      }
    }

    return true;
  };

  hasDuplicate = list => {
    const set = new Set(list);
    return set.size !== list.length;
  }

  getRow = rowIndex => this.board[rowIndex];

  getCol = colIndex => this.board.map(row => row[colIndex]);

  getBox(rowIndex, colIndex) {
    let startRow = Math.floor(rowIndex / this.BOX_SIZE) * this.BOX_SIZE;
    let startCol = Math.floor(colIndex / this.BOX_SIZE) * this.BOX_SIZE;
    const endRow = this.BOX_SIZE + startRow;
    const endCol = this.BOX_SIZE + startCol;

    const box = [];
    for (let i = startRow; i < endRow; i++) {
      Array.prototype.push.apply(box, this.board[i].slice(startCol, endCol));
    }

    return box;
  }

  getPossibleSolutions = (rowIndex, colIndex) => {
    const possibilities = Array.from({ length: this.ROW_SIZE }, (_, i) => i + 1);
    const set = new Set([
      ...this.getRow(rowIndex),
      ...this.getCol(colIndex),
      ...this.getBox(rowIndex, colIndex)
    ]);

    return possibilities.reduce((result, item) => {
      if (!set.has(item)) {
        result.push(item);
      }
      return result;
    }, []);
  };

  /**
   * a player should be able to give up on the puzzle and have the solution revealed
   */
  solve = () => {
    let solved = false;

    while (!solved) {
      solved = true;

      for (let i = 0; i < this.ROW_SIZE; i++) {
        for (let j = 0; j < this.COL_SIZE; j++) {
          const item = this.board[i][j];
          if (item === 0) {
            solved = false;
            const possibleSolutions = this.getPossibleSolutions(i, j);
            if (possibleSolutions.length === 1) {
              this.board[i][j] = possibleSolutions[0];
            }
          }
        }
      }
    }

    return this.board;
  };

  /**
   * a player should be able to restart the game at any time; restarting should reset
   * the board to the original state if you’ve implemented a single board, and should
   * reset the board to an entirely new board if you’ve implemented a board generator
   */
  restart = () => {
    this.setupBoard();
  };
}
