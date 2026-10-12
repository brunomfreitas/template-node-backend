// CÓDIGO V8
// src/repositories/interfaces/pergunta.repository.interface.ts
import { IPergunta } from "@/domains/interfaces/pergunta.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IPerguntaRepository extends IPrismaBaseRepository<IPergunta, SearchParams['where']> {}
