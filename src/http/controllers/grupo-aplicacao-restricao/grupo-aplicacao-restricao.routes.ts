//src/http/controllers/organizacao/organizacao.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const grupoAplicacaoRestricaoRouter = Router();

grupoAplicacaoRestricaoRouter.post("/", create);
grupoAplicacaoRestricaoRouter.get("/editar/:id", findById);
grupoAplicacaoRestricaoRouter.get("/visualizar/:id", findById);
grupoAplicacaoRestricaoRouter.get("/", list);
grupoAplicacaoRestricaoRouter.put("/editar/:id", update);
grupoAplicacaoRestricaoRouter.delete("/:id", softDelete);
grupoAplicacaoRestricaoRouter.get("/search", search);

export default grupoAplicacaoRestricaoRouter;
