import { getRow, getCol, getBoxCoord, getBox, hasDuplicate } from './utils';
import getSingleBoard from '../board';

describe('SudokuSolver', () => {
  describe('utils', () => {
    let board;

    beforeEach(() => {
      board = [
        [11, 12, 13, 14, 15, 16, 17, 18, 19],
        [21, 22, 23, 24, 25, 26, 27, 28, 29],
        [31, 32, 33, 34, 35, 36, 37, 38, 39],
        [41, 42, 43, 44, 45, 46, 47, 48, 49],
        [51, 52, 53, 54, 55, 56, 57, 58, 59],
        [61, 62, 63, 64, 65, 66, 67, 68, 69],
        [71, 72, 73, 74, 75, 76, 77, 78, 79],
        [81, 82, 83, 84, 85, 86, 87, 88, 89],
        [91, 92, 93, 94, 95, 96, 87, 98, 99]
      ];
    });

    describe('getRow', () => {
      it('should return row at index from the board', () => {
        const result = getRow(board, 3);
        expect(result).toEqual([41, 42, 43, 44, 45, 46, 47, 48, 49]);
      });
    });

    describe('getCol', () => {
      it('should return col at index from the board', () => {
        const result = getCol(board, 3);
        expect(result).toEqual([14, 24, 34, 44, 54, 64, 74, 84, 94]);
      });
    });

    describe('getBoxCoord', () => {
      it('should return the box coord using the default boxSize', () => {
        let result;

        result = getBoxCoord(1, 2);
        expect(result).toEqual({ startRow: 0, endRow: 3, startCol: 0, endCol: 3 });

        result = getBoxCoord(7, 5);
        expect(result).toEqual({ startRow: 6, endRow: 9, startCol: 3, endCol: 6 });

        result = getBoxCoord(5, 7);
        expect(result).toEqual({ startRow: 3, endRow: 6, startCol: 6, endCol: 9 });

        result = getBoxCoord(4, 4);
        expect(result).toEqual({ startRow: 3, endRow: 6, startCol: 3, endCol: 6 });
      });

      it('should return the box coord using different boxSize', () => {
        const result = getBoxCoord(4, 4, 2);
        expect(result).toEqual({ startRow: 4, endRow: 6, startCol: 4, endCol: 6 });
      });
    });

    describe('getBox', () => {
      it('should return the array in the box using default boxSize', () => {
        const result = getBox(board, 4, 4);
        expect(result).toEqual([44, 45, 46, 54, 55, 56, 64, 65, 66]);
      });

      it('should return the array in the box using different boxSize', () => {
        const result = getBox(board, 4, 4, 2);
        expect(result).toEqual([55, 56, 65, 66]);
      });
    });

    describe('hasDuplicate', () => {
      it('should return true if array items are NOT unique', () => {
        const result = hasDuplicate([3, 5, 1, 6, 9, 3]);
        expect(result).toBe(true);
      });

      it('should return false if array items are unique', () => {
        const result = hasDuplicate([3, 5, 1, 6, 9, 2]);
        expect(result).toBe(false);
      });
    });
  });
});
