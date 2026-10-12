// CÓDIGO V6
// src/repositories/interfaces/site.repository.interface.ts
import { IGrupoAplicacaoRestricao } from "@/domains/interfaces/grupo-aplicacao-restricao.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IGrupoAplicacaoRestricaoRepository extends IPrismaBaseRepository<IGrupoAplicacaoRestricao, SearchParams['where']> {}