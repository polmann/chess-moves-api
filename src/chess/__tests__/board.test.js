import { boardColumns, isPositionValid, move, calculatePositions } from '../board';

describe('chess.board.isPositionValid', () => {
  it('Returns false if not a string', () => {
    expect(isPositionValid(1)).toBe(false);
  });

  it('Returns false if length is not 2', () => {
    expect(isPositionValid('A')).toBe(false);
    expect(isPositionValid('ACC')).toBe(false);
  });

  it('Returns false if second char is NaN', () => {
    expect(isPositionValid('AA')).toBe(false);
  });

  it('Returns false if first is not on boardColumns array', () => {
    expect(isPositionValid('T1')).toBe(false);
  });

  it('Returns false if second char is lower than 1', () => {
    expect(isPositionValid('A0')).toBe(false);
  });

  it('Returns false if second char is greater than 8', () => {
    expect(isPositionValid('A9')).toBe(false);
  });

  it('Returns true if first char is on boardColumns and second char is between 1 and 8', () => {
    expect(isPositionValid('A6')).toBe(true);
  });
});

describe('chess.board.move', () => {
  const numSquares = { columns: 1, rows: 1 };
  const numSquaresWithoutColumns = { rows: 1 };
  const numSquaresWithoutRows = { rows: 1 };

  it('Returns undefined if both column and row are out of bound', () => {
    expect(move('D1', { columns: -4, rows: -1 })).toBe(undefined);
  });

  it('Moves 1 column right and 1 row up', () => {
    expect(move('D1', { columns: 1, rows: 1 })).toBe('E2');
  });

  it('Moves 2 columns left and 3 rows down', () => {
    expect(move('D5', { columns: -2, rows: -3 })).toBe('B2');
  });

  it('Moves 2 columns right and no rows as it defaults to 0 when it is not present', () => {
    expect(move('D5', { columns: 2 })).toBe('F5');
  });

  it('Returns undefined if both column is out of left bound', () => {
    expect(move('D5', { columns: -5 })).toBe(undefined);
  });

  it('Returns undefined if both column is out of right bound', () => {
    expect(move('D5', { columns: 5 })).toBe(undefined);
  });

  it('Moves 3 rows up', () => {
    expect(move('D5', { rows: 3 })).toBe('D8');
  });

  it('Returns undefined if both row is out of bottom bound', () => {
    expect(move('D5', { rows: -6 })).toBe(undefined);
  });

  it('Returns undefined if both row is out of top bound', () => {
    expect(move('D5', { rows: 4 })).toBe(undefined);
  });
});

describe('chess.board.calculatePositions', () => {
  const pieceMoves = [{ columns: 1, rows: -1 }, { columns: -2, rows: 2 }];

  const initPos = 'D4';

  const returned = {
    depth1: ['E3', 'B6'],
    depth2: ['C5', 'F2'],
    depth3: ['A7', 'D4', 'G1'],
  };

  it('Returns an array', () => {
    expect(calculatePositions(pieceMoves, initPos)).toBeInstanceOf(Array);
  });

  it('Returns all possible moves on 1 turn', () => {
    expect(calculatePositions(pieceMoves, initPos)).toEqual(returned.depth1);
  });

  it('Returns only positions that are within the bounds of the board', () => {
    const pieceMovesWithOutOfBounds = [{ columns: 1, rows: -1 }, { columns: -10, rows: 10 }];

    expect(calculatePositions(pieceMovesWithOutOfBounds, initPos)).toEqual(['E3']);
  });

  it('Returns all possible moves on 2 turns', () => {
    expect(calculatePositions(pieceMoves, initPos, '2')).toEqual(returned.depth2);
  });

  it('Returns all possible moves on 3 turns', () => {
    expect(calculatePositions(pieceMoves, initPos, '3')).toEqual(returned.depth3);
  });
});
