import Assets from "../assets/assets.js";
import Blox from "../components/blox.js";
import Dialog from "../components/dialog.js";
import Grid from "../components/grid.js";
import Panel from "../components/panel.js";
import { Lands, Poses, Directions, Terminations } from "../interfaces/enum.js";
import Handler from "../interfaces/handler.js";

const Player = {
  terminateCb: null,

  launch(stage, terminateCb) {
    Handler.setMoveCb((direction) => this.move(direction));
    this.terminateCb = terminateCb;
    if (
      !(
        stage.grid &&
        stage.blox &&
        Grid.check(stage.grid) &&
        Blox.check(stage.blox)
      )
    ) {
      this.terminate(Terminations.Error);
      return;
    }
    Grid.load(stage.grid);
    Blox.load(stage.blox);
    Panel.addButton(
      [
        {
          icon: Assets.homeButtonIcon(),
          callback: () =>
            Dialog.confirm("Abort", "Do you want to abort the game?", () =>
              this.terminate(Terminations.Abort)
            ),
        },
      ],
      [],
      []
    );
  },

  terminate(termination) {
    Handler.clearMoveCb();
    Panel.clearButton();
    let title, content;
    switch (termination) {
      case Terminations.Win:
        title = "Win";
        content = "Congratulations!";
        break;
      case Terminations.Lose:
        title = "Lose";
        content = "Game Over!";
        break;
      case Terminations.Abort:
        title = "Abort";
        content = "Game Aborted!";
        break;
      case Terminations.Error:
        title = "Error";
        content = "Game Error!";
        break;
    }
    Dialog.info(title, content);
    Grid.unload();
    Blox.unload();
    this.terminateCb();
    this.terminateCb = null;
  },

  move(direction) {
    const { x, y } = this.blox.start;
    let faces = [];
    // todo: refactor this piece of shit
    switch (this.blox.pose) {
      case Poses.Standing:
        switch (direction) {
          case Directions.Up:
            if (this.grid[x][y]) newStart = { x: x, y: y + 1 };
            faces.push({ x: x, y: y + 1 }, { x: x, y: y + 2 });
            newPose = Poses.Vertical;
            break;
          case Directions.Down:
            newStart = { x: x, y: y - 2 };
            faces.push({ x: x, y: y - 1 }, { x: x, y: y - 2 });
            newPose = Poses.Vertical;
            break;
          case Directions.Left:
            newStart = { x: x - 2, y: y };
            faces.push({ x: x - 1, y: y }, { x: x - 2, y: y });
            newPose = Poses.Horizontal;
            break;
          case Directions.Right:
            newStart = { x: x + 1, y: y };
            faces.push({ x: x + 1, y: y }, { x: x + 2, y: y });
            newPose = Poses.Horizontal;
            break;
        }
        break;
      case Poses.Horizontal:
        switch (direction) {
          case Directions.Up:
            newStart = { x: x, y: y + 1 };
            faces.push({ x: x, y: y + 1 }, { x: x + 1, y: y + 1 });
            newPose = Poses.Horizontal;
            break;
          case Directions.Down:
            newStart = { x: x, y: y - 1 };
            faces.push({ x: x, y: y - 1 }, { x: x + 1, y: y - 1 });
            newPose = Poses.Horizontal;
            break;
          case Directions.Left:
            newStart = { x: x - 1, y: y };
            faces.push({ x: x - 1, y: y });
            newPose = Poses.Standing;
            break;
          case Directions.Right:
            newStart = { x: x + 2, y: y };
            faces.push({ x: x + 2, y: y });
            newPose = Poses.Standing;
            break;
        }
        break;
      case Poses.Vertical:
        switch (direction) {
          case Directions.Up:
            newStart = { x: x, y: y + 2 };
            faces.push({ x: x, y: y + 2 });
            newPose = Poses.Standing;
            break;
          case Directions.Down:
            newStart = { x: x, y: y - 1 };
            faces.push({ x: x, y: y - 1 });
            newPose = Poses.Standing;
            break;
          case Directions.Left:
            newStart = { x: x - 1, y: y };
            faces.push({ x: x - 1, y: y }, { x: x - 1, y: y + 1 });
            newPose = Poses.Vertical;
            break;
          case Directions.Right:
            newStart = { x: x + 1, y: y };
            faces.push({ x: x + 1, y: y }, { x: x + 1, y: y + 1 });
            newPose = Poses.Vertical;
            break;
        }
        break;
    }
    for (const face of faces) {
      if (this.grid[face.x][face.y].value === Lands.Wall) {
        return;
      }
    }
  },
};

export default Player;
