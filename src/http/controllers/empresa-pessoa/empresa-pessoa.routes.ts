//src/http/controllers/organizacao/organizacao.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const empresaPessoaRouter = Router();

empresaPessoaRouter.post("/", create);
empresaPessoaRouter.get("/editar/:id", findById);
empresaPessoaRouter.get("/visualizar/:id", findById);
empresaPessoaRouter.get("/", list);
empresaPessoaRouter.put("/editar/:id", update);
empresaPessoaRouter.delete("/:id", softDelete);
empresaPessoaRouter.get("/search", search);

export default empresaPessoaRouter;
