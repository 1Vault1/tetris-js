import { COLS, ROWS, COLORS } from './constants';
import { board, score, scoreEl, drawBoard, gameOver, element, randomElement, scoreHolder } from './app';

export default class Element {
  constructor(element, color, drawSquare) {
    this.x = 3;
    this.y = -2;
    this.activeElement = element;
    this.color = color;
    this.drawSquare = drawSquare;
  }

  fill(color) {
    this.activeElement.forEach((row, r) => {
      return row.forEach((value, c) => {
        if (value) {
          this.drawSquare(this.x + c, this.y + r, color);
        }
      });
    });
  }

  draw() {
    this.fill(this.color);
  }

  unDraw() {
    this.fill(COLORS.black);
  }

  moveDown() {
    if (!this.collision(0, 1, this.activeElement)) {
      this.unDraw();
      this.y++;
      this.draw();
    } else {
      this.lock();
      element = randomElement();
    }
  }

  moveRight() {
    if (!this.collision(1, 0, this.activeElement)) {
      this.unDraw();
      this.x++;
      this.draw();
    }
  }

  moveLeft() {
    if (!this.collision(-1, 0, this.activeElement)) {
      this.unDraw();
      this.x--;
      this.draw();
    }
  }

  rotate() {
    this.rotateActiveEl = [];

    this.activeElement.forEach((el, i) => {
      let row = this.activeElement.map(el => el[i]).reverse();
      return this.rotateActiveEl.push(row);
    });

    this.unDraw();
    this.activeElement = this.rotateActiveEl;
    this.draw();
  }

  collision(x, y, element) {
    for (let r = 0; r < element.length; r++) {
      for (let c = 0; c < element.length; c++) {
        if (!element[r][c]) {
          continue;
        }

        let newX = this.x + c + x;
        let newY = this.y + r + y;

        if (newX < 0 || newX >= COLS || newY >= ROWS) {
          return true;
        }

        if (newY < 0) {
          continue;
        }

        if (board[newY][newX] != COLORS.black) {
          return true;
        }
      }
    }
    return false;
  }

  lock() {
    for (let r = 0; r < this.activeElement.length; r++) {
      for (let c = 0; c < this.activeElement.length; c++) {
        if (!this.activeElement[r][c]) {
          continue;
        }
        if (this.y + r < 0) {
          this.gameOver();
          break;
        }
        board[this.y + r][this.x + c] = this.color;
      }
    }
    this.removeLine();
    drawBoard();

    this.getScore(scoreEl, score);
  }

  getScore(el, score) {
    el.innerHTML = score;
  }

  removeLine() {
    board.forEach((row, r) => {
      let isRowFull = true;

      row.forEach((value) => {
        isRowFull = isRowFull && (value != COLORS.black);
      });

      if (isRowFull) {
        for (let y = r; y > 1; y--) {
          for (let c = 0; c < COLS; c++) {
            board[y][c] = board[y - 1][c];
          }
        }

        for (let c = 0; c < COLS; c++) {
          board[0][c] = COLORS.black;
        }

        score += 10;
      }
    });
  }

  gameOver() {
    scoreHolder.insertAdjacentHTML('beforeEnd', this.getTextGameOver());
    gameOver = true;
  }

  getTextGameOver() {
    return `<p class="gameOver">GAME OVER</p>`;
  }
}