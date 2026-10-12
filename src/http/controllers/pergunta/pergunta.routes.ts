// CÓDIGO V8
//src/http/controllers/pergunta/pergunta.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const perguntaRouter = Router();

perguntaRouter.post("/", create);
perguntaRouter.get("/editar/:id", findById);
perguntaRouter.get("/visualizar/:id", findById);
perguntaRouter.get("/", list);
perguntaRouter.put("/editar/:id", update);
perguntaRouter.delete("/:id", softDelete);
perguntaRouter.get("/search", search);

export default perguntaRouter;
