export const includeMap: Record<string, any> = {
	auto_declaracao: {
		escola: true,
		paciente: true,
		plano_saude: true,
	},
	dominio: {
		dominio_valor: true,
	},
	dominio_valor: {
		dominio: true,
	},
	empresa: {
		organizacao: true,
		site: true,
		dominio_valor: true
	},
	empresa_pessoa: {
		empresa: true,
		dominio_valor: true,
		pessoa: true,
	},
	grupo_usuario: {
		usuario: true,
	},
	pac: {
		dicotico_digitos: true,
		dicotico_sequencial: true,
		fechamento_auditivo: true,
		localizacao_sonora: true,
		ordenacao_temporal: true,
		resolucao_temporal: true,
	},
	pessoa: {
		organizacao: true,
		site: true,
	},
	pre_auto_declaracao: {
		escola: true,
		plano_saude: true,
	},
	prontuario: {
		organizacao: true,
		site: true,
		pessoa: true,
		pac: {
			include: {
				figura_fundo: true,
			}
		},
		prontuario_pergunta:{
			include: {
				pergunta: {
					include: {						
						dominio: {
							include: {						
								dominio_valor: true,
							}
						},
					}
				},
				dominio_valor: true,
			}
		},
		empresa_pessoa_prontuario_id_assistenteToempresa_pessoa: true,
		empresa_pessoa_prontuario_id_fonoaudiologoToempresa_pessoa: true
	},
	organizacao: {
		site: true,
	},
	site: {
		organizacao: true,
	},
	usuario: {
		pessoa: true,
	},
	grupo_seguranca: {
		grupo_site: {
			include: {
				site: true,
			}
		},
		grupo_usuario: {
			include: {
				usuario: true,
			}
		},
		grupo_aplicacao: {
			include: {
				aplicacao: true,
				grupo_aplicacao_permissao: true,
				grupo_aplicacao_restricao: true,
			}
		}
	},
	grupo_site: {
		site: true,
	},
};
