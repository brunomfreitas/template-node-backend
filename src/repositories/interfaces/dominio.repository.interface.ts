// CÓDIGO V6
// src/repositories/interfaces/organizacao.repository.interface.ts
import { IDominio } from "@/domains/interfaces/dominio.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IDominioRepository extends IPrismaBaseRepository<IDominio, SearchParams['where']> {}

