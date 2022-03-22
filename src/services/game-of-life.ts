export class GameOfLife {
  makeEmptyBoard = (rows: number, columns: number) => {
    let updatedBoard: any[][] = [];
    for (let y = 0; y < rows; y++) {
      updatedBoard[y] = [];
      for (let x = 0; x < columns; x++) {
        updatedBoard[y][x] = (Math.random() >= 0.5);
      }
    }
    return updatedBoard;
  };

  makeCells(rows: number, columns: number, board: any[][]) {
    let cells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        if (board[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  runIteration(rows: number, columns: number, board: any[][]) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        let neighbors = this.calculateNeighbors(rows, columns, board, x, y);
        if (board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            board[y][x] = true;
          } else {
            board[y][x] = false;
          }
        } else {
          if (!board[y][x] && neighbors === 3) {
            board[y][x] = true;
          }
        }
      }
    }
    return board;
  }

  calculateNeighbors(
    rows: number,
    columns: number,
    board: any[][],
    x: number,
    y: number
  ) {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];
      if (x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && board[y1] && board[y1][x1]) {
        neighbors++;
      }
    }
    return neighbors;
  }
}
