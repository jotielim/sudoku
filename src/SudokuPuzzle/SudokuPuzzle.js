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
  check = () => {};

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
