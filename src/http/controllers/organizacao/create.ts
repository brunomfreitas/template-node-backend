// CÓDIGO V8
// src/http/controllers/organizacao/create.ts
import { OrganizacaoRepository } from "@/repositories/prisma/organizacao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/organizacao/create";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
  const registerBodySchema = z.object({
    nm_organizacao: z.string(),
  });

  const { nm_organizacao } = registerBodySchema.parse(req.body);

  const createUseCase = makeUseCase(CreateUseCase, OrganizacaoRepository);

  const data = await createUseCase.handler({
    nm_organizacao: nm_organizacao,
    st_ativo: true,
  });

  return res.status(201).json(data);
}
