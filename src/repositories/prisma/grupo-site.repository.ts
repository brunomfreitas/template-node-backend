// CÓDIGO V7
// src/repositories/prisma/organizacao.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IGrupoSiteRepository } from '../interfaces/grupo-site.repository.interface';

export class GrupoSiteRepository extends PrismaBaseRepository<'grupo_site', 'id_grupo_site'> implements IGrupoSiteRepository
{
  constructor() {
	super('grupo_site', 'id_grupo_site', {
	  table: 'cognitio.grupo_site',		// ajusta se o schema/tabela for outro
	  defaultColumns: "id_grupo_site, id_grupo_seguranca, id_site, dt_cadastro",
	  // onlyActiveField: 'st_ativo'	// ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
