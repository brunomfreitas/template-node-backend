// // CÓDIGO V6
// // src/http/controllers/organizacao/list.ts
// import { SiteRepository } from '@/repositories/prisma/site.repository';
// import { makeUseCase } from '@/use-cases/factory/make-use-case';
// import { ListUseCase } from '@/use-cases/site/list';

// import { Request, Response } from 'express';

// export async function list(req: Request, res: Response) {

// 	const { page, pageSize, limit } = req.query as Record<string, string | undefined>;	
// 	const finalPageSize = pageSize ?? limit;
// 	const usecase = makeUseCase(ListUseCase, SiteRepository);
// 	const data = await usecase.handler({
// 		page: page ? Number(page) : 1,
// 		pageSize: finalPageSize ? Number(finalPageSize) : 20
// 	});
// 	return res.status(200).json(data);
// }


// CÓDIGO V7
// src/http/controllers/site/list.ts
import { SiteRepository } from '@/repositories/prisma/site.repository';
import { makeUseCase } from '@/use-cases/factory/make-use-case';
import { ListUseCase } from '@/use-cases/site/list';

import { parseReactTableFilterJson } from '@/utils/react-table-filter-to-prisma';
import { buildFilterConfigFromColumns } from '@/utils/react-table-filter-to-prisma/build-filter-config';

import { Request, Response } from 'express';

export async function list(req: Request, res: Response) {
  try {
    const { page, pageSize, filter, columns } = req.query as Record<string, string>;

    // 1️⃣ Parse das colunas configuradas no front
    const parsedColumns = columns ? JSON.parse(columns) : [];

    // 2️⃣ Construção automática da configuração de filtros
    const filterConfig = buildFilterConfigFromColumns(parsedColumns);

    // 3️⃣ Converte o filtro recebido em WHERE do Prisma
    const prismaWhere = parseReactTableFilterJson(filter, filterConfig);

    // 4️⃣ Chama o use case normalmente
    const usecase = makeUseCase(ListUseCase, SiteRepository);

    const data = await usecase.handler({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
      where: prismaWhere // 👈 agora funciona na list()
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error('Erro no list site:', err);
    return res.status(500).json({ error: 'Erro interno na listagem' });
  }
}

