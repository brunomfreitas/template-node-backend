// CÓDIGO V6
// src/http/controllers/empresa-pessoa/update.ts
import { EmpresaPessoaRepository } from "@/repositories/prisma/empresa-pessoa.repository";
import { UpdateUseCase } from "@/use-cases/empresa-pessoa/update";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    id_empresa: z.coerce.number().int().positive().optional(),
    id_pessoa: z.coerce.number().int().positive().optional(),
    id_funcao: z.coerce.number().int().positive().optional(),
    id_organizacao: z.coerce.number().int().positive().optional(),
    id_site: z.coerce.number().int().positive().optional(),
    st_ativo: z.coerce.boolean().optional(),
  });

  const {
    id_empresa,
    id_pessoa,
    id_funcao,
    id_organizacao,
    id_site,
    st_ativo,
  } = registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, EmpresaPessoaRepository);

  const data = await updateUseCase.handler(id, {
    id_empresa_pessoa: id,
    id_empresa: id_empresa,
    id_pessoa: id_pessoa,
    id_funcao: id_funcao,
    id_organizacao: id_organizacao,
    id_site: id_site,
    st_ativo: st_ativo,
  });

  return res.status(201).json(data);
}
