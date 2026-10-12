// CÓDIGO V8
// src/repositories/prisma/figura-fundo.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IFiguraFundoRepository } from '../interfaces/figura-fundo.repository.interface';

export class FiguraFundoRepository extends PrismaBaseRepository<'figura_fundo', 'id_figura_fundo'> implements IFiguraFundoRepository
{
  constructor() {
	super('figura_fundo', 'id_figura_fundo', {
	  table: 'cognitio.figura_fundo', // ajusta se o schema/tabela for outro
	  defaultColumns: "id_figura_fundo, ds_figura_fundo, cs_recusa, st_figura_1_identificada, st_figura_2_identificada, st_figura_3_identificada, st_figura_4_identificada, st_figura_5_identificada, st_figura_6_identificada, ss_tempo_resposta_figura_1, ss_tempo_resposta_figura_2, ss_tempo_resposta_figura_3, ss_tempo_resposta_figura_4, ss_tempo_resposta_figura_5, ss_tempo_resposta_figura_6",
	  // onlyActiveField: 'st_ativo' // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}


