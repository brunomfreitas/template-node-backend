// V8
// src/domains/entities/prontuario-pergunta.entity.ts
import { IProntuarioPergunta } from "../interfaces/prontuario-pergunta.interface";

export class ProntuarioPergunta implements IProntuarioPergunta {
	id_prontuario_pergunta?: number
	id_prontuario: number
	id_pergunta: number
	id_resposta: number
	dt_cadastro?: Date
	dt_exclusao?: Date | null | undefined
	st_ativo: boolean

  constructor(init?: Partial<IProntuarioPergunta>) {
    Object.assign(this, init);
  }
}



