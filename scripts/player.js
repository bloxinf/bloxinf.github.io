import { Lands, Poses, Directions, Terminations } from "./enum";
import Handler from "./handler";

const Player = {
  stage: null,

  play(stage) {
    this.stage = JSON.parse(stage);
    this.menu();
    this.blox();
    this.grid();
    Handler.setMoveCb((direction) => this.move(direction));
  },

  menu() {},

  blox() {},

  grid() {},

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
