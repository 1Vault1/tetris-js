import '../style/style.scss';
import { COLS, ROWS, BLOCK, ELEMENTS, COLORS } from './constants';
import { drawBoard } from './board';
import Element from './ElementsGame';
export { board, score, scoreEl, gameOver, element, randomElement, scoreHolder, drawSquare };

const canvas = document.getElementById('tetris');
const ctx = canvas.getContext("2d");
const startGameEl = document.getElementById('startGame');
const scoreEl = document.getElementById('score');
const playerNameEl = document.getElementById('playerName');
const errorM = document.getElementById('errorM');
const scoreHolder = document.querySelector('.score-holder');

let playersList = [];

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(COLORS.black));
let element = randomElement();
let score = 0;
let dropStart = Date.now();
let gameOver = false;

document.addEventListener('keydown', onKeyDown);
startGameEl.addEventListener('click', onStartGameClick);

init();

function init() {
  drawBoard();
  restoreData();
  renderPlayers();
}

function onStartGameClick() {
  if (!valid()) {
    addClass(errorM, 'vissible');
  } else {
    startGame();
    startGameEl.disabled = true;
    drop();
    removeClass(errorM, 'vissible');
  }
}

function startGame() {
  const obj = {
    id: Date.now(),
    name: playerNameEl.value,
    scorePlayer: score,
  };

  addPlayer(obj);
  resetInput();
}

function addPlayer(obj) {
  playersList.push(obj);
  saveDate();
  renderPlayer(obj);
}

function renderPlayer(obj) {
  let template = `<p class='player' data-id='{{id}}'>{{name}}: 
                    <span class='scorePlayer'>{{scorePlayer}}</span>
                  </p>`;

  const html = Object.keys(obj).reduce((template, key) => template.replace('{{' + key + '}}', obj[key]), template);

  return scoreHolder.insertAdjacentHTML('beforeEnd', html);
}

function renderPlayers() {
  playersList.forEach((player) => renderPlayer(player));
}

function valid() {
  return !gameOver && playerNameEl.value != '';
}

function resetInput() {
  return playerNameEl.value = '';
}

function addClass(el, classItem) {
  el.classList.add(classItem);
}

function removeClass(el, classItem) {
  el.classList.remove(classItem);
}

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);

  ctx.strokeStyle = COLORS.white;
  ctx.strokeRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
}

function randomElement() {
  let random = Math.floor(Math.random() * ELEMENTS.length);
  return new Element(ELEMENTS[random][0], ELEMENTS[random][1], drawSquare);
}

function onKeyDown(e) {
  switch (true) {
    case gameOver === true && getAllKey(e):
      e.preventDefault();
      break;
    case e.keyCode == 37:
      element.moveLeft();
      break;
    case e.keyCode == 38:
      element.rotate();
      break;
    case e.keyCode == 39:
      element.moveRight();
      break;
    case e.keyCode == 40:
      element.moveDown();
      break;
  }
}

function getAllKey(e) {
  return e.keyCode == 40 || e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 37;
}

function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > 1000) {
    element.moveDown();
    dropStart = Date.now();
  }
  if (!gameOver) {
    requestAnimationFrame(drop);
  } else {
    getScorePlayer();
  }
}

function getScorePlayer() {
  const scorePlayer = document.querySelectorAll('.scorePlayer');
  const scorePlayerArr = Array.from(scorePlayer);

  let lastEl = scorePlayerArr[scorePlayerArr.length - 1];
  lastEl.innerHTML = score;
  changeData();
}

function saveDate() {
  localStorage.setItem('playersList', JSON.stringify(playersList));
}

function restoreData() {
  const data = localStorage.getItem('playersList');
  playersList = data ? JSON.parse(data) : [];
}

function changeData() {
  const data = localStorage.getItem('playersList');
  playersList = data ? JSON.parse(data) : [];

  let lastEl = playersList[playersList.length - 1];
  lastEl.scorePlayer = score;

  localStorage.setItem('playersList', JSON.stringify(playersList));
}
