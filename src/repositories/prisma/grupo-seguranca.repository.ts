// CÓDIGO V6
// src/repositories/prisma/organizacao.repository.ts
import { IGrupoSeguranca } from '@/domains/interfaces/grupo-seguranca.interface';
import prismaClient from '@/lib/prisma/prisma';
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IGrupoSegurancaRepository } from "../interfaces/grupo-seguranca.repository.interface";

export class GrupoSegurancaRepository extends PrismaBaseRepository<'grupo_seguranca', 'id_grupo_seguranca'> implements IGrupoSegurancaRepository
{
  constructor() {
	super('grupo_seguranca', 'id_grupo_seguranca', {
	  table: 'cognitio.grupo_seguranca',   // ajusta se o schema/tabela for outro
	  defaultColumns: "id_grupo_seguranca, nm_grupo_seguranca, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo'    // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.

   // ✅ sobrescrevendo o create para ser "create completo"
   async createAll(data: IGrupoSeguranca) {
    try {
      const result = await prismaClient.$transaction(async (tx) => {
        // 1) valida duplicidade
        const existe = await tx.grupo_seguranca.findFirst({
          where: { nm_grupo_seguranca: data.nm_grupo_seguranca },
          select: { id_grupo_seguranca: true }
        });

        if (existe) {
          throw new Error('O grupo de segurança já existe.');
        }

        // 2) cria o grupo
        // Opção A: criar direto pelo tx (mais simples e consistente)
        const grupo = await tx.grupo_seguranca.create({
          data: { nm_grupo_seguranca: data.nm_grupo_seguranca }
        });

        // (Se você fizer questão de usar super.create aqui,
        //  você teria que garantir que o super.create use o mesmo tx,
        //  senão você "fura" a transaction. Normalmente não recomendo.)

        // 3) busca apps ativas
        const aplicacoes = await tx.aplicacao.findMany({
          where: { st_ativo: true },
          select: { id_aplicacao: true }
        });

        // 4) cria vínculos + permissões (sequencial, seguro)
        for (const app of aplicacoes) {
          const grpAplicacao = await tx.grupo_aplicacao.create({
            data: {
              id_grupo_seguranca: grupo.id_grupo_seguranca,
              id_aplicacao: app.id_aplicacao
            }
          });

          await tx.grupo_aplicacao_permissao.create({
            data: {
              id_grupo_aplicacao: grpAplicacao.id_grupo_aplicacao,
              cs_ler: false,
              cs_criar: false,
              cs_editar: false,
              cs_excluir: false
            }
          });

		  await tx.grupo_aplicacao_restricao.create({
            data: {
              id_grupo_aplicacao: grpAplicacao.id_grupo_aplicacao,
              ds_clausula_where: null              
            }
          });
        }

        return grupo;
      });

      return result;
    } catch (error: any) {
      console.error('Erro ao criar grupo de segurança:', error);
      // mantém mensagem específica quando for duplicado
      if (error?.message?.includes('já existe')) throw error;
      throw new Error('Erro ao cadastrar o grupo de segurança.');
    }
  }

}
