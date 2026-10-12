// src/domains/interfaces/empresa.interface.ts
export interface IEmpresa {
  /** PK (SERIAL) */
  id_empresa?: number;

  /** NOT NULL */
  nm_empresa: string;

  /** NULLABLE */
  nr_cnpj?: string | null;

  /** NULLABLE */
  nr_telefone?: string | null;

  /** NULLABLE */
  nm_email?: string | null;

  /** NOT NULL (FK -> dominio_valor.id_dominio_valor) */
  id_tipo_empresa: number;

  /** NULLABLE (FK opcional para pessoa responsável) */
  id_pessoa_responsavel?: number | null;

  /** NOT NULL (FK -> organizacao.id_organizacao) */
  id_organizacao: number;

  /** NOT NULL (FK -> site.id_site) */
  id_site: number;

  /** DEFAULT now() no BD */
  dt_cadastro?: Date | string | null;

  /** NULLABLE */
  dt_atualizacao?: Date | null;

  /** NULLABLE (soft delete) */
  dt_exclusao?: Date | null;

  /** NOT NULL DEFAULT TRUE */
  st_ativo: boolean;
}
