function createGrid() {
  let grid = [];
  for (let j = 0; j < ROWS; j++) {
    grid[j] = [];
    for (let i = 0; i < COLS; i++) {
      grid[j][i] = new Cell(i, j);
    }
  }
  return grid;
}

function drawGrid() {
  fill(255);
  rect(-1, -1, width + 2, SQUARE_SIZE);

  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      grid[j][i].show();
    }
  }

  for (let x = SQUARE_SIZE; x < width; x += SQUARE_SIZE) {
    line(x, SQUARE_SIZE, x, height);
  }
}

function nextSpace(x) {
  for (let y = ROWS - 1; y >= 0; y--) {
    if (grid[y][x].type == empty)
      return y;
  }
  return -1;
}

function tie() {
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      if (grid[j][i].type == empty)
        return false;
    }
  }
  return true;
}

function getWinner() {
  // Test Horizontal
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i <= COLS - 4; i++) {
      const test = grid[j][i].type;
      if (test != empty) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (grid[j][i + k].type !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return test;
        }
      }
    }
  }
  // Test Vertical
  for (let j = 0; j <= ROWS - 4; j++) {
    for (let i = 0; i < COLS; i++) {
      const test = grid[j][i].type;
      if (test != empty) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (grid[j + k][i].type !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return test;
        }
      }
    }
  }
  // Test Diagonal
  for (let j = 0; j <= ROWS - 4; j++) {
    for (let i = 0; i <= COLS - 4; i++) {
      const test = grid[j][i].type;
      if (test != empty) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (grid[j + k][i + k].type !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return test;
        }
      }
    }
  }
  // Test Antidiagonal
  for (let j = 0; j <= ROWS - 4; j++) {
    for (let i = 3; i < COLS; i++) {
      const test = grid[j][i].type;
      if (test != empty) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (grid[j + k][i - k].type !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return test;
        }
      }
    }
  }
  return null;
}