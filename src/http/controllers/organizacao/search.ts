// // CÓDIGO V7
// // src/http/controllers/aplicacao/search.ts
// import { OrganizacaoRepository } from "@/repositories/prisma/organizacao.repository";
// import { makeUseCase } from "@/use-cases/factory/make-use-case";
// import { SearchUseCase } from "@/use-cases/organizacao/search";
// import { Request, Response } from "express";

// export async function search(req: Request, res: Response) {
//   const { expr, filter, onlyActive, page, pageSize, orderBy, orderDir } = req.query as Record<string, string | undefined>;

//   const usecase = makeUseCase(SearchUseCase, OrganizacaoRepository);

//   const result = await usecase.handler({
//     expr: expr,
//     filter, // 👈 vem da query
//     onlyActive: onlyActive ? onlyActive === "true" : undefined,
//     page: page ? Number(page) : 1,
//     pageSize: pageSize ? Number(pageSize) : 20,
//     orderBy: orderBy || undefined,
//     orderDir: orderDir === "desc" ? "desc" : "asc",
//   });

//   return res.status(200).json(result);
// }


import { OrganizacaoRepository } from "@/repositories/prisma/organizacao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { SearchUseCase } from "@/use-cases/organizacao/search";
import { makeSearchHandler } from "../factory/make-search-handler";

export const search = makeSearchHandler("organizacao", async (args) => {
  const usecase = makeUseCase(SearchUseCase, OrganizacaoRepository);
  return usecase.handler(args);
});