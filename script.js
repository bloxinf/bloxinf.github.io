import Background from "./components/background.js";
import Blox from "./components/blox.js";
import Dialog from "./components/dialog.js";
import Grid from "./components/grid.js";
import Panel from "./components/panel.js";
import Canvas from "./interfaces/canvas.js";
import Handler from "./interfaces/handler.js";
import Home from "./pages/home.js";

Handler.init();
Canvas.init();
Background.init();
Grid.init();
Blox.init();
Panel.init();
Dialog.init();
Home.show();
