// // CÓDIGO V7
// // src/http/controllers/grupo-aplicacao-permissao/search.ts
// import { GrupoAplicacaoPermissaoRepository } from "@/repositories/prisma/grupo-aplicacao-permissao.repository";
// import { makeUseCase } from "@/use-cases/factory/make-use-case";
// import { SearchUseCase } from "@/use-cases/grupo-aplicacao-permissao/search";

// import { Request, Response } from "express";

// export async function search(req: Request, res: Response) {
//   const { expr, filter, onlyActive, page, pageSize, orderBy, orderDir } = req.query as Record<string, string | undefined>;

//   const usecase = makeUseCase(SearchUseCase, GrupoAplicacaoPermissaoRepository);

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


import { GrupoAplicacaoPermissaoRepository } from "@/repositories/prisma/grupo-aplicacao-permissao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { SearchUseCase } from "@/use-cases/grupo-aplicacao-permissao/search";
import { makeSearchHandler } from "../factory/make-search-handler";

export const search = makeSearchHandler("grupo-aplicacao-permissao", async (args) => {
  const usecase = makeUseCase(SearchUseCase, GrupoAplicacaoPermissaoRepository);
  return usecase.handler(args);
});