// CÓDIGO V6
// src/repositories/prisma/grupo-aplicacao.repository.ts
import { IDominioValorRepository } from "../interfaces/dominio-valor.repository.interface";
import { PrismaBaseRepository } from "./prisma-base.repository";

export class DominioValorRepository extends PrismaBaseRepository<'dominio_valor', 'id_dominio_valor'> implements IDominioValorRepository
{
  constructor() {
	super('dominio_valor', 'id_dominio_valor', {
	  table: 'cognitio.dominio_valor', // ajusta se o schema/tabela for outro
	  // defaultColumns: "id_organizacao, nm_organizacao, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
