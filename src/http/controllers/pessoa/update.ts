// CÓDIGO V6
// src/http/controllers/pessoa/update.ts
import { PessoaRepository } from "@/repositories/prisma/pessoa.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { UpdateUseCase } from "@/use-cases/pessoa/update";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    nm_pessoa: z.string(),
    nr_cpf: z.string(),
    id_genero: z.coerce.number(),
    dt_nascimento: z.coerce.date(),
    nr_telefone: z.string(),
    nm_email: z.string(),
    id_organizacao: z.coerce.number(),
    id_site: z.coerce.number(),
	st_ativo: z.coerce.boolean()
  });

  const {
    nm_pessoa,
    nr_cpf,
    id_genero,
    dt_nascimento,
    nr_telefone,
    nm_email,
    id_organizacao,
    id_site,
	st_ativo,
  } = registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, PessoaRepository);

  const data = await updateUseCase.handler(id, {
    nm_pessoa,
    nr_cpf,
    id_genero,
    dt_nascimento,
    nr_telefone,
    nm_email,
    id_organizacao,
    id_site,
	st_ativo
  });

  return res.status(200).json(data);
}
