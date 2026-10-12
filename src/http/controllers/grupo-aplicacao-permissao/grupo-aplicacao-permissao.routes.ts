//src/http/controllers/organizacao/organizacao.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const grupoAplicacaoPermissaoRouter = Router();

grupoAplicacaoPermissaoRouter.post("/", create);
grupoAplicacaoPermissaoRouter.get("/editar/:id", findById);
grupoAplicacaoPermissaoRouter.get("/visualizar/:id", findById);
grupoAplicacaoPermissaoRouter.get("/", list);
grupoAplicacaoPermissaoRouter.put("/editar/:id", update);
grupoAplicacaoPermissaoRouter.delete("/:id", softDelete);
grupoAplicacaoPermissaoRouter.get("/search", search);

export default grupoAplicacaoPermissaoRouter;
