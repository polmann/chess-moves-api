import bunyan, { mockLogger } from 'bunyan';
import onHeaders from 'on-headers';
import requestLogger from '../requestLogger';

jest.mock('on-headers', () => {
  let callback;
  const mockOnHeaders = (res, cb) => {
    callback = cb;
  };
  mockOnHeaders.flush = () => callback && callback();
  return mockOnHeaders;
});

describe('express.requestLogger', () => {
  const mockReq = {
    method: 'GET',
    url: '/path?argument=value',
    ip: '127.0.0.1',
  };

  const mockRes = {
    statusCode: 200,
  };

  const logData = {
    method: mockReq.method,
    path: mockReq.url,
    remoteAddress: mockReq.ip,
    statusCode: mockRes.statusCode,
    responseTime: expect.anything(),
  };

  const mockNext = jest.fn();

  let logger;
  beforeEach(() => {
    logger = requestLogger();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Creates a bunyan logger named requests', () => {
    expect(bunyan.createLogger).toBeCalledWith({ name: 'requests' });
  });

  it('Logs the expected fields', () => {
    logger(mockReq, mockRes, mockNext);
    onHeaders.flush();
    expect(mockLogger.info).toHaveBeenCalledWith(logData);
    expect(mockLogger.info.mock.calls[0][0].responseTime).toBeGreaterThanOrEqual(0);
  });

  it('Calls next', () => {
    logger(mockReq, mockRes, mockNext);
    onHeaders.flush();
    expect(mockNext).toHaveBeenCalled();
  });
});
