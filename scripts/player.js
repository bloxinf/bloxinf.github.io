import Blox from "./blox.js";
import { Lands, Poses, Directions, Terminations, Statuses } from "./enum.js";
import Grid from "./grid.js";
import Handler from "./handler.js";

const Player = {
  terminateCb: null,

  start(stage, terminateCb) {
    if (
      Grid.load(stage.grid) === Statuses.Failure ||
      Blox.load(stage.blox) === Statuses.Failure
    ) {
      Grid.unload();
      Blox.unload();
      return Statuses.Failure;
    }
    this.terminateCb = terminateCb;
    Handler.setMoveCb((direction) => this.move(direction));
    return Statuses.Success;
  },

  terminate(termination) {
    Handler.clearMoveCb();
    Grid.unload();
    Blox.unload();
    this.terminateCb(termination);
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
