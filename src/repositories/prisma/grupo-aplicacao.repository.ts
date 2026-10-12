// CÓDIGO V6
// src/repositories/prisma/grupo-aplicacao.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IGrupoAplicacaoRepository } from "../interfaces/grupo-aplicacao.repository.interface";

export class GrupoAplicacaoRepository extends PrismaBaseRepository<'grupo_aplicacao', 'id_grupo_aplicacao'> implements IGrupoAplicacaoRepository
{
  constructor() {
	super('grupo_aplicacao', 'id_grupo_aplicacao', {
	  table: 'cognitio.grupo_aplicacao', // ajusta se o schema/tabela for outro
	  // defaultColumns: "id_organizacao, nm_organizacao, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
