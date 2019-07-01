import bunyan from 'bunyan';
import onHeaders from 'on-headers';

export default function requestLogger() {
  const log = bunyan.createLogger({ name: 'requests' });

  return (req, res, next) => {
    const startAt = process.hrtime();

    onHeaders(res, () => {
      const diff = process.hrtime(startAt);
      const diffMilliseconds = diff[0] * 1e3 + Math.round(diff[1] * 1e-6);

      const logData = {
        method: req.method,
        path: req.url,
        remoteAddress: req.ip,
        statusCode: res.statusCode,
        responseTime: diffMilliseconds,
      };

      log.info(logData);
    });

    next();
  };
}
