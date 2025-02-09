import Canvas from "./canvas";
import Handler from "./handler";

const Blox = {
  blox: null,
  texture: null,

  init() {
    Handler.addResizeCb(() => this.draw());
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
