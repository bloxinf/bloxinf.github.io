import Panel from "../components/panel.js";
import Handler from "../interfaces/handler.js";
import Player from "./player.js";

const Home = {
  show() {
    Panel.addButton(
      [],
      [],
      [
        { name: "Create", callback: () => {} },
        {
          name: "Play",
          callback: () => {
            Handler.uploadJsonAsObj("游戏关卡").then((stage) => {
              this.hide();
              Player.launch(stage, () => this.show());
            });
          },
        },
      ]
    );
  },

  hide() {
    Panel.clearButton();
  },
};

export default Home;
