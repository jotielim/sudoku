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

  describe('check', () => {});

  describe('solve', () => {});

  describe('restart', () => {});
});
