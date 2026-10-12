// src/domains/entities/pac.entity.ts
import { IPac } from "../interfaces/pac.interface";

export class Pac implements IPac {
	id_pac?: number
	id_prontuario: number
	id_figura_fundo: number | null
	id_localizacao_sonora: number | null
	id_dicotico_digitos: number | null
	id_ordenacao_temporal: number | null
	id_dicotico_sequencial: number | null
	id_resolucao_temporal: number | null

  constructor(init?: Partial<IPac>) {
    Object.assign(this, init);
  }
}
