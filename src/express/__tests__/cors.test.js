import cors, { middleware } from '../cors';

describe('express.cors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Returns the middleware function', () => {
    const returnedValue = cors();
    expect(returnedValue).toBeInstanceOf(Function);
    expect(returnedValue).toEqual(middleware);
  });
});

describe('express.cors.middleware', () => {
  const res = { header: jest.fn() };
  const next = jest.fn();

  beforeEach(() => {
    middleware({}, res, next);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Sets Access-Control-Allow-Origin as *', () => {
    expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
  });

  it('Sets Access-Control-Allow-Headers as Origin, X-Requested-With, Content-Type, Accept', () => {
    expect(res.header).toHaveBeenCalledWith(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
  });

  it('Calls next', () => {
    expect(next).toHaveBeenCalled();
  });
});
