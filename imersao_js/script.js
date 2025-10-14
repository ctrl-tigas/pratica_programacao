let game_board;
let board;
let reminder;
let player;

function start() {
  game_board = Array(3);
  board = document.getElementById("board");
  reminder = document.getElementById("reminder");
  player = 0;

  for (let i = 0; i < 3; i++) {
    game_board[i] = [];
    for (let j = 0; j < 3; j++) {
      game_board[i][j] = 0;
    }
  }

  show();
}

function show() {
  let table = '<table cellpadding="10" border="1">';

  for (let i = 0; i < 3; i++) {
    table += "<tr>";
    for (let j = 0; j < 3; j++) {
      let marker;
      switch (game_board[i][j]) {
        case -1:
          marker = "X";
          break;
        case 1:
          marker = "O";
          break;
        default:
          marker = "";
      }

      table += `<td onclick="handleClick(${i}, ${j})">${marker}</td>`;
    }
    table += "</tr>";
  }

  table += "</table>";
  board.innerHTML = table;
}

let gameOver = false;

function handleClick(line, column) {
  if (gameOver) return;

  if (game_board[line][column] !== 0) {
    reminder.innerHTML = "This field was already taken! You lost your turn!";
    return;
  }

  game_board[line][column] = playerTurn() === 1 ? 1 : -1;
  show();

  const result = check();

  if (result === "win") {
    reminder.innerHTML = "PLAYER " + playerTurn() + " WON!";
    gameOver = true;
    return;
  }

  if (result === "draw") {
    reminder.innerHTML = "It's a draw!";
    gameOver = true;
    return;
  }

  player++;
  reminder.innerHTML = "Turn - Player " + playerTurn();
}

function check() {
  // Verifica vitória nas linhas
  for (let i = 0; i < 3; i++) {
    let sum = game_board[i][0] + game_board[i][1] + game_board[i][2];
    if (Math.abs(sum) === 3) return "win";
  }

  // Verifica vitória nas colunas
  for (let i = 0; i < 3; i++) {
    let sum = game_board[0][i] + game_board[1][i] + game_board[2][i];
    if (Math.abs(sum) === 3) return "win";
  }

  // Verifica diagonais
  let diag1 = game_board[0][0] + game_board[1][1] + game_board[2][2];
  let diag2 = game_board[0][2] + game_board[1][1] + game_board[2][0];
  if (Math.abs(diag1) === 3 || Math.abs(diag2) === 3) return "win";

  // Verifica empate
  let filled = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (game_board[i][j] !== 0) filled++;
    }
  }

  if (filled === 9) return "draw";

  return null;
}

function playerTurn() {
  return (player % 2) + 1;
}

function restart() {
  player = 1;
  gameOver = false;
  reminder.innerHTML = "Turn - Player 1";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      game_board[i][j] = 0;
    }
  }

  show();
}
