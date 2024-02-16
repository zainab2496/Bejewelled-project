// TODO - fix three-in-a-row detect at borders of grid
// TODO - fix combo chaining after shifting down elements to replace matches

const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {
  constructor() {
    this.playerTurn = "O";

    // Initialize this
    // let fruit = ["🥝", "🍓", "🥥", "🍇", "🍊"]

    this.grid = Bejeweled.generateGrid();
    this.cursor = new Cursor(8, 8);

    this.swapFirst = [];
    this.swapSecond = [];

    Screen.initialize(8, 8);
    Screen.setGridlines(false);

    Screen.addCommand(
      "up",
      "moves cursor up",
      this.cursor.up.bind(this.cursor)
    );
    Screen.addCommand(
      "down",
      "moves cursor down",
      this.cursor.down.bind(this.cursor)
    );
    Screen.addCommand(
      "left",
      "moves cursor left",
      this.cursor.left.bind(this.cursor)
    );
    Screen.addCommand(
      "right",
      "moves cursor right",
      this.cursor.right.bind(this.cursor)
    );

    Screen.addCommand(
      "c",
      "selects the first element in swap",
      this.setFirst.bind(this)
    );

    Screen.addCommand(
      "v",
      "selects the second element in swap",
      this.swap.bind(this)
    );

    this.populateGrid();
    this.cursor.setBackgroundColor();
    this.update();
  }

  update() {
    let matches = Bejeweled.checkForMatches(this.grid).sort();
    let count = 0;
    while (count < 5) {
      this.explode(matches);
      this.shift(matches);
      matches = Bejeweled.checkForMatches(this.grid).sort();
      count++;
    }
    Screen.render();
  }

  explode(matchesArr) {
    matchesArr.forEach((pos) => {
      let [row, col] = pos;
      this.grid[row][col] = "💥";
      Screen.setGrid(row, col, "💥");
    });
  }

  shift(matchesArr) {
    matchesArr.forEach((pos) => {
      setTimeout(this.shiftDown.bind(this, pos), 2000);
    });
  }

  shiftDown(pos) {
    let [row, col] = pos;
    while (row > 0) {
      this.grid[row][col] = this.grid[row - 1][col];
      Screen.setGrid(row, col, this.grid[row - 1][col]);
      row -= 1;
    }
    let newJewel = Bejeweled.getRandomJewel();
    this.grid[row][col] = newJewel;
    Screen.setGrid(row, col, newJewel);
    Screen.render();
  }

  setFirst() {
    this.swapFirst = this.cursor.pos();
  }

  swap() {
    this.swapSecond = this.cursor.pos();

    let [firstRow, firstCol] = this.swapFirst;
    let [secondRow, secondCol] = this.swapSecond;

    let onlyOneAway =
      Math.abs(firstRow - secondRow) <= 1 &&
      Math.abs(firstCol - secondCol) <= 1;

    if (onlyOneAway) {
      let firstItem = this.grid[firstRow][firstCol];
      let secondItem = this.grid[secondRow][secondCol];

      this.grid[firstRow][firstCol] = secondItem;
      this.grid[secondRow][secondCol] = firstItem;

      Screen.setGrid(firstRow, firstCol, secondItem);
      Screen.setGrid(secondRow, secondCol, firstItem);
      this.update();
    }
  }

  static generateGrid() {
    let arr = [];
    for (let row = 0; row < 8; row++) {
      arr.push(["", "", "", "", "", "", "", ""]);
    }
    return arr;
  }

  populateGrid() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let randJewel = Bejeweled.getRandomJewel();
        this.grid[row][col] = randJewel;
        console.log(randJewel);
        Screen.setGrid(row, col, randJewel);
      }
    }
  }

  static getRandomJewel() {
    let allFruit = Bejeweled.fruit();
    return allFruit[[Math.floor(Math.random() * allFruit.length)]];
  }

  static fruit() {
    return ["🍇", "🍊", "🍉", "🍒", "🥥", "🍍"];
  }

  static checkForMatches(grid) {
    return Bejeweled.threeRowMatch(grid).concat(Bejeweled.threeColMatch(grid));
    // console.log(Bejeweled.threeColMatch(grid));
  }

  static threeRowMatch(grid) {
    let matches = [];
    for (let row = 0; row < grid.length; row++) {
      let allThree = Bejeweled.threeInARow(grid[row]);
      if (allThree != []) {
        matches.push([row, allThree], [row, allThree + 1], [row, allThree + 2]);
      }
    }
    return matches;
  }

  static threeColMatch(grid) {
    let matches = [];
    let cols = Bejeweled.cols(grid);
    for (let row = 0; row < cols.length; row++) {
      let allThree = Bejeweled.threeInARow(cols[row]);
      if (allThree != []) {
        matches.push([allThree, row], [allThree + 1, row], [allThree + 2, row]);
      }
    }
    return matches;
  }

  static threeInARow(arr) {
    let first = 0;
    let count = 1;
    let next = first + 1;

    while (next < arr.length) {
      if (arr[first] === arr[next] && arr[first] != " ") {
        count++;
        if (count === 3) {
          return first;
        }
      } else {
        first = next;
        count = 1;
      }
      next++;
    }
    return false;
  }

  static cols(grid) {
    return Bejeweled.transpose(grid);
  }

  static transpose(grid) {
    let transposed = [];
    for (let col = 0; col < grid[0].length; col++) {
      let cols = [];
      for (let row = 0; row < grid.length; row++) {
        cols.push(grid[row][col]);
      }
      transposed.push(cols);
    }
    return transposed;
  }
}

module.exports = Bejeweled;