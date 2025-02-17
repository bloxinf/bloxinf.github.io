import Handler from "./handler.js";

const Canvas = {
  canvases: [],

  init() {
    this.canvases = Array.from(document.getElementsByTagName("canvas"));
    this.resize();
    Handler.addResizeCb(() => this.resize());
  },

  resize() {
    const ratio = window.devicePixelRatio;
    const width = window.innerWidth * ratio;
    const height = window.innerHeight * ratio;
    this.canvases.forEach((canvas) => {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").scale(ratio, ratio);
    });
  },

  getContext(i) {
    return this.canvases[i].getContext("2d");
  },
};

export default Canvas;
