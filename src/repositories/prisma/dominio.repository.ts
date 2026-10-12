// CÓDIGO V6
// src/repositories/prisma/grupo-aplicacao.repository.ts
import { IDominioRepository } from "../interfaces/dominio.repository.interface";
import { PrismaBaseRepository } from "./prisma-base.repository";

export class DominioRepository extends PrismaBaseRepository<'dominio', 'id_dominio'> implements IDominioRepository
{
  constructor() {
	super('dominio', 'id_dominio', {
	  table: 'cognitio.dominio', // ajusta se o schema/tabela for outro
	  // defaultColumns: "id_organizacao, nm_organizacao, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
