// CÓDIGO V6
// src/repositories/interfaces/site.repository.interface.ts

import { IGrupoSeguranca } from "@/domains/interfaces/grupo-seguranca.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IGrupoSegurancaRepository extends IPrismaBaseRepository<IGrupoSeguranca, SearchParams['where']> {
	createAll(data: Pick<IGrupoSeguranca, "nm_grupo_seguranca">): Promise<IGrupoSeguranca>;
}