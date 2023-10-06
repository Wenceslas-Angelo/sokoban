import App from "./App";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";

const canvas = document.querySelector("canvas");

if (canvas) {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const context = canvas.getContext("2d");
  if (context) {
    App(context, canvas.width, canvas.height);
  }
}
