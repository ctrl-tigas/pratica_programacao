let game_board;
let board;
let reminder;
let player;
let line;
let column;

function start() {
  game_board = Array(3);
  board = document.getElementById("board");
  reminder = document.getElementById("reminder");
  player = 1;

  for (let i = 0; i < 3; i++) {
    game_board[i] = [];
    for (let j = 0; j < 3; j++) {
      game_board[i][j] = 0;
    }
  }

  console.table(game_board);
  show();
}

function show() {
  let table = '<table cellpadding="10" border="1">';

  for (let i = 0; i < 3; i++) {
    table += "<tr>";
    let marker;

    for (let j = 0; j < 3; j++) {
      switch (game_board[i][j]) {
        case -1:
          marker = "X";
          break;
        case 1:
          marker = "O";
          break;
        default:
          marker = "_";
      }
      table += "<td>" + marker + "</td>";
    }

    table += "</tr>";
  }
  table += "</table>";

  board.innerHTML = table;
}

function play() {
  reminder.innerHTML = "Turn - Player " + playerTurn();

  line = document.getElementById("line").value - 1;
  column = document.getElementById("column").value - 1;

  if (game_board[line][column] == 0) {
    game_board[line][column] = playerTurn() == 1 ? 1 : -1;
  } else {
    reminder.innerHTML = "This field was already taken! You lost your turn!";
  }

  console.table(game_board);
  player++;
  show();
  check();
}

function check() {
  //CHECK LINE
  for (let i = 0; i < 3; i++) {
    let sum = 0;
    sum = game_board[i][0] + game_board[i][1] + game_board[i][2];
    if (sum == 3 || sum == -3) {
      reminder.innerHTML = "PLAYER " + playerTurn() + " WON!";
    }
  }

  //CHECK COLUMNS
  for (let i = 0; i < 3; i++) {
    let sum = 0;
    sum = game_board[0][i] + game_board[1][i] + game_board[2][i];
    if (sum == 3 || sum == -3) {
      reminder.innerHTML = "PLAYER " + playerTurn() + " WON!";
    }
  }

  //CHECK DIAGONAL
  for (let i = 0; i < 3; i++) {
    let sum = 0;
    sum = game_board[0][0] + game_board[1][1] + game_board[2][2];
    if (sum == 3 || sum == -3) {
      reminder.innerHTML = "PLAYER " + playerTurn() + " WON!";
    }
  }

  //CHECK REVERSE DIAGONAL
  for (let i = 0; i < 3; i++) {
    let sum = 0;
    sum = game_board[0][2] + game_board[1][1] + game_board[2][0];
    if (sum == 3 || sum == -3) {
      reminder.innerHTML = "PLAYER " + playerTurn() + " WON!";
    }
  }
}

function playerTurn() {
  return (player % 2) + 1;
}
