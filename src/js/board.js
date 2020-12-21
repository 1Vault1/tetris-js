import { board, drawSquare } from './app';
export { drawBoard };

function drawBoard() {
  board.forEach((row, r) => {
    return row.forEach((value, c) => {
      return drawSquare(c, r, value);
    });
  });
}