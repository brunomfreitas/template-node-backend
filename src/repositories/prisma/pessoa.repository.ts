// CÓDIGO V6
// src/repositories/prisma/pessoa.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IPessoaRepository } from '../interfaces/pessoa.repository.interface';

export class PessoaRepository extends PrismaBaseRepository<'pessoa', 'id_pessoa'> implements IPessoaRepository
{
  constructor() {
	super('pessoa', 'id_pessoa', {
	  table: 'cognitio.pessoa',   // ajusta se o schema/tabela for outro
	  defaultColumns: "id_pessoa, nm_pessoa, nr_cpf, id_genero, dt_nascimento, nr_telefone, nm_email, id_organizacao, id_site, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo'    // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}


	