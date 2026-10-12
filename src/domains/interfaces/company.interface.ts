// src/domains/interfaces/company.interface.ts
export interface ICompany {
  /** PK (SERIAL) */
  id_company?: number;

  /** NOT NULL */
  nr_cnpj: string;

  /** NOT NULL */
  nm_company: string;

  /** NOT NULL */
  ds_sector: string;

  /** NOT NULL */
  ds_subsector: string;

  /** NOT NULL */
  ds_segment: string;

  /** DEFAULT now() no BD */
  dt_cadastro?: Date | string | null;

  /** NULLABLE */
  dt_atualizacao?: Date | null;

  /** NULLABLE (soft delete) */
  dt_exclusao?: Date | null;

  /** NOT NULL DEFAULT TRUE */
  st_ativo: boolean;
}
