import * as path from 'path';
import * as sm from 'sitemap';

const sitemap = sm.createSitemap({
  cacheTime: 600000, // 600 sec - cache purge period
  hostname: 'https://sitemap-robots-typescript.now.sh',
});

const sitemapAndRobots = ({ server }: any) => {
  sitemap.add({
    changefreq: 'daily',
    priority: 1,
    url: '/',
  });

  sitemap.add({
    changefreq: 'daily',
    priority: 1,
    url: '/about',
  });

  sitemap.add({
    changefreq: 'daily',
    priority: 1,
    url: '/contact',
  });
  // Note {} in next line is a placeholder filling the spot where the req parameter
  // would normally be listed (but isn't listed here since we aren't using it)
  server.get('/sitemap.xml', ({}, res: any) => {
    sitemap.toXML((err: any, xml: any) => {
      if (err) {
        res.status(500).end();
        return;
      }
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });
  // Note {} in next line is a placeholder filling the spot where the req parameter
  // would normally be listed (but isn't listed here since we aren't using it)
  server.get('/robots.txt', ({}, res: any) => {
    res.sendFile(path.join(__dirname, '../static', 'robots.txt'));
  });
};

export { sitemapAndRobots };
