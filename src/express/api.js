import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import session from 'express-session';
import errorHandler from './errorHandler';
import healthCheck from './healthCheck';
import requestLogger from './requestLogger';

export default function api({ cookieSecret, cookieDomain }) {
  const server = express();
  server.enable('trust proxy');

  server.use(helmet());
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

  server.use(errorHandler());

  return server;
}
