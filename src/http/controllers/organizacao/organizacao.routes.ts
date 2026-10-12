//src/http/controllers/organizacao/organizacao.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const organizacaoRouter = Router();

organizacaoRouter.post("/", create);
organizacaoRouter.get("/editar/:id", findById);
organizacaoRouter.get("/visualizar/:id", findById);
organizacaoRouter.get("/", list);
organizacaoRouter.put("/editar/:id", update);
organizacaoRouter.put("/:id", softDelete);
organizacaoRouter.get("/search", search);

export default organizacaoRouter;
