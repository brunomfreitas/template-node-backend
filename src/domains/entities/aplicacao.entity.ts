// src/domains/entities/aplicacao.entity.ts
import { IAplicacao } from "../interfaces/aplicacao.interface";

export class Aplicacao implements IAplicacao {
  id_aplicacao?: number;
  cd_aplicacao: string; 
  nm_aplicacao: string;
  dt_cadastro?: Date;
  dt_atualizacao?: Date | null | undefined;
  dt_exclusao?: Date | null | undefined;
  st_ativo: boolean;

  constructor(init?: Partial<IAplicacao>) {
    Object.assign(this, init);
  }
}
