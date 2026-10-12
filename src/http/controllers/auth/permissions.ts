//src/http/controllers/auth/me.ts
import prismaClient from "@/lib/prisma/prisma";
import { Request, Response } from "express";
import { z } from 'zod';

export async function permissionsHandler(req: Request, res: Response) {

	const { sub: userId } = (req as any).user as { sub: number; pid: number; login: string };

	const registerBodySchema = z.object({
		app: z.string()			
	})

	const { app } = registerBodySchema.parse(req.body);

    try {
    	const rows = await prismaClient.$queryRaw<
			Array<{
				id_usuario: number;
				login: string;
				cd_aplicacao: string;
				nm_aplicacao: string;
				cs_ler: boolean | number;
				cs_criar: boolean | number;
				cs_editar: boolean | number;
				cs_excluir: boolean | number;
			}>
		>`
			select	
				u.id_usuario,
				u.login,
				a.cd_aplicacao,
				a.nm_aplicacao,
				gap.cs_ler,
				gap.cs_criar,
				gap.cs_editar,
				gap.cs_excluir
			from 
				grupo_usuario gu
				inner join usuario u on gu.id_usuario = u.id_usuario
				inner join grupo_aplicacao ga on gu.id_grupo_seguranca = ga.id_grupo_seguranca
				inner join aplicacao a on ga.id_aplicacao = a.id_aplicacao
				inner join grupo_aplicacao_permissao gap on ga.id_grupo_aplicacao = gap.id_grupo_aplicacao
			where gu.id_usuario = ${userId} and a.cd_aplicacao = ${app};
		`;

	// Se quiser manter o comportamento de "User not found"
	if (rows.length === 0) {
		// opcional: checa se o user existe de verdade
		const user = await prismaClient.usuario.findUnique({
			where: { id_usuario: userId },
			select: { id_usuario: true }
		});
		if (!user) return res.status(404).json({ message: "User not found" });

		// user existe mas não tem grupos/aplicações
		return res.json({ id_usuario: userId, permissions: [] });
	}

    // Você pode devolver cru (igual query), ou normalizar:
    return res.json({
		id_usuario: rows[0].id_usuario,
		login: rows[0].login,		
		cd_aplicacao: rows[0].cd_aplicacao,
		nm_aplicacao: rows[0].nm_aplicacao,
		cs_ler: Boolean(rows[0].cs_ler),
		cs_criar: Boolean(rows[0].cs_criar),
		cs_editar: Boolean(rows[0].cs_editar),
		cs_excluir: Boolean(rows[0].cs_excluir)
	});

	} catch (error: any) {
		console.error("Erro no meHandler:", error);
		return res.status(500).json({ message: "Erro ao carregar dados do usuário." });
	}
}


export async function getClausulaWhereForUserAndApp(userId: number, appCode: string) {
  const rows = await prismaClient.$queryRaw<
    Array<{ ds_clausula_where: string | null }>
  >`
    select gar.ds_clausula_where
    from grupo_usuario gu
      inner join grupo_aplicacao ga on gu.id_grupo_seguranca = ga.id_grupo_seguranca
      inner join aplicacao a on ga.id_aplicacao = a.id_aplicacao
      left outer join grupo_aplicacao_restricao gar on ga.id_grupo_aplicacao = gar.id_grupo_aplicacao
    where gu.id_usuario = ${userId}
      and a.cd_aplicacao = ${appCode}
    limit 1;
  `;

  return rows?.[0]?.ds_clausula_where ?? "";
}