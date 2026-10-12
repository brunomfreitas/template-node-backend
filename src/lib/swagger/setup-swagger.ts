import type { Express } from 'express';
import path from 'path';

import swaggerUi from 'swagger-ui-express';

export function setupSwagger(app: Express) {

  const swaggerFile = path.resolve(process.cwd(), 'src', 'lib', 'swagger', 'openapi.json');

  // endpoint do arquivo
  app.get('/swagger/openapi.json', (_req, res) => {
    res.sendFile(swaggerFile);
  });

  // UI apontando para o arquivo congelado
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerUrl: '/swagger/openapi.json',
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: (a: any, b: any) => {
        const byPath = a.get('path').localeCompare(b.get('path'));
        if (byPath !== 0) return byPath;
        const order = ['get','post','put','patch','delete','options','head','trace'];
        return order.indexOf(a.get('method')) - order.indexOf(b.get('method'));
      },
    },
    customSiteTitle: 'Blog API - Swagger',
  }));
}

