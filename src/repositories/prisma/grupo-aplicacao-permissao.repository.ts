// CÓDIGO V6
// src/repositories/prisma/grupo-aplicacao.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IGrupoAplicacaoPermissaoRepository } from "../interfaces/grupo-aplicacao-permissao.repository.interface";

export class GrupoAplicacaoPermissaoRepository extends PrismaBaseRepository<'grupo_aplicacao_permissao', 'id_grupo_aplicacao_permissao'> implements IGrupoAplicacaoPermissaoRepository
{
  constructor() {
	super('grupo_aplicacao_permissao', 'id_grupo_aplicacao_permissao', {
	  table: 'cognitio.grupo_aplicacao_permissao', // ajusta se o schema/tabela for outro
	  defaultColumns: "id_grupo_aplicacao_permissao, id_grupo_aplicacao, cs_ler, cs_criar, cs_editar, cs_excluir, dt_cadastro, dt_atualizacao",
	  // onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
