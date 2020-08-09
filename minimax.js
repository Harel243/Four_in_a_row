function is_terminal_node() {
  return getWinner() || tie();
}

function get_valid_locations() {
  let valid_locations = [];
  for (let col = 0; col < COLS; col++)
    if (nextSpace(col) >= 0) valid_locations.push(col);
  return valid_locations;
}

function minimax(grid, depth, maximizingPlayer) {
  let valid_locations = get_valid_locations();
  let is_terminal = is_terminal_node();
  if (depth == 0 || is_terminal) {
    if (is_terminal) {
      if (getWinner() == player) return [null, -Infinity];
      else if (getWinner() == ai) return [null, Infinity];
      else return [null, 0];
    } else { //Depth is zero
      return [null, score_position(grid, ai)];
    }
  }
  if (maximizingPlayer) {
    let value = -Infinity;
    let column = random(valid_locations);
    for (let col of valid_locations) {
      let row = nextSpace(col);
      grid[row][col].type = ai;
      let new_score = minimax(grid, depth - 1, false)[1];
      if (new_score > value) {
        value = new_score;
        column = col;
      }
      grid[row][col].type = empty;
    }
    return [column, value];
  } else { //Minimizing Player
    let value = Infinity;
    let column = random(valid_locations);
    for (let col of valid_locations) {
      let row = nextSpace(col);
      grid[row][col].type = player;
      let new_score = minimax(grid, depth - 1, true)[1];
      if (new_score < value) {
        value = new_score;
        column = col;
      }
      grid[row][col].type = empty;
    }
    return [column, value];
  }
}

function get_row(grid, r) {
  let arr = [];
  for (let i = 0; i < grid.length; i++) {
    arr.push(grid[r][i].type);
  }
  return arr;
}

function get_col(grid, c) {
  let arr = [];
  for (let i = 0; i < grid.length; i++) {
    arr.push(grid[i][c].type);
  }
  return arr;
}

function get_diagonal(grid, r, c) {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push(grid[r + i][c + i].type);
  }
  return arr;
}

function get_Antidiagonal(grid, r, c) {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push(grid[r + 3 - i][c + i].type);
  }
  return arr;
}

function get_centerArray(grid) {
  let arr = [];
  for (let i = 0; i < grid.length; i++) {
    arr.push(grid[i][floor(ROWS / 2)].type);
  }
  return arr;
}

function copyArray(arr, st, en) {
  let copyArray = [];
  for (let i = st; i < st + en; i++) {
    copyArray.push(arr[i]);
  }
  return copyArray;
}

function Count(arr, piece) {
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == piece) counter += 1;
  }
  return counter;
}

function evaluate_score(window, piece) {
  let score = 0;

  let opp_piece = player;
  if (piece == player)
    opp_piece = ai;

  if (Count(window, piece) == 4) score += 100;
  else if (Count(window, piece) == 3 && Count(window, empty) == 1) score += 5;
  else if (Count(window, piece) == 2 && Count(window, empty) == 2) score += 2;

  if (Count(window, opp_piece) == 3 && Count(window, empty) == 1) score -= 4;

  return score;
}

function score_position(grid, piece) {
  let score = 0;

  // score center coluum
  let center_array = get_centerArray(grid);
  let center_count = Count(center_array, piece);
  score += center_count * 3;

  // score horizontal
  for (let r = 0; r < ROWS; r++) {
    const row_array = get_row(grid, r);
    for (let c = 0; c < COLS - 3; c++) {
      const window = copyArray(row_array, c, 4);
      score += evaluate_score(window, piece);
    }
  }
  // score verticl
  for (let c = 0; c < COLS; c++) {
    const col_array = get_col(grid, c);
    for (let r = 0; r < ROWS - 3; r++) {
      let window = copyArray(col_array, r, 4);
      score += evaluate_score(window, piece);
    }
  }
  // score  Diagonal
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      let window = get_diagonal(grid, r, c);
      score += evaluate_score(window, piece);
    }
  }
  // score Antidiagonal
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      let window = get_Antidiagonal(grid, r, c);
      score += evaluate_score(window, piece);
    }
  }

  return score;
}