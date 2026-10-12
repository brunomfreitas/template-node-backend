
// CÓDIGO V7
// src/repositories/prisma/prontuario.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IProntuarioRepository } from '../interfaces/prontuario.repository.interface';

export class ProntuarioRepository extends PrismaBaseRepository<'prontuario', 'id_prontuario'> implements IProntuarioRepository
{
  constructor() {
	super('prontuario', 'id_prontuario', {
	  table: 'cognitio.prontuario', // ajusta se o schema/tabela for outro
	  defaultColumns: "id_prontuario, ds_prontuario, dh_inicio_atendimento, dh_termino_atendimento, id_escola, id_fonoaudiologo, id_assistente, id_organizacao, id_site, id_st_atendimento, id_st_prontuario, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}


