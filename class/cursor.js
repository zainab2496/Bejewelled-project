const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.selectedRow1 = null;
    this.selectedCol1 = null;
    this.selectedRow2 = null;
    this.selectedCol2 = null;

    this.gridColor = "black";
    this.cursorColor = "white";
    this.selectedColor = "blue";

  }

  pos() {
    return [this.row, this.col];
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    this.resetBackgroundColor();
    if (this.valid_pos(this.row - 1, this.col)) {
      this.row -= 1;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  down() {
    this.resetBackgroundColor();
    if (this.valid_pos(this.row + 1, this.col)) {
      this.row += 1;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  left() {
    this.resetBackgroundColor();
    if (this.valid_pos(this.row, this.col - 1)) {
      this.col -= 1;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  right() {
    this.resetBackgroundColor();
    if (this.valid_pos(this.row, this.col + 1)) {
      this.col += 1;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  valid_pos(row, col) {
    return 0 <= row && row < this.numRows && 0 <= col && col < this.numCols;
  }

}


module.exports = Cursor;
