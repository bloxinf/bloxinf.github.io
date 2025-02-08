const Canvas = {
  canvases: [],
  ctxs: [],
  width: 0,
  height: 0,

  init() {
    document.getElementsByTagName("canvas").forEach((canvas) => {
      this.canvases.push(canvas);
      this.ctxs.push(canvas.getContext("2d"));
    });
    this.resize();
  },

  resize() {
    const ratio = window.devicePixelRatio;
    this.width = window.innerWidth * ratio;
    this.height = window.innerHeight * ratio;
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
};

export default Canvas;
