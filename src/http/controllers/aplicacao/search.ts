// // V7
// // src/http/controllers/aplicacao/search.ts
// import { AplicacaoRepository } from "@/repositories/prisma/aplicacao.repository";
// import { SearchUseCase } from "@/use-cases/aplicacao/search";
// import { makeUseCase } from "@/use-cases/factory/make-use-case";
// import { Request, Response } from "express";

// export async function search(req: Request, res: Response) {
//   const { expr, filter, onlyActive, page, pageSize, orderBy, orderDir } = req.query as Record<string, string | undefined>;


//   const usecase = makeUseCase(SearchUseCase, AplicacaoRepository);

//   const result = await usecase.handler({
//     expr: expr,
// 	filter, // 👈 vem da query
//     onlyActive: onlyActive ? onlyActive === "true" : undefined,
//     page: page ? Number(page) : 1,
//     pageSize: pageSize ? Number(pageSize) : 20,
//     orderBy: orderBy || undefined,
//     orderDir: orderDir === "desc" ? "desc" : "asc",
//   });

//   return res.status(200).json(result);
// }


import { AplicacaoRepository } from "@/repositories/prisma/aplicacao.repository";
import { SearchUseCase } from "@/use-cases/aplicacao/search";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { makeSearchHandler } from "../factory/make-search-handler";

export const search = makeSearchHandler("aplicacao", async (args) => {
  const usecase = makeUseCase(SearchUseCase, AplicacaoRepository);
  return usecase.handler(args);
});