// CÓDIGO V6
// src/repositories/prisma/organizacao.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { ISiteRepository } from '../interfaces/site.repository.interface';

export class SiteRepository extends PrismaBaseRepository<'site', 'id_site'> implements ISiteRepository
{
  constructor() {
	super('site', 'id_site', {
	  table: 'cognitio.site',   // ajusta se o schema/tabela for outro
	  defaultColumns: "id_site, nm_site, id_organizacao, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo'
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
