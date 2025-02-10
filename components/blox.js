import Canvas from "../interfaces/canvas.js";
import { Statuses } from "../interfaces/enum.js";
import Handler from "../interfaces/handler.js";

const Blox = {
  blox: null,
  texture: null,

  init() {
    Handler.addResizeCb(() => this.draw());
  },

  load(blox) {
    this.blox = blox;
    // todo: check if blox is valid
    this.draw();
    return Statuses.Success;
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
