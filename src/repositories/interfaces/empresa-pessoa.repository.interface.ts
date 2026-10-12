// CÓDIGO V6
// src/repositories/interfaces/empresa.repository.interface.ts
import { IEmpresaPessoa } from "@/domains/interfaces/empresa-pessoa.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IEmpresaPessoaRepository extends IPrismaBaseRepository<IEmpresaPessoa, SearchParams['where']> {}