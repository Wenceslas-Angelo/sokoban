// 1: wall
// 0: space
// 3: cible
// 2: crate

const LEVEL_1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 2, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export default LEVEL_1;
