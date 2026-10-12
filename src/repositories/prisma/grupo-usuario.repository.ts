// CÓDIGO V6
// src/repositories/prisma/grupo-usuario.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { IGrupoUsuarioRepository } from '../interfaces/grupo-usuario.repository.interface';

export class GrupoUsuarioRepository extends PrismaBaseRepository<'grupo_usuario', 'id_grupo_usuario'> implements IGrupoUsuarioRepository
{
  constructor() {
    super("grupo_usuario", "id_grupo_usuario", {
	  table: 'cognitio.grupo_usuario',   // ajusta se o schema/tabela for outro
	  defaultColumns: "id_grupo_usuario, id_grupo_seguranca, id_usuario, dt_cadastro",
	//   onlyActiveField: 'st_ativo'    // ajusta se o campo de ativo tiver outro nome
	});
  }

  // Se precisar de métodos específicos da aplicação, adiciona aqui.
  // O básico (create, list, search, findById, update, delete) já vem do base.
}
