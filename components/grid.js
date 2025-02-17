import Canvas from "../interfaces/canvas.js";
import { Canvases, Lands } from "../interfaces/enum.js";
import Handler from "../interfaces/handler.js";

const Grid = {
  grid: null,
  callback: null,
  clickCbs: [],
  texture: null,

  init() {
    Handler.addResizeCb(() => this.draw());
    Handler.addClickCb(this.clickCbs);
  },

  check(grid) {
    if (!(grid instanceof Array)) return false;
    for (const col of grid) {
      if (!(col instanceof Array && col.length === grid[0].length))
        return false;
      for (const land of col)
        if (
          !(
            land.value >= 0 &&
            land.value < Object.getOwnPropertyNames(Lands).length
          )
        )
          return false;
    }
    return true;
  },

  load(grid, callback = null) {
    this.grid = grid;
    this.callback = callback;
    this.draw();
  },

  unload() {
    this.grid = null;
    this.callback = null;
    this.draw();
  },

  draw() {
    const ctx = Canvas.getContext(Canvases.Grid);
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    ctx.clearRect(0, 0, cw, ch);
    this.clickCbs.length = 0;
    if (!this.grid) return;
    const col = this.grid.length;
    const row = this.grid[0].length;
    const size = 32;
    const widthToX = 1;
    const widthToY = 0;
    const heightToX = -3 / 8;
    const heightToY = 3 / 4;
    const widthX = widthToX * size;
    const widthY = widthToY * size;
    const heightX = heightToX * size;
    const heightY = heightToY * size;
    const depth = 12;
    const gw = widthX * col - heightX * row;
    const gh = heightY * row - widthY * col;
    const padding = 48;
    const scaleX = (cw - 2 * padding) / gw;
    const scaleY = (ch - 2 * padding) / gh;
    let scale, startX, startY;
    if (scaleX < scaleY) {
      scale = scaleX;
      startX = padding;
      startY = (ch - gh * scaleY) / 2;
      ctx.transform(scale, 0, 0, scale, startX, startY);
    } else {
      scale = scaleY;
      startX = (cw - gw * scaleX) / 2;
      startY = padding;
      ctx.transform(scale, 0, 0, scale, startX, startY);
    }
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    {
      ctx.beginPath();
      this.grid.forEach((col, x) => {
        let curX = widthX * x - heightX * row;
        let curY = heightY * 0 - widthY * x;
        col.forEach((land) => {
          curX += heightX;
          curY += heightY;
          if (land.value === Lands.Nothing) return;
          ctx.moveTo(curX, curY);
          ctx.lineTo(curX, curY + depth);
          ctx.lineTo(curX + widthX, curY + depth + widthY);
          ctx.lineTo(curX + widthX, curY + widthY);
          ctx.moveTo(curX + widthX, curY + widthY);
          ctx.lineTo(curX + widthX, curY + depth + widthY);
          ctx.lineTo(curX + widthX - heightX, curY + depth + widthY - heightY);
          ctx.lineTo(curX + widthX - heightX, curY + widthY - heightY);
        });
      });
      ctx.fill();
      ctx.stroke();
    }
    ctx.transform(
      widthToX,
      heightToX,
      widthToY,
      heightToY,
      -heightX * row,
      -widthY * col
    );
    {
      this.grid.forEach((col, x) =>
        col.forEach((land, y) => {
          const curX = x * size;
          const curY = y * size;
          if(this.callback) this.clickCbs.push({ trigger: (x, y) => {
            const offsetX = (x - startX) / scale;
            const offsetY = (y - startY) / scale;
            return offsetX>=curX
          }, handle: () => this.callback(x, y) });
          if (land.value === Lands.Nothing) return;
          if (land.value === Lands.Hole) {
            ctx.fillStyle = "green";
            ctx.fillRect(curX, curY, size, size);
            ctx.fillStyle = "black";
          } else if (this.texture)
            ctx.drawImage(this.texture, curX, curY, size, size);
          else ctx.fillRect(curX, curY, size, size);
          ctx.strokeRect(curX, curY, size, size);
        })
      );
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
