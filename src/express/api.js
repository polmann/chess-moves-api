import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from './cors';
import errorHandler from './errorHandler';
import healthCheck from './healthCheck';
import requestLogger from './requestLogger';
import chessRouter from '../chess';

export default function api({ cookieSecret, cookieDomain }) {
  const server = express();
  server.enable('trust proxy');

  server.use(helmet());

  server.use(cors());
  server.use(requestLogger());
  server.use(bodyParser.json({ limit: '10mb' }));
  server.use(
    session({
      name: 'sessionId',
      secret: cookieSecret,
      domain: cookieDomain,
      resave: false,
      saveUninitialized: true,
    }),
  );

  server.use('/healthz', healthCheck);

  server.use('/chess', chessRouter);

  server.use(errorHandler());

  return server;
}
