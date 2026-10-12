// CÓDIGO V6
// src/repositories/prisma/grupo-aplicacao.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IAplicacaoRepository } from "../interfaces/aplicacao.repository.interface";

export class AplicacaoRepository extends PrismaBaseRepository<'aplicacao', 'id_aplicacao'> implements IAplicacaoRepository
{
  constructor() {
	super('aplicacao', 'id_aplicacao', {
	  table: 'cognitio.aplicacao', // ajusta se o schema/tabela for outro
	  defaultColumns: "id_aplicacao, cd_aplicacao, nm_aplicacao, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}