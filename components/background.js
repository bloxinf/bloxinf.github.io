import Canvas from "../interfaces/canvas.js";
import { Canvases } from "../interfaces/enum.js";
import Handler from "../interfaces/handler.js";

const Background = {
  content: null,

  init() {
    Handler.addResizeCb(() => this.draw());
    this.draw();
  },

  draw() {
    const ctx = Canvas.getCtx(Canvases.Background);
    const { cw, ch } = Canvas.getSize();
    ctx.clearRect(0, 0, cw, ch);
    if (this.content) {
      const iw = this.content.width;
      const ih = this.content.height;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.drawImage(this.content, dx, dy, dw, dh);
    } else {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, cw, ch);
    }
  },

  set(img) {
    this.content = img;
    this.draw();
  },

  clear() {
    this.content = null;
    this.draw();
  },
};

export default Background;
