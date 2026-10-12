//src/http/controllers/organizacao/organizacao.routes.ts
import { Router } from "express";
import { create } from "./create";
import { deleteController } from "./delete";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { update } from "./update";

const grupoUsuarioRouter = Router();

grupoUsuarioRouter.post("/", create);
grupoUsuarioRouter.get("/editar/:id", findById);
grupoUsuarioRouter.get("/visualizar/:id", findById);
grupoUsuarioRouter.get("/", list);
grupoUsuarioRouter.put("/editar/:id", update);
grupoUsuarioRouter.delete("/:id", deleteController);
grupoUsuarioRouter.get("/search", search);

export default grupoUsuarioRouter;
