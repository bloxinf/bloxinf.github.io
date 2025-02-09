import Background from "./background";
import Blox from "./blox";
import Dialog from "./dialog";
import Grid from "./grid";
import Panel from "./panel";

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
