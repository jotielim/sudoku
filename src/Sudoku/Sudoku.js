import React from 'react';
import cx from 'classnames';
import SudokuPuzzle from '../SudokuPuzzle';
import styles from './Sudoku.module.css';

export default class Sudoku extends React.PureComponent {
  state = {
    board: null
  };

  constructor(props) {
    super(props);

    this.sudoku = new SudokuPuzzle();
    this.sudoku.setupBoard();

    const board = this.initializeBoard();
    this.state = {
      board
    };
  }

  initializeBoard = () => {
    return this.sudoku.board.map(row => {
      return row.map(value => ({
        value,
        error: false,
        readOnly: value !== 0
      }));
    });
  }

  onChange = (e) => {
    const rowIndex = parseInt(e.currentTarget.dataset.row, 10);
    const colIndex = parseInt(e.currentTarget.dataset.col, 10);
    const value = parseInt(e.currentTarget.value, 10) || 0;
    this.sudoku.setCellValue(rowIndex, colIndex, value);

    this.setState(state => {
      const updatedCell = {
        ...state.board[rowIndex][colIndex],
        value: this.sudoku.board[rowIndex][colIndex],
        error: (value === 0) ? false : !this.sudoku.isCellValid(rowIndex, colIndex)
      };
      const board = state.board.map((row, rIndex) => {
        return row.map((cell, cIndex) => {
          return (rIndex === rowIndex && cIndex === colIndex) ? updatedCell : cell;
        });
      });

      return {
        board
      };
    });
  };

  onSolveButtonClick = () => {
    this.sudoku.solve();

    this.setState(state => {
      const board = state.board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => ({
          ...cell,
          value: this.sudoku.board[rowIndex][colIndex]
        }));
      });

      return {
        board
      };
    });
  };

  onResetButtonClick = () => {
    this.sudoku.restart();

    this.setState({
      board: this.initializeBoard()
    });
  };

  render() {
    const { board } = this.state;
    return (
      <article>
        <h3>Sudoku</h3>

        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((cell, colIndex) => {
                return (
                  <span key={colIndex} className={cx({
                    [styles.cell]: true,
                    [styles.error]: cell.error,
                    [styles.readonly]: cell.readOnly
                  })}>
                    <input type="number"
                        defaultValue={cell.value !== 0 ? cell.value : null}
                        readOnly={cell.readOnly}
                        onChange={this.onChange}
                        data-row={rowIndex}
                        data-col={colIndex} />
                  </span>
                );
              })}
            </div>
          );
        })}

        <div className={styles.btnGroup}>
          <button type="button" onClick={this.onSolveButtonClick}>Solve</button>
          <button type="button" onClick={this.onResetButtonClick}>Reset</button>
        </div>
      </article>
    );
  }
}
