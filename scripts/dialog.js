import Canvas from "./canvas.js";
import { Canvases } from "./enum.js";
import Handler from "./handler.js";

const Dialog = {
  dialog: null,
  clickCbs: [],

  init() {
    Handler.addResizeCb(() => this.draw());
    Handler.addClickCb(this.clickCbs);
  },

  load(dialog) {
    this.dialog = dialog;
    this.draw();
  },

  unload() {
    this.dialog = null;
    this.draw();
  },

  draw() {
    const ctx = Canvas.getCtx(Canvases.Dialog);
    const { cw, ch } = Canvas.getSize();
    ctx.clearRect(0, 0, cw, ch);
    if (!this.dialog) return;
    // todo
  },
};

export default Dialog;
