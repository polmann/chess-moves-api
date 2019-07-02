const boardColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function isPositionValid(position) {
  if (typeof position !== 'string' || position.length !== 2) {
    return false;
  }

  const column = position[0];
  const row = position[1];

  if (isNaN(row)) {
    return false;
  }

  return boardColumns.includes(column) && (row >= 1 && row <= 8);
}

export function move(position, numSquares) {
  const { columns, rows } = numSquares;

  const newColumnIndex = boardColumns.indexOf(position[0]) + (columns || 0);
  if (newColumnIndex < 0 || newColumnIndex >= boardColumns.length) {
    return;
  }

  const newRow = parseInt(position[1]) + (rows || 0);
  if (newRow < 1 || newRow > 8) {
    return;
  }

  return `${boardColumns[newColumnIndex]}${newRow}`;
}

export function calculatePositions(possibleMoves, initialPosition, depth) {
  const step = depth || 1;

  const newPositions = possibleMoves.reduce((results, currMove) => {
    const positionAfterMove = move(initialPosition, currMove);
    if (positionAfterMove) {
      return [...results, positionAfterMove];
    }

    return results;
  }, []);

  if (step < 2) {
    return newPositions;
  }

  return newPositions
    .reduce((results, currPosition) => {
      let newResults = [...results, ...knight(currPosition, step - 1)];

      return newResults.filter((item, pos, self) => self.indexOf(item) == pos);
    }, [])
    .sort();
}
