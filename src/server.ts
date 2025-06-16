// src/server.ts
import 'zone.js/node';
import express from 'express';
import { join } from 'path';
// import { render } from './main.server'; //  use main.server.ts directly
import { render } from './dist/avada-business/server/main.js';

const app = express();
const distFolder = join(process.cwd(), 'dist/avada-business/browser');

app.use(express.static(distFolder, {
  maxAge: '1y'
}));

app.get('*', (req, res) => {
  render(req.url, req.baseUrl)
    .then(html => res.send(html))
    .catch(err => {
      console.error(err);
      res.status(500).send(err.message || err);
    });
});

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
