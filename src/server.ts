// src/server.ts
import createApp from './app';
import { env } from './env';

createApp().then(app => {
  const port = Number(env.PORT ?? 3000);
  app.listen(port, () => console.log(`HTTP server on http://localhost:${port}`));
});
