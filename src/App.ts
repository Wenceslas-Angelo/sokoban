import Game from "./modules/Game";

const App = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const game = new Game(width, height);
  setInterval(() => {
    game.update(context);
  }, 500);
};

export default App;
