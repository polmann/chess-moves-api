import express, { mockExpressUse, mockExpressEnable } from 'express';
import helmet, { mockHelmet } from 'helmet';
import { mockBodyParserJson, mockBodyParserJsonInstance } from 'body-parser';
import session, { mockSession } from 'express-session';
import api from '../api';
import errorHandler, { mockHandler } from '../errorHandler';
import healthCheck from '../healthCheck';
import requestLogger, { mockLogger } from '../requestLogger';
import chessRouter from '../../chess/router';

jest.mock('../requestLogger');
jest.mock('../errorHandler');
jest.mock('../../chess/router');

describe('express.API', () => {
  const mockOptions = {
    cookieSecret: 'not so secret',
    cookieDomain: 'localhost',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Creates an express app', () => {
    api(mockOptions);
    expect(express).toHaveBeenCalled();
  });

  it('Enables trust proxy', () => {
    api(mockOptions);
    expect(mockExpressEnable).toHaveBeenCalledWith('trust proxy');
  });

  it('Uses helmet middleware', () => {
    api(mockOptions);
    expect(helmet).toHaveBeenCalledWith();
    expect(mockExpressUse).toHaveBeenCalledWith(mockHelmet);
  });

  it('Uses requestLogger middleware', () => {
    api(mockOptions);
    expect(requestLogger).toHaveBeenCalled();
    expect(mockExpressUse).toHaveBeenCalledWith(mockLogger);
  });

  it('Uses bodyParser middleware', () => {
    api(mockOptions);
    expect(mockBodyParserJson).toHaveBeenCalledWith({ limit: '10mb' });
    expect(mockExpressUse).toHaveBeenCalledWith(mockBodyParserJsonInstance);
  });

  it('Uses session middleware', () => {
    api(mockOptions);
    expect(session).toHaveBeenCalledWith({
      name: 'sessionId',
      secret: mockOptions.cookieSecret,
      domain: mockOptions.cookieDomain,
      resave: false,
      saveUninitialized: true,
    });
    expect(mockExpressUse).toHaveBeenCalledWith(mockSession);
  });

  it('Uses errorHandler middleware', () => {
    api(mockOptions);
    expect(errorHandler).toHaveBeenCalledWith();
    expect(mockExpressUse).toHaveBeenCalledWith(mockHandler);
  });

  it('Has created a /healthz endpoint', () => {
    api(mockOptions);
    expect(mockExpressUse).toHaveBeenCalledWith('/healthz', healthCheck);
  });

  it('Has created a /chess endpoint', () => {
    api(mockOptions);
    expect(mockExpressUse).toHaveBeenCalledWith('/chess', chessRouter);
  });
});
