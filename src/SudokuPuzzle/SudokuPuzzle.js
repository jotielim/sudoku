import { getSingleBoard } from './board';

export default class SudokuPuzzle {
  /**
   * a means of populating the game board
   */
  setupBoard = () => {
    this.board = getSingleBoard();
  };

  /**
   * a means of checking the board to see if the puzzle has been successfully completed
   */
  checkBoard = () => {};

  /**
   * a player should be able to submit the puzzle at any time to have their progress checked
   */
  check = () => {
    this.unsolved = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const row = this.board[i * 3 + j];
        const col = this.board.map(row => row[i * 3 + j]);
        const box = this.getBox(i * 3, j * 3);

        for (let list of [row, col, box]) {
          const filteredList = list.filter(item => item !== 0);
          this.unsolved += list.length - filteredList.length;

          const set = new Set(filteredList);
          if (set.size !== filteredList.length) {
            return false;
          }
        }
      }
    }

    return true;
  };

  getBox(rowIndex, colIndex) {
    let startRow = Math.floor(rowIndex / 3) * 3;
    let startCol = Math.floor(colIndex / 3) * 3;
    const endRow = startRow + 3;
    const endCol = startCol + 3;

    const box = [];
    for (let i = startRow; i < endRow; i++) {
      Array.prototype.push.apply(box, this.board[i].slice(startCol, endCol));
    }

    return box;
  }

  /**
   * a player should be able to give up on the puzzle and have the solution revealed
   */
  solve = () => {};

  /**
   * a player should be able to restart the game at any time; restarting should reset
   * the board to the original state if you’ve implemented a single board, and should
   * reset the board to an entirely new board if you’ve implemented a board generator
   */
  restart = () => {};
}
