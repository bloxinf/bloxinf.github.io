import Canvas from "../interfaces/canvas.js";
import { Canvases } from "../interfaces/enum.js";
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

  draw() {
    // grid: [{value, ...}]
    const ctx = Canvas.getCtx(Canvases.Grid);
    const { cw, ch } = Canvas.getSize();
    const ratio = Canvas.getRatio();
    ctx.clearRect(0, 0, cw, ch);
    if (!this.grid) return;
    const col = this.grid.length;
    const row = this.grid[0].length;
    const gw = (32 * col + 12 * row) * ratio;
    const gh = 24 * row * ratio;
    const padding = 48 * ratio;
    const scaleX = (cw - 2 * padding) / gw;
    const scaleY = (ch - 2 * padding) / gh;
    if (scaleX < scaleY) {
      const startY = (ch - gh * scaleY) / 2;
      ctx.transform(scaleX, 0, 0, scaleX, padding, startY);
    } else {
      const startX = (cw - gw * scaleX) / 2;
      ctx.transform(scaleY, 0, 0, scaleY, startX, padding);
    }
    {
      ctx.fillStyle = "black";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2 * ratio;
      ctx.lineJoin = "round";
      ctx.beginPath();
      const width = 32 * ratio;
      this.grid.forEach((col) => col.forEach((land) => {}));
    }
  },

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
