// CÓDIGO V6
// src/repositories/interfaces/site.repository.interface.ts

import { IGrupoUsuario } from "@/domains/interfaces/grupo-usuario.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IGrupoUsuarioRepository extends IPrismaBaseRepository<IGrupoUsuario, SearchParams['where']> {}