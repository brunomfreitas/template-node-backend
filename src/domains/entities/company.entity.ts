// src/domains/entities/company.entity.ts
import { ICompany } from '@/domains/interfaces/company.interface';

export class Company implements ICompany {
  id_company?: number | undefined;
  nr_cnpj: string;
  nm_company: string;
  ds_sector: string;
  ds_subsector: string;
  ds_segment: string;
  dt_cadastro?: Date | string | null | undefined;
  dt_atualizacao?: Date | null | undefined;
  dt_exclusao?: Date | null | undefined;
  st_ativo: boolean;

  constructor(data: Partial<ICompany>) {
    Object.assign(this, data);
  }
}
