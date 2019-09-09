import { getSingleBoard } from './board';
import SudokuSolver from './SudokuSolver';

export default class SudokuPuzzle {
  // assumption that sudoku board is 9x9
  BOX_SIZE = 3;

  /**
   * a means of populating the game board
   */
  setupBoard = () => {
    this.board = getSingleBoard();

    this.solver = new SudokuSolver(this.board, this.BOX_SIZE);
  };

  /**
   * a means of checking the board to see if the puzzle has been successfully completed
   */
  checkBoard = () => {
    return this.solver.isSolved();
  };

  /**
   * a player should be able to submit the puzzle at any time to have their progress checked
   */
  check = () => {
    return this.solver.isValid();
  };

  /**
   * a player should be able to give up on the puzzle and have the solution revealed
   */
  solve = () => {
    this.solver.solve();
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

  setCellValue = (...args) => this.solver.setCellValue(...args);

  isCellValid = (...args) => this.solver.isCellValid(...args);
}
