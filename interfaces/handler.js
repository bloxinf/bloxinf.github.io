import Canvas from "./canvas.js";
import { Directions } from "./enum.js";

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
      const x = e.x;
      const y = e.y;
      const dx = x - prevX;
      const dy = y - prevY;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        const ratio = Canvas.getRatio();
        this.clickCbs.forEach((cbs) => {
          cbs.forEach(({ trigger, handle }) => {
            if (trigger(x * ratio, y * ratio)) handle();
          });
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
      this.resizeCbs.forEach((cb) => cb());
    };
  },

  setMoveCb(cb) {
    this.moveCb = cb;
  },

  clearMoveCb() {
    this.moveCb = null;
  },

  addClickCb(cbs) {
    this.clickCbs.push(cbs);
  },

  clearClickCb() {
    this.clickCbs = [];
  },

  addResizeCb(cb) {
    this.resizeCbs.push(cb);
  },

  clearResizeCb() {
    this.resizeCbs = [];
  },

  async uploadImage(description) {
    const options = {
      types: [
        {
          description: `${description}图片`,
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

  async uploadJsonAsObj(description) {
    const options = {
      types: [
        {
          description: `${description} JSON 文件`,
          accept: {
            "application/json": [".json"],
          },
        },
      ],
      excludeAcceptAllOption: true,
    };
    const [fileHandle] = await window.showOpenFilePicker(options);
    const file = await fileHandle.getFile();
    const text = await file.text();
    return JSON.parse(text);
  },

  async downloadObjAsJson(obj, description) {
    const options = {
      types: [
        {
          description: `保存${description} JSON 文件`,
          accept: {
            "application/json": [".json"],
          },
        },
      ],
    };
    const fileHandle = await window.showSaveFilePicker(options);
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(obj));
    await writable.close();
  },
};

export default Handler;
