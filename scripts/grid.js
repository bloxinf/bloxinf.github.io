import Handler from "./handler";

const Grid = {
  grid: null,
  texture: null,

  init() {
    Handler.addResizeCb(() => this.draw());
  },

  load(grid) {
    this.grid = grid;
    this.draw();
  },

  unload() {
    this.grid = null;
    this.draw();
  },

  draw() {},
};

export default Grid;
