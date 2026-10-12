// // CÓDIGO V7
// // src/http/controllers/dominio-valor/search.ts
// import { DominioValorRepository } from "@/repositories/prisma/dominio-valor.repository";
// import { SearchUseCase } from "@/use-cases/dominio-valor/search";
// import { makeUseCase } from "@/use-cases/factory/make-use-case";
// import { Request, Response } from "express";

// export async function search(req: Request, res: Response) {
//   const { expr, filter, onlyActive, page, pageSize, orderBy, orderDir } = req.query as Record<string, string | undefined>;

//   const usecase = makeUseCase(SearchUseCase, DominioValorRepository);

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


import { DominioValorRepository } from "@/repositories/prisma/dominio-valor.repository";
import { SearchUseCase } from "@/use-cases/dominio-valor/search";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { makeSearchHandler } from "../factory/make-search-handler";

export const search = makeSearchHandler("dominio-valor", async (args) => {
  const usecase = makeUseCase(SearchUseCase, DominioValorRepository);
  return usecase.handler(args);
});