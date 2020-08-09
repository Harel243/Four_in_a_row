class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.type = "white";
    this.x = i * SQUARE_SIZE + SQUARE_SIZE / 2;
    this.y = j * SQUARE_SIZE + 3 * SQUARE_SIZE / 2;
  }

  show() {
    fill(this.type);
    ellipse(this.x, this.y, PIECE_SIZE);
  }
}