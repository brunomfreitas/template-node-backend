// CÓDIGO V7
// src/repositories/prisma/grupo-aplicacao.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IEmpresaPessoaRepository } from "../interfaces/empresa-pessoa.repository.interface";

export class EmpresaPessoaRepository extends PrismaBaseRepository<'empresa_pessoa', 'id_empresa_pessoa'> implements IEmpresaPessoaRepository
{
  constructor() {
	super('empresa_pessoa', 'id_empresa_pessoa', {
	  table: 'cognitio.empresa_pessoa', // ajusta se o schema/tabela for outro
	  defaultColumns: "id_empresa_pessoa, id_empresa, id_pessoa, id_funcao, id_organizacao, id_site, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
