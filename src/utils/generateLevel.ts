import { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE } from "../constants";

type Props = {
  rows: number;
  columns: number;
  level: number[][];
  name?: "CRATE" | "CIBLE" | "WALL" | "PLAYER";
  repeat?: number;
};

export const generateLevel = () => {
  const columns = CANVAS_WIDTH / GRID_SIZE;
  const rows = CANVAS_HEIGHT / GRID_SIZE;

  const level: number[][] = [];

  generateEmptyLevel({ rows, columns, level });
  generatePlayer({ rows, columns, level });
  const randomNumCrates = Math.floor(Math.random() * 3) + 3;
  generateCrates({
    rows,
    columns,
    level,
    name: "CRATE",
    repeat: randomNumCrates,
  });
  generateCrates({
    rows,
    columns,
    level,
    name: "CIBLE",
    repeat: randomNumCrates,
  });
  return level;
};

const generateEmptyLevel = (props: Props) => {
  const { columns, rows, level } = props;
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      if (i === 0 || i === rows - 1 || j === 0 || j === columns - 1) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    level.push(row);
  }
};

const generatePlayer = (props: Props) => {
  const { columns, rows, level } = props;

  let playerRow, playerColumn;
  do {
    playerRow = Math.floor(Math.random() * (rows - 2)) + 1;
    playerColumn = Math.floor(Math.random() * (columns - 2)) + 1;
  } while (level[playerRow][playerColumn] !== 0); // Répéter jusqu'à trouver une case vide

  level[playerRow][playerColumn] = 4; // Assigner le chiffre 4 au joueur
};

const generateCrates = (props: Props) => {
  const { columns, rows, level, repeat, name } = props;
  const maxAttempts = 100;
  let numCrates = 0;
  if (repeat && name) {
    while (numCrates < repeat) {
      const randomRow = Math.floor(Math.random() * (rows - 2)) + 1;
      const randomColumn = Math.floor(Math.random() * (columns - 2)) + 1;

      if (
        level[randomRow][randomColumn] === 0 &&
        isAccessible(level, randomRow, randomColumn)
      ) {
        level[randomRow][randomColumn] = name === "CRATE" ? 2 : 3;
        numCrates++;
      }

      if (numCrates >= maxAttempts) {
        break;
      }
    }
  }
};

const isAccessible = (level: number[][], row: number, column: number) => {
  if (
    (level[row][column - 1] === 1 || level[row][column + 1] === 1) &&
    (level[row - 1][column] === 1 || level[row + 1][column] === 1)
  ) {
    return false;
  }

  return true;
};
