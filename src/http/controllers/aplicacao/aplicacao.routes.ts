//src/http/controllers/organizacao/organizacao.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const aplicacaoRouter = Router();

aplicacaoRouter.post("/", create);
aplicacaoRouter.get("/editar/:id", findById);
aplicacaoRouter.get("/visualizar/:id", findById);
aplicacaoRouter.get("/", list);
aplicacaoRouter.put("/editar/:id", update);
aplicacaoRouter.delete("/:id", softDelete);
aplicacaoRouter.get("/search", search);

export default aplicacaoRouter;
