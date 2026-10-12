// src/http/controllers/company/list.ts
import { CompanyRepository } from '@/repositories/prisma/company.repository';
import { ListUseCase } from '@/use-cases/company/list';
import { makeUseCase } from '@/use-cases/factory/make-use-case';
import { parseReactTableFilterJson } from '@/utils/react-table-filter-to-prisma';
import { buildFilterConfigFromColumns } from '@/utils/react-table-filter-to-prisma/build-filter-config';
import { Request, Response } from 'express';

export async function list(req: Request, res: Response) {
  try {
    const { page, pageSize, filter, columns } = req.query as Record<string, string>;

    const parsedColumns = columns ? JSON.parse(columns) : [];

    const filterConfig = buildFilterConfigFromColumns(parsedColumns);

    const prismaWhere = parseReactTableFilterJson(filter, filterConfig);

    const usecase = makeUseCase(ListUseCase, CompanyRepository);

    const data = await usecase.handler({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
      where: prismaWhere
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error('Erro no list company:', err);
    return res.status(500).json({ error: 'Erro interno na listagem' });
  }
}
