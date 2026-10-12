// CÓDIGO V6
// src/repositories/interfaces/aplicacao.repository.interface.ts
import { IAplicacao } from "@/domains/interfaces/aplicacao.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IAplicacaoRepository extends IPrismaBaseRepository<IAplicacao, SearchParams['where']> {}
