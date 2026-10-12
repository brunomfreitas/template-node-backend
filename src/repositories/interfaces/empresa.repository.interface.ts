// CÓDIGO V6
// src/repositories/interfaces/empresa.repository.interface.ts
import { IEmpresa } from "@/domains/interfaces/empresa.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IEmpresaRepository extends IPrismaBaseRepository<IEmpresa, SearchParams['where']> {}
