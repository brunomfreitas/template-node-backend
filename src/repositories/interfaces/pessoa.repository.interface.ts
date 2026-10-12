// CÓDIGO V6
// src/repositories/interfaces/pessoa.repository.interface.ts
import { IPessoa } from "@/domains/interfaces/pessoa.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IPessoaRepository extends IPrismaBaseRepository<IPessoa, SearchParams['where']> {}
