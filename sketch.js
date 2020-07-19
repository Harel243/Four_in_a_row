const COLS = 7;
const ROWS = 6;
const SQUARE_SIZE = 100;
const PIECE_SIZE = 80;

let board;

let turn = 2;

function createBoard(){
    board = [];
    for (let j = 0; j < ROWS; j++) {
        board[j] = [];
        for (let i = 0; i < COLS; i++) {
            board[j][i] = 0;
        }
    }
}

function setup(){
    const canvas = createCanvas(COLS * SQUARE_SIZE, ROWS * SQUARE_SIZE + SQUARE_SIZE);
    canvas.position(
      windowWidth / 2 - width / 2,
      windowHeight / 2 - height / 2);

    createBoard();

    strokeWeight(3);
    stroke(0);
    textAlign(CENTER, CENTER);
    textSize(64);
}

function draw(){
    background(0, 0, 255);

    fill(255);
    rect(-1, -1, width + 2, SQUARE_SIZE);
    
    for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
            fill(255);
            if(board[j][i] != 0)
                fill(board[j][i] > 1 ? 'Yellow' : 'Red');
            let x = i * SQUARE_SIZE + SQUARE_SIZE / 2;
            let y = j * SQUARE_SIZE + 3 * SQUARE_SIZE / 2;
            ellipse(x, y, PIECE_SIZE);
        }
    }

    for (let x = SQUARE_SIZE; x < width; x+= SQUARE_SIZE) {
        line(x, SQUARE_SIZE, x, height);
    }

    let playerPos = floor(mouseX / SQUARE_SIZE);
    playerPos = constrain(playerPos, 0, 6);

    fill(turn > 1 ? 'Yellow' : 'Red');
    ellipse((playerPos + 0.5) * SQUARE_SIZE, SQUARE_SIZE / 2, PIECE_SIZE);

    if(tie())
        tie_screen();
    if(getWinner() != null)
        winner_screen(getWinner());
    
}

function mousePressed(){
    let x = floor(mouseX / SQUARE_SIZE);
    let y = nextSpace(x);
    if(y >= 0){
        board[y][x] = turn;
        turn = turn == 1 ? 2 : 1;
    }
}

function nextSpace(x){
    for(let y = ROWS - 1; y >= 0; y--){
        if(board[y][x] == 0)
            return y;
    }
    return -1;
}

function tie_screen(){
    fill(255);
    rect(-1, -1, width + 2, SQUARE_SIZE);
    noStroke();
    fill(0);
    text("Draw. ", width / 2, SQUARE_SIZE / 2);
    
    noLoop();
}

function winner_screen(winner){
    fill(255);
    rect(-1, -1, width + 2, SQUARE_SIZE);
    fill(winner == 1 ? 'Yellow' : 'Red');
    text(`player ${winner} won!`, width / 2, SQUARE_SIZE / 2);
    
    noLoop();
}

function tie(){
    for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
            if(board[j][i] == 0)
                return false;
        }
    }
    return true;
}

function getWinner() {
    // Test Horizontal
    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i <= COLS - 4; i++) {
        const test = board[j][i];
        if (test != 0) {
          let temp = true;
          for (let k = 0; k < 4; k++) {
            if (board[j][i + k] !== test) {
              temp = false;
            }
          }
          if (temp == true) {
            return turn;
          }
        }
      }
    }
    // Test Vertical
    for (let j = 0; j <= ROWS - 4; j++) {
      for (let i = 0; i < COLS; i++) {
        const test = board[j][i];
        if (test != 0) {
          let temp = true;
          for (let k = 0; k < 4; k++) {
            if (board[j + k][i] !== test) {
              temp = false;
            }
          }
          if (temp == true) {
            return turn;
          }
        }
      }
    }
    // Test Diagonal
    for (let j = 0; j <= ROWS - 4; j++) {
      for (let i = 0; i <= COLS - 4; i++) {
        const test = board[j][i];
        if (test != 0) {
          let temp = true;
          for (let k = 0; k < 4; k++) {
            if (board[j + k][i + k] !== test) {
              temp = false;
            }
          }
          if (temp == true) {
            return turn;
          }
        }
      }
    }
    // Test Antidiagonal
    for (let j = 0; j <= ROWS - 4; j++) {
      for (let i = 4; i < COLS; i++) {
        const test = board[j][i];
        if (test != 0) {
          let temp = true;
          for (let k = 0; k < 4; k++) {
            if (board[j + k][i - k] !== test) {
              temp = false;
            }
          }
          if (temp == true) {
            return turn;
          }
        }
      }
    }
    return null;
  }