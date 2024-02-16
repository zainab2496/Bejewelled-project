const { expect } = require('chai');
const Bejeweled = require("../class/bejeweled.js");
const Cursor = require("../class/cursor.js");

describe ('Bejeweled', function () {
  this.beforeEach(() => {
    bejeweled = new Bejeweled();
  });

  describe('Bejeweled constructor function', function () {
    it('should have a playerTurn instance', function () {
      expect(bejeweled).to.have.property("playerTurn");
    });
    it('should have a grid property', function () {
      expect(bejeweled).to.have.property("grid");
    });
    it('should have cursor property', function () {
      expect(bejeweled).to.have.property("cursor");
    });
    it('should set playerTurn property to its initial value', function () {
      expect(bejeweled.playerTurn).to.equal('0');
    });
    it('should set the grid property to its initial value', function () {
      expect(bejeweled.grid).to.equal([]);
    });
    it('should set the cursor property to its initial value', function () {
      expect(bejeweled.cursor).to.be.an.instanceOf(Cursor);
    });
  })


  // Add tests for a valid swap that matches 3

  // Add tests for swaps that set up combos

  // Add tests to check if there are no possible valid moves

});

