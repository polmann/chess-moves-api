import { move } from './board';

const moves = [
  { columns: 1, rows: 2 },
  { columns: 1, rows: -2 },
  { columns: -1, rows: 2 },
  { columns: -1, rows: -2 },
  { columns: 2, rows: 1 },
  { columns: 2, rows: -1 },
  { columns: -2, rows: 1 },
  { columns: -2, rows: -1 },
];

function knight(position, depth) {
  const step = depth || 1;

  const newPositions = moves.reduce((results, currMove) => {
    const positionAfterMove = move(position, currMove);
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

export default knight;
