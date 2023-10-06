import Game from "./modules/Game";
import { LEVEL } from "./constants";

const App = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  let levelIndex = 0;
  let game = new Game(width, height, LEVEL[levelIndex]);

  setInterval(() => {
    game.update(context);
    if (game.gameDone && levelIndex < LEVEL.length - 1) {
      levelIndex += 1;
      game = new Game(width, height, LEVEL[levelIndex]);
    }
  }, 500);
};

export default App;
