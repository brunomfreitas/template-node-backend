// CÓDIGO V6
// src/repositories/interfaces/grupo-aplicacao-permissao.repository.interface.ts
import { IGrupoAplicacaoPermissao } from "@/domains/interfaces/grupo-aplicacao-permissao.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IGrupoAplicacaoPermissaoRepository extends IPrismaBaseRepository<IGrupoAplicacaoPermissao, SearchParams['where']> {}
