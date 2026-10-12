// CÓDIGO V6
// src/repositories/interfaces/site.repository.interface.ts

import { IGrupoAplicacao } from "@/domains/interfaces/grupo-aplicacao.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IGrupoAplicacaoRepository extends IPrismaBaseRepository<IGrupoAplicacao, SearchParams['where']> {}