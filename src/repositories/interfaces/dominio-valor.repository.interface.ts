// CÓDIGO V6
// src/repositories/interfaces/organizacao.repository.interface.ts
import { IDominioValor } from "@/domains/interfaces/dominio-valor.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IDominioValorRepository extends IPrismaBaseRepository<IDominioValor, SearchParams['where']> {}

