import bunyan, { mockLogger } from 'bunyan';
import errorHandler from '../errorHandler';

describe('express.errorHandler', () => {
  const handler = errorHandler();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Creates a bunyan logger named errors', () => {
    expect(bunyan.createLogger).toBeCalledWith({ name: 'errors' });
  });

  it('Calls log.info passing the error if exists', () => {
    const error = new Error();
    handler(error, null, { headersSent: true }, jest.fn());
    expect(mockLogger.info).toBeCalledWith(error);
  });

  it('Does not call log.info passing the error if it does not exist', () => {
    handler(null, null, { headersSent: true }, jest.fn());
    expect(mockLogger.info).not.toBeCalled();
  });

  it('Calls next passing the error if req.headersSent', () => {
    const error = new Error();
    const next = jest.fn();
    handler(error, null, { headersSent: true }, next);
    expect(next).toBeCalledWith(error);
  });

  it('Calls res.sendStatus passing 500 if not req.headersSent', () => {
    const res = { sendStatus: jest.fn() };
    handler(null, null, res);
    expect(res.sendStatus).toBeCalledWith(500);
  });
});
