import api from './express/api';

const port = process.env.PORT || 3000;
const cookieSecret = process.env.COOKIE_SECRET || 'not so secret';
const cookieDomain = process.env.COOKIE_DOMAIN || 'localhost';

api({
  cookieSecret,
  cookieDomain,
}).listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running. See http://localhost:${port}/healthz`);
});
