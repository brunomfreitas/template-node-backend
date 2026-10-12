// CÓDIGO V6
// src/repositories/interfaces/organizacao.repository.interface.ts
import { IOrganizacao } from '@/domains/interfaces/organizacao.interface';
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IOrganizacaoRepository extends IPrismaBaseRepository<IOrganizacao, SearchParams['where']> {}
