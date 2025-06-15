import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './dist/avada-business/server/main.js'; // SSR entry point

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const browserDist = resolve(__dirname, '../browser');
const indexHtml = join(__dirname, 'index.server.html'); // generated at build

const app = express();
const engine = new CommonEngine();

// Serve static files from browser build
app.get('*.*', express.static(browserDist, { maxAge: '1y' }));

// SSR for everything else
app.get('*', (req, res, next) => {
  engine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
      publicPath: browserDist,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    })
    .then(html => res.send(html))
    .catch(next);
});

// Start server only if run directly
if (isMainModule(import.meta.url)) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
}

export default app;
