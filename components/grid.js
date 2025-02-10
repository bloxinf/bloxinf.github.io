import Handler from "../interfaces/handler.js";

const Grid = {
  grid: null,
  texture: null,

  init() {
    Handler.addResizeCb(() => this.draw());
  },

  load(grid) {
    this.grid = grid;
    // todo: check if grid is valid
    this.draw();
    return Statuses.Success;
  },

  unload() {
    this.grid = null;
    this.draw();
  },

  draw() {},
};

export default Grid;
