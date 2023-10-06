import Player from "./Player";
import { GRID_SIZE } from "../constants";
import Environnement from "./Environnement";
import { createImage } from "../utils/createImage";

import wallImg from "./../assets/Blocks/block_04.png";
import groundImg from "./../assets/Ground/ground_01.png";
import crateImg from "./../assets/Crates/crate_01.png";
import cibleImg from "./../assets/Environment/environment_08.png";

class Game {
  width: number;
  height: number;
  level: number[][];
  player: Player;
  walls: Environnement[];
  grounds: Environnement[];
  crates: Environnement[];
  cibles: Environnement[];
  gameDone: boolean;
  numberOfCible: number;
  numberOfCibleDone: number;

  constructor(width: number, height: number, level: number[][]) {
    this.width = width;
    this.height = height;
    this.level = level;

    this.walls = [];
    this.grounds = [];
    this.crates = [];
    this.cibles = [];
    this.numberOfCible = 0;
    this.numberOfCibleDone = 0;
    this.gameDone = false;

    this.player = new Player(this);
    this.inputHandler();
    this.PrepareEnvironnement();
  }

  update(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, this.width, this.height);
    this.draw(context);
  }

  draw(context: CanvasRenderingContext2D) {
    for (let ground of this.grounds) {
      ground.draw(context);
    }

    for (let wall of this.walls) {
      wall.draw(context);
    }

    for (let crate of this.crates) {
      crate.draw(context);
    }

    for (let cible of this.cibles) {
      cible.draw(context);
    }

    this.player.draw(context);
  }

  PrepareEnvironnement() {
    let indexColumn = 0;
    let indexRow = 0;

    for (let row of this.level) {
      for (let column of row) {
        if (column === 1) {
          this.walls.push(
            new Environnement(this, indexColumn, indexRow, createImage(wallImg))
          );
        } else if (column === 2) {
          this.crates.push(
            new Environnement(
              this,
              indexColumn,
              indexRow,
              createImage(crateImg),
              true
            )
          );
        } else if (column === 3) {
          this.cibles.push(
            new Environnement(
              this,
              indexColumn,
              indexRow,
              createImage(cibleImg)
            )
          );
          this.numberOfCible++;
        }

        this.grounds.push(
          new Environnement(this, indexColumn, indexRow, createImage(groundImg))
        );

        indexColumn += GRID_SIZE;
      }
      indexColumn = 0;
      indexRow += GRID_SIZE;
    }
  }

  inputHandler() {
    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowRight":
          this.player.move("RIGHT");
          break;
        case "ArrowLeft":
          this.player.move("LEFT");
          break;
        case "ArrowUp":
          this.player.move("TOP");
          break;
        case "ArrowDown":
          this.player.move("DOWN");
          break;
      }
    });
  }
}

export default Game;
