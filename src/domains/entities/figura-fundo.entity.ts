// CÓDIGO V8
// src/domains/entities/figura-fundo.entity.ts
import { IFiguraFundo } from "../interfaces/figura-fundo.interface";

export class FiguraFundo implements IFiguraFundo {
	id_figura_fundo?: number;
	ds_figura_fundo: string | null | undefined;	
	cs_recusa: boolean;
	st_figura_1_identificada: boolean;
	st_figura_2_identificada: boolean;
	st_figura_3_identificada: boolean;
	st_figura_4_identificada: boolean;
	st_figura_5_identificada: boolean;
	st_figura_6_identificada: boolean;
	ss_tempo_resposta_figura_1: number | null | undefined;
	ss_tempo_resposta_figura_2: number | null | undefined;
	ss_tempo_resposta_figura_3: number | null | undefined;
	ss_tempo_resposta_figura_4: number | null | undefined;
	ss_tempo_resposta_figura_5: number | null | undefined;
	ss_tempo_resposta_figura_6: number | null | undefined;	

  constructor(init?: Partial<IFiguraFundo>) {
    Object.assign(this, init);
  }
}
