// Shows the shortest possible path a knight can take from one square to another
function knightMoves(startSquare, endSquare) {
  if (
    startSquare.length < 2 ||
    startSquare.length > 2 ||
    endSquare.length < 2 ||
    endSquare.length > 2
  ) {
    throw new Error("Each coordinate must contain exactly two values.");
  }

  if (
    startSquare[0] < 0 ||
    startSquare[0] > 7 ||
    startSquare[1] < 0 ||
    startSquare[1] > 7 ||
    endSquare[0] < 0 ||
    endSquare[0] > 7 ||
    endSquare[1] < 0 ||
    endSquare[1] > 7
  ) {
    throw new Error("Coordinate values must be between 0 and 7 (inclusive).");
  }

  let moves = 0;
  let movesAwayFromStart = [[startSquare]];
  let startQueue = [startSquare];

  while (!squareInArray(startQueue, endSquare)) {
    moves++;

    const allReachableSquares = [];
    startQueue.forEach((square) => {
      const reachableSquares = findReachableSquares(square);
      reachableSquares.forEach((square) => {
        allReachableSquares.push(square);
      });
    });
    movesAwayFromStart[moves] = allReachableSquares;

    startQueue = [];
    movesAwayFromStart[moves].forEach((square) => {
      startQueue.push(square);
    });
  }

  let index = moves;
  let pathSquares = [];
  pathSquares[0] = [startSquare];
  pathSquares[moves] = [endSquare];

  for (let i = 1; i < moves; i++) {
    pathSquares[i] = [];
  }

  while (index > 0) {
    pathSquares[index].forEach((square) => {
      const reachableSquares = findReachableSquares(square);
      reachableSquares.forEach((square) => {
        if (
          pathSquares[index - 1].length < 1 &&
          squareInArray(movesAwayFromStart[index - 1], square) &&
          !squareInArray(pathSquares[index - 1], square)
        ) {
          pathSquares[index - 1].push(square);
        }
      });
    });

    index--;
  }

  console.log(`You made it in ${moves} moves! Here's your path:`);
  for (let i = 0; i < pathSquares.length; i++) {
    console.log(pathSquares[i][0]);
  }
}

function squareInArray(array, square) {
  return array.some(([x, y]) => x === square[0] && y === square[1]);
}

function findReachableSquares(square) {
  let reachableSquares = [
    [square[0] + 1, square[1] - 2],
    [square[0] + 2, square[1] - 1],
    [square[0] + 2, square[1] + 1],
    [square[0] + 1, square[1] + 2],
    [square[0] - 1, square[1] + 2],
    [square[0] - 2, square[1] + 1],
    [square[0] - 2, square[1] - 1],
    [square[0] - 1, square[1] - 2],
  ];

  reachableSquares = reachableSquares.filter(
    (coordinates) =>
      coordinates[0] > -1 &&
      coordinates[0] < 8 &&
      coordinates[1] > -1 &&
      coordinates[1] < 8
  );

  return reachableSquares;
}

knightMoves([4, 7], [2, 5]);
