// V8
// src/domains/entities/pergunta.entity.ts
import { IPergunta } from "../interfaces/pergunta.interface";

export class Pergunta implements IPergunta {
	id_pergunta?: number
	ds_pergunta: string
	ct_pergunta: number
	id_resposta: number
	dt_cadastro?: Date
	dt_atualizacao?: Date | null | undefined
	dt_exclusao?: Date | null | undefined
	st_ativo: boolean

  constructor(init?: Partial<IPergunta>) {
    Object.assign(this, init);
  }
}
