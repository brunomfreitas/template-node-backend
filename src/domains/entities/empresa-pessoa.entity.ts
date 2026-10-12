// src/domains/entities/empresa-pessoa.entity.ts
import { IEmpresaPessoa } from "@/domains/interfaces/empresa-pessoa.interface";

export class EmpresaPessoa implements IEmpresaPessoa {
  id_empresa_pessoa?: number;

  id_empresa!: number;
  id_pessoa!: number;
  id_funcao!: number;
  id_organizacao!: number;
  id_site!: number;

  dt_cadastro?: Date;
  dt_atualizacao?: Date | null;
  dt_exclusao?: Date | null;

  st_ativo?: boolean;

  constructor(init?: Partial<IEmpresaPessoa>) {
    Object.assign(this, init);
  }
}
