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
      const dx = e.x - prevX;
      const dy = e.y - prevY;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        for (const cbs of this.clickCbs)
          for (const cb of cbs)
            if (cb.trigger(e.x, e.y)) {
              cb.handle();
              return;
            }
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

  uploadImage(description) {
    return new Promise((resolve, reject) => {
      const options = {
        startIn: "pictures",
        types: [
          {
            description: `${description} Image`,
            accept: {
              "image/*": [".png", ".gif", ".jpeg", ".jpg", ".webp"],
            },
          },
        ],
        excludeAcceptAllOption: true,
      };
      window
        .showOpenFilePicker(options)
        .then(([fileHandle]) => fileHandle.getFile())
        .then((file) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = URL.createObjectURL(file);
        })
        .catch(reject);
    });
  },

  uploadJsonAsObj(description) {
    return new Promise((resolve, reject) => {
      const options = {
        id: "bloxinf",
        types: [
          {
            description: `${description} JSON`,
            accept: {
              "application/json": [".json"],
            },
          },
        ],
        excludeAcceptAllOption: true,
      };
      window
        .showOpenFilePicker(options)
        .then(([fileHandle]) => fileHandle.getFile())
        .then((file) => file.text())
        .then((text) => resolve(JSON.parse(text)))
        .catch(reject);
    });
  },

  downloadObjAsJson(obj, description) {
    return new Promise((resolve, reject) => {
      const options = {
        id: "bloxinf",
        suggestedName: "stage.json",
        types: [
          {
            description: `${description} JSON `,
            accept: {
              "application/json": [".json"],
            },
          },
        ],
      };
      let writable;
      window
        .showSaveFilePicker(options)
        .then((fileHandle) => fileHandle.createWritable())
        .then((writableStream) => {
          writable = writableStream;
          return writable.write(JSON.stringify(obj));
        })
        .then(() => writable.close())
        .then(resolve)
        .catch(reject);
    });
  },
};

export default Handler;
