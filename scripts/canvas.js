const Canvas = {
  canvases: [],
  ctxs: [],
  width: 0,
  height: 0,
  ratio: 1,

  init() {
    this.canvases = Array.from(document.getElementsByTagName("canvas"));
    this.canvases.forEach((canvas) => this.ctxs.push(canvas.getContext("2d")));
    this.resize();
  },

  resize() {
    const ratio = window.devicePixelRatio;
    this.width = window.innerWidth * ratio;
    this.height = window.innerHeight * ratio;
    this.ratio = ratio;
    this.canvases.forEach((canvas) => {
      canvas.width = this.width;
      canvas.height = this.height;
    });
  },

  getCtx(i) {
    return this.ctxs[i];
  },

  getSize() {
    return { width: this.width, height: this.height };
  },

  getRatio() {
    return this.ratio;
  },
};

export default Canvas;
