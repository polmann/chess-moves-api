import bunyan from 'bunyan';

export default function errorHandler() {
  const log = bunyan.createLogger({ name: 'errors' });

  return (err, req, res, next) => {
    if (err) {
      log.info(err);
    }

    if (res.headersSent) {
      next(err);
    } else {
      res.sendStatus(500);
    }
  };
}
