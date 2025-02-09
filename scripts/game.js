import Background from "./background.js";
import Blox from "./blox.js";
import Dialog from "./dialog.js";
import Grid from "./grid.js";
import Panel from "./panel.js";

const Game = {
  init() {
    Background.init();
    Grid.init();
    Blox.init();
    Panel.init();
    Dialog.init();
  },

  run() {
    Background.draw();
  },
};

export default Game;
