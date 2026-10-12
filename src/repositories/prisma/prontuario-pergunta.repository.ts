// CÓDIGO V8
// src/repositories/prisma/prontuario-pergunta.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IProntuarioPerguntaRepository } from '../interfaces/prontuario-pergunta.repository.interface';

export class ProntuarioPerguntaRepository extends PrismaBaseRepository<'prontuario_pergunta', 'id_prontuario_pergunta'> implements IProntuarioPerguntaRepository
{
  constructor() {
	super('prontuario_pergunta', 'id_prontuario_pergunta', {
	  table: 'cognitio.prontuario_pergunta', // ajusta se o schema/tabela for outro
	  defaultColumns: "id_prontuario_pergunta, id_prontuario, id_pergunta, id_resposta, dt_cadastro, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}