
// src/domains/interfaces/empresa-pessoa.interface.ts
export interface IEmpresaPessoa {
  id_empresa_pessoa?: number;

  id_empresa: number | undefined;
  id_pessoa: number | undefined;
  id_funcao: number | undefined;        // domínio: FONO / ASSISTENTE / ...
  id_organizacao: number | undefined;
  id_site: number | undefined;

  dt_cadastro?: Date;
  dt_atualizacao?: Date | null;
  dt_exclusao?: Date | null;

  st_ativo?: boolean | undefined;

}
