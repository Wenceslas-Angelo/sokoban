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

  environnementsIsCollide(
    crateX: number,
    crateY: number,
    environnements: Environnement[]
  ) {
    for (let environnement of environnements) {
      if (
        environnement.x < crateX + this.width &&
        environnement.x + environnement.width > crateX &&
        environnement.y < crateY + this.height &&
        environnement.y + environnement.height > crateY
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
      isCollide = this.environnementsIsCollide(
        newPosition,
        this.y,
        this.game.walls
      );
    } else {
      newPosition =
        direction === "TOP" ? this.y - this.speed : this.y + this.speed;
      isCollide = this.environnementsIsCollide(
        this.x,
        newPosition,
        this.game.walls
      );
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
