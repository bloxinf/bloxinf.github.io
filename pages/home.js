import Assets from "../assets/assets.js";
import Background from "../components/background.js";
import Blox from "../components/blox.js";
import Dialog from "../components/dialog.js";
import Grid from "../components/grid.js";
import Panel from "../components/panel.js";
import Handler from "../interfaces/handler.js";
import Creator from "./creator.js";
import Player from "./player.js";

const Home = {
  show() {
    Panel.addButton(
      [
        {
          icon: Assets.bgButtonIcon(),
          callback: () =>
            Handler.uploadImage("Background")
              .then((img) => Background.set(img))
              .catch(() =>
                Dialog.info("Error", "Failed to load background image!")
              ),
        },
        {
          icon: Assets.gridButtonIcon(),
          callback: () =>
            Handler.uploadImage("Grid Texture")
              .then((img) => Grid.setTexture(img))
              .catch(() =>
                Dialog.info("Error", "Failed to load grid texture image!")
              ),
        },
        {
          icon: Assets.bloxButtonIcon(),
          callback: () =>
            Handler.uploadImage("Blox Texture")
              .then((img) => Blox.setTexture(img))
              .catch(() =>
                Dialog.info("Error", "Failed to load blox texture image!")
              ),
        },
      ],
      [],
      [
        {
          name: "Create",
          callback: () => {
            this.hide();
            Creator.launch(() => this.show());
          },
        },
        {
          name: "Play",
          callback: () =>
            Handler.uploadJsonAsObj("Game Data")
              .then((stage) => {
                this.hide();
                Player.launch(stage, () => this.show());
              })
              .catch(() => Dialog.info("Error", "Failed to load game data!")),
        },
      ]
    );
  },

  hide() {
    Panel.clearButton();
  },
};

export default Home;
