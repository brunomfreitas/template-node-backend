// CÓDIGO V6
// src/repositories/prisma/organizacao.repository.ts
import { PrismaBaseRepository } from "@/repositories/prisma/prisma-base.repository";
import { IUsuarioRepository } from "../interfaces/usuario.repository.interface";

export class UsuarioRepository
  extends PrismaBaseRepository<"usuario", "id_usuario">
  implements IUsuarioRepository
{
  constructor() {
    super("usuario", "id_usuario", {
      table: "cognitio.usuario", // ajusta se o schema/tabela for outro
      defaultColumns:
        "id_usuario, id_pessoa, login, password, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
      onlyActiveField: "st_ativo", // ajusta se o campo de ativo tiver outro nome
    });
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
