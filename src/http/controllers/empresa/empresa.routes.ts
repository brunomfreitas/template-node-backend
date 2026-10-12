//src/http/controllers/organizacao/organizacao.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const empresaRouter = Router();

empresaRouter.post("/", create);
empresaRouter.get("/editar/:id", findById);
empresaRouter.get("/visualizar/:id", findById);
empresaRouter.get("/", list);
empresaRouter.put("/editar/:id", update);
empresaRouter.delete("/:id", softDelete);
empresaRouter.get("/search", search);

export default empresaRouter;
