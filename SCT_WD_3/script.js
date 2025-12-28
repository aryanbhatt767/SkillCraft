const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const modeBtn = document.getElementById("modeBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsComputer = false;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
modeBtn.addEventListener("click", toggleMode);

function handleClick() {
  const index = this.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  makeMove(index, currentPlayer);

  if (checkWinner()) return;

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (vsComputer && currentPlayer === "O") {
    setTimeout(computerMove, 400);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function computerMove() {
  const emptyCells = board
    .map((val, i) => val === "" ? i : null)
    .filter(i => i !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex, "O");

  if (checkWinner()) return;

  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `Player ${board[a]} wins!`;
      gameActive = false;
      return true;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return true;
  }
  return false;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
}

function toggleMode() {
  vsComputer = !vsComputer;
  modeBtn.textContent = vsComputer 
    ? "Mode: Player vs Computer" 
    : "Mode: Player vs Player";
  resetGame();
}
