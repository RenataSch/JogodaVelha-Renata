const cells = document.querySelectorAll('[data-cell]');
const popup = document.getElementById('resultPopup');
const resultMessage = document.getElementById('resultMessage');
const closePopup = document.getElementById('closePopup');

let board = Array(9).fill('');
let isPlayerTurn = true;
const PLAYER = 'X';
const BOT = 'O';

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(cell, index));
});

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
  resetGame();
});

function handleClick(cell, index) {
  if (board[index] !== '' || !isPlayerTurn) return;

  cell.textContent = PLAYER;
  board[index] = PLAYER;
  isPlayerTurn = false;

  if (checkWin(PLAYER)) {
    showResult("Você venceu!");
    return;
  }

  if (isDraw()) {
    showResult("Empate!");
    return;
  }

  setTimeout(botMove, 500);
}

function botMove() {
  const emptyIndices = board.map((val, idx) => val === '' ? idx : null).filter(idx => idx !== null);
  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[randomIndex] = BOT;
  cells[randomIndex].textContent = BOT;

  if (checkWin(BOT)) {
    showResult("A máquina venceu!");
    return;
  }

  if (isDraw()) {
    showResult("Empate!");
    return;
  }

  isPlayerTurn = true;
}

function checkWin(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function isDraw() {
  return board.every(cell => cell !== '');
}

function showResult(message) {
  resultMessage.textContent = message;
  popup.classList.remove('hidden');
}

function resetGame() {
  board = Array(9).fill('');
  cells.forEach(cell => cell.textContent = '');
  isPlayerTurn = true;
}
