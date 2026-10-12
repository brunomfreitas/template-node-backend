// CÓDIGO V8
// src/repositories/prisma/pac.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IPacRepository } from '../interfaces/pac.repository.interface';

export class PacRepository extends PrismaBaseRepository<'pac', 'id_pac'> implements IPacRepository
{
  constructor() {
	super('pac', 'id_pac', {
	  table: 'cognitio.pac', // ajusta se o schema/tabela for outro
	  defaultColumns: "id_pac, id_prontuario, nm_aplicacao, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativoid_pac, id_prontuario, id_figura_fundo, id_localizacao_sonora, id_dicotico_digitos, id_ordenacao_temporal, id_dicotico_sequencial, id_resolucao_temporal",
	  // onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}