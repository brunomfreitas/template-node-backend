
// CÓDIGO V8
// src/repositories/prisma/pergunta.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IPerguntaRepository } from '../interfaces/pergunta.repository.interface';

export class PerguntaRepository extends PrismaBaseRepository<'pergunta', 'id_pergunta'> implements IPerguntaRepository
{
  constructor() {
	super('pergunta', 'id_pergunta', {
	  table: 'cognitio.pergunta', // ajusta se o schema/tabela for outro
	  defaultColumns: "id_pergunta, ds_pergunta, cd_pergunta, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}