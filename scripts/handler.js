import Canvas from "./canvas";
import { Directions } from "./enum";

const Handler = {
  moveCb: null,
  clickCbs: [],
  resizeCbs: [],

  init() {
    document.onkeydown = (e) => {
      if (!this.moveCb) return;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          this.moveCb(Directions.Up);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          this.moveCb(Directions.Down);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          this.moveCb(Directions.Left);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          this.moveCb(Directions.Right);
          break;
      }
    };
    let prevX, prevY;
    document.onpointerdown = (e) => {
      prevX = e.x;
      prevY = e.y;
    };
    document.onpointerup = (e) => {
      let x = e.x;
      let y = e.y;
      let dx = x - prevX;
      let dy = y - prevY;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        this.clickCbs.forEach(({ trigger, handle }) => {
          if (trigger(x, y)) handle();
        });
      } else if (this.moveCb) {
        if (dx > dy) {
          if (dx > -dy) this.moveCb(Directions.Right);
          else this.moveCb(Directions.Down);
        } else {
          if (dx > -dy) this.moveCb(Directions.Up);
          else this.moveCb(Directions.Left);
        }
      }
    };
    window.onresize = () => {
      Canvas.resize();
      this.clearClickCb();
      this.resizeCbs.forEach((cb) => cb());
    };
  },

  setMoveCb(cb) {
    this.moveCb = cb;
  },

  clearMoveCb() {
    this.moveCb = null;
  },

  addClickCb(trigger, handle) {
    this.clickCbs.push({ trigger, handle });
  },

  clearClickCb() {
    this.clickCbs = [];
  },

  addResizeCb(cb) {
    this.resizeCb.push(cb);
  },

  clearResizeCb() {
    this.resizeCb = [];
  },

  async loadImage() {
    const options = {
      types: [
        {
          description: "请选择图片",
          accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg", ".webp"],
          },
        },
      ],
      excludeAcceptAllOption: true,
    };
    const [fileHandle] = await window.showOpenFilePicker(options);
    const file = await fileHandle.getFile();
    const img = new Image();
    img.src = URL.createObjectURL(file);
    return img;
  },
};

export default Handler;
