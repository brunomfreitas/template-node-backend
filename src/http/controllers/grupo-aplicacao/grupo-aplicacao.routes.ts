//src/http/controllers/organizacao/organizacao.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const grupoAplicacaoRouter = Router();

grupoAplicacaoRouter.post("/", create);
grupoAplicacaoRouter.get("/editar/:id", findById);
grupoAplicacaoRouter.get("/visualizar/:id", findById);
grupoAplicacaoRouter.get("/", list);
grupoAplicacaoRouter.put("/editar/:id", update);
grupoAplicacaoRouter.delete("/:id", softDelete);
grupoAplicacaoRouter.get("/search", search);

export default grupoAplicacaoRouter;
