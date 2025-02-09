import Canvas from "./canvas";
import { Canvases } from "./enum";
import Handler from "./handler";

const Panel = {
  menu: [],
  tool: [],
  mode: [],
  clickCbs: [],

  init() {
    Handler.addResizeCb(() => this.draw());
    Handler.addClickCb(() => this.clickCbs);
    const ctx = Canvas.getCtx(Canvases.Panel);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
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
    const ctx = Canvas.getCtx(Canvases.Panel);
    const { cw, ch } = Canvas.getSize();
    const ratio = Canvas.getRatio();
    const gap = 24 * ratio;
    const size = 48 * ratio;
    ctx.clearRect(0, 0, cw, ch);
    ctx.lineWidth = 8 * ratio;
    ctx.font = `${size}px`;
    {
      let curX = gap;
      let curY = gap;
      this.menu.forEach((menu) => {
        ctx.fillRect(curX, curY, size, size);
        ctx.strokeRect(curX, curY, size, size);
        ctx.drawImage(menu.icon, curX, curY, size, size);
        this.clickCbs.push({
          trigger: (x, y) =>
            x >= curX && x <= curX + size && y >= curY && y <= curY + size,
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
        ctx.fillRect(curX, curY, size, size);
        ctx.strokeRect(curX, curY, size, size);
        ctx.drawImage(tool.icon, curX, curY, size, size);
        this.clickCbs.push({
          trigger: (x, y) =>
            x >= curX && x <= curX + size && y >= curY && y <= curY + size,
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
      const curX = (cw - width) / 2;
      let curY = (ch - (height + gap) * this.mode.length - gap) / 2;
      this.mode.forEach((mode) => {
        ctx.fillRect(curX, curY, width, height);
        ctx.strokeRect(curX, curY, width, height);
        ctx.strokeText(mode.name, curX + width / 2, curY + height / 2, width);
        this.clickCbs.push({
          trigger: (x, y) =>
            x >= curX && x <= curX + width && y >= curY && y <= curY + height,
          handle: mode.callback,
        });
        curY += height + gap;
      });
    }
  },
};

export default Panel;
