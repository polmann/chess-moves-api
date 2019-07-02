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
