// CÓDIGO V7
// src/repositories/prisma/organizacao.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IOrganizacaoRepository } from '../interfaces/organizacao.repository.interface';

export class OrganizacaoRepository extends PrismaBaseRepository<'organizacao', 'id_organizacao'> implements IOrganizacaoRepository
{
  constructor() {
	super('organizacao', 'id_organizacao', {
	  table: 'cognitio.organizacao',   // ajusta se o schema/tabela for outro
	  defaultColumns: "id_organizacao, nm_organizacao, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo'    // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
