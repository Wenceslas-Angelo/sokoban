import Game from "./Game";
import { GRID_SIZE } from "../constants";
import { createImage } from "../utils/createImage";
import playerImg from "../assets/Player";
import Environnement from "./Environnement";

class Player {
  game: Game;
  private x: number;
  private y: number;
  private height: number;
  private width: number;
  private speed: number;
  private image: HTMLImageElement;
  private imageRight: HTMLImageElement;
  private imageLeft: HTMLImageElement;
  private imageTop: HTMLImageElement;
  private imageDown: HTMLImageElement;

  constructor(game: Game) {
    this.game = game;
    this.x = GRID_SIZE;
    this.y = GRID_SIZE;
    this.width = GRID_SIZE;
    this.height = GRID_SIZE;
    this.speed = GRID_SIZE;
    this.imageRight = createImage(playerImg.right);
    this.imageLeft = createImage(playerImg.left);
    this.imageTop = createImage(playerImg.top);
    this.imageDown = createImage(playerImg.down);
    this.image = this.imageDown;
  }

  checkCollision(
    environnement: Environnement,
    xPosition: number,
    yPosition: number
  ) {
    return (
      xPosition < environnement.x + environnement.width &&
      xPosition + this.width > environnement.x &&
      yPosition < environnement.y + environnement.height &&
      yPosition + this.height > environnement.y
    );
  }

  update(
    direction: "RIGHT" | "LEFT" | "TOP" | "DOWN",
    directionIsHorizontal: boolean,
    image: HTMLImageElement
  ) {
    this.image = image;

    let newPosition;
    if (directionIsHorizontal) {
      newPosition =
        direction === "RIGHT" ? this.x + this.speed : this.x - this.speed;
    } else {
      newPosition =
        direction === "TOP" ? this.y - this.speed : this.y + this.speed;
    }

    for (let wall of this.game.walls) {
      const isCollideWithWall = directionIsHorizontal
        ? this.checkCollision(wall, newPosition, this.y)
        : this.checkCollision(wall, this.x, newPosition);
      if (isCollideWithWall) {
        return;
      }
    }

    for (let crate of this.game.crates) {
      const isCollideWithCrate = directionIsHorizontal
        ? this.checkCollision(crate, newPosition, this.y)
        : this.checkCollision(crate, this.x, newPosition);

      if (isCollideWithCrate) {
        if (crate.isCollide(direction).isCollide) {
          return;
        }
        crate.move(direction);
      }
    }

    directionIsHorizontal ? (this.x = newPosition) : (this.y = newPosition);
  }

  move(direction: "LEFT" | "RIGHT" | "TOP" | "DOWN") {
    switch (direction) {
      case "RIGHT":
        this.update("RIGHT", true, this.imageRight);
        break;

      case "LEFT":
        this.update("LEFT", true, this.imageLeft);
        break;

      case "TOP":
        this.update("TOP", false, this.imageTop);
        break;

      case "DOWN":
        this.update("DOWN", false, this.imageDown);
        break;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.height, this.width);
  }
}

export default Player;
