import Game from "./modules/Game";
import { LEVEL } from "./constants";
import { generateLevel } from "./utils/generateLevel";

const App = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  let levelIndex = 0;
  let game = new Game(width, height, generateLevel());
  setInterval(() => {
    game.update(context);
    if (game.gameDone && levelIndex < LEVEL.length - 1) {
      levelIndex += 1;
      const level = generateLevel();
      game = new Game(width, height, level);
    }
  }, 500);
};

export default App;
