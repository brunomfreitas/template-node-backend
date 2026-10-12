// src/domains/entities/empresa.entity.ts
import { IEmpresa } from '@/domains/interfaces/empresa.interface';

export class Empresa implements IEmpresa {
  id_empresa?: number | undefined;
  nm_empresa: string;
  nr_cnpj?: string | null | undefined;
  nr_telefone?: string | null | undefined;
  nm_email?: string | null | undefined;
  id_tipo_empresa: number;
  id_pessoa_responsavel?: number | null | undefined;
  id_organizacao: number;
  id_site: number;
  dt_cadastro?: Date | string | null | undefined;
  dt_atualizacao?: Date | null | undefined;
  dt_exclusao?: Date | null | undefined;
  st_ativo: boolean;

  constructor(data: Partial<IEmpresa>) {
    Object.assign(this, data);
  }
}
