export interface IGrupoAplicacaoPermissao {
	id_grupo_aplicacao_permissao?: number | undefined
	id_grupo_aplicacao: number
	cs_ler: boolean | undefined
	cs_criar: boolean | undefined
	cs_editar: boolean | undefined
	cs_excluir: boolean | undefined	
	dt_cadastro?: Date	
}