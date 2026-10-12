// CÓDIGO V6
// src/repositories/interfaces/aplicacao.repository.interface.ts
import { IProntuario } from "@/domains/interfaces/prontuario.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IProntuarioRepository extends IPrismaBaseRepository<IProntuario, SearchParams['where']> {}
