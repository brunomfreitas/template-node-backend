// CÓDIGO V7
// src/repositories/prisma/grupo-aplicacao.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IEmpresaRepository } from "../interfaces/empresa.repository.interface";

export class EmpresaRepository extends PrismaBaseRepository<'empresa', 'id_empresa'> implements IEmpresaRepository
{
  constructor() {
	super('empresa', 'id_empresa', {
	  table: 'cognitio.empresa', // ajusta se o schema/tabela for outro
	  defaultColumns: "id_empresa, nm_empresa, nr_cnpj, nr_telefone, nm_email, id_tipo_empresa, id_pessoa_responsavel, id_organizacao, id_site ,dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
