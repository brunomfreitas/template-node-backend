// CÓDIGO V6
// src/repositories/interfaces/site.repository.interface.ts
import { ISite } from "@/domains/interfaces/site.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface ISiteRepository extends IPrismaBaseRepository<ISite, SearchParams['where']> {}
