// CÓDIGO V6
// src/repositories/interfaces/site.repository.interface.ts

import { IGrupoSite } from "@/domains/interfaces/grupo-site.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IGrupoSiteRepository extends IPrismaBaseRepository<IGrupoSite, SearchParams['where']> {}