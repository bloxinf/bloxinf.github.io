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
    const ctx = Canvas.getCtx(Canvases.Dialog);
    const { cw, ch } = Canvas.getSize();
    const ratio = Canvas.getRatio();
    ctx.clearRect(0, 0, cw, ch);
    if (!this.dialog) return;
    // dialog: {title, content, buttons: {text, callback}}
    {
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, cw, ch);
    }
    const { title, content, buttons } = this.dialog;
    const width = 480 * ratio;
    const height = 320 * ratio;
    const x = (cw - width) / 2;
    const y = (ch - height) / 2;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 6 * ratio;
    {
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, width, height);
    }
    const padding = 24 * ratio;
    const gap = 24 * ratio;
    const textWidth = width - padding * 2;
    const titleSize = 36 * ratio;
    const contentSize = 24 * ratio;
    const buttonTextSize = 18 * ratio;
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
      const buttonWidth = 96 * ratio;
      const buttonHeight = 48 * ratio;
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
        const startX = curX / ratio;
        const startY = curY / ratio;
        const endX = (curX + buttonWidth) / ratio;
        const endY = (curY + buttonHeight) / ratio;
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
      const startX = x / ratio;
      const startY = y / ratio;
      const endX = (x + width) / ratio;
      const endY = (y + height) / ratio;
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
