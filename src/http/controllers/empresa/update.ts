// CÓDIGO V6
// src/http/controllers/empresa/update.ts
import { EmpresaRepository } from "@/repositories/prisma/empresa.repository";
import { UpdateUseCase } from "@/use-cases/empresa/update";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    nm_empresa: z.string(),
    nr_cnpj: z.string().nullable().optional(),
    nr_telefone: z.string().nullable().optional(),
    nm_email: z.string().nullable().optional(),
    id_tipo_empresa: z.coerce.number(),
    id_pessoa_responsavel: z.coerce.number().nullable().optional(),
    id_organizacao: z.coerce.number(),
    id_site: z.coerce.number(),
    st_ativo: z.coerce.boolean(),
  });

  const {
    nm_empresa,
    nr_cnpj,
    nr_telefone,
    nm_email,
    id_tipo_empresa,
    id_pessoa_responsavel,
    id_organizacao,
    id_site,
    st_ativo,
  } = registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, EmpresaRepository);

  const data = await updateUseCase.handler(id, {
    id_empresa: id,
    nm_empresa: nm_empresa,
    nr_cnpj: nr_cnpj,
    nr_telefone: nr_telefone,
    nm_email: nm_email,
    id_tipo_empresa: id_tipo_empresa,
    id_pessoa_responsavel: id_pessoa_responsavel,
    id_organizacao: id_organizacao,
    id_site: id_site,
    st_ativo: st_ativo,
  });

  return res.status(201).json(data);
}
