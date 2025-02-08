import Handler from "./handler";

const Stage = {
  stage: null,
  bloxTexture: null,
  gridTexture: null,
  clickHandle: null,

  init() {
    Handler.addResizeCb(() => this.draw());
  },

  load(stage, handle = null) {
    this.stage = stage;
    this.clickHandle = handle;
    this.bloxTexture = new Image();
    this.bloxTexture.src = "./images/blox.png";
    this.bloxTexture.onload = () => this.draw();
    this.gridTexture = new Image();
    this.gridTexture.src = "./images/grid.png";
    this.gridTexture.onload = () => this.draw();
  },

  unload() {
    this.stage = null;
    this.clickHandle = null;
    this.draw();
  },

  drawBlox() {
    const ctx = Canvas.getCtx(Canvases.Blox);
    const { cw, ch } = Canvas.getSize();
    ctx.clearRect(0, 0, cw, ch);
    if (!this.stage) return;
    // todo
  },

  drawGrid() {},

  draw() {},

  setBloxTexture(img) {
    this.bloxTexture = img;
    this.drawBlox();
  },

  setGridTexture(img) {
    this.gridTexture = img;
    this.drawGrid();
  },

  clearBloxTexture() {
    this.bloxTexture = null;
    this.drawBlox();
  },

  clearGridTexture() {
    this.gridTexture = null;
    this.drawGrid();
  },
};

export default Stage;
