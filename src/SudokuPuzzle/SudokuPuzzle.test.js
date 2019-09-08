import SudokuPuzzle from './SudokuPuzzle';

describe('SudokuPuzzle', () => {
  let puzzle;
  beforeEach(() => {
    puzzle = new SudokuPuzzle();
  });

  describe('setupBoard', () => {
    it('should setup new board', () => {
      expect(puzzle.board).toBeUndefined();
      puzzle.setupBoard();
      expect(puzzle.board).toBeDefined();
    });
  });

  describe('checkBoard', () => {});

  describe('check', () => {
    it('should return false if the given board is invalid', () => {
      puzzle.board = [
        [5, 3, 3, 0, 7, 0, 0, 0, 0], // invalid
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ];
      const result = puzzle.check();
      expect(result).toBe(false);
    });

    it('should return true if the given board is valid', () => {
      puzzle.board = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ];
      const result = puzzle.check();
      expect(result).toBe(true);
    });
  });

  describe('solve', () => {});

  describe('restart', () => {});
});
