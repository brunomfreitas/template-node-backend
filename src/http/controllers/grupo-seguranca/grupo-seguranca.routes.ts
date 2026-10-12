//src/http/controllers/organizacao/organizacao.routes.ts
import { Router } from "express";
import { createAll } from "./create-all";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const grupoSegurancaRouter = Router();

grupoSegurancaRouter.post("/", createAll);
grupoSegurancaRouter.get("/editar/:id", findById);
grupoSegurancaRouter.get("/visualizar/:id", findById);
grupoSegurancaRouter.get("/", list);
grupoSegurancaRouter.put("/editar/:id", update);
grupoSegurancaRouter.delete("/:id", softDelete);
grupoSegurancaRouter.get("/search", search);

export default grupoSegurancaRouter;
