export { COLS, ROWS, BLOCK, ELEMENTS, COLORS };

const COLS = 10;
const ROWS = 20;
const BLOCK = 28;

const I = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const J = [
  [1, 0, 0],
  [1, 1, 1],
  [0, 0, 0],
];

const L = [
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0],
];

const O = [
  [1, 1],
  [1, 1],
];

const S = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0],
];

const T = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 0, 0],
];

const Z = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0],
];

const COLORS = {
  white: 'white',
  black: 'black',
  red: 'red',
  green: 'green',
  yellow: 'yellow',
  blue: 'blue',
  purple: 'purple',
  cyan: 'cyan',
  orange: 'orange',
};

const ELEMENTS = [
  [Z, COLORS.green],
  [J, COLORS.yellow],
  [I, COLORS.blue],
  [L, COLORS.purple],
  [O, COLORS.cyan],
  [T, COLORS.orange],
  [S, COLORS.red],
];