import { GRID_SIZE } from "../constants";
import Game from "./Game";

class Environnement {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  canMove: boolean;
  speed: number;

  constructor(
    game: Game,
    x: number,
    y: number,
    image: HTMLImageElement,
    canMove: boolean = false
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = GRID_SIZE;
    this.height = GRID_SIZE;
    this.speed = GRID_SIZE;
    this.image = image;
    this.canMove = canMove;
  }

  wallAndCrateIsCollide(crateX: number, crateY: number) {
    for (let wall of this.game.walls) {
      if (
        wall.x < crateX + this.width &&
        wall.x + wall.width > crateX &&
        wall.y < crateY + this.height &&
        wall.y + wall.height > crateY
      ) {
        return true;
      }
    }

    return false;
  }

  isCollide(direction: "LEFT" | "RIGHT" | "TOP" | "DOWN") {
    let newPosition, isCollide;
    if (direction === "RIGHT" || direction === "LEFT") {
      newPosition =
        direction === "RIGHT" ? this.x + this.speed : this.x - this.speed;
      isCollide = this.wallAndCrateIsCollide(newPosition, this.y);
    } else {
      newPosition =
        direction === "TOP" ? this.y - this.speed : this.y + this.speed;
      isCollide = this.wallAndCrateIsCollide(this.x, newPosition);
    }

    return { isCollide, newPosition };
  }

  move(direction: "LEFT" | "RIGHT" | "TOP" | "DOWN") {
    if (this.canMove) {
      const newPosition = this.isCollide(direction).newPosition;

      switch (direction) {
        case "RIGHT":
          this.x = newPosition;
          break;
        case "LEFT":
          this.x = newPosition;
          break;
        case "TOP":
          this.y = newPosition;
          break;
        case "DOWN":
          this.y = newPosition;
          break;
      }
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Environnement;
