//CÓDIGO V6
// src/http/controllers/grupo-aplicacao-permissao/update.ts
import { GrupoAplicacaoPermissaoRepository } from "@/repositories/prisma/grupo-aplicacao-permissao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { UpdateUseCase } from "@/use-cases/grupo-aplicacao-permissao/update";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    id_grupo_aplicacao: z.coerce.number(),
    cs_ler: z.coerce.boolean().optional(),
	cs_criar: z.coerce.boolean().optional(),
	cs_editar: z.coerce.boolean().optional(),
	cs_excluir: z.coerce.boolean().optional(),
  });

  const { id_grupo_aplicacao, cs_ler, cs_criar, cs_editar, cs_excluir } =
    registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(
    UpdateUseCase,
    GrupoAplicacaoPermissaoRepository
  );

  const data = await updateUseCase.handler(id, {
    id_grupo_aplicacao_permissao: id,
    id_grupo_aplicacao: id_grupo_aplicacao,
    cs_ler: cs_ler,
    cs_criar: cs_criar,
    cs_editar: cs_editar,
    cs_excluir: cs_excluir,
  });

  return res.status(201).json(data);
}
