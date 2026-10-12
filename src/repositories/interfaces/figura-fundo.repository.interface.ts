// CÓDIGO V8
// src/repositories/interfaces/figura-fundo.repository.interface.ts
import { IFiguraFundo } from "@/domains/interfaces/figura-fundo.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IFiguraFundoRepository extends IPrismaBaseRepository<IFiguraFundo, SearchParams['where']> {}
