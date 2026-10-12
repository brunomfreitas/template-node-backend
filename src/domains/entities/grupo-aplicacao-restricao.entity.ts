// src/domains/entities/grupo-seguranca.entity.ts
import { IGrupoAplicacaoRestricao } from "../interfaces/grupo-aplicacao-restricao.interface";

export class GrupoAplicacaoRestricao implements IGrupoAplicacaoRestricao {
  id_grupo_aplicacao_restricao: number | undefined;
  id_grupo_aplicacao: number;
  ds_clausula_where: string;
  dt_cadastro?: Date;

  constructor(init?: Partial<IGrupoAplicacaoRestricao>) {
    Object.assign(this, init);
  }
}
