// CÓDIGO V8
// src/repositories/interfaces/prontuario-pergunta.repository.interface.ts
import { IProntuarioPergunta } from "@/domains/interfaces/prontuario-pergunta.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IProntuarioPerguntaRepository extends IPrismaBaseRepository<IProntuarioPergunta, SearchParams['where']> {}
