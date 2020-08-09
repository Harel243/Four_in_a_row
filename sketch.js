const COLS = 7;
const ROWS = 6;
const SQUARE_SIZE = 100;
const PIECE_SIZE = 80;

let grid;

let turn = "red";

function setup() {
  const canvas = createCanvas(COLS * SQUARE_SIZE, ROWS * SQUARE_SIZE + SQUARE_SIZE);
  canvas.position(
    windowWidth / 2 - width / 2,
    windowHeight / 2 - height / 2);

  grid = createGrid();

  strokeWeight(3);
  stroke(0);
  textAlign(CENTER, CENTER);
  textSize(64);
}

function draw() {
  background(0, 0, 255);

  drawGrid();

  let playerPos = floor(mouseX / SQUARE_SIZE);
  playerPos = constrain(playerPos, 0, 6);

  fill(turn);
  ellipse((playerPos + 0.5) * SQUARE_SIZE, SQUARE_SIZE / 2, PIECE_SIZE);

  if (tie())
    tie_screen();
  if (getWinner() != null)
    winner_screen(getWinner());
}

function mousePressed() {
  let x = floor(mouseX / SQUARE_SIZE);
  let y = nextSpace(x);
  if (y >= 0) {
    grid[y][x].type = turn;
    turn = turn == "red" ? "yellow" : "red";
  }
}


function tie_screen() {
  fill(255);
  rect(-1, -1, width + 2, SQUARE_SIZE);
  noStroke();
  fill(0);
  text("Draw. ", width / 2, SQUARE_SIZE / 2);

  noLoop();
}

function winner_screen(winner) {
  winner = winner == "red" ? "yellow" : "red";
  fill(255);
  rect(-1, -1, width + 2, SQUARE_SIZE);
  fill(winner);
  text(` ${winner} won!`, width / 2, SQUARE_SIZE / 2);

  noLoop();
}