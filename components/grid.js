import Handler from "../interfaces/handler.js";

const Grid = {
  grid: null,
  texture: null,

  init() {
    Handler.addResizeCb(() => this.draw());
  },

  check(grid) {
    // todo: check
    return true;
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

  setTexture(img) {
    this.texture = img;
    this.draw();
  },

  clearTexture() {
    this.texture = null;
    this.draw();
  },
};

export default Grid;
