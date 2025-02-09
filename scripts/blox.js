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

  draw() {
    const ctx = Canvas.getCtx(Canvases.Blox);
    const { cw, ch } = Canvas.getSize();
    ctx.clearRect(0, 0, cw, ch);
    if (!this.blox) return;
    const { texture: bloxTexture } = this;
    const { size, pos } = this.blox;
    const { x, y } = pos;
    ctx.drawImage(bloxTexture, x * size, y * size, size, size);
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

export default Blox;
