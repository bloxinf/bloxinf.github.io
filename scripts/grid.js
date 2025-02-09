const Grid = {
  grid: null,
  texture: null,

  init() {
    Handler.addResizeCb(() => this.draw());
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
    const ctx = Canvas.getCtx(Canvases.Grid);
    const { cw, ch } = Canvas.getSize();
    ctx.clearRect(0, 0, cw, ch);
    if (!this.grid) return;
    const { texture: gridTexture } = this;
    const { size } = this.grid;
    for (let x = 0; x < this.grid.width; x++) {
      for (let y = 0; y < this.grid.height; y++) {
        if (this.grid.get(x, y))
          ctx.drawImage(gridTexture, x * size, y * size, size, size);
      }
    }
  },
};

export default Grid;
