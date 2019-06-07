import * as express from 'express';
import * as next from 'next';
import { sitemapAndRobots } from './sitemapRobots';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const ROOT_URL = `http://localhost:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  sitemapAndRobots({ server });

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on ${ROOT_URL}`);
  });
});
