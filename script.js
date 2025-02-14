import Assets from "./assets/assets.js";
import Background from "./components/background.js";
import Blox from "./components/blox.js";
import Dialog from "./components/dialog.js";
import Grid from "./components/grid.js";
import Panel from "./components/panel.js";
import Canvas from "./interfaces/canvas.js";
import Handler from "./interfaces/handler.js";
import Home from "./pages/home.js";

await Assets.init();
Handler.init();
Canvas.init();
Dialog.init();
Panel.init();
Blox.init();
Grid.init();
Background.init();
Home.show();
