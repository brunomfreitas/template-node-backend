// CÓDIGO V8
// src/repositories/interfaces/pac.repository.interface.ts
import { IPac } from "@/domains/interfaces/pac.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IPacRepository extends IPrismaBaseRepository<IPac, SearchParams['where']> {}
