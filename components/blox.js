import Canvas from "../interfaces/canvas.js";
import Handler from "../interfaces/handler.js";

const Blox = {
  blox: null,
  texture: null,

  init() {
    Handler.addResizeCb(() => this.draw());
  },

  check(blox) {
    return true;
  },

  load(blox) {
    this.blox = blox;
    this.draw();
  },

  unload() {
    this.blox = null;
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

export default Blox;
