import Canvas from "../interfaces/canvas.js";
import { Canvases } from "../interfaces/enum.js";
import Handler from "../interfaces/handler.js";

const Panel = {
  menu: [],
  tool: [],
  mode: [],
  clickCbs: [],

  init() {
    Handler.addResizeCb(() => this.draw());
    Handler.addClickCb(this.clickCbs);
  },

  addButton(menus, tools, modes) {
    this.menu.push(...menus);
    this.tool.push(...tools);
    this.mode.push(...modes);
    this.draw();
  },

  clearButton() {
    this.menu.length = 0;
    this.tool.length = 0;
    this.mode.length = 0;
    this.draw();
  },

  draw() {
    this.clickCbs.length = 0;
    const ctx = Canvas.getContext(Canvases.Panel);
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const gap = 24;
    const size = 48;
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 6;
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    {
      let curX = gap;
      let curY = gap;
      this.menu.forEach((menu) => {
        ctx.strokeRect(curX, curY, size, size);
        ctx.fillRect(curX, curY, size, size);
        ctx.drawImage(menu.icon, curX, curY, size, size);
        const startX = curX;
        const startY = curY;
        const endX = curX + size;
        const endY = curY + size;
        this.clickCbs.push({
          trigger: (x, y) =>
            x >= startX && x <= endX && y >= startY && y <= endY,
          handle: menu.callback,
        });
        curX += gap + size;
        if (curX + gap + size > cw) {
          curX = gap;
          curY += gap + size;
        }
      });
    }
    {
      const col = Math.floor((cw - gap) / (size + gap));
      const initX = (cw - (size + gap) * col + gap) / 2;
      let curX;
      if (this.tool.length > col) curX = initX;
      else curX = (cw - (size + gap) * this.tool.length + gap) / 2;
      let curY = ch - gap - size;
      this.tool.forEach((tool) => {
        ctx.strokeRect(curX, curY, size, size);
        ctx.fillRect(curX, curY, size, size);
        ctx.drawImage(tool.icon, curX, curY, size, size);
        const startX = curX;
        const startY = curY;
        const endX = curX + size;
        const endY = curY + size;
        this.clickCbs.push({
          trigger: (x, y) =>
            x >= startX && x <= endX && y >= startY && y <= endY,
          handle: tool.callback,
        });
        curX += gap + size;
        if (curX + gap + size > cw) {
          curX = initX;
          curY -= gap + size;
        }
      });
    }
    {
      const width = size * 4;
      const height = size * 2;
      let curX = (cw - width) / 2;
      let curY = (ch - (height + gap) * this.mode.length - gap) / 2;
      this.mode.forEach((mode) => {
        ctx.strokeRect(curX, curY, width, height);
        ctx.fillRect(curX, curY, width, height);
        const centerX = curX + width / 2;
        const centerY = curY + height / 2;
        ctx.strokeText(mode.name, centerX, centerY, width);
        ctx.fillText(mode.name, centerX, centerY, width);
        const startX = curX;
        const startY = curY;
        const endX = curX + width;
        const endY = curY + height;
        this.clickCbs.push({
          trigger: (x, y) =>
            x >= startX && x <= endX && y >= startY && y <= endY,
          handle: mode.callback,
        });
        curY += height + gap;
      });
    }
  },
};

export default Panel;
