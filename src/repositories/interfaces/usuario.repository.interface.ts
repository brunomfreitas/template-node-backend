// CÓDIGO V6
// src/repositories/interfaces/usuario.repository.interface.ts
import { IUsuario } from "@/domains/interfaces/usuario.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface IUsuarioRepository extends IPrismaBaseRepository<IUsuario, SearchParams["where"]> {}
