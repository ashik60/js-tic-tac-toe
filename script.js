let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// GAme messages
const winningMessage = () => `Winner ${currentPlayer}!!!`;
const drawMessage = () => `Game draw!`;
const currentPlayerTurn = () => `Current Player: ${currentPlayer}`;

const player = document.querySelector(".player");
player.innerHTML = currentPlayerTurn();

function cellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  if (currentPlayer === 'X') clickedCell.style.backgroundColor = "red"; 
  else clickedCell.style.backgroundColor = "green"; 
}


// Get winner
function handleResultValidation() {
  let winner = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winPatterns[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      console.log(gameState);
      continue;
    }
    if (a === b && b === c) {
      console.log(gameState);
      winner = true;
      break;
    }
  }
  if (winner) {
    player.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  let isDraw = !gameState.includes("");
  if (isDraw) {
    player.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  // If no winner, Change Player
  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  player.innerHTML = currentPlayerTurn();
}

function handleCellClick(event) {
  const clickedCell = event.target;
  // console.log(event.target);
  const clickedCellIndex = parseInt(clickedCell.getAttribute("index"));
  // Disable more than one click
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  cellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

// Restart Game
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document.querySelector(".restart-game").addEventListener("click", () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  player.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = "";
    cell.style.backgroundColor = "white"; 
});
});
