//CÓDIGO V6
// src/http/controllers/grupo-site/update.ts
import { GrupoSiteRepository } from "@/repositories/prisma/grupo-site.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { UpdateUseCase } from "@/use-cases/grupo-site/update";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    id_grupo_seguranca: z.coerce.number(),
    id_site: z.coerce.number(),
  });

  const { id_grupo_seguranca, id_site } = registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, GrupoSiteRepository);

  const data = await updateUseCase.handler(id, {
    id_grupo_site: id,
    id_grupo_seguranca: id_grupo_seguranca,
    id_site: id_site,
  });

  return res.status(201).json(data);
}
