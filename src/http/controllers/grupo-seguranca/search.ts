// // V7
// // src/http/controllers/grupo-seguranca/search.ts
// import { GrupoSegurancaRepository } from '@/repositories/prisma/grupo-seguranca.repository';
// import { makeUseCase } from '@/use-cases/factory/make-use-case';
// import { SearchUseCase } from '@/use-cases/grupo-seguranca/search';
// import { Request, Response } from 'express';

// export async function search(req: Request, res: Response) {
//   const { expr, filter, onlyActive, page, pageSize, orderBy, orderDir } = req.query as Record<string, string | undefined>;

//   const usecase = makeUseCase(SearchUseCase, GrupoSegurancaRepository);

//   const result = await usecase.handler({
// 	expr: expr,
// 	filter, // 👈 vem da query
//     onlyActive: onlyActive ? onlyActive === 'true' : undefined,
//     page: page ? Number(page) : 1,
//     pageSize: pageSize ? Number(pageSize) : 20,
//     orderBy: orderBy || undefined,
//     orderDir: orderDir === 'desc' ? 'desc' : 'asc'
//   });

//   return res.status(200).json(result);
// }


import { GrupoSegurancaRepository } from "@/repositories/prisma/grupo-seguranca.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { SearchUseCase } from "@/use-cases/grupo-seguranca/search";
import { makeSearchHandler } from "../factory/make-search-handler";

export const search = makeSearchHandler("grupo-seguranca", async (args) => {
  const usecase = makeUseCase(SearchUseCase, GrupoSegurancaRepository);
  return usecase.handler(args);
});