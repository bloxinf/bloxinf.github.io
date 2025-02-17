import Canvas from "../interfaces/canvas.js";
import { Canvases } from "../interfaces/enum.js";
import Handler from "../interfaces/handler.js";

const Dialog = {
  dialog: null,
  clickCbs: [],

  init() {
    Handler.addResizeCb(() => this.draw());
    Handler.addClickCb(this.clickCbs);
  },

  info(title, content) {
    this.popup({
      title,
      content,
      buttons: [
        {
          text: "OK",
          callback: () => {},
        },
      ],
    });
  },

  confirm(title, content, callback) {
    this.popup({
      title,
      content,
      buttons: [
        {
          text: "No",
          callback: () => {},
        },
        {
          text: "Yes",
          callback,
        },
      ],
    });
  },

  popup(dialog) {
    this.dialog = dialog;
    this.draw();
  },

  clear() {
    this.dialog = null;
    this.clickCbs.length = 0;
    this.draw();
  },

  draw() {
    const ctx = Canvas.getContext(Canvases.Dialog);
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    ctx.clearRect(0, 0, cw, ch);
    if (!this.dialog) return;
    {
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, cw, ch);
    }
    const { title, content, buttons } = this.dialog;
    const width = 480;
    const height = 320;
    const x = (cw - width) / 2;
    const y = (ch - height) / 2;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 6;
    {
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, width, height);
    }
    const padding = 24;
    const gap = 24;
    const textWidth = width - padding * 2;
    const titleSize = 36;
    const contentSize = 24;
    const buttonTextSize = 18;
    {
      const titleX = cw / 2;
      const titleY = y + padding + titleSize / 2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${titleSize}px sans-serif`;
      ctx.strokeText(title, titleX, titleY, textWidth);
      ctx.fillText(title, titleX, titleY, textWidth);
    }
    {
      const contentX = x + padding;
      const contentY = y + padding + gap + titleSize;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.font = `${contentSize}px sans-serif`;
      ctx.fillStyle = "white";
      ctx.fillText(content, contentX, contentY, textWidth);
    }
    {
      const buttonWidth = 96;
      const buttonHeight = 48;
      let curX = (cw - (buttonWidth + gap) * buttons.length + gap) / 2;
      let curY = y + height - padding - buttonHeight;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${buttonTextSize}px sans-serif`;
      buttons.forEach((button) => {
        ctx.strokeRect(curX, curY, buttonWidth, buttonHeight);
        ctx.fillStyle = "black";
        ctx.fillRect(curX, curY, buttonWidth, buttonHeight);
        ctx.fillStyle = "white";
        const centerX = curX + buttonWidth / 2;
        const centerY = curY + buttonHeight / 2;
        ctx.fillText(button.text, centerX, centerY, buttonWidth);
        const startX = curX;
        const startY = curY;
        const endX = curX + buttonWidth;
        const endY = curY + buttonHeight;
        this.clickCbs.push({
          trigger: (x, y) =>
            x >= startX && x <= endX && y >= startY && y <= endY,
          handle: () => {
            this.clear();
            button.callback();
          },
        });
        curX += buttonWidth + gap;
      });
    }
    {
      const startX = x;
      const startY = y;
      const endX = x + width;
      const endY = y + height;
      this.clickCbs.push({
        trigger: (x, y) => x >= startX && x <= endX && y >= startY && y <= endY,
        handle: () => {},
      });
      this.clickCbs.push({
        trigger: () => true,
        handle: () => {
          this.clear();
          buttons[0].callback();
        },
      });
    }
  },
};

export default Dialog;
